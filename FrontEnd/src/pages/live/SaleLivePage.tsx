import Toast from '@/components/@common/Toast';
import { PARTICIPANT_TYPE } from '@/constants/liveType';
import { getSession } from '@/service/live/api';
import useLiveStore from '@/stores/userLiveStore';
import userStore from '@/stores/userStore';
import addCommaToPrice from '@/utils/addCommaToPrice';
import { Device, OpenVidu, Publisher, Session, StreamManager, Subscriber } from 'openvidu-browser';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SaleBuyer from './Sale/SaleBuyer';
import SaleSeller from './Sale/SaleSeller';

// 경매 라이브 페이지
const SaleLivePage = () => {
  const navigate = useNavigate();
  const OV = useRef(new OpenVidu());
  OV.current.enableProdMode();

  const { state } = useLocation();
  const { id } = useParams();
  const mySessionId = id;
  const { pType, onCamera, onMike } = useLiveStore();
  const { userId, nickname } = userStore();
  const [myUserName, setMyUserName] = useState(nickname);
  const [currentBid, setCurrentBid] = useState<number>(state.startPrice); // 현재 입찰가

  const [session, setSession] = useState<Session | null>(null);
  const [publisher, setPublisher] = useState<Publisher>();
  const [subscriber, setSubscriber] = useState<Subscriber>();
  const [mainStreamManager, setMainStreamManager] = useState<StreamManager>();
  const [currentVideoDevice, setCurrentVideoDevice] = useState<Device | undefined>(undefined);

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);

    return () => {
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, []);

  // 판매자 이벤트 핸들러 정의
  const sellerJoinSession = useCallback(async () => {
    const newSession = OV.current.initSession();
    setSession(newSession);

    newSession.on('signal:successBid', e => {
      if (!e.data) return;

      const receiveData = JSON.parse(e.data);
      Toast.info(`${receiveData.userName}님이 ${addCommaToPrice(receiveData.bidPrice)}원을 입찰했습니다.`);

      setCurrentBid(receiveData.bidPrice);
    });
  }, []);

  // 구매자 이벤트 핸들러 정의
  const buyerJoinSession = useCallback(async () => {
    const newSession = OV.current.initSession();
    setSession(newSession);

    // 판매자가 publish 하면 그 스트림 구독
    newSession.on('streamCreated', event => {
      let subscriber = newSession.subscribe(event.stream, undefined);
      setSubscriber(subscriber);
    });

    // 누군가 입찰하면 최고가 갱신
    newSession.on('signal:successBid', e => {
      if (!e.data) return;

      const receiveData = JSON.parse(e.data);

      if (receiveData.userName !== nickname) {
        Toast.info(`${receiveData.userName}님이 ${receiveData.bidPrice}원을 입찰했습니다.`);
      }

      setCurrentBid(receiveData.bidPrice);
    });

    // 방송 종료
    newSession.on('signal:endLive', () => {
      Toast.info('라이브 방송이 종료되었습니다.');

      setTimeout(() => {
        navigate('/live/end');
      }, 500);
    });
  }, []);

  useEffect(() => {
    if (!id) return;

    if (session && mySessionId) {
      try {
        getSession(id, userId).then(async data => {
          const token = data.data.token;
          await session.connect(token, { clientData: myUserName });

          if (pType === PARTICIPANT_TYPE.SELLER) {
            const devices = await OV.current.getDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');

            const publisher = await OV.current.initPublisherAsync(undefined, {
              audioSource: undefined,
              videoSource: undefined,
              publishAudio: onMike,
              publishVideo: onCamera,
              resolution: '1280x720',
              frameRate: 40,
              insertMode: 'APPEND',
              mirror: false,
            });

            const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
            const currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

            session.publish(publisher);
            setPublisher(publisher);
            setMainStreamManager(publisher);
            setCurrentVideoDevice(currentVideoDevice);
          }
        });
      } catch (e) {
        console.log(e);
      }
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
            resolution: '1280x720',
            frameRate: 40,
            insertMode: 'APPEND',
            mirror: false,
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
  }, [currentVideoDevice, session, mainStreamManager, onMike, onCamera]);

  const leaveSession = useCallback(() => {
    if (!session || !publisher) return;

    session.unpublish(publisher);

    if (publisher && publisher.stream && publisher.stream.getMediaStream()) {
      const stream = publisher.stream.getMediaStream();
      stream.getTracks().forEach(track => track.stop());
    }

    OV.current = new OpenVidu();
    session.disconnect();
    setSession(null);
    setMyUserName('');
    setSubscriber(undefined);
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }, [session, publisher]);

  useEffect(() => {
    if (pType === PARTICIPANT_TYPE.BUYER) {
      buyerJoinSession();
    }

    return () => {
      leaveSession();
    };
  }, []);

  if (pType === PARTICIPANT_TYPE.SELLER) {
    return (
      <SaleSeller
        publisher={publisher}
        session={session}
        mainStreamManager={mainStreamManager}
        leaveSession={leaveSession}
        handleMainVideoStream={handleMainVideoStream}
        switchCamera={() => {
          if (!onCamera) {
            Toast.error('카메라를 켜주세요.');
            return;
          }
          switchCamera();
        }}
        state={state}
        currentBid={currentBid}
        sellerJoinSession={sellerJoinSession}
      />
    );
  } else if (pType === PARTICIPANT_TYPE.BUYER) {
    return (
      <SaleBuyer
        session={session}
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
