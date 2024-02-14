import StateButton from '@/components/@common/StateButton';
import { useProfile } from '@/hooks/profile/useProfile';
import { getDate } from '@/utils/getDate';
import { useNavigate, useParams } from 'react-router-dom';

const OtherBuy = () => {
  const navigate = useNavigate();

  const { useUserProfile, useBuyHost } = useProfile();
  const { nickname } = useParams();

  const { data: userProfileInfo } = useUserProfile(nickname!);

  const { data: buyHostInfo } = useBuyHost(`${userProfileInfo?.data.nickname}`);

  const handleClick = (dealId: number) => {
    navigate(`/buy/detail/${dealId}`);
  };

  return (
    <div>
      {buyHostInfo?.data.purchaseSimpleRes.map((item, index) => (
        <div key={index} className="py-3 flex gap-4" onClick={() => handleClick(item.dealSimpleRes.id)}>
          <div className="relative flex justify-center items-center">
            <img
              className="w-24 h-24 rounded-md object-cover"
              src={`${import.meta.env.VITE_BASE_URL}static${item.dealSimpleRes.image}`}
            ></img>
          </div>
          <div className="flex-1 flex flex-col py-2 gap-1">
            <div className="flex items-center justify-between">
              <StateButton deals={'purchase'} status={`${item.status}`} />
            </div>
            <p className="text-sm py-1 truncate whitespace-normal line-clamp-1 font-bold">{item.dealSimpleRes.title}</p>
            <p className="text-xs truncate whitespace-normal line-clamp-1">{item.dealSimpleRes.content}</p>
            <div className="flex items-center gap-3">
              <p className="text-xs text-BID_BLACK">
                {getDate(item.dealSimpleRes.startTime).month}/{getDate(item.dealSimpleRes.startTime).date} (
                {getDate(item.dealSimpleRes.startTime).datOfWeek}) 라이브 예정
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default OtherBuy;
