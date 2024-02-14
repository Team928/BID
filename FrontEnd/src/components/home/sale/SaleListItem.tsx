import { ISaleSimpleRes } from '@/types/home';
import addCommaToPrice from '@/utils/addCommaToPrice';
import { changeEngToKr } from '@/utils/changeCategorie';
import { getDate } from '@/utils/getDate';
import { getPriceName } from '@/utils/getPriceName';
import { useNavigate } from 'react-router-dom';

const SaleListItem = (props: { item: ISaleSimpleRes }) => {
  const navigate = useNavigate();
  const sale = props.item.dealSimpleRes;
  const item = props.item;

  const { month, date, datOfWeek, time } = getDate(sale.startTime);

  return (
    <div onClick={() => navigate(`/sale/detail/${sale.id}`)} className="text-xs cursor-pointer ">
      <div className="w-28 h-28 relative">
        <img
          src={`${import.meta.env.VITE_BASE_URL}static${sale.image}`}
          className="w-full h-full rounded-lg object-cover"
        />
        {/* 경매 진행전이라면 라이브 일정 보여주기 */}
        {item.status === 'BEFORE' && (
          <>
            <div className="absolute flex flex-col justify-center items-center rounded-md top-0 left-0 right-0 bottom-0 text-center bg-black/15">
              <p className="text-white font-bold text-md whitespace-nowrap">
                {month}/{date} ({datOfWeek})
              </p>
              <p className="text-white font-bold text-xl">{time}</p>
            </div>
          </>
        )}
      </div>
      <div className="px-1 flex flex-col gap-1">
        <p className="text-[0.6rem] text-BID_SUB_GRAY pt-1">{changeEngToKr(sale.category)}</p>
        <p className="w-28 truncate whitespace-normal line-clamp-2">{sale.title}</p>
        <div className="">
          <p className="font-bold text-sm">
            {item.status === 'BEFORE'
              ? addCommaToPrice(item.immediatePrice)
              : item.bid === 0
                ? addCommaToPrice(item.startPrice)
                : addCommaToPrice(item.bid)}
            원
          </p>
          <p className="text-BID_SUB_GRAY">{getPriceName(item.status)}</p>
        </div>
      </div>
    </div>
  );
};

export default SaleListItem;
