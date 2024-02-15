import Toast from '@/components/@common/Toast';
import SaleSellerChat from '@/components/chat/LiveChat/SaleSellerChat';
import FullCameraItem from '@/components/live/FullCameraItem';
import LivePermissonModal from '@/components/live/Modal/LivePermissonModal';
import LiveSettingModal from '@/components/live/Modal/LiveSettingModal';
import RecordGuideLineModal from '@/components/live/Modal/RecordGuideLineModal';
import { useLive } from '@/hooks/live/useLive';
import useLiveStore from '@/stores/userLiveStore';
import userStore from '@/stores/userStore';
import addCommaToPrice from '@/utils/addCommaToPrice';
import { Publisher, Session, StreamManager } from 'openvidu-browser';
import { useEffect, useState } from 'react';
import { FaArrowRight, FaRotate } from 'react-icons/fa6';
import { FiSkipForward } from 'react-icons/fi';
import { GoBroadcast } from 'react-icons/go';
import { HiDotsHorizontal, HiOutlineVideoCamera } from 'react-icons/hi';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import { TbCamera, TbCameraOff, TbMicrophone, TbMicrophoneOff } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';

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
  sellerJoinSession,
}: {
  publisher: Publisher | undefined;
  session: Session | null;
  mainStreamManager: StreamManager | undefined;
  leaveSession: () => void;
  handleMainVideoStream: (stream: any) => void;
  switchCamera: () => void;
  state: any;
  currentBid: number;
  sellerJoinSession: () => void;
}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) return;

  const { onCamera, onMike, setOnCamera, setOnMike } = useLiveStore();
  const [isOpenSettingModal, setIsOpenSettingModal] = useState<boolean>(false);
  const [sellerStatus, setSellerStatus] = useState<'beforeLive' | 'onLive' | 'endLive'>('beforeLive');
  const [isShowLivePermissionModal, setIsShowaLivePermissionModal] = useState<boolean>(false);
  const [isShowRecordGuideLineModal, setIsShowRecordGuideLineModal] = useState<boolean>(false);
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const { useStartLiveRecord, useTimeStamp, useEndLiveRecord } = useLive();
  const { mutate: startRecord } = useStartLiveRecord(id);
  const { mutate: pickTimeStamp } = useTimeStamp();
  const { userId } = userStore();
  const { mutate: endRecord } = useEndLiveRecord(id || '');

  // 녹화 타임라인 구간 저장
  const [step, setStep] = useState<number>(0); // 가이드 단계 => 0은 시작 안함

  const stepText: string[] = [
    '',
    '1. 전면을 보여주세요.',
    '2. 후면을 보여주세요.',
    '3. 다각도로 보여주세요.',
    '4. 작동 상태를 보여주세요',
    '5. 다른 물건과의 크기를 비교해주세요.',
    '6. 물건의 세부 사항을 보여주세요.',
  ];

  const startLive = async () => {
    // 방송 예정 시간 전에는 방송 시작 못함
    if (false) {
      return;
    }

    if (window.confirm('라이브 방송을 시작하시겠습니까?')) {
      setSellerStatus('onLive');
      Toast.info('라이브 방송을 시작합니다');
    }
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

    endRecord({ userId: userId, dealId: id });

    Toast.info('라이브 방송이 종료되었습니다.');
    leaveSession();

    setTimeout(() => {
      navigate('/live/end');
    }, 500);
  };

  useEffect(() => {
    setIsShowaLivePermissionModal(true);
  }, []);

  useEffect(() => {
    if (isAllowed) {
      sellerJoinSession();
    }
  }, [isAllowed]);

  useEffect(() => {
    if (sellerStatus === 'onLive') {
      startRecord({ dealId: id, userId: userId });
    }
  }, [sellerStatus]);

  // 녹화 시작 => 빨간 버튼
  const startRecording = () => {
    setIsShowRecordGuideLineModal(false);

    // 여기서 step 1 찍는 api 호출
    pickTimeStamp({ dealId: id, step: 1 });
    setStep(1);
  };

  // 건너뛰기
  const handleSkip = () => {
    pickTimeStamp({ dealId: id, step: step });
    Toast.info(stepText[step + 1]);
    setStep(step + 1);
  };

  // 다음 스텝으로 넘어가기
  const handleNextStep = () => {
    pickTimeStamp({ dealId: id, step: step });
    Toast.info(stepText[step + 1]);
    setStep(step + 1);
  };

  return (
    <div className="relative">
      {/* 라이브 시작 전 */}
      {sellerStatus === 'beforeLive' &&
        mainStreamManager &&
        (onCamera ? (
          <div onClick={() => handleMainVideoStream(publisher)}>
            <FullCameraItem streamManager={mainStreamManager} />
          </div>
        ) : (
          <div className="w-full h-screen object-cover bg-black/90">&nbsp;</div>
        ))}
      {/* 라이브 시작 */}
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
          <div className="absolute top-12 px-2 text-white text-xs">
            <div className="mb-3">
              <span className="text-white font-semibold bg-black/10 px-2 py-1 mr-1 rounded-full">경매 시작가</span>
              {addCommaToPrice(state.startPrice)}원
            </div>
            <div>
              <span className="text-white font-semibold bg-black/10 px-2 py-1 mr-1 rounded-full">현재 최고입찰가</span>{' '}
              {addCommaToPrice(currentBid)}원
            </div>
          </div>
          {/* 나머지 얼굴 보이는 부분*/}
          <div className="absolute top-24 left-4 right-4 bottom-0 z-[10] flex justify-center items-center">
            {/* 라이브 시작 전 */}
            {sellerStatus === 'beforeLive' && (
              <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full flex flex-col justify-center items-center absolute top-0 bottom-24">
                  <span className="text-white/70 text-sm">라이브 예정 시간</span>
                  <span className="text-[20px] text-white pt-1">
                    {state.startTime[0]}월 {state.startTime[1]}일
                  </span>
                  <span className="text-[50px] text-white font-bold">
                    {state.startTime[2]} : {state.startTime[3]}
                  </span>
                  <span className="text-white/60 text-sm pb-5">라이브 방송 예정 전입니다</span>
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
              <>
                {/* 녹화 진행 중 화면*/}
                {step === 0 ? (
                  <div className="w-full absolute top-0 bottom-20">
                    <button
                      onClick={() => setIsShowRecordGuideLineModal(true)}
                      className="flex justify-center items-center text-white bg-red-600 py-2 px-4 mx-auto mt-4 rounded-full hover:bg-red-700"
                    >
                      <HiOutlineVideoCamera size="24" />
                      &nbsp;녹화 시작하기
                    </button>
                  </div>
                ) : (
                  step < 7 && (
                    <div className=" w-full absolute top-0 bottom-20">
                      <div className="flex justify-between text-white pt-6">
                        <div className="font-bold">{stepText[step]}</div>
                        <button
                          className="flex justify-center items-center rounded-lg bg-white/20 px-2 py-1 text-xs hover:bg-white/40"
                          onClick={handleSkip}
                        >
                          <FiSkipForward />
                          &nbsp;건너뛰기
                        </button>
                      </div>
                      <div className="absolute bottom-0 right-0 p-2">
                        <button
                          className="flex justify-center items-center rounded-full  bg-BID_MAIN/80 text-white text-md px-3 py-1.5 hover:bg-BID_HOVER_MAIN"
                          onClick={handleNextStep}
                        >
                          {step === 6 ? '가이드 종료' : '다음'}&nbsp;
                          <FaArrowRight />
                        </button>
                      </div>
                    </div>
                  )
                )}
                <div className="w-full absolute bottom-2 flex justify-between z-20 flex-col">
                  {/* 채팅은 녹화하는 동안 안보여줌 */}
                  {step === 7 && (
                    <div className="w-full h-40vh">
                      <SaleSellerChat />
                    </div>
                  )}
                  <div className="w-full flex">
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
                    <div className="flex-1 flex justify-center pb-2">
                      <button
                        className="bg-red-600 text-white px-4 py-4 rounded-full flex items-center hover:bg-red-700"
                        onClick={handleExit}
                      >
                        <RiCheckboxBlankFill size={20} />
                      </button>
                    </div>

                    <div className="flex w-20 justify-end">
                      <button
                        className="mx-2"
                        onClick={() => {
                          if (!onCamera) {
                            Toast.error('카메라를 켜주세요.');
                            return;
                          }

                          switchCamera();
                        }}
                      >
                        <div className="w-6">
                          <FaRotate size={25} color="white" />
                        </div>
                      </button>
                      <button className="mx-2" onClick={handleMoreSetting}>
                        <HiDotsHorizontal color="white" size={32} style={{ strokeWidth: '0px' }} />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-60 bg-gradient-to-b from-black/0 to-black/35">&nbsp;</div>
      {isOpenSettingModal && <LiveSettingModal onClose={() => setIsOpenSettingModal(false)} />}
      {isShowLivePermissionModal && (
        <LivePermissonModal onClose={() => setIsShowaLivePermissionModal(false)} setIsAllowed={setIsAllowed} />
      )}
      {isShowRecordGuideLineModal && (
        <RecordGuideLineModal onClose={() => setIsShowRecordGuideLineModal(false)} handleStartRecord={startRecording} />
      )}
    </div>
  );
};

export default SaleSeller;
