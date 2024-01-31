import Bottom from '@/components/@common/Bottom';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import BuyCategoryItem from '@/components/home/buy/BuyCategoryItem';
import { icons } from '@/constants/icons';
import { changeEngToKr } from '@/utils/changeCategorie';
import { changeOneCapitalize } from '@/utils/changeOneCapitalize';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const BuyCategoryPage = () => {
  const { pathname } = useLocation();
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const info: IHeaderInfo = {
    left: icons.BACK,
    center: null,
    right_1: null,
    right_2: null,
    prev: '/ ',
  };

  useEffect(() => {
    // #TODO order 바뀌면 그에 따른 API 호출하기
  }, [order]);

  return (
    <>
      <div className="w-full h-screen pb-[4.5rem]">
        <Header info={info} />
        <div className="pt-12 pb-4 px-BID_P ">
          <div className="pt-4 ">
            <p className="font-bold text-lg">{changeEngToKr(changeOneCapitalize(pathname.split('/')[2]))}</p>
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
          {categoryList.map((item, index) => {
            return <BuyCategoryItem key={index} item={item} />;
          })}
        </div>
      </div>
      <Bottom />
    </>
  );
};

export default BuyCategoryPage;

export interface ICategoryItem {
  title: string;
  content: string;
  image: string;
  startTime: string;
}

const categoryList: ICategoryItem[] = [
  {
    title: '1년도 안쓴 아이폰 15 프로팝니다. 상태 좋아요',
    content: '여기는 내용입니다. 내용을 적고있어요 내용입니다 내용을적고 있어요 너무길면은 이',
    startTime: '1/13',
    image: '',
  },
  {
    title: '1년도 안쓴 아이폰 15 프로팝니다. 상태 좋아요',
    content: '여기는 내용입니다. 내용을 적고있어요 ',
    startTime: '1/13',
    image: '',
  },
  {
    title: '1년도 안쓴 아이폰 15 프로팝니다. 상태 좋아요',
    content: '여기는 내용입니다. 내용을 적고있어요 내용입니다 내용을적고 있어요 너무길면은 ',
    startTime: '1/13',
    image: '',
  },
  {
    title: '1년도 안쓴 아이폰 15 프로팝니다. 상태 좋아요',
    content: '여기는 내용입니다. 내용을 적고있어요 내용입니다 내용을적고 있어요 너무길면은 이',
    startTime: '1/13',
    image: '',
  },
  {
    title: '1년도 안쓴 아이폰 15 프로팝니다. 상태 좋아요',
    content: '여기는 내용입니다. 내용을 적고있어요 내용입니다 내용을적고 있어요 너무길면은 이',
    startTime: '1/13',
    image: '',
  },
  {
    title: '1년도 안쓴 아이폰 15 프로팝니다. 상태 좋아요',
    content: '여기는 내용입니다. 내용을 적고있어요 내용입니다 내용을적고 있어요 너무길면은 이',
    startTime: '1/13',
    image: '',
  },
  {
    title: '1년도 안쓴 아이폰 15 프로팝니다. 상태 좋아요',
    content: '여기는 내용입니다. 내용을 적고있어요 내용입니다 내용을적고 있어요 너무길면은 이',
    startTime: '1/13',
    image: '',
  },
  {
    title: '1년도 안쓴 아이폰 15 프로팝니다. 상태 좋아요',
    content: '여기는 내용입니다. 내용을 적고있어요 내용입니다 내용을적고 있어요 너무길면은 이',
    startTime: '1/13',
    image: '',
  },
  {
    title: '1년도 안쓴 아이폰 15 프로팝니다. 상태 좋아요',
    content: '여기는 내용입니다. 내용을 적고있어요 내용입니다 내용을적고 있어요 너무길면은 이',
    startTime: '1/13',
    image: '',
  },
  {
    title: '1년도 안쓴 아이폰 15 프로팝니다. 상태 좋아요',
    content: '여기는 내용입니다. 내용을 적고있어요 내용입니다 내용을적고 있어요 너무길면은 이',
    startTime: '1/13',
    image: '',
  },
  {
    title: '1년도 안쓴 아이폰 15 프로팝니다. 상태 좋아요',
    content: '여기는 내용입니다. 내용을 적고있어요 내용입니다 내용을적고 있어요 너무길면은 이',
    startTime: '1/13',
    image: '',
  },
];
