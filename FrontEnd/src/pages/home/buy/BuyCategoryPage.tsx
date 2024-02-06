import Bottom from '@/components/@common/Bottom';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import BuyCategoryItem from '@/components/home/buy/BuyCategoryItem';
import SEARCH from '@/assets/icon/search.png';
import NOTIFY from '@/assets/icon/notify.png';
import BACK from '@/assets/icon/back.png';
import { usePurchase } from '@/hooks/home/usePurchase';
import useKeywordStore from '@/stores/keywordStore';
import { categoryType } from '@/types/model';
import { changeEngToKr } from '@/utils/changeCategorie';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const BuyCategoryPage = () => {
  const { pathname } = useLocation();
  const category = pathname.split('/')[2].toUpperCase() as categoryType;
  // 정렬 관리
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  // keyword 상태 관리
  const { keyword } = useKeywordStore();

  const info: IHeaderInfo = {
    left: <img src={BACK} />,
    center: '카테고리',
    right_1: <img src={SEARCH} />,
    right_2: <img src={NOTIFY} />,
    prev: '/',
    cur: pathname,
  };

  const { useGetPurchaseList } = usePurchase();
  const {
    // isLoading,
    // error,
    data: categoryInfo,
  } = useGetPurchaseList({
    page: '0',
    size: '10',
    order: order,
    status: 'BEFORE',
    ...(category !== 'ALL' && { catg: category }),
    ...(keyword !== '' && { keyword: keyword }),
  });

  return (
    <>
      <div className="w-full h-screen pb-[4.5rem]">
        <Header info={info} />
        <div className="pt-12 pb-4 px-BID_P ">
          <div className="pt-4 ">
            <p className="font-bold text-lg">{changeEngToKr(pathname.split('/')[2].toUpperCase())}</p>
            <p className="text-xs text-BID_BLACK">적을꺼 없음 뭐적지?</p>
          </div>
          <div className="pt-4 flex font-bold gap-3 text-center">
            <div
              onClick={() => setOrder('asc')}
              className={`w-[4.5rem] border border-BID_BLACK rounded-xl p-1 text-sm ${order === 'asc' && 'bg-BID_BLACK text-white'}`}
            >
              <p>최신순</p>
            </div>
            <div
              onClick={() => setOrder('desc')}
              className={`w-[4.5rem] border border-BID_BLACK rounded-xl p-1 text-sm ${order === 'desc' && 'bg-BID_BLACK text-white'}`}
            >
              <p>시작 임박</p>
            </div>
          </div>
        </div>
        <div className="px-BID_P flex flex-col h-[calc(100vh-170px)] gap-4 overflow-y-auto pb-20">
          {categoryInfo?.data.purchaseSimpleRes.map((item, index) => {
            return <BuyCategoryItem key={index} item={item} />;
          })}
        </div>
      </div>
      <Bottom />
    </>
  );
};

export default BuyCategoryPage;
