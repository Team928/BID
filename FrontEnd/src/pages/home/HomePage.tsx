import Bottom from '@/components/@common/Bottom';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import AuctionTabBar from '@/components/home/AuctionTabBar';
import BuyTab from '@/components/home/BuyTab';
import Category from '@/components/home/Category';
import SaleTab from '@/components/home/SaleTab';
import NOTIFY from '@/assets/icon/notify.png';
import useTabStore from '@/stores/auctionTabStore';
import useKeywordStore from '@/stores/keywordStore';
import { useEffect } from 'react';

const HomePage = () => {
  const { tab } = useTabStore();
  const { init } = useKeywordStore();

  const info: IHeaderInfo = {
    left: null,
    center: null,
    right_1: null,
    right_2: <img src={NOTIFY} />,
    prev: '/',
    cur: '/',
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <div className="w-full h-screen pb-[4.5rem]">
        <Header info={info} />
        <AuctionTabBar />
        <div className="pt-[5.1rem] h-full overflow-y-auto">
          {/* #TODO 추후 이미지 찾아서 넣고 위에 글자 넣기 */}
          <div className="w-full h-1/5 bg-gray-300"></div>
          <Category />
          {/* 탭에 따른 컴포넌트 보여주기 */}
          {tab === 'sale' ? <SaleTab></SaleTab> : <BuyTab></BuyTab>}
        </div>
      </div>
      <Bottom />
    </>
  );
};

export default HomePage;
