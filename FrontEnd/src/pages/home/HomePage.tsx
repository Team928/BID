import Header, { IHeaderInfo } from '@/components/@common/header';
import AuctionTabBar from '@/components/home/AuctionTabBar';
import Category from '@/components/home/Category';
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
    <div className="w-full h-screen">
      <Header info={info} />
      <div className="pt-12 h-full">
        <AuctionTabBar />
        {/* #TODO 추후 이미지 찾아서 넣고 위에 글자 넣기 */}
        <div className="w-full h-1/5 bg-gray-300"></div>
        <Category />
        {/* 탭에 따른 컴포넌트 보여주기 */}
        {tab === 'buy' ? <></> : <></>}
      </div>
    </div>
  );
};

export default HomePage;
