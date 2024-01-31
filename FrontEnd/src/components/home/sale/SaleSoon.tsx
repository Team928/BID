import { useSale } from '@/hooks/home/useSale';
import AuctionItem from '../AuctionItem';

const SaleSoon = () => {
  const { useGetSaleList } = useSale();
  const {
    // isLoading,
    // error,
    data: saleSoonInfo,
  } = useGetSaleList({ page: '0', size: '10', order: 'asc', status: 'BEFORE' });

  return (
    <>
      <div className="py-4 border-b border-[#D9D9D9]">
        <div className="px-BID_P">
          <p className="font-bold">진행 예정 경매</p>
          <p className="text-xs text-BID_BLACK">잠시 후 라이브가 시작합니다</p>
        </div>
        <div className="pl-4 py-4 flex flex-nowrap overflow-x-auto">
          {saleSoonInfo?.data.saleSimpleResList.map(item => {
            return <AuctionItem key={item.dealSimpleRes.id} item={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default SaleSoon;
