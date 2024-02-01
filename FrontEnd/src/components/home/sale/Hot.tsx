import { ISaleSimpleRes } from '@/types/home';
import AuctionItem from '../AuctionItem';
import { useSale } from '@/hooks/home/useSale';

const Hot = () => {
  const { useGetSaleList } = useSale();
  const {
    // isLoading,
    // error,
    data: hotInfo,
  } = useGetSaleList({ page: '0', size: '10', order: 'hot', status: 'AUCTION' });

  // 입찰이 없으면 뜨지 않음
  return (
    <>
      <div className="py-4 border-b border-[#D9D9D9]">
        <div className="px-BID_P">
          <p className="font-bold">실시간 핫 경매</p>
          <p className="text-xs text-BID_BLACK">입찰자 및 입찰금액 급상승</p>
        </div>
        <div className="pl-4 py-4 flex flex-nowrap overflow-x-auto">
          {hotInfo?.data.saleSimpleResList.map(item => {
            return <AuctionItem key={item.dealSimpleRes.id} item={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Hot;
