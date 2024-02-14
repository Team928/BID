import NOTIFY from '@/assets/icon/notify.png';
import SEARCH from '@/assets/icon/search.png';
import Bottom from '@/components/@common/Bottom';
import DaumPostModal from '@/components/@common/DaumPostModal';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import Toast from '@/components/@common/Toast';
import SelectModal from '@/components/home/SelectModal';
import SaleCategoryItem from '@/components/home/sale/SaleCategoryItem';
import { useIntersectionObserver } from '@/hooks/@common/useIntersectionObserver';
import { useSale } from '@/hooks/home/useSale';
import { patchChangeArea } from '@/service/profile/api';
import useKeywordStore from '@/stores/keywordStore';
import userStore from '@/stores/userStore';
import { categoryType, dealStatusType } from '@/types/model';
import { changeEngToKr } from '@/utils/changeCategorie';
import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

const SaleCategoryPage = () => {
  const { pathname } = useLocation();
  const { area, addArea } = userStore();
  const category = pathname.split('/')[2].toUpperCase() as categoryType;

  // 현재 경매 상태를 관리 ( 전체, 경매 시작전, 경매 진행중 )
  const [state, setState] = useState<dealStatusType | ''>('');
  // 모달의 상태를 관리
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // 경매 시작전과 경매 진행중의 하위 정렬을 관리
  const [order, setOrder] = useState<string>('');
  // 임시 상태를 관리
  const [tempState, setTempState] = useState<'경매 시작전' | '경매 진행중' | ''>('');
  // keyword 상태 관리
  const { keyword } = useKeywordStore();
  const { useGetListInfinite } = useSale();

  // 지역 모달 관리
  const [isAddressOpen, setIsAddressOpen] = useState<boolean>(false);
  // 지역 선택 됐는지 상태 관리
  const [isAddrClick, setIsAddrClick] = useState<boolean>(false);
  // 지역 선택에 올 text 관리
  const [addrText, setAddrText] = useState<string>('지역 선택');
  // 지역 추가 모달
  const [isDaumModalOpen, setIsDaumModalOpen] = useState<boolean>(false);

  const {
    data: categoryInfo,
    fetchNextPage,
    hasNextPage,
  } = useGetListInfinite({
    size: '5',
    ...(order === '최신순' || order === '' ? { order: 'asc' } : { order: 'desc' }),
    ...(category !== 'ALL' && { catg: category }),
    ...(state !== '' && { status: state }),
    ...(keyword !== '' && { keyword: keyword }),
    ...(addrText !== '지역 선택' && { area: addrText }),
  });

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    if (address) {
      addArea(address);

      const req = {
        nickname: '',
        area: [...area, address],
      };

      const formData = new FormData();
      const json = JSON.stringify(req);
      const blob = new Blob([json], { type: 'application/json' });

      formData.append('memberUpdateProfileReq', blob);
      patchChangeArea(formData).then(() => {
        setAddress('');
        Toast.success('지역이 추가되었습니다');
      });
    }
  }, [address]);

  useEffect(() => {
    if (!isAddrClick) {
      setAddrText('지역 선택');
    }
  }, [isAddrClick, addrText]);

  const [isRendering] = useState<boolean>(true);

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
      {isAddressOpen && (
        <>
          <div
            onClick={() => {
              if (addrText === '지역 선택') {
                setIsAddrClick(false);
              }
              setIsAddressOpen(false);
            }}
            className={`w-full h-screen fixed left-0 top-0 bottom-0 right-0 z-20 transition ease-in-out delay-200 ${isRendering ? 'bg-black/50' : 'bg-black/0'}`}
          ></div>
          <div
            className={`fixed bottom-0 h-72 w-full pt-5 pb-5 px-BID_P rounded-t-3xl bg-white z-30 max-w-[500px] ${isRendering ? 'animate-sheetOn' : 'animate-sheetOff'}`}
          >
            <div className="h-full flex flex-col justify-between">
              <p className="text-center text-md">지역 선택</p>
              <div className="flex flex-col gap-5">
                {area.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setAddrText(item);
                        setIsAddrClick(true);
                        setIsAddressOpen(false);
                      }}
                      className="flex justify-between"
                    >
                      <p className={`${addrText === item && 'text-BID_MAIN'}`}>{item}</p>
                      {addrText === item && <FaCheck color="#3498DB" />}
                    </div>
                  );
                })}
                <div
                  onClick={() => {
                    setIsDaumModalOpen(true);
                    setIsAddressOpen(false);
                    setIsAddrClick(false);
                  }}
                  className="flex justify-between"
                >
                  <p>지역 추가</p>
                </div>
              </div>
              <div className="border-t pt-5 text-center ">
                <p
                  onClick={() => {
                    if (addrText === '지역 선택') {
                      setIsAddrClick(false);
                      setIsAddressOpen(false);
                    }
                  }}
                >
                  닫기
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      {isDaumModalOpen && <DaumPostModal setIsOpen={setIsDaumModalOpen} setAddress={setAddress} />}
      <div className="w-full h-screen pb-[4.5rem] max-w-[500px]">
        <Header info={info} />
        <div className="w-full pt-12">
          <div className="pt-4 px-BID_P">
            <p className="font-bold text-lg">{changeEngToKr(category)}</p>
            <p className="text-xs text-BID_BLACK">필터링을 통해 원하는 상품을 찾아보세요</p>
          </div>
          <div className="pl-4 py-3 flex text-xs text-center overflow-x-scroll whitespace-nowrap">
            <button
              onClick={() => {
                setOrder('');
                setState('');
              }}
              className={` border border-BID_BLACK rounded-xl p-1 px-2 mr-1.5 ${state === '' && 'bg-BID_BLACK text-white'}`}
            >
              <p>전체</p>
            </button>
            <button
              onClick={() => {
                setIsAddressOpen(true);
                setIsAddrClick(!isAddrClick);
              }}
              className={`flex justify-center items-center gap-1 border mr-1.5 border-BID_BLACK rounded-xl p-1 px-2 ${isAddrClick && 'bg-BID_BLACK text-white'}`}
            >
              <p>{addrText}</p>
              <MdKeyboardArrowDown />
            </button>
            <button
              onClick={() => {
                setOrder('');
                setState('LIVE');
              }}
              className={` border border-BID_BLACK rounded-xl p-1 px-2 mr-1.5 ${state === 'LIVE' && 'bg-BID_BLACK text-white'}`}
            >
              <p>라이브 진행중</p>
            </button>
            <button
              onClick={() => {
                setTempState('경매 시작전');
                setIsOpen(true);
              }}
              className={`flex justify-center items-center gap-1 border mr-1.5 border-BID_BLACK rounded-xl p-1 px-2 ${state === 'BEFORE' && 'bg-BID_BLACK text-white'}`}
            >
              <p>{state === 'BEFORE' ? order : '경매 시작전'}</p>
              <MdKeyboardArrowDown />
            </button>
            <button
              onClick={() => {
                setTempState('경매 진행중');
                setIsOpen(true);
              }}
              className={`flex justify-center items-center gap-1 border border-BID_BLACK rounded-xl p-1 px-2 mr-2 ${state === 'AUCTION' && 'bg-BID_BLACK text-white'}`}
            >
              <p>{state === 'AUCTION' ? order : '경매 진행중'}</p>
              <MdKeyboardArrowDown />
            </button>
          </div>
        </div>
        <div className="px-BID_P flex flex-col h-[calc(100vh-170px)] gap-4 overflow-y-auto pb-20">
          {categoryInfo?.pages.map(
            item =>
              item.data.saleSimpleResList &&
              item.data.saleSimpleResList.map((value, index) => {
                return <SaleCategoryItem key={index} item={value} />;
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

const info: IHeaderInfo = {
  left: <IoIosArrowBack />,
  center: '카테고리',
  right_1: <img src={SEARCH} />,
  right_2: <img src={NOTIFY} />,
};
