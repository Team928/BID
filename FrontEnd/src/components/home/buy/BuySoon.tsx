import { usePurchase } from '@/hooks/home/usePurchase';
import BuyListItem from './BuyListItem';

const BuySoon = () => {
  const { useGetPurchaseList } = usePurchase();
  const {
    // isLoading,
    // error,
    data: buySoonInfo,
  } = useGetPurchaseList({ page: '0', size: '10', order: 'desc', status: 'BEFORE' });

  return (
    <>
      <div className="py-4 border-b border-[#D9D9D9]">
        <div className="px-BID_P">
          <p className="font-bold">곧 시작할 라이브를 확인해보세요</p>
          <p className="text-xs text-BID_BLACK">잠시 후 시작할 경매</p>
        </div>
        <div className="pl-4 py-4 flex flex-nowrap overflow-x-auto">
          {buySoonInfo?.data.purchaseSimpleRes.map(item => {
            return <BuyListItem key={item.dealSimpleRes.id} item={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default BuySoon;
