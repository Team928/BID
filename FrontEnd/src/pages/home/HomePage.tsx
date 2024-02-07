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
import image1 from '@/assets/image/carouselEx/1.png';
import image2 from '@/assets/image/carouselEx/2.png';
import image3 from '@/assets/image/carouselEx/3.png';
import Carousel from '@/components/@common/Carousel';

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

  // 캐러셀 설정
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true, // 자동 캐러셀
    autoplaySpeed: 1000, // 자동 캐러셀 속도
  };

  // 캐러셀 이미지 배열
  const images = [image1, image2, image3];

  return (
    <>
      <div className="w-full h-screen pb-[4.5rem]">
        <Header info={info} />
        <AuctionTabBar />
        <div className="pt-[5.1rem] h-full overflow-y-auto">
          <div className="w-screen overflow-x-hidden">
            <Carousel settings={carouselSettings} images={images} />
          </div>
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
