import useTabStore from '@/stores/auctionTabStore';
import { ISaleSimpleRes } from '@/types/home';
import addCommaToPrice from '@/utils/addCommaToPrice';
import { getPriceName } from '@/utils/getPriceName';
import { HiHeart } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import StateButton from '../@common/StateButton';

const WishSaleItem = (props: { item: ISaleSimpleRes }) => {
  const navigate = useNavigate();
  const { status, dealSimpleRes, immediatePrice, startPrice, bid } = props.item;
  const { tab } = useTabStore();
  return (
    <div onClick={() => navigate(`/sale/detail/${dealSimpleRes.id}`)} className="px-BID_P py-3 flex gap-4">
      <div className="relative flex justify-center items-center">
        <img
          className="w-24 h-24 rounded-md object-cover"
          src={`${import.meta.env.VITE_BASE_URL}static${dealSimpleRes.image}`}
        ></img>
      </div>
      <div className="flex-1 flex flex-col justify-between py-2">
        <div className="flex items-center justify-between">
          <StateButton deals={tab} status={status} />
          <HiHeart size={'1.6rem'} color="#FF0000" />
        </div>
        <p className="text-sm py-1 truncate whitespace-normal line-clamp-1 font-bold">{dealSimpleRes.title}</p>
        <p className="text-xs truncate whitespace-normal line-clamp-1">{dealSimpleRes.content}</p>
        <div className="flex items-center gap-3">
          <p className="text-sm font-bold text-BID_BLACK">
            {status === 'BEFORE'
              ? addCommaToPrice(immediatePrice)
              : bid === 0
                ? addCommaToPrice(startPrice)
                : addCommaToPrice(bid)}
            원
          </p>
          <p className="text-xs text-BID_BLACK">{getPriceName(status)}</p>
        </div>
      </div>
    </div>
  );
};

export default WishSaleItem;
