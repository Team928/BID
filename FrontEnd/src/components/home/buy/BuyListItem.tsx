import sample from '@/assets/image/sample.png';
import { IPurchaseSimpleRes } from '@/types/home';
import { changeEngToKr } from '@/utils/changeCategorie';
import { getDate } from '@/utils/getDate';
import { useNavigate } from 'react-router-dom';

const BuyListItem = (props: { item: IPurchaseSimpleRes }) => {
  const navigate = useNavigate();

  const { id, category, title, startTime } = props.item.dealSimpleRes;

  const { month, date, datOfWeek, time } = getDate(startTime);

  return (
    <div onClick={() => navigate(`/buy/detail/${id}`)} className="text-xs ">
      <div className="w-32 h-32 bg-BID_LIGHT_GRAY rounded-2xl relative">
        <div className="w-full h-full absolute bg-black/10 rounded-2xl"></div>
        <img src={sample} className="w-full h-full rounded-2xl object-cover" />
        <div className="absolute top-9 left-8">
          <p className="text-white font-bold text-lg ">
            {month}/{date} ({datOfWeek})
          </p>
          <p className="text-white font-bold text-2xl">{time}</p>
        </div>
      </div>
      <div className="px-1 flex flex-col gap-1">
        <p className=" text-[0.6rem] text-BID_SUB_GRAY">{changeEngToKr(category)}</p>
        <p className=" w-32 truncate whitespace-normal line-clamp-2">{title}</p>
      </div>
    </div>
  );
};

export default BuyListItem;
