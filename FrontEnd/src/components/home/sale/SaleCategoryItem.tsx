import { ISaleSimpleRes } from '@/types/home';
import addCommaToPrice from '@/utils/addCommaToPrice';
import { getPriceName } from '@/utils/getPriceName';
import { useNavigate } from 'react-router-dom';

const SaleCategoryItem = (props: { item: ISaleSimpleRes }) => {
  const navigate = useNavigate();
  const { dealSimpleRes, status, bid, immediatePrice, startPrice } = props.item;

  return (
    <div onClick={() => navigate(`/sale/detail/${dealSimpleRes.id}`)} className="flex gap-4 cursor-pointer">
      <div className="w-28 h-28 relative">
        <img
          src={`${import.meta.env.VITE_BASE_URL}static${dealSimpleRes.image}`}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col justify-around">
        <p className="font-black truncate whitespace-normal line-clamp-2">{dealSimpleRes.title}</p>
        <p className="text-xs truncate whitespace-normal line-clamp-2 text-black/80">{dealSimpleRes.content}</p>
        <div className="flex items-center gap-2">
          <p className="font-bold text-sm">
            {status === 'BEFORE'
              ? addCommaToPrice(immediatePrice)
              : bid === 0
                ? addCommaToPrice(startPrice)
                : addCommaToPrice(bid)}
            원
          </p>
          <p className="text-BID_SUB_GRAY text-[10px]">{getPriceName(status)}</p>
        </div>
      </div>
    </div>
  );
};

export default SaleCategoryItem;
