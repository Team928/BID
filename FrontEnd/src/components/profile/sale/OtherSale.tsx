import StateButton from '@/components/@common/StateButton';
import { useProfile } from '@/hooks/profile/useProfile';
import addCommaToPrice from '@/utils/addCommaToPrice';
import { getPriceName } from '@/utils/getPriceName';
import { useNavigate, useParams } from 'react-router-dom';

const OtherSale = () => {
  const navigate = useNavigate();
  const { useSaleHost, useUserProfile } = useProfile();
  const { nickname } = useParams();

  const { data: userProfileInfo } = useUserProfile(nickname!);

  const { data: saleHostInfo } = useSaleHost(`${userProfileInfo?.data.nickname}`);

  const handleClick = (dealId: number) => {
    navigate(`/sale/detail/${dealId}`);
  };

  return (
    <div>
      <div className="pt-1">
        {saleHostInfo?.data.saleSimpleResList.length === 0 ? (
          <div className="w-full h-[calc(100vh-240px)] flex justify-center items-center">
            <div className="pt-2">주최한 경매가 없어요</div>
          </div>
        ) : (
          saleHostInfo?.data.saleSimpleResList.map((item, index) => (
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
                <p className="text-sm py-1 truncate whitespace-normal line-clamp-1 font-bold">
                  {item.dealSimpleRes.title}
                </p>
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
          ))
        )}
      </div>
    </div>
  );
};
export default OtherSale;
