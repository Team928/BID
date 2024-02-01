import { useSale } from '@/hooks/home/useSale';
import SaleListItem from './SaleListItem';

const DeadLine = () => {
  const { useGetSaleList } = useSale();
  const {
    // isLoading,
    // error,
    data: deadLineInfo,
  } = useGetSaleList({ page: '0', size: '10', order: 'asc', status: 'AUCTION' });

  return (
    <>
      <div className="py-4 border-b border-[#D9D9D9]">
        <div className="px-BID_P">
          <p className="font-bold">마감 임박</p>
          <p className="text-xs text-BID_BLACK">곧 경매가 종료됩니다</p>
        </div>
        <div className="pl-4 py-4 flex flex-nowrap overflow-x-auto">
          {deadLineInfo?.data.saleSimpleResList.map(item => {
            return <SaleListItem key={item.dealSimpleRes.id} item={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default DeadLine;
