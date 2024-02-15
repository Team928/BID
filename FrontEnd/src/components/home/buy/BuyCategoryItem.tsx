import { IPurchaseSimpleRes } from '@/types/home';
import { getDate } from '@/utils/getDate';
import { useNavigate } from 'react-router-dom';

const BuyCategoryItem = (props: { item: IPurchaseSimpleRes }) => {
  const navigate = useNavigate();
  const { id, content, title, startTime, image } = props.item.dealSimpleRes;
  const { month, date, datOfWeek } = getDate(startTime);

  return (
    <div onClick={() => navigate(`/buy/detail/${id}`)} className="flex gap-4 cursor-pointer">
      <div className="w-28 h-28 relative">
        <img src={`${import.meta.env.VITE_BASE_URL}${image}`} className="w-full h-full rounded-lg object-cover" />
      </div>
      <div className="flex-1 flex flex-col justify-around">
        <p className="font-semibold truncate whitespace-normal line-clamp-2">{title}</p>
        <p className="text-xs truncate whitespace-normal line-clamp-2">{content}</p>
        <p className="text-[10px] text-BID_BLACK">
          {month}/{date} ({datOfWeek}) 라이브 예정
        </p>
      </div>
    </div>
  );
};

export default BuyCategoryItem;
