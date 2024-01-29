import { ICategoryItem } from '@/pages/home/buy/BuyCategoryPage';
// import { useNavigate } from 'react-router-dom';

const SaleCategoryItem = (props: { item: ICategoryItem }) => {
  // const navigate = useNavigate();
  const { title, content, startTime } = props.item;

  return (
    // #TODO 추후 dto보고 클릭이벤트 걸어주기
    // onClick={() => navigate(`/deals/${sale.id}`)}
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

export default SaleCategoryItem;
