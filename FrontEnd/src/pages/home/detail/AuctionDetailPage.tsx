import Header, { IHeaderInfo } from '@/components/@common/header';
import DetailBottom from '@/components/home/detail/DetailBottom';
import SaleDetail from '@/components/home/detail/SaleDetail';
import { icons } from '@/constants/icons';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AuctionDetailPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
  }, []);

  const info: IHeaderInfo = {
    left: icons.BACK,
    center: '상세보기',
    right_1: null,
    right_2: null,
    prev: '/',
  };

  return (
    <>
      <div className="w-full h-screen pb-[4.5rem]">
        <Header info={info} />
        <div className="pt-12 h-full overflow-y-auto">
          <SaleDetail />
        </div>
      </div>
      <DetailBottom />
    </>
  );
};

export default AuctionDetailPage;
