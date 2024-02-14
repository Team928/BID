import NOTIFY from '@/assets/icon/notify.png';
import SEARCH from '@/assets/icon/search.png';
import Bottom from '@/components/@common/Bottom';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import Spinner from '@/components/@common/Spinner';
import BuyCategoryItem from '@/components/home/buy/BuyCategoryItem';
import { useIntersectionObserver } from '@/hooks/@common/useIntersectionObserver';
import { usePurchase } from '@/hooks/home/usePurchase';
import useKeywordStore from '@/stores/keywordStore';
import { categoryType } from '@/types/model';
import { changeEngToKr } from '@/utils/changeCategorie';
import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useLocation } from 'react-router-dom';

const BuyCategoryPage = () => {
  const { pathname } = useLocation();
  const category = pathname.split('/')[2].toUpperCase() as categoryType;
  // 정렬 관리
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  // keyword 상태 관리
  const { keyword } = useKeywordStore();

  const info: IHeaderInfo = {
    left: <IoIosArrowBack />,
    center: '카테고리',
    right_1: <img src={SEARCH} />,
    right_2: <img src={NOTIFY} />,
  };

  const { useGetListPurchaseInfinite } = usePurchase();

  const {
    data: categoryInfo,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useGetListPurchaseInfinite({
    size: '8',
    order: order,
    ...(category !== 'ALL' && { catg: category }),
    ...(keyword !== '' && { keyword: keyword }),
  });

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  if (isLoading) return <Spinner />;
  return (
    <>
      <div className="w-full h-screen pb-[65px]">
        <Header info={info} />
        <div className="pt-12 px-BID_P ">
          <div className="pt-4">
            <p className="font-bold text-lg">{changeEngToKr(pathname.split('/')[2].toUpperCase())}</p>
            <p className="text-xs text-BID_BLACK">필터링을 통해 원하는 상품을 찾아보세요</p>
          </div>
          <div className="py-3 flex text-center">
            <button
              onClick={() => setOrder('asc')}
              className={`w-12 mr-1.5 border border-BID_BLACK rounded-xl p-1 text-xs ${order === 'asc' && 'bg-BID_BLACK text-white'}`}
            >
              <p>최신순</p>
            </button>
            <button
              onClick={() => setOrder('desc')}
              className={`w-16 border border-BID_BLACK rounded-xl p-1 text-xs ${order === 'desc' && 'bg-BID_BLACK text-white'}`}
            >
              <p>시작 임박</p>
            </button>
          </div>
        </div>
        <div className="px-BID_P flex flex-col h-[calc(100vh-170px)] gap-4 overflow-y-auto pb-20">
          {categoryInfo?.pages.map(
            item =>
              item.data.purchaseSimpleRes &&
              item.data.purchaseSimpleRes.map((value, index) => {
                return <BuyCategoryItem key={index} item={value} />;
              }),
          )}
        </div>

        {/* 페이지 최하단에 작은 div요소 만들어 ref에 setTarget적용 */}
        <div ref={setTarget} className="h-[1rem]" />
      </div>
      <Bottom />
    </>
  );
};

export default BuyCategoryPage;
