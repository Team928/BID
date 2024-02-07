import Toast from '@/components/@common/Toast';
import FullCameraItem from '@/components/live/FullCameraItem';
import BuyModal from '@/components/live/Modal/BuyModal';
import { Subscriber } from 'openvidu-browser';
import { useEffect, useState } from 'react';
import { BsXLg } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import { RiAuctionFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SaleBuyer = ({
  buyerStatus,
  subscriber,
  leaveSession,
  handleMainVideoStream,
  state,
  currentBid,
}: {
  buyerStatus: string;
  subscriber: Subscriber | undefined;
  leaveSession: () => void;
  handleMainVideoStream: (stream: any) => void;
  state: any;
  currentBid: number;
}) => {
  const navigate = useNavigate();
  const [openVidModal, setOpenVidModal] = useState<boolean>(false);
  const handleBid = () => {
    setOpenVidModal(!openVidModal);
  };

  const handleExit = () => {
    //   @TODO: 컴포넌트 만들기
    if (window.confirm('라이브 방송에서 퇴장하시겠습니까?')) {
      leaveSession();
      Toast.success('라이브 방송에서 퇴장했습니다.');

      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  useEffect(() => {
    if (buyerStatus === 'onLive') {
      Toast.success('라이브 방송에 입장했습니다.');
    }
  }, []);

  useEffect(() => {
    if (buyerStatus === 'endLive') {
      toast.dark('라이브 방송이 종료되었습니다.');
    }
  }, [buyerStatus]);

  const test = {
    title: '테스트',
    startPrice: 30000,
  };

  console.log('steam', subscriber);

  return (
    <div className="relative">
      {subscriber && (
        <div onClick={() => handleMainVideoStream(subscriber)}>
          <FullCameraItem streamManager={subscriber} />
        </div>
      )}
      {/* 사진 위 화면 */}
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <div className="w-full h-full relative">
          <div className="absolute w-full h-36 bg-gradient-to-b from-black/35 to-black/0">&nbsp;</div>
          <div className="absolute w-full flex p-3 items-center">
            <div className="liveRedBtn">LIVE</div>
            <div className="flex-1 font-semibold text-sm pl-2 text-white truncate">{test.title}</div>
            <div onClick={handleExit}>
              <BsXLg color="white" size="30" />
            </div>
          </div>
          <div className="absolute top-12 px-4 text-white text-sm">
            <div>
              <span className="text-black/70 font-semibold">경매 시작가</span> {test.startPrice}원
            </div>
            <div>
              <span className="text-black/70  font-semibold">현재 입찰가</span> {currentBid}원
            </div>
          </div>

          {/* 나머지 얼굴 보이는 부분*/}
          <div className="absolute top-24 left-4 right-4 bottom-0 z-[10] flex justify-center items-center">
            <div className="absolute bottom-0 h-20 left-0 right-0 flex justify-center flex items-center">
              <button
                type="button"
                className="bg-BID_MAIN w-[50px] h-[50px] rounded-full flex justify-center items-center hover:bg-BID_HOVER_MAIN"
                onClick={handleBid}
              >
                <RiAuctionFill color="white" size="25" />
              </button>
              <div className="flex-1 ml-2 h-12 rounded-full border border-[1px] border-BID_SUB_GRAY bg-BID_SUB_GRAY/20 flex">
                <input
                  placeholder="채팅을 입력해주세요"
                  className="w-full h-full px-4 bg-white/0 focus:outline-none text-white"
                />
                <button type="button" className="w-12">
                  <FiSend color="#969696" size="28" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-120 bg-gradient-to-b from-black/0 to-black/60">&nbsp;</div>
      {openVidModal && <BuyModal onClose={() => setOpenVidModal(false)} />}
    </div>
  );
};

export default SaleBuyer;
