import { ISaleSimpleRes } from '@/types/home';
import addCommaToPrice from '@/utils/addCommaToPrice';
import { getPriceName } from '@/utils/getPriceName';
import { useNavigate } from 'react-router-dom';

const SaleCategoryItem = (props: { item: ISaleSimpleRes }) => {
  const navigate = useNavigate();
  const { dealSimpleRes, status, bid, immediatePrice, startPrice } = props.item;

  return (
    <div onClick={() => navigate(`/sale/detail/${dealSimpleRes.id}`)} className="flex gap-4">
      <div className="w-32 h-32 bg-BID_LIGHT_GRAY rounded-2xl relative"></div>
      <div className="flex-1 flex flex-col justify-around ">
        <p className="font-bold truncate whitespace-normal line-clamp-2">{dealSimpleRes.title}</p>
        <p className="text-sm truncate whitespace-normal line-clamp-2">{dealSimpleRes.content}</p>
        <div className="flex items-center gap-2">
          <p className="font-bold ">
            {status === 'BEFORE'
              ? addCommaToPrice(immediatePrice)
              : bid === 0
                ? addCommaToPrice(startPrice)
                : addCommaToPrice(bid)}
            원
          </p>
          <p className="text-BID_SUB_GRAY text-xs">{getPriceName(status)}</p>
        </div>
      </div>
    </div>
  );
};

export default SaleCategoryItem;
