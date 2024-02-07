import LivePermissonModal from '@/components/live/Modal/LivePermissonModal';
import { PARTICIPANT_TYPE } from '@/constants/liveType';
import { createToken, getToken } from '@/service/live';
import useLiveStore from '@/stores/userLiveStore';
import userStore from '@/stores/userStore';
import { Device, OpenVidu, Publisher, Session, StreamManager, Subscriber } from 'openvidu-browser';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SaleBuyer from './Sale/SaleBuyer';
import SaleSeller from './Sale/SaleSeller';

// 경매 라이브 페이지
const SaleLivePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();
  const { onCamera, onMike } = useLiveStore();
  const pType = 'seller';
  const { nickname } = userStore();
  const [sellerStatus, setSellerStatus] = useState<'beforeLive' | 'onLive' | 'endLive'>('beforeLive');
  const [buyerStatus, setBuyerStatus] = useState<'onLive' | 'endLive'>('onLive');
  const [mySessionId, setMySessionId] = useState(id || '');
  const [myUserName, setMyUserName] = useState(nickname);
  const [currentBid, setCurrentBid] = useState<number>(0); // 현재 입찰가

  console.log(setCurrentBid);
  const OV = useRef(new OpenVidu());
  OV.current.enableProdMode();

  const [session, setSession] = useState<Session | null>(null);
  const [publisher, setPublisher] = useState<Publisher>();
  const [subscriber, setSubscriber] = useState<Subscriber>();
  const [mainStreamManager, setMainStreamManager] = useState<StreamManager>();
  const [currentVideoDevice, setCurrentVideoDevice] = useState<Device | undefined>(undefined);

  console.log(myUserName, setMySessionId);

  const joinSession = useCallback(async () => {
    const newSession = OV.current.initSession();
    console.log('현재 세션', newSession);
    setSession(newSession);

    // 누군가 stream 생성 후 publish 호출하면 발생
    newSession.on('streamCreated', event => {
      console.log('누구냐?', event);

      if (pType === PARTICIPANT_TYPE.BUYER) {
        let subscriber = newSession.subscribe(event.stream, undefined);
        console.log('sub', subscriber);
        setSubscriber(subscriber);
      }
    });

    // 누군가 disconnect 호출하면 발생
    newSession.on('streamDestroyed', () => {
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
      if (pType === PARTICIPANT_TYPE.BUYER) {
        createToken(mySessionId).then(async token => {
          await session.connect(token, { clientData: myUserName });
        });

        return;
      }

      // seisson 연결
      getToken(mySessionId).then(async token => {
        await session.connect(token, { clientData: myUserName });

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
    setMyUserName('');
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }, [session]);

  const [isShowLivePermissionModal, setIsShowaLivePermissionModal] = useState<boolean>(false);

  useEffect(() => {
    // 판매자일때는 일단 실행x
    if (pType === PARTICIPANT_TYPE.SELLER) {
      setIsShowaLivePermissionModal(true);
    } else {
      joinSession();
    }

    return () => {
      leaveSession();
    };
  }, []);

  useEffect(() => {
    if (sellerStatus === 'onLive') {
      joinSession();
    }
  }, [sellerStatus]);

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
      <>
        <SaleSeller
          sellerStatus={sellerStatus}
          setSellerStatus={setSellerStatus}
          publisher={publisher}
          session={session}
          mainStreamManager={mainStreamManager}
          leaveSession={leaveSession}
          handleMainVideoStream={handleMainVideoStream}
          switchCamera={switchCamera}
          state={state}
          currentBid={currentBid}
        />
        {isShowLivePermissionModal && <LivePermissonModal onClose={() => setIsShowaLivePermissionModal(false)} />}
      </>
    );
  } else if (pType === PARTICIPANT_TYPE.BUYER) {
    return (
      <SaleBuyer
        buyerStatus={buyerStatus}
        subscriber={subscriber}
        leaveSession={leaveSession}
        handleMainVideoStream={handleMainVideoStream}
        state={state}
        currentBid={currentBid}
      />
    );
  }
};

export default SaleLivePage;
