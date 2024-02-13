import StateButton from '@/components/@common/StateButton';
import { useProfile } from '@/hooks/profile/useProfile';
import userStore from '@/stores/userStore';
import { useNavigate } from 'react-router-dom';

const BuyHost = () => {
  const navigate = useNavigate();
  const { nickname } = userStore(state => state);

  const { useBuyHost } = useProfile();
  const { data: buyHostInfo } = useBuyHost(nickname);

  const handleClick = (dealId: number) => {
    navigate(`/buy/detail/${dealId}`);
  };

  return (
    <div className="">
      {buyHostInfo?.data.purchaseSimpleRes.map((item, index) => (
        <div
          key={index}
          className="px-BID_P py-3 flex gap-4 border-b border-[#D9D9D9]"
          onClick={() => handleClick(item.dealSimpleRes.id)}
        >
          <div className="w-32 h-32">
            <img
              className="w-full h-full rounded-xl"
              src={`${import.meta.env.VITE_BASE_URL}static${item.dealSimpleRes.image}`}
            ></img>
          </div>
          <div className="flex-1 flex flex-col py-2">
            <div className="flex items-center justify-between">
              <StateButton deals={'purchase'} status={`${item.status}`} />
            </div>
            <div className="py-2">
              <p className="text-lg truncate whitespace-normal line-clamp-2">{item.dealSimpleRes.title}</p>
              <div className="flex items-center gap-3">
                <p className="text-sm text-BID_BLACK">{item.dealSimpleRes.content}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuyHost;
