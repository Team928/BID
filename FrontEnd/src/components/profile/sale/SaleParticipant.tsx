import StateButton from '@/components/@common/StateButton';
import { useProfile } from '@/hooks/profile/useProfile';
import addCommaToPrice from '@/utils/addCommaToPrice';
import { getPriceName } from '@/utils/getPriceName';
import { useNavigate } from 'react-router-dom';

const SaleParticipant = () => {
  const navigate = useNavigate();
  const { useSaleParticipant } = useProfile();
  const { data: saleParticipantInfo } = useSaleParticipant();

  const handleClick = (dealId: number) => {
    navigate(`/sale/detail/${dealId}`);
  };

  return (
    <div className="px-BID_P pt-1">
      {saleParticipantInfo?.data.saleSimpleResList.map((item, index) => (
        <div key={index} className="py-2 flex gap-4" onClick={() => handleClick(item.dealSimpleRes.id)}>
          <div className="relative flex justify-center items-center">
            <img
              className="w-24 h-24 rounded-md object-cover"
              src={`${import.meta.env.VITE_BASE_URL}static${item.dealSimpleRes.image}`}
            ></img>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <StateButton deals={'sale'} status={`${item.status}`} />
            </div>
            <p className="text-sm py-1 truncate whitespace-normal line-clamp-1 font-bold">{item.dealSimpleRes.title}</p>
            <p className="text-xs truncate whitespace-normal line-clamp-1">{item.dealSimpleRes.content}</p>
            <div className="flex items-center gap-3">
              <p className="text-sm font-bold text-BID_BLACK">
                {item.status === 'BEFORE'
                  ? addCommaToPrice(item.immediatePrice)
                  : item.bid === 0
                    ? addCommaToPrice(item.startPrice)
                    : addCommaToPrice(item.bid)}
                원
              </p>
              <p className="text-xs text-BID_BLACK">{getPriceName(item.status)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SaleParticipant;
