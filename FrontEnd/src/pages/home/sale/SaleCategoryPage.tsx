import Bottom from '@/components/@common/Bottom';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import BuyCategoryItem from '@/components/home/buy/BuyCategoryItem';
import { icons } from '@/constants/icons';
import { changeEngToKr } from '@/utils/changeCategorie';
import { changeOneCapitalize } from '@/utils/changeOneCapitalize';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SelectModal from '@/components/home/SelectModal';
import { dealStatusType } from '@/types/model';
import { MdKeyboardArrowDown } from 'react-icons/md';

const SaleCategoryPage = () => {
  const { pathname } = useLocation();
  // 현재 경매 상태를 관리 ( 전체, 경매 시작전, 경매 진행중 )
  const [state, setState] = useState<dealStatusType | 'ALL'>('ALL');
  // 모달의 상태를 관리
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // 경매 시작전과 경매 진행중의 하위 정렬을 관리
  const [order, setOrder] = useState<string>('');
  // 임시 상태를 관리
  const [tempState, setTempState] = useState<'경매 시작전' | '경매 진행중' | ''>('');

  const info: IHeaderInfo = {
    left: icons.BACK,
    center: '카테고리',
    right_1: null,
    right_2: null,
    prev: '/ ',
  };

  useEffect(() => {
    // #TODO order 바뀌면 그에 따른 API 호출하기
  }, [state]);

  useEffect(() => {}, [state]);

  return (
    <>
      {isOpen && (
        <SelectModal
          order={order}
          state={state}
          setState={setState}
          setIsOpen={setIsOpen}
          setOrder={setOrder}
          sort={tempState === '경매 시작전' ? sort[0] : sort[1]}
        ></SelectModal>
      )}

      <div className="w-screen h-screen pb-[4.5rem]">
        <Header info={info} />

        <div className="w-full pt-12 pb-4  ">
          <div className="pt-4 px-BID_P">
            <p className="font-bold text-lg">{changeEngToKr(changeOneCapitalize(pathname.split('/')[2]))}</p>
            <p className="text-xs text-BID_BLACK">적을꺼 없음 뭐적지?</p>
          </div>
          <div className="pl-4 pt-4 flex font-bold gap-3 text-center  overflow-x-scroll  whitespace-nowrap">
            <div
              onClick={() => {
                setOrder('');
                setState('ALL');
              }}
              className={` border border-BID_BLACK rounded-xl p-1 px-2 text-sm ${state === 'ALL' && 'bg-BID_BLACK text-white'}`}
            >
              <p>전체</p>
            </div>
            <div
              onClick={() => {
                setOrder('');
                setState('LIVE');
              }}
              className={` border border-BID_BLACK rounded-xl p-1 px-2 text-sm ${state === 'LIVE' && 'bg-BID_BLACK text-white'}`}
            >
              <p>라이브 진행중</p>
            </div>
            <div
              onClick={() => {
                setTempState('경매 시작전');
                setIsOpen(true);
              }}
              className={`flex justify-center items-center gap-1 border border-BID_BLACK rounded-xl p-1 px-2 text-sm ${state === 'BEFORE' && 'bg-BID_BLACK text-white'}`}
            >
              <p>{state === 'BEFORE' ? order : '경매 시작전'}</p>
              <MdKeyboardArrowDown />
            </div>
            <div
              onClick={() => {
                setTempState('경매 진행중');
                setIsOpen(true);
              }}
              className={`flex justify-center items-center gap-1 border border-BID_BLACK rounded-xl p-1 px-2 text-sm ${state === 'AUCTION' && 'bg-BID_BLACK text-white'}`}
            >
              <p>{state === 'AUCTION' ? order : '경매 진행중'}</p>
              <MdKeyboardArrowDown />
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

export default SaleCategoryPage;

const sort = [
  {
    state: '경매 시작전',
    lower: ['최신순', '경매 시작 임박'],
  },
  {
    state: '경매 진행중',
    lower: ['최신순', '경매 마감 임박'],
  },
];

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
