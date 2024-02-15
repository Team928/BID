import Toast from '@/components/@common/Toast';
import SaleBuyerChat from '@/components/chat/LiveChat/SaleBuyerChat';
import FullCameraItem from '@/components/live/FullCameraItem';
import BuyModal from '@/components/live/Modal/BuyModal';
import userStore from '@/stores/userStore';
import addCommaToPrice from '@/utils/addCommaToPrice';
import { Session, Subscriber } from 'openvidu-browser';
import { useEffect, useState } from 'react';
import { BsXLg } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const SaleBuyer = ({
  session,
  subscriber,
  leaveSession,
  handleMainVideoStream,
  state,
  currentBid,
}: {
  session: Session | null;
  subscriber: Subscriber | undefined;
  leaveSession: () => void;
  handleMainVideoStream: (stream: any) => void;
  state: any;
  currentBid: number;
}) => {
  const navigate = useNavigate();
  const { nickname } = userStore();
  const [openVidModal, setOpenVidModal] = useState<boolean>(false);

  const handleBid = () => {
    setOpenVidModal(!openVidModal);
  };

  // 입찰 성공 시 수행하는 콜백 함수
  const successBid = (bidPrice: number) => {
    const sendData = {
      userName: nickname,
      bidPrice: bidPrice,
    };

    session?.signal({
      data: JSON.stringify(sendData),
      type: 'successBid',
    });
  };

  const handleExit = () => {
    //   @TODO: 컴포넌트 만들기
    if (window.confirm('라이브 방송에서 퇴장하시겠습니까?')) {
      leaveSession();
      Toast.success('라이브 방송에서 퇴장했습니다.');

      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  };

  useEffect(() => {
    Toast.success('라이브 방송에 입장했습니다.');
  }, []);

  return (
    <div className="relative">
      {subscriber && (
        <div onClick={() => handleMainVideoStream(subscriber)}>
          <FullCameraItem streamManager={subscriber} />
        </div>
      )}
      {/* 사진 위 화면 */}
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <div className="w-full h-screen relative ">
          <div className="absolute w-full h-36 bg-gradient-to-b from-black/35 to-black/0">&nbsp;</div>
          <div className="absolute w-full flex p-3 items-center">
            <div className="liveRedBtn">LIVE</div>
            <div className="flex-1 font-semibold text-sm pl-2 text-white truncate">{state.title}</div>
            <div onClick={handleExit}>
              <BsXLg color="white" size="30" />
            </div>
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
            {/* 채팅 웹소켓 */}
            <div className="w-full h-40vh">
              <SaleBuyerChat handleBid={handleBid} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-120 bg-gradient-to-b from-black/0 to-black/60">&nbsp;</div>
      {openVidModal && (
        <BuyModal successBid={successBid} currentHighestPrice={currentBid} onClose={() => setOpenVidModal(false)} />
      )}
    </div>
  );
};

export default SaleBuyer;
