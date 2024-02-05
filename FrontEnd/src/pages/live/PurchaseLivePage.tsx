import { PARTICIPANT_TYPE } from '@/constants/liveType';
import { getToken } from '@/service/live';
import useLiveStore from '@/stores/userLiveStore';
import { Device, OpenVidu, Publisher, Session, StreamManager, Subscriber } from 'openvidu-browser';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PurchaseBuyer from './Purchase/PurchaseBuyer';
import PurchaseSeller from './Purchase/PurchaseSeller';

const PurchaseLivePage = () => {
  // 경매 라이브 페이지
  const navigate = useNavigate();
  const pType = PARTICIPANT_TYPE.SELLER;
  const { onCamera, onMike } = useLiveStore();
  const [sellerStatus, setSellerStatus] = useState<'beforeLive' | 'onLive' | 'endLive'>('beforeLive');
  const [buyerStatus, setBuyerStatus] = useState<'onLive' | 'endLive'>('onLive');

  const [mySessionId, setMySessionId] = useState('SessionA');
  const [myUserName, setMyUserName] = useState(`Participant${Math.floor(Math.random() * 100)}`);

  const OV = useRef(new OpenVidu());
  OV.current.enableProdMode();

  const [session, setSession] = useState<Session | null>(null);
  const userName = `참가자 ${Math.floor(Math.random() * 100)}`;

  const [publisher, setPublisher] = useState<Publisher>();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [mainStreamManager, setMainStreamManager] = useState<StreamManager>();
  const [currentVideoDevice, setCurrentVideoDevice] = useState<Device | undefined>(undefined);

  const deleteSubscriber = useCallback((streamManager: any) => {
    let currentSubscribers = subscribers;
    let index = currentSubscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setSubscribers([...subscribers]);
    }
  }, []);

  const joinSession = useCallback(async () => {
    const newSession = OV.current.initSession();
    console.log('현재 세션', newSession);
    setSession(newSession);

    // 누군가 stream 생성 후 publish 호출하면 발생
    newSession.on('streamCreated', event => {
      console.log('누구냐?', event);

      if (pType === PARTICIPANT_TYPE.BUYER) {
        let subscriber = newSession.subscribe(event.stream, undefined);
        setSubscribers(prev => [...prev, subscriber]);
      }
    });

    // 누군가 disconnect 호출하면 발생
    newSession.on('streamDestroyed', event => {
      deleteSubscriber(event.stream.streamManager);

      if (pType === PARTICIPANT_TYPE.BUYER) {
        setTimeout(() => {
          navigate('/live/end');
        }, 5000);
      }
    });

    if (pType === PARTICIPANT_TYPE.BUYER) {
      newSession.on('signal:live', event => {
        // console.log('라이브 이벤트 받음', event);
        if (event.data === 'onLive') {
          setBuyerStatus('onLive');
        }

        if (event.data === 'endLive') {
          setBuyerStatus('endLive');
        }
      });
    }
  }, []);

  useEffect(() => {
    if (session) {
      // seisson 연결
      getToken(mySessionId).then(async token => {
        await session.connect(token, { clientData: userName });

        if (pType === PARTICIPANT_TYPE.SELLER) {
          let devices = await OV.current.getDevices();
          let videoDevices = devices.filter(device => device.kind === 'videoinput');

          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: videoDevices[0].deviceId,
            publishAudio: onMike,
            publishVideo: onCamera,
            resolution: '600X900',
            frameRate: 30,
            insertMode: 'APPEND',
            mirror: true,
          });
          const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

          session.publish(publisher);
          setPublisher(publisher);
          setMainStreamManager(publisher);
          setCurrentVideoDevice(currentVideoDevice);
        } else if (pType === PARTICIPANT_TYPE.BUYER) {
          setMainStreamManager(subscribers[0]);
        }
      });
    }
  }, [session]);

  const handleMainVideoStream = (stream: any) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const switchCamera = useCallback(async () => {
    try {
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(device => device.deviceId !== currentVideoDevice?.deviceId);

        if (newVideoDevice.length > 0) {
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: onMike,
            publishVideo: onCamera,
            resolution: '600X900',
            frameRate: 30,
            insertMode: 'APPEND',
            mirror: true,
          });

          if (session && publisher) {
            await session.unpublish(publisher);
            await session.publish(newPublisher);
            setCurrentVideoDevice(newVideoDevice[0]);
            setMainStreamManager(newPublisher);
            setPublisher(newPublisher);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentVideoDevice, session, mainStreamManager]);

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }

    if (session && publisher) {
      session.unpublish(publisher);
    }

    OV.current = new OpenVidu();
    setSession(null);
    setSubscribers([]);
    setMyUserName('Participant' + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }, [session]);

  useEffect(() => {
    joinSession();

    return () => {
      leaveSession();
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      leaveSession();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [leaveSession]);

  // 판매자는 옵션바, 본인 화면 볼 수 있음
  if (pType === PARTICIPANT_TYPE.SELLER) {
    return (
      <PurchaseSeller
        sellerStatus={sellerStatus}
        setSellerStatus={setSellerStatus}
        publisher={publisher}
        session={session}
        mainStreamManager={mainStreamManager}
        leaveSession={leaveSession}
        handleMainVideoStream={handleMainVideoStream}
        switchCamera={switchCamera}
      />
    );
  } else if (pType === PARTICIPANT_TYPE.BUYER) {
    return (
      <PurchaseBuyer
        buyerStatus={buyerStatus}
        subscriber={subscribers}
        leaveSession={leaveSession}
        handleMainVideoStream={handleMainVideoStream}
      />
    );
  }
};

export default PurchaseLivePage;
