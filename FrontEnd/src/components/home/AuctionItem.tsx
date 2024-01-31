import { ISaleSimpleRes } from '@/types/home';
import addCommaToPrice from '@/utils/addCommaToPrice';
import { changeEngToKr } from '@/utils/changeCategorie';
import { getDate } from '@/utils/getDate';
import { getPriceName } from '@/utils/getPriceName';
import { useNavigate } from 'react-router-dom';

const AuctionItem = (props: { item: ISaleSimpleRes }) => {
  const navigate = useNavigate();
  const sale = props.item.dealSimpleRes;
  const item = props.item;

  const { month, date, datOfWeek, time } = getDate(sale.startTime);

  return (
    <div onClick={() => navigate(`/deals/${sale.id}`)} className="text-xs">
      <div className="w-32 h-32 bg-BID_LIGHT_GRAY rounded-2xl relative">
        <img src="/src/assets/image/sample.png" className="w-full h-full rounded-2xl object-cover" />
        {/* 경매 진행전이라면 라이브 일정 보여주기 */}
        {item.status === 'BEFORE' && (
          <>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-white font-bold text-lg whitespace-nowrap">
                {month}/{date} ({datOfWeek})
              </p>
              <p className="text-white font-bold text-2xl">{time}</p>
            </div>
          </>
        )}
      </div>
      <div className="px-1 flex flex-col gap-1">
        <p className="text-[0.6rem] text-BID_SUB_GRAY">{changeEngToKr(sale.category)}</p>
        <p className="w-32 truncate whitespace-normal line-clamp-2">{sale.title}</p>
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

export default AuctionItem;
