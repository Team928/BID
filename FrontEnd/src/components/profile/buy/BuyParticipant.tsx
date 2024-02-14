import StateButton from '@/components/@common/StateButton';
import { useProfile } from '@/hooks/profile/useProfile';
import { getDate } from '@/utils/getDate';
import { useNavigate } from 'react-router-dom';

const BuyParticipant = () => {
  const navigate = useNavigate();
  const { useBuyParticipant } = useProfile();
  const { data: buyParticipantInfo } = useBuyParticipant();

  const handleClick = (dealId: number) => {
    navigate(`/buy/detail/${dealId}`);
  };

  return (
    // TODO : 실제 데이터로 수정해야함
    <div className="px-BID_P pt-1">
      {buyParticipantInfo?.data.purchaseSimpleRes.length === 0 ? (
        <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">참여한 역경매가 없어요</div>
      ) : (
        buyParticipantInfo?.data.purchaseSimpleRes.map((item, index) => (
          <div key={index} className="py-2 flex gap-4" onClick={() => handleClick(item.dealSimpleRes.id)}>
            <div className="relative flex justify-center items-center">
              <img
                className="w-24 h-24 rounded-md object-cover"
                src={`${import.meta.env.VITE_BASE_URL}static${item.dealSimpleRes.image}`}
              ></img>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between">
                <StateButton deals={'purchase'} status={`${item.status}`} />
              </div>
              <p className="font-bold text-sm truncate whitespace-normal line-clamp-1">{item.dealSimpleRes.title}</p>
              <p className="text-xs truncate whitespace-normal line-clamp-1">{item.dealSimpleRes.content}</p>
              <div className="flex items-center gap-3">
                <p className="text-xs text-BID_BLACK">
                  {getDate(item.dealSimpleRes.startTime).month}/{getDate(item.dealSimpleRes.startTime).date} (
                  {getDate(item.dealSimpleRes.startTime).datOfWeek}) 라이브 예정
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BuyParticipant;
