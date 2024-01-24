import addCommaToPrice from '@/utils/addCommaToPrice';
import { changeEngToKr } from '@/utils/changeCategorie';
import { getPriceName } from '@/utils/getPriceName';

export interface ISaleSimpleRes {
  salePostSimpleRes: {
    id: number;
    title: string;
    categories: string;
    createTime: string;
    image: string;
  };
  immediate_price: number | null;
  startTime: string | null;
  startPrice: number | null;
  endTime: string | null;
  bid: number | null;
  status: statusType;
}

export type statusType = 'BEFORE' | 'AUCTION' | 'LIVE' | 'END';

const AuctionItem = (props: { item: ISaleSimpleRes }) => {
  const sale = props.item.salePostSimpleRes;
  const item = props.item;

  return (
    <div className="text-xs ">
      <div className="w-32 h-32 bg-BID_LIGHT_GRAY rounded-2xl relative">
        {item.status === 'BEFORE' && (
          <>
            <div className="w-full h-full absolute bg-black/10 rounded-2xl"></div>
            <img src="/src/assets/image/sample.png" className="w-full h-full rounded-2xl object-cover" />
            <div className="absolute top-9 left-8">
              <p className="text-white font-bold text-lg ">1/5 (금)</p>
              <p className="text-white font-bold text-2xl">10:00</p>
            </div>
          </>
        )}
      </div>
      <div className="px-1 flex flex-col gap-1">
        <p className=" text-[0.6rem] text-BID_SUB_GRAY">{changeEngToKr(sale.categories)}</p>
        <p className=" w-32 truncate whitespace-normal line-clamp-2">{sale.title}</p>
        <div className="">
          <p className="font-bold text-sm">
            {item.status === 'BEFORE' ? addCommaToPrice(item.immediate_price) : addCommaToPrice(item.bid)}원
          </p>
          <p className="text-BID_SUB_GRAY">{getPriceName(item.status)}</p>
        </div>
      </div>
    </div>
  );
};

export default AuctionItem;
