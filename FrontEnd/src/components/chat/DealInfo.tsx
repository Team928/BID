import { useState } from 'react';
import ConfirmModal from './Modal/ConfirmModal';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmedDealReq } from '@/service/chat/api';
import { useChatLog, useChatRoom } from '@/hooks/chat/useChat';
import useDealStore from '@/stores/useDealStore';
import useReviewStore from '@/stores/useReviewStore';
import userStore from '@/stores/userStore';

const DealInfo = () => {
  const { dealId } = useParams();
  const id = Number(dealId);

  const {userId} = userStore()

  const { useGetChatLogList } = useChatLog();
  const { useGetChatRoomList } = useChatRoom()
  const isConfirmed = useDealStore((state) => state.isConfirmed[String(dealId)] || false);
  const setConfirmed = useDealStore((state) => state.setConfirmed);

  // 채팅로그 조회
  const { data: chatLogInfo } = useGetChatLogList({ dealId: id });
  // 채팅목록 조회
  const {data: chatRoomInfo } = useGetChatRoomList({userId: userId})

  const title = chatLogInfo?.data.dealResWithEndPrice.title;
  const content = chatLogInfo?.data.dealResWithEndPrice.content;
  const endPrice = chatLogInfo?.data.dealResWithEndPrice.endPrice;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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
    navigate(`/review`, { state: { dealInfo: chatLogInfo?.data.dealResWithEndPrice, userInfo: chatRoomInfo} });
    
  };

  // reviewPosted 상태 확인
  const reviewPosted = useReviewStore((state) => state.reviewPosted[String(dealId)] || false);

  console.log('구매확정 여부 : ', isConfirmed)
  console.log('리뷰작성 여부ㅜ: ', reviewPosted)


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
        <div>

        {isConfirmed ? (
          <button
            className={`text-sm px-3 h-10 ${
              reviewPosted
                ? 'text-gray-500 border border-gray-500'
                : 'text-yellow-500 border border-yellow-500'
            } rounded-xl font-bold`}
            onClick={reviewPosted ? undefined : goToReview}
            disabled={reviewPosted}
          >
            {reviewPosted ? '리뷰 작성 완료' : '리뷰 작성'}
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
      </div>

      {/* 모달 영역 */}
      {isModalOpen && <ConfirmModal onClose={() => setIsModalOpen(false)} onConfirm={handleConfirm}/>
      }
    </div>
  );
};

export default DealInfo;
