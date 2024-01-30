import FullCameraItem from '@/components/live/FullCameraItem';
import BuyModal from '@/components/live/Modal/BuyModal';
import { PARTICIPANT_TYPE } from '@/constants/liveType';
import { getToken } from '@/service/live';
import useLiveStore from '@/stores/userLiveStore';
import { OpenVidu, Publisher, Session, StreamManager, Subscriber } from 'openvidu-browser';
import { useEffect, useRef, useState } from 'react';
import { BsXLg } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import { GoBroadcast } from 'react-icons/go';
import { HiDotsHorizontal } from 'react-icons/hi';
import { MdFlipCameraAndroid } from 'react-icons/md';
import { RiAuctionFill } from 'react-icons/ri';

const BuyLivePage = () => {
  // 경매 라이브 페이지
  const pType = PARTICIPANT_TYPE.SALER;

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

    newSession.on('streamDestroyed', event => {
      deleteSubscriber(event.stream.streamManager);
    });

    newSession.on('connectionCreated', event => {});

    setSession(newSession);

    // seisson 연결
    await connectSession(newSession);

    if (pType === PARTICIPANT_TYPE.SALER) {
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

  const handleExit = () => {
    session?.disconnect();
  };

  useEffect(() => {
    initLiveSetting();

    return () => {
      session?.disconnect();
    };
  }, []);

  // 판매자는 옵션바, 본인 화면 볼 수 있음
  if (pType === PARTICIPANT_TYPE.SALER) {
    let status = 'onLive';

    return (
      <div className="relative">
        {mainStreamManager && (
          <div onClick={() => handleMainVideoStream(publisher)}>
            <FullCameraItem streamManager={mainStreamManager} />
          </div>
        )}
        {/* 사진 위 화면 */}
        {onCamera && (
          <div className="absolute top-0 left-0 right-0 bottom-4">
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
              {/* 나머지 얼굴 보이는 부분*/}
              <div className="absolute top-24 left-4 right-4 bottom-0 z-[10] flex justify-center items-center">
                {/* 라이브 시작 전 */}
                {status === 'beforeLive' && (
                  <div className="w-[80%] flex flex-col justify-center items-center">
                    <span className="text-white text-sm">지금 바로 라이브가 시작됩니다</span>
                    <span className="text-[50px] text-white pb-3">00:05:47</span>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-red-700">
                      <GoBroadcast size="20" style={{ border: '1px' }} />
                      <span className="pl-2">라이브 시작하기</span>
                    </button>
                  </div>
                )}
                {/* 라이브 시작 이후 - 녹화 시작 전 */}
                {status === 'beforeRecording' && <div>녹화하기</div>}
                {/* 녹화 끝나고 라이브 진행 중 */}
                {status === 'onLive' && (
                  <div className="w-full absolute bottom-0 flex justify-between">
                    <button className="w-3">
                      <MdFlipCameraAndroid size={30} color="white" />
                    </button>
                    <button className="bg-red-600 text-white px-4 py-2.5 rounded-full flex items-center hover:bg-red-700">
                      <GoBroadcast size="20" style={{ border: '1px' }} />
                      <span className="pl-2">라이브 종료하기</span>
                    </button>
                    {/* 임의 버튼 추가 */}
                    <button className="w-3">&nbsp;</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
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
    // const today = new Date();
    // console.log(today);

    // console.log(today.getFullYear());
    // console.log(today.getMonth() + 1);
    // console.log(today.getDate());
    // console.log(today.getHours());
    // console.log(today.getMinutes());

    const [openVidModal, setOpenVidModal] = useState<boolean>(false);
    const handleBid = () => {
      setOpenVidModal(!openVidModal);
    };

    return (
      <div className="relative">
        {mainStreamManager && (
          <div onClick={() => handleMainVideoStream(publisher)}>
            <FullCameraItem streamManager={mainStreamManager} />
          </div>
        )}
        {/* 사진 위 화면 */}
        {onCamera && (
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <div className="w-full h-full relative">
              <div className="absolute w-full h-36 bg-gradient-to-b from-black/35 to-black/0">&nbsp;</div>
              <div className="absolute w-full flex p-3 items-center">
                <div className="liveRedBtn">LIVE</div>
                <div className="flex-1 font-semibold text-sm pl-2 text-white truncate">
                  [아이폰 15] 판매합니다판매합니다판매합니다판매합니다
                </div>
                <div onClick={() => handleExit}>
                  <BsXLg color="white" size="30" />
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
              {/* 아래 아이콘 */}
              <div className="absolute bottom-0 h-20 left-0 right-0 p-3 flex justify-center">
                <button
                  type="button"
                  className="bg-BID_MAIN w-[55px] rounded-full flex justify-center items-center hover:bg-BID_HOVER_MAIN"
                  onClick={handleBid}
                >
                  <RiAuctionFill color="white" size="30" />
                </button>
                <div className="flex-1 ml-2 rounded-full border border-[1px] border-BID_SUB_GRAY flex">
                  <input
                    placeholder="채팅을 입력해주세요"
                    className="w-full h-full px-4 bg-white/0 focus:outline-none text-white"
                  />
                  <button type="button" className="w-16">
                    <FiSend color="white" size="28" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="absolute bottom-0 w-full h-120 bg-gradient-to-b from-black/0 to-black/60">&nbsp;</div>
        {openVidModal && <BuyModal onClose={() => setOpenVidModal(false)} />}
      </div>
    );
  }
};

export default BuyLivePage;
