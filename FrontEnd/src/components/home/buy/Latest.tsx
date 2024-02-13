import { usePurchase } from '@/hooks/home/usePurchase';
import BuyListItem from './BuyListItem';

const Latest = () => {
  const { useGetPurchaseList } = usePurchase();
  const {
    // isLoading,
    // error,
    data: latestInfo,
  } = useGetPurchaseList({ page: '0', size: '10', order: 'asc', status: 'BEFORE' });

  return (
    <>
      <div className="py-4 border-b border-[#D9D9D9]">
        <div className="px-BID_P">
          <p className="font-bold">최신 구매글을 확인해보세요</p>
          <p className="text-xs text-BID_BLACK">따끈따끈한 최신글</p>
        </div>
        <div className="pl-4 py-4 flex flex-nowrap overflow-x-auto">
          {latestInfo?.data.purchaseSimpleRes.map(item => {
            return <BuyListItem key={item.dealSimpleRes.id} item={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Latest;
