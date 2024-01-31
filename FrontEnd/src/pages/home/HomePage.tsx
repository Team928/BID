import Bottom from '@/components/@common/Bottom';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import AuctionTabBar from '@/components/home/AuctionTabBar';
import BuyTab from '@/components/home/BuyTab';
import Category from '@/components/home/Category';
import SaleTab from '@/components/home/SaleTab';
import { icons } from '@/constants/icons';
import useTabStore from '@/stores/auctionTabStore';

const HomePage = () => {
  const { tab } = useTabStore();

  const info: IHeaderInfo = {
    left: null,
    center: null,
    right_1: icons.SEARCH,
    right_2: icons.NOTIFY,
    prev: '/',
  };

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
