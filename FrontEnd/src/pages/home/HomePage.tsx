import NOTIFY from '@/assets/icon/notify.png';
import image1 from '@/assets/image/carouselEx/1.png';
import image2 from '@/assets/image/carouselEx/2.png';
import image3 from '@/assets/image/carouselEx/3.png';
import Bottom from '@/components/@common/Bottom';
import Carousel from '@/components/@common/Carousel';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import Toast from '@/components/@common/Toast';
import AuctionTabBar from '@/components/home/AuctionTabBar';
import BuyTab from '@/components/home/BuyTab';
import Category from '@/components/home/Category';
import SaleTab from '@/components/home/SaleTab';
import useTabStore from '@/stores/auctionTabStore';
import useKeywordStore from '@/stores/keywordStore';
import useNotifyStore from '@/stores/useNotifyStore';
import userStore from '@/stores/userStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { isLogin } = userStore();
  const { tab } = useTabStore();
  const { init } = useKeywordStore();
  const navigate = useNavigate();

  const info: IHeaderInfo = {
    left: null,
    center: null,
    right_1: null,
    right_2: <img src={NOTIFY} />,
  };

  useEffect(() => {
    init();
    console.log(isLogin);
    if (!isLogin) {
      navigate('/login');
    }
  }, []);

  // 캐러셀 설정
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true, // 자동 캐러셀
    autoplaySpeed: 3000, // 자동 캐러셀 속도
  };

  // 캐러셀 이미지 배열
  const images = [image1, image2, image3];

  const { addNotification } = useNotifyStore();
  const { userId } = userStore();
  useEffect(() => {
    // eventSource 객체 생성
    const eventSource = new EventSource(import.meta.env.VITE_SSE_URL + userId);

    // eventSource Connection 됐을때
    eventSource.onopen = () => {
      console.log('연결완');
    };

    // eventSource 에러 시 할 일
    eventSource.onerror = async event => {
      console.log(event);
      eventSource.close();
    };

    eventSource.addEventListener('auction', async function (event) {
      const data = JSON.parse(event.data);
      addNotification(data);
      Toast.success('알림이 왔습니다 확인해보세요');
      console.log(data);
    });
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <div className="w-full h-screen pb-[65px]">
        <Header info={info} />
        <AuctionTabBar />
        <div className="pt-[5.1rem] h-full overflow-y-auto overflow-x-hidden">
          <div className="w-full overflow-x-hidden">
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
