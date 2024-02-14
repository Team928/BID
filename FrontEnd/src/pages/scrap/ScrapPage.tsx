import heart from '@/assets/icon/heart.png';
import NOTIFY from '@/assets/icon/notify.png';
import Bottom from '@/components/@common/Bottom';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import AuctionTabBar from '@/components/home/AuctionTabBar';
import WishPurchaseItem from '@/components/scrap/WishPurchaseItem';
import WishSaleItem from '@/components/scrap/WishSaleItem';
import { useWish } from '@/hooks/scrap/useWish';
import useTabStore from '@/stores/auctionTabStore';
import { useEffect } from 'react';

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
            <div className="pt-2">
              {saleList?.data.saleSimpleResList.length === 0 ? (
                <div className="w-full h-[calc(100vh-160px)] flex flex-col justify-center items-center text-sm">
                  <img src={heart} width={60} />
                  <div className="pt-5">위시에 담긴 거래가 없어요</div>
                  <div>지금 바로 좋아요를 눌러 위시를 담아보세요</div>
                </div>
              ) : (
                saleList?.data.saleSimpleResList.map((item, index) => <WishSaleItem key={index} item={item} />)
              )}
            </div>
          ) : (
            <div className="pt-2">
              {purchaseList?.data.purchaseSimpleRes.length === 0 ? (
                <div className="w-full h-[calc(100vh-160px)] flex flex-col justify-center items-center">
                  <img src={heart} width={60} />
                  <div className="pt-5">위시에 담긴 거래가 없어요</div>
                  <div>지금 바로 좋아요를 눌러 위시를 담아보세요</div>
                </div>
              ) : (
                purchaseList?.data.purchaseSimpleRes.map((item, index) => <WishPurchaseItem key={index} item={item} />)
              )}
            </div>
          )}
        </div>
      </div>
      <Bottom />
    </>
  );
};

export default ScrapPage;
