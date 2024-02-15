import { useState } from 'react';
import ConfirmModal from './Modal/ConfirmModal';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmedDealReq } from '@/service/chat/api';
import { useChatLog, useChatRoom } from '@/hooks/chat/useChat';
import useDealStore from '@/stores/useDealStore';
import useReviewStore from '@/stores/useReviewStore';
import userStore from '@/stores/userStore';
import addCommaToPrice from '@/utils/addCommaToPrice';

const DealInfo = () => {
  const { dealId } = useParams();
  const id = Number(dealId);

  const { userId } = userStore();

  const { useGetChatLogList } = useChatLog();
  const { useGetChatRoomList } = useChatRoom();
  const isConfirmed = useDealStore(state => state.isConfirmed[String(dealId)] || false);
  const setConfirmed = useDealStore(state => state.setConfirmed);

  // 채팅로그 조회
  const { data: chatLogInfo } = useGetChatLogList({ dealId: id });
  // 채팅목록 조회
  const { data: chatRoomInfo } = useGetChatRoomList({ userId: userId });

  const title = chatLogInfo?.data.dealResWithEndPrice.title;
  const content = chatLogInfo?.data.dealResWithEndPrice.content;
  const endPrice = chatLogInfo?.data.dealResWithEndPrice.endPrice;
  const src = chatLogInfo?.data.dealResWithEndPrice.images[0];

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
    navigate(`/review`, { state: { dealInfo: chatLogInfo?.data.dealResWithEndPrice, userInfo: chatRoomInfo?.data } });
  };

  // reviewPosted 상태 확인
  const reviewPosted = useReviewStore(state => state.reviewPosted[String(dealId)] || false);

  console.log('구매확정 여부 : ', isConfirmed);
  console.log('리뷰작성 여부ㅜ: ', reviewPosted);

  console.log(chatRoomInfo);

  return (
    <>
      <div className="top-0 bg-whiteborder-sm items-center">
        <div className="flex gap-4 pt-14 px-4 pb-2 border items-center">
          <div className="w-20 h-20 relative">
            <img src={`${import.meta.env.VITE_BASE_URL}${src}`} className="w-full h-full rounded-lg object-cover" />
          </div>
          <div className="flex-1 flex flex-col justify-around">
            <p className="font-black truncate whitespace-normal line-clamp-2">{title}</p>
            <p className="text-xs truncate whitespace-normal line-clamp-2 text-black/80">{content}</p>
            <div className="flex items-center gap-2">
              <p className="font-bold text-sm">{addCommaToPrice(endPrice!)}원</p>
              <p className="text-BID_SUB_GRAY text-[10px]">최종 거래가</p>
            </div>
          </div>
          <div>
            {isConfirmed ? (
              <button
                className={`text-sm px-3 h-10 ${
                  reviewPosted ? 'text-gray-500 border border-gray-500' : 'text-yellow-500 border border-yellow-500'
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
        {isModalOpen && <ConfirmModal onClose={() => setIsModalOpen(false)} onConfirm={handleConfirm} />}
      </div>
    </>
  );
};

export default DealInfo;
