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
  publisher,
  session,
  mainStreamManager,
  leaveSession,
  handleMainVideoStream,
  switchCamera,
  state,
  currentBid,
}: {
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
  const [isOpenSettingModal, setIsOpenSettingModal] = useState<boolean>(false);
  const [sellerStatus, setSellerStatus] = useState<'beforeLive' | 'onLive' | 'endLive'>('beforeLive');

  const startLive = async () => {
    // 방송 예정 시간 전에는 방송 시작 못함
    if (false) {
      return;
    }

    if (window.confirm('라이브 방송을 시작하시겠습니까?')) {
      setSellerStatus('onLive');
      Toast.info('라이브 방송을 시작합니다');
    }

    // @TODO: 라이브 시작 상태로 변경하는 api 호출
  };

  const handleCamera = () => {
    setOnCamera(!onCamera);
    publisher?.publishVideo(!onCamera);
  };

  const handleMike = () => {
    setOnMike(!onMike);
    publisher?.publishAudio(!onMike);
  };

  const handleMoreSetting = () => {
    setIsOpenSettingModal(true);
  };

  const handleExit = () => {
    session?.signal({
      data: 'endLive',
      type: 'endLive',
    });

    Toast.info('라이브 방송이 종료되었습니다.');
    leaveSession();

    setTimeout(() => {
      navigate('/live/end');
    }, 3000);
  };

  console.log(sellerStatus);

  return (
    <div className="relative">
      {sellerStatus === 'beforeLive' &&
        mainStreamManager &&
        (onCamera ? (
          <div onClick={() => handleMainVideoStream(publisher)}>
            <FullCameraItem streamManager={mainStreamManager} />
          </div>
        ) : (
          <div className="w-full h-screen object-cover bg-black/90">&nbsp;</div>
        ))}

      {sellerStatus === 'onLive' && mainStreamManager && (
        <div onClick={() => handleMainVideoStream(publisher)}>
          <FullCameraItem streamManager={mainStreamManager} />
        </div>
      )}
      {/* 사진 위 화면 */}
      <div className="absolute top-0 left-0 right-0 bottom-4">
        <div className="w-full h-screen relative">
          <div className="absolute w-full h-36 bg-gradient-to-b from-black/35 to-black/0">&nbsp;</div>
          <div className="absolute w-full flex p-3 items-center">
            <div className="liveRedBtn">LIVE</div>
            <div className="flex-1 font-semibold text-sm pl-2 text-white truncate">{state.title}</div>
          </div>
          <div className="absolute top-12 px-4 text-white text-xs">
            <div className="mb-3">
              <span className="text-white font-semibold bg-black/10 px-2 py-1 mr-1 rounded-full">경매 시작가</span>
              {state.startPrice}원
            </div>
            <div>
              <span className="text-white font-semibold bg-black/10 px-2 py-1 mr-1 rounded-full">현재 최고입찰가</span>{' '}
              {currentBid}원
            </div>
          </div>
          {/* 나머지 얼굴 보이는 부분*/}
          <div className="absolute top-24 left-4 right-4 bottom-0 z-[10] flex justify-center items-center">
            {/* 라이브 시작 전 */}
            {sellerStatus === 'beforeLive' && (
              <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full flex flex-col justify-center items-center absolute top-0 bottom-24">
                  <span className="text-white text-sm">라이브 예정 시간</span>
                  <span className="text-[50px] text-white">00:05:47</span>
                  <span className="text-white/60 text-sm pb-5 ">라이브 방송 예정 전입니다</span>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-red-700">
                    <GoBroadcast size="20" style={{ border: '1px' }} />
                    <span className="pl-2" onClick={startLive}>
                      라이브 시작
                    </span>
                  </button>
                </div>
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
