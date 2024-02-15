import { IPurchaseSimpleRes } from '@/types/home';
import { getDate } from '@/utils/getDate';
import { HiHeart } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const WishPurchaseItem = (props: { item: IPurchaseSimpleRes }) => {
  const navigate = useNavigate();
  const { startTime, content, title, id, image } = props.item.dealSimpleRes;
  const { month, date, datOfWeek } = getDate(startTime);

  return (
    <div onClick={() => navigate(`/buy/detail/${id}`)} className="px-BID_P py-1 flex gap-4">
      <div className="relative flex justify-center items-center">
        <img className="w-24 h-24 rounded-md object-cover" src={`${import.meta.env.VITE_BASE_URL}${image}`}></img>
        <HiHeart size={'1.6rem'} color="#FF0000" className="absolute bottom-1 right-1" />
      </div>
      <div className="flex-1 flex flex-col justify-between py-1">
        <p className="font-bold text-md truncate whitespace-normal line-clamp-1">{title}</p>
        <p className="text-sm truncate whitespace-normal line-clamp-2">{content}</p>
        <div className="flex items-center gap-3">
          <p className="text-xs text-BID_BLACK">
            {month}/{date} ({datOfWeek}) 라이브 예정
          </p>
        </div>
      </div>
    </div>
  );
};

export default WishPurchaseItem;
