import Toast from '@/components/@common/Toast';
import FullCameraItem from '@/components/live/FullCameraItem';
import LiveSettingModal from '@/components/live/Modal/LiveSettingModal';
import useLiveStore from '@/stores/userLiveStore';
import { Publisher, Session, StreamManager } from 'openvidu-browser';
import { useState } from 'react';
import { FaRotate } from 'react-icons/fa6';
import { GoBroadcast } from 'react-icons/go';
import { HiDotsHorizontal } from 'react-icons/hi';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import { TbCamera, TbCameraOff, TbMicrophone, TbMicrophoneOff } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

// 경매 판매자 화면
const SaleSeller = ({
  sellerStatus,
  setSellerStatus,
  publisher,
  session,
  mainStreamManager,
  leaveSession,
  handleMainVideoStream,
  switchCamera,
  state,
  currentBid,
}: {
  sellerStatus: string;
  setSellerStatus: React.Dispatch<React.SetStateAction<'beforeLive' | 'onLive' | 'endLive'>>;
  publisher: Publisher | undefined;
  session: Session | null;
  mainStreamManager: StreamManager | undefined;
  leaveSession: () => void;
  handleMainVideoStream: (stream: any) => void;
  switchCamera: () => void;
  state: any;
  currentBid: number;
}) => {
  const navigate = useNavigate();
  const { onCamera, onMike, setOnCamera, setOnMike } = useLiveStore();

  const startLive = async () => {
    Toast.info('라이브 방송을 시작합니다');

    // 방송 시작 시그널
    session?.signal({
      data: 'onLive',
      type: 'live',
    });

    setTimeout(() => {
      setSellerStatus('onLive');
    }, 2000);
  };

  const handleCamera = () => {
    setOnCamera(!onCamera);
    publisher?.publishVideo(!onCamera);
  };

  const handleMike = () => {
    setOnMike(!onMike);
    publisher?.publishAudio(!onMike);
  };

  const [isOpenSettingModal, setIsOpenSettingModal] = useState<boolean>(false);
  const handleMoreSetting = () => {
    setIsOpenSettingModal(true);
  };

  const handleExit = () => {
    Toast.info('라이브 방송이 종료되었습니다.');
    leaveSession();

    // 방송 종료 시그널
    session?.signal({
      data: 'endLive',
      type: 'live',
    });

    setTimeout(() => {
      navigate('/live/end');
    }, 2000);
  };

  return (
    <div className="relative">
      {sellerStatus === 'beforeLive' ? (
        <div>
          <img className="w-screen h-screen object-cover bg-BID_BLACK" src={state.image} alt="썸네일" />
        </div>
      ) : (
        <div>
          {mainStreamManager && (
            <div onClick={() => handleMainVideoStream(publisher)}>
              <FullCameraItem streamManager={mainStreamManager} />
            </div>
          )}
        </div>
      )}

      {/* 사진 위 화면 */}
      <div className="absolute top-0 left-0 right-0 bottom-4">
        <div className="w-screen h-screen relative">
          <div className="absolute w-full h-36 bg-gradient-to-b from-black/35 to-black/0">&nbsp;</div>
          <div className="absolute w-full flex p-3 items-center">
            <div className="liveRedBtn">LIVE</div>
            <div className="flex-1 font-semibold text-sm pl-2 text-white truncate">{state.title}</div>
          </div>
          <div className="absolute top-12 px-4 text-white text-sm">
            <div>
              <span className="text-black/70 font-semibold">경매 시작가</span> {state.startPrice}원
            </div>
            <div>
              <span className="text-black/70  font-semibold">현재 입찰가</span> {currentBid}원
            </div>
          </div>
          {/* 나머지 얼굴 보이는 부분*/}
          <div className="absolute top-24 left-4 right-4 bottom-0 z-[10] flex justify-center items-center">
            {/* 라이브 시작 전 */}
            {sellerStatus === 'beforeLive' && (
              <div className="w-full flex flex-col justify-center items-center">
                <span className="text-white text-sm">지금 바로 라이브가 시작됩니다</span>
                <span className="text-[50px] text-white pb-3">00:05:47</span>
                <button className="bg-red-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-red-700">
                  <GoBroadcast size="20" style={{ border: '1px' }} />
                  <span className="pl-2" onClick={startLive}>
                    라이브 시작
                  </span>
                </button>
                <div className="w-full absolute bottom-2 flex justify-between z-20 pb-2">
                  <div className="flex w-20">
                    <button className="mx-2" onClick={handleCamera}>
                      {onCamera ? (
                        <TbCamera size={32} color={'white'} style={{ strokeWidth: '1.3px' }} />
                      ) : (
                        <TbCameraOff size={32} color={'white'} style={{ strokeWidth: '1.3px' }} />
                      )}
                    </button>
                    <button className="mx-2" onClick={handleMike}>
                      {onMike ? (
                        <TbMicrophone size={32} color={'white'} style={{ strokeWidth: '1.3px' }} />
                      ) : (
                        <TbMicrophoneOff size={32} color={'white'} style={{ strokeWidth: '1.3px' }} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* 녹화 끝나고 라이브 진행 중 */}
            {sellerStatus === 'onLive' && (
              <div className="w-full absolute bottom-2 flex justify-between z-20">
                <div className="flex w-20">
                  <button className="mx-2" onClick={handleCamera}>
                    {onCamera ? (
                      <TbCamera size={32} color={'white'} style={{ strokeWidth: '1.3px' }} />
                    ) : (
                      <TbCameraOff size={32} color={'white'} style={{ strokeWidth: '1.3px' }} />
                    )}
                  </button>
                  <button className="mx-2" onClick={handleMike}>
                    {onMike ? (
                      <TbMicrophone size={32} color={'white'} style={{ strokeWidth: '1.3px' }} />
                    ) : (
                      <TbMicrophoneOff size={32} color={'white'} style={{ strokeWidth: '1.3px' }} />
                    )}
                  </button>
                </div>
                <button
                  className="bg-red-600 text-white px-4 py-4 rounded-full flex items-center hover:bg-red-700"
                  onClick={handleExit}
                >
                  <RiCheckboxBlankFill size={20} />
                </button>
                <div className="flex w-20 justify-end">
                  <button className="mx-2" onClick={switchCamera}>
                    <div className="w-6">
                      <FaRotate size={25} color="white" />
                    </div>
                  </button>
                  <button className="mx-2" onClick={handleMoreSetting}>
                    <HiDotsHorizontal color="white" size={32} style={{ strokeWidth: '0px' }} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-60 bg-gradient-to-b from-black/0 to-black/35">&nbsp;</div>
      {isOpenSettingModal && <LiveSettingModal onClose={() => setIsOpenSettingModal(false)} />}
    </div>
  );
};

export default SaleSeller;
