import CameraItem from '@/components/live/CameraItem';
import FullCameraItem from '@/components/live/FullCameraItem';
import LiveOptionTab from '@/components/live/LiveOptionTab';
import { PARTICIPANT_TYPE } from '@/constants/liveType';
import { getToken } from '@/service/live';
import useLiveStore from '@/stores/userLiveStore';
import { OpenVidu, Publisher, Session, StreamManager, Subscriber } from 'openvidu-browser';
import { useEffect, useRef, useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';

const SellLivePage = () => {
  // 경매 라이브 페이지
  const pType = PARTICIPANT_TYPE.SELLER;

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

  const connectSession = async (newSession: Session) => {
    const token = await getToken(userData.sessionId);
    await newSession.connect(token, { clientData: userData.name });
  };

  const initLiveSetting = async () => {
    const newSession = OV.current.initSession();

    newSession.on('streamCreated', event => {
      let subscriber = newSession.subscribe(event.stream, undefined);
      setSubscribers(prev => [...prev, subscriber]);
      if (pType === PARTICIPANT_TYPE.BUYER) {
        console.log(subscriber);
        setMainStreamManager(subscriber);
      }
    });

    newSession.on('connectionCreated', event => {});

    setSession(newSession);

    // seisson 연결
    await connectSession(newSession);

    if (pType === PARTICIPANT_TYPE.SELLER) {
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
      setPublisher(publisher);
      setMainStreamManager(publisher);
    }
  };

  const handleMainVideoStream = (stream: any) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  // @TODO: 추가 세팅 모달
  const handleMoreSetting = () => {};

  useEffect(() => {
    initLiveSetting();
  }, []);

  // 판매자는 옵션바, 본인 화면 볼 수 있음
  if (pType === PARTICIPANT_TYPE.SELLER) {
    // 판매자는 그냥 남은 시간 정도 띄우고
    // 녹화 가이드라인
    return (
      <div className="relative">
        {mainStreamManager && (
          <div onClick={() => handleMainVideoStream(publisher)}>
            <FullCameraItem streamManager={mainStreamManager} />
          </div>
        )}
        {/* 사진 위 화면 */}
        {onCamera && (
          <div className="absolute top-0 left-0 right-0 bottom-24">
            <div className="w-full h-full relative">
              <div className="absolute w-full h-36 bg-gradient-to-b from-black/35 to-black/0">&nbsp;</div>
              <div className="absolute w-full flex p-3 items-center">
                <div className="liveRedBtn">LIVE</div>
                <div className="flex-1 font-semibold text-sm pl-2 text-white truncate">
                  [아이폰 15] 판매합니다판매합니다판매합니다판매합니다
                </div>
                <div onClick={() => handleMoreSetting}>
                  <HiDotsHorizontal color="white" size="20" />
                </div>
              </div>
              <div className="absolute top-12 px-4 text-white text-sm">
                <div>
                  <span className="text-black/70 font-semibold">경매 시작가</span> 500,000원
                </div>
                <div>
                  <span className="text-black/70  font-semibold">현재 입찰가</span> 700,000원
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0">
          <LiveOptionTab />
        </div>
        <div className="absolute bottom-0 w-full h-60 bg-gradient-to-b from-black/0 to-black/35">&nbsp;</div>
      </div>
    );
  }
  // 채팅 화면 + 판매자 화면
  else if (pType === PARTICIPANT_TYPE.BUYER) {
    // @TODO: 시작 시간이 되었는지 확인하는 로직
    // 녹화 버튼 + 다음으로 버튼 누를 때마다 화면 넘어가는 로직 구현
    // 녹화 시간을 재는 타이머 구현

    // 녹화 버튼은 5분전에 활성화 된다고 하고
    // 5분간 타이머를 띄워야 하나?
    const today = new Date();
    console.log(today);

    console.log(today.getFullYear());
    console.log(today.getMonth() + 1);
    console.log(today.getDate());
    console.log(today.getHours());
    console.log(today.getMinutes());

    return (
      <div className="relative">
        {mainStreamManager && (
          <div className="w-screen" onClick={() => handleMainVideoStream(mainStreamManager)}>
            <CameraItem streamManager={mainStreamManager} />
          </div>
        )}
        <div className="absolute bottom-20">구매자</div>
      </div>
    );
  }
};

export default SellLivePage;
