import Bottom from '@/components/@common/Bottom';
import Header, { IHeaderInfo } from '@/components/@common/header';
import BuyCategoryItem from '@/components/home/buy/BuyCategoryItem';
import { icons } from '@/constants/icons';
import { changeEngToKr } from '@/utils/changeCategorie';
import { changeOneCapitalize } from '@/utils/changeOneCapitalize';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import SelectModal from '@/components/home/SelectModal';

const SaleCategoryPage = () => {
  const { pathname } = useLocation();
  // 현재 경매 상태를 관리 ( 전체, 경매 시작전, 경매 진행중 )
  const [state, setState] = useState<'a' | 'f' | 't'>('a');
  // 모달의 상태를 관리
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // 현재 선택된 셀렉트 박스 하위 상태를 관리
  const [lowerState, setLowerState] = useState<string>('최신순');

  const info: IHeaderInfo = {
    left: icons.BACK,
    center: null,
    right_1: null,
    right_2: null,
    prev: '/ ',
  };

  // ?catg=all & area=all & asc=f & staste=a (&key=아이폰)

  // asc >
  // f = 최신순
  // t = 경매 종료 임박순

  // state >
  // f = 경매 전
  // t = 경매 진행중(첫 라이브 후)
  // a = 모든 경매

  useEffect(() => {
    // #TODO order 바뀌면 그에 따른 API 호출하기
  }, [state, lowerState]);

  useEffect(() => {
    setLowerState('최신순');
  }, [state]);

  return (
    <>
      {isOpen && (
        <SelectModal
          setIsOpen={setIsOpen}
          state={state === 'f' ? sort[0] : sort[1]}
          lowerState={lowerState}
          setLowerState={setLowerState}
        ></SelectModal>
      )}

      <div className="w-full h-screen pb-[4.5rem]">
        <Header info={info} />
        <div className="pt-12 pb-4 px-BID_P ">
          <div className="pt-4 ">
            <p className="font-bold text-lg">{changeEngToKr(changeOneCapitalize(pathname.split('/')[2]))}</p>
            <p className="text-xs text-BID_BLACK">적을꺼 없음 뭐적지?</p>
          </div>
          <div className="pt-4 flex font-bold gap-3 text-center overflow-x-auto">
            <div
              onClick={() => setState('a')}
              className={`w-[3.5rem] border border-BID_BLACK rounded-xl p-1 text-sm ${state === 'a' && 'bg-BID_BLACK text-white'}`}
            >
              <p>전체</p>
            </div>
            <div
              onClick={() => {
                setState('f');
                setIsOpen(true);
              }}
              className={`border border-BID_BLACK rounded-xl p-1 px-2 text-sm flex justify-center items-center gap-1 ${state === 'f' && 'bg-BID_BLACK text-white'}`}
            >
              {state === 'f' ? <p>{lowerState}</p> : <p>경매 시작전</p>}
              <IoIosArrowDown />
            </div>
            <div
              onClick={() => {
                setState('t');
                setIsOpen(true);
              }}
              className={`border border-BID_BLACK rounded-xl p-1 px-2 text-sm flex items-center justify-center gap-1 ${state === 't' && 'bg-BID_BLACK text-white'}`}
            >
              {state === 't' ? <p>{lowerState}</p> : <p>경매 진행중</p>}
              <IoIosArrowDown />
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
    lower: ['최신순', '라이브 진행중', '경매 마감 임박'],
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
