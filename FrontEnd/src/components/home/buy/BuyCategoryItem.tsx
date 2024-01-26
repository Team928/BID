import { ICategoryItem } from '@/pages/home/buy/BuyCategoryPage';

const BuyCategoryItem = (props: { item: ICategoryItem }) => {
  const { title, content, startTime } = props.item;

  return (
    <div className="flex gap-4">
      <div className="w-32 h-32 bg-BID_LIGHT_GRAY rounded-2xl relative"></div>
      <div className="flex-1 flex flex-col justify-around ">
        <p className="font-bold truncate whitespace-normal line-clamp-2">{title}</p>
        <p className="text-sm truncate whitespace-normal line-clamp-2">{content}</p>
        <p className="text-xs text-BID_BLACK">{startTime} 라이브 예정</p>
      </div>
    </div>
  );
};

export default BuyCategoryItem;
