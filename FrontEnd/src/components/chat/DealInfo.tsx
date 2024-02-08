import { useState } from 'react';
import ConfirmModal from './Modal/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { confirmedDealReq } from '@/service/chat/api';
import { useChatLog } from '@/hooks/chat/useChat';

const DealInfo = () => {
  
  const { useGetChatLogList }  = useChatLog()

    const {
      data:chatLogInfo,
    } = useGetChatLogList({ dealId: 1 })

    const content = chatLogInfo?.data.dealResWithEndPrice.content;
    const endPrice = chatLogInfo?.data.dealResWithEndPrice.endPrice;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);


  const navigate = useNavigate()

  const handleConfirm = async () => {
    console.log('거래 확정');
    setIsConfirmed(true); // 확정 여부를 true로 변경
    setIsModalOpen(false);
    try {
      // TODO: 실제 데이터로 바꿔야함 임시 roomId = 1
      const response = await confirmedDealReq(1);
      console.log(response); 
    } catch (error) {
      console.error('API 호출 에러:', error);
    }
  };

  const goToReview = () => {
    navigate(`/review`, { state: { dealInfo: chatLogInfo?.data.dealResWithEndPrice } });
  }

  console.log(isConfirmed)

  return (
    <div className="fixed top-0 w-full bg-white border-sm">
      <div className="flex gap-4 pt-14 px-4 pb-2 border items-center">
        <div className="w-20 h-20 bg-BID_LIGHT_GRAY rounded-2xl relative"></div>
        <div className="flex-1 flex flex-col justify-around">
          <p className="text-sm">{content}</p>
          <p className="text-xs text-BID_MAIN">최종 거래가</p>
          <p className="text-lg font-bold">{endPrice}</p>
        </div>
          {isConfirmed ? ( // isConfirmed가 true인 경우 리뷰쓰기 버튼을 보여줌
            <button
              className="text-sm px-3 h-10 text-yellow-500 border border-yellow-500 rounded-xl font-bold"
              onClick={goToReview}
            >
              리뷰쓰기
            </button>
          ) : ( 
            <button
              className="text-sm px-3 h-10 text-BID_MAIN border border-BID_MAIN rounded-xl font-bold"
              onClick={() => setIsModalOpen(true)}
            >
              거래확정
            </button>
          )}
      </div>

      {/* 모달 영역 */}
      {isModalOpen && <ConfirmModal onClose={() => setIsModalOpen(false)} onConfirm={handleConfirm}/>
      }
    </div>
  );
};

export default DealInfo;
