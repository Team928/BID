import NOTIFY from '@/assets/icon/notify.png';
import image1 from '@/assets/image/carouselEx/1.png';
import image2 from '@/assets/image/carouselEx/2.png';
import image3 from '@/assets/image/carouselEx/3.png';
import Bottom from '@/components/@common/Bottom';
import Carousel from '@/components/@common/Carousel';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import AuctionTabBar from '@/components/home/AuctionTabBar';
import BuyTab from '@/components/home/BuyTab';
import Category from '@/components/home/Category';
import SaleTab from '@/components/home/SaleTab';
import useTabStore from '@/stores/auctionTabStore';
import useKeywordStore from '@/stores/keywordStore';
import userStore from '@/stores/userStore';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const { tab } = useTabStore();
  const { init } = useKeywordStore();
  const { loginUser } = userStore();
  const info: IHeaderInfo = {
    left: null,
    center: null,
    right_1: null,
    right_2: <img src={NOTIFY} />,
  };

  useEffect(() => {
    init();
    loginUser({
      accessToken:
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwianRpIjoiQVRLIiwiYXV0aCI6IlVTRVIiLCJleHAiOjE3MDg1Njc0NTJ9.uTeuYI8DiUtbkMOeRDfAe6U61oSeV0d2fqeOZCJl4is',
      area: '구미시 진평동',
      nickname: '승현',
      refreshToken: '',
      userId: 1,
    });
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

  const { userId } = userStore();
  const [message, setMessage] = useState();
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

    // // eventSource 연결 시 할 일
    eventSource.onmessage = async event => {
      console.log(event);
      const res = await event.data;
      setMessage(res);
      console.log(res);
    };

    eventSource.addEventListener('test', async function (event) {
      const data = JSON.parse(event.data);

      setMessage(data);
      console.log(data);
    });
    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    console.log(message);
  }, [message]);

  return (
    <>
      <div className="w-full h-screen pb-[4.5rem]">
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
