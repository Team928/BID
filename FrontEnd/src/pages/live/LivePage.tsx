import CameraItem from '@/components/live/CameraItem';
import LiveOptionTab from '@/components/live/LiveOptionTab';
import { getToken } from '@/service/live';
import useLiveStore from '@/stores/userLiveStore';
import { OpenVidu, Publisher, Session, StreamManager, Subscriber } from 'openvidu-browser';
import { useEffect, useRef, useState } from 'react';

// @TEST 로직 페이지임
const LivePage = () => {
  interface ILiveUser {
    sessionId: string;
    name: string;
  }

  const { onCamera, onMike } = useLiveStore();

  const newOV = new OpenVidu();
  newOV.enableProdMode();

  const OV = useRef(newOV);

  const [session, setSession] = useState<Session>();
  const [userData, setUserData] = useState<ILiveUser>({
    sessionId: 'SessionA',
    name: 'Participant' + Math.floor(Math.random() * 100),
  });

  const [publisher, setPublisher] = useState<Publisher>();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [mainStreamManager, setMainStreamManager] = useState<StreamManager>();

  const deleteSubscriber = (streamManager: any) => {
    let currentSubscribers = subscribers;
    let index = currentSubscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setSubscribers([...subscribers]);
    }
  };

  const initLiveSetting = async () => {
    const newSession = OV.current.initSession();

    newSession.on('streamCreated', event => {
      console.log('streamCreated event', event);

      // 다른 참가자가 publish함
      let subscriber = newSession.subscribe(event.stream, undefined);

      let subscriberList = subscribers;
      subscriberList.push(subscriber);
      setSubscribers([...subscriberList]);
    });

    // 퇴장
    newSession.on('streamDestroyed', event => {
      deleteSubscriber(event.stream.streamManager);
    });

    // 다른 참가자가 세션에 연결됨
    newSession.on('connectionCreated', event => {});

    // 발언 감지
    newSession.on('publisherStartSpeaking', event => {
      console.log('사용자 ' + event.connection.connectionId + '님 말하는중');
    });

    // 발언 중지 감지
    newSession?.on('publisherStopSpeaking', event => {
      console.log('사용자 ' + event.connection.connectionId + ' 님 말 끝남');
    });

    setSession(newSession);

    // seisson 연결
    const token = await getToken(userData.sessionId);
    await newSession.connect(token, { clientData: userData.name });

    // 송출
    let devices = await OV.current.getDevices();
    let videoDevices = devices.filter(device => device.kind === 'videoinput');

    let publisher = await OV.current.initPublisherAsync(undefined, {
      audioSource: undefined,
      videoSource: undefined,
      publishAudio: onMike,
      publishVideo: onCamera,
      resolution: '600X900',
      frameRate: 30,
      insertMode: 'APPEND',
      mirror: true,
    });

    newSession.publish(publisher);

    let currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
    let currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

    setPublisher(publisher);
    setMainStreamManager(publisher);
  };

  const handleSetting = (type: string) => {
    switch (type) {
      case 'camera': {
        publisher?.publishVideo(onCamera);
        break;
      }
      case 'mike': {
        publisher?.publishAudio(onMike);
      }
    }
  };

  const handleMainVideoStream = (stream: any) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  useEffect(() => {
    initLiveSetting();
  }, []);

  useEffect(() => {
    handleSetting('camera');
  }, [onCamera]);

  useEffect(() => {
    handleSetting('mike');
  }, [onMike]);

  return (
    <div>
      {/* publisher */}
      {publisher !== undefined ? (
        // 판매 라이브 화면
        <div className="relative">
          <div onClick={() => handleMainVideoStream(publisher)}>
            <CameraItem streamManager={publisher} />
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <LiveOptionTab />
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen flex flex-col justify-center items-center relative">
          <div>연결중입니다..</div>
        </div>
      )}
    </div>
  );
};

export default LivePage;
