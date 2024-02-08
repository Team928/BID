import Bottom from '@/components/@common/Bottom';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import AuctionTabBar from '@/components/home/AuctionTabBar';
import NOTIFY from '@/assets/icon/notify.png';
import useTabStore from '@/stores/auctionTabStore';
import { useWish } from '@/hooks/scrap/useWish';
import { useEffect } from 'react';
import WishSaleItem from '@/components/scrap/WishSaleItem';
import WishPurchaseItem from '@/components/scrap/WishPurchaseItem';

const ScrapPage = () => {
  const { tab } = useTabStore();

  const info: IHeaderInfo = {
    left: null,
    center: '위시',
    right_1: null,
    right_2: <img src={NOTIFY} />,
  };

  const { useGetWishSaleList, useGetWishPurchaseList } = useWish();
  const { data: saleList } = useGetWishSaleList(tab);
  const { data: purchaseList } = useGetWishPurchaseList(tab);

  useEffect(() => {
    console.log(saleList);
  }, [saleList]);

  useEffect(() => {
    console.log(purchaseList);
  }, [purchaseList]);

  return (
    <>
      <div className="w-full h-screen pb-[4.5rem]">
        <Header info={info} />
        <AuctionTabBar />
        <div className="pt-[5.1rem] h-full overflow-y-auto">
          {/* 탭에 따른 컴포넌트 보여주기 */}
          {tab === 'sale' ? (
            <>{saleList?.data.saleSimpleResList.map((item, index) => <WishSaleItem key={index} item={item} />)}</>
          ) : (
            <>
              {purchaseList?.data.purchaseSimpleRes.map((item, index) => <WishPurchaseItem key={index} item={item} />)}
            </>
          )}
        </div>
      </div>
      <Bottom />
    </>
  );
};

export default ScrapPage;
