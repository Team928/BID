import Header, { IHeaderInfo } from '@/components/@common/Header';
import DetailBottom from '@/components/home/detail/DetailBottom';
import SaleDetail from '@/components/home/detail/SaleDetail';
import { useSale } from '@/hooks/home/useSale';
import userStore from '@/stores/userStore';
import { IoIosArrowBack } from 'react-icons/io';
import { useParams } from 'react-router-dom';

const SaleDetailPage = () => {
  const { id } = useParams();
  const { nickname } = userStore();
  const { useGetSaleDetail } = useSale();
  const {
    isLoading,
    // error,
    data: saleDetailInfo,
  } = useGetSaleDetail(Number(id));
  const isSeller = saleDetailInfo?.data.dealRes.writer === nickname ? true : false;

  const info: IHeaderInfo = {
    left: <IoIosArrowBack />,
    center: '상세보기',
    right_1: null,
    right_2: null,
    prev: '/',
  };

  if (saleDetailInfo)
    return (
      <>
        <div className="w-full h-screen pb-[4.5rem]">
          <Header info={info} />
          <div className="pt-12 h-full overflow-y-auto">
            <SaleDetail isSeller={isSeller} info={saleDetailInfo.data} />
          </div>
        </div>
        <DetailBottom isSeller={isSeller} info={saleDetailInfo.data} />
      </>
    );
};

export default SaleDetailPage;
