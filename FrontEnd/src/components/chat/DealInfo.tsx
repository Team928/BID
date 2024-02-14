import React, { useState } from 'react';
import ConfirmModal from './Modal/ConfirmModal';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmedDealReq } from '@/service/chat/api';
import { useChatLog } from '@/hooks/chat/useChat';
import useDealStore from '@/stores/useDealStore';

interface DealInfoProps {
  isWroteReview: boolean;
}

const DealInfo: React.FC<DealInfoProps> = ({ isWroteReview }) => {

  const { dealId } = useParams()
  console.log('글정보 아이디' , dealId)
  const id = Number(dealId)
  
  const { useGetChatLogList }  = useChatLog()
  const isConfirmed = useDealStore((state) => state.isConfirmed[String(dealId)] || false);
  const setConfirmed = useDealStore((state) => state.setConfirmed);

  const {
    data:chatLogInfo,
  } = useGetChatLogList({ dealId: id })
  console.log(chatLogInfo)

  const title = chatLogInfo?.data.dealResWithEndPrice.title;
  const content = chatLogInfo?.data.dealResWithEndPrice.content;
  const endPrice = chatLogInfo?.data.dealResWithEndPrice.endPrice;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()

  const handleConfirm = async () => {
    setConfirmed(String(id), true); 
    setIsModalOpen(false);
    try {
      const response = await confirmedDealReq(id);
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
    <div className="fixed top-0 w-full bg-white border-b border-sm">
      <div className="flex gap-4 pt-14 px-4 pb-2 border items-center">
        <div className="w-20 h-20 bg-BID_LIGHT_GRAY rounded-2xl relative">
        </div>
        <div className="flex-1 flex flex-col justify-around">
          <p className="">{title}</p>
          <p className="text-sm">{content}</p>
          <div className='flex items-center'>
          <p className="text-lg font-bold">{endPrice}</p>
          <p className="text-xs px-2 text-BID_MAIN">최종 거래가</p>
          </div>
        </div>


        {isWroteReview === false && (
        <div>
          {isConfirmed ? (
            <button
              className="text-sm px-3 h-10 text-yellow-500 border border-yellow-500 rounded-xl font-bold"
              onClick={goToReview}
            >
              리뷰 작성
            </button>
          ) : (
            <button
              className="text-sm px-3 h-10 text-BID_MAIN border border-BID_MAIN rounded-xl font-bold"
              onClick={() => setIsModalOpen(true)}
            >
              구매 확정
            </button>
          )}
        </div>
      )}
      {/* 작성 완료 상태 */}
      {isWroteReview && isConfirmed && (
        <button
          className="text-sm px-3 h-10 text-BID_MAIN border border-BID_MAIN rounded-xl font-bold"
          disabled={true}
        >
          작성 완료
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
