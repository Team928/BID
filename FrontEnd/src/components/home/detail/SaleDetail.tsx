import Carousel from '@/components/@common/Carousel';
import Modal from '@/components/@common/Modal';
import Toast from '@/components/@common/Toast';
import { useSale } from '@/hooks/home/useSale';
import useLiveStore from '@/stores/userLiveStore';
import { ISaleDetailRes } from '@/types/home';
import { ITimeStamp } from '@/types/live';
import addCommaToPrice from '@/utils/addCommaToPrice';
import { changeEngToKr } from '@/utils/changeCategorie';
import { getDate } from '@/utils/getDate';
import { getPriceName } from '@/utils/getPriceName';
import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { MdLiveTv } from 'react-icons/md';
import { PiUser } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';

const SaleDetail = (props: { info: ISaleDetailRes; isSeller: boolean }) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState<boolean>(false);
  const { dealRes, immediatePrice, startPrice, status, highestBid, bidList } = props.info;
  const isSeller = props.isSeller;
  const { month, date, datOfWeek, time } = getDate(dealRes.startTime);
  const { usePostSaleLive } = useSale();
  const { mutate: liveMutate } = usePostSaleLive(dealRes.id);
  const { setTType, setPType } = useLiveStore();

  // #TODO 프로필 파람 해야함
  // 작성자로 사용자 정보 조회
  const getMemberInfo = () => {
    navigate(`/profile/${dealRes.writer}`);
  };

  // #TODO 라이브방 진입하는 함수
  const approachLive = () => {
    setTType('sale');
    setPType(isSeller ? 'seller' : 'buyer');

    if (status !== 'LIVE') {
      Toast.error('라이브 방송 진행중이 아닙니다.');
      return;
    }

    // @TODO: 구매자가 경매 진행 중 필요한 데이터를 넘김
    navigate(`/live/sale/${dealRes.id}`, {
      state: {
        title: dealRes.title,
        startPrice: startPrice,
      },
    });
  };

  const timeStamp: ITimeStamp[] = [
    {
      content: '전면부',
      time: '00:03:43',
    },
    {
      content: '후면부',
      time: '00:05:30',
    },
    {
      content: '다각도',
      time: '00:07:33',
    },
    {
      content: '작동상태',
      time: '00:09:01',
    },
    {
      content: '크기비교',
      time: '00:12:31',
    },
  ];

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnFocus: false,
  };

  const images = [];

  for (let i = 0; i < dealRes.images.length; i++) {
    images.push(`${import.meta.env.VITE_BASE_URL}static${dealRes.images[i]}`);
  }
  console.log(images);
  console.log(images.length);

  return (
    <>
      {/* 라이브 요청하기 모달 */}
      {showModal && (
        <Modal width="300px" height="auto" title="라이브 요청" onClose={() => setShowModal(false)}>
          <div className="w-full flex flex-col justify-center items-center p-5">
            <div className="text-center">
              <p>녹화영상에서 아쉬운 부분이 있었나요?</p>
              <p className="pt-2">지금 라이브 요청을 하시겠습니까?</p>
            </div>
            <div className="w-full flex gap-5 py-4">
              <button
                className="w-full bg-BID_SUB_GRAY text-white px-4 py-2 rounded-2xl"
                onClick={() => setShowModal(false)}
              >
                아니오
              </button>
              <button
                className="w-full bg-BID_MAIN text-white px-4 py-2 rounded-2xl"
                onClick={() => {
                  liveMutate();
                  setShowModal(false);
                }}
              >
                네
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div className="w-full h-full ">
        <div className="relative w-full h-72">
          {images.length === 1 ? (
            <img
              src={`${import.meta.env.VITE_BASE_URL}static${dealRes.images}`}
              className="object-cover w-full h-full"
              alt={`Slide 0`}
            />
          ) : (
            <Carousel settings={carouselSettings} images={images} />
          )}
          {status === 'AUCTION' && (
            <div
              onClick={() => setShowModal(true)}
              className="absolute left-3 bottom-3 p-2 px-3 text-sm bg-white/80 shadow-lg text-black rounded-full font-bold flex items-center gap-1"
            >
              <p>라이브 요청</p>
            </div>
          )}
        </div>
        {/* 하위 컨텐츠 */}
        <div className="px-BID_P flex flex-col gap-3 pt-2">
          {status === 'BEFORE' && (
            <p className="text-BID_MAIN font-bold text-sm">
              {month}/{date} ({datOfWeek}) {time} 경매 시작 예정
            </p>
          )}
          {/* 카테고리 + 지역 */}
          <div className="flex justify-between text-xs text-BID_SUB_GRAY">
            <p>{changeEngToKr(dealRes.category)}</p>
            <p>{dealRes.area[0]}</p>
          </div>
          {/* 상태에 따른 가격 */}
          <div className="flex items-center gap-2">
            <p className="font-bold text-md">
              {status === 'BEFORE'
                ? addCommaToPrice(immediatePrice)
                : highestBid === 0
                  ? addCommaToPrice(startPrice)
                  : addCommaToPrice(highestBid)}
              원
            </p>
            <p className="text-sm text-BID_BLACK">{getPriceName(status)}</p>
          </div>
          {/* 판매글 제목 + 내용 */}
          <div>
            <p className="text-lg font-bold">{dealRes.title}</p>
            <p className="text-BID_BLACK pt-2 text-sm">{dealRes.content}</p>
          </div>
          {/* 판매자 정보 */}
          <div className="py-2 border-b-[1px] border-[#EFEFEF]">
            <button onClick={() => getMemberInfo()} className="w-full flex flex-col">
              <div className="text-xs pl-2 text-BID_BLACK">판매자</div>
              <div className="p-2 flex justify-center items-center">
                <PiUser size={'18px'} color="#545454" />
                <div className="pl-2 text-sm">{dealRes.writer}</div>&nbsp;&nbsp;
                <IoIosArrowForward size={'16px'} color="#666666" />
              </div>
            </button>
          </div>
          {status === 'LIVE' && !isSeller && (
            <button
              onClick={() => approachLive()}
              className="border rounded-xl border-red-500 text-red-500 font-bold flex p-3 justify-center items-center gap-2"
            >
              <MdLiveTv size={'1.8rem'} color="#text-red-500" />
              <p className="text-md">라이브 보러가기</p>
            </button>
          )}
          {status === 'AUCTION' && (
            <div>
              <div>
                <p className="text-md">라이브 녹화 영상</p>
                <p className="py-1 text-xs text-BID_SUB_GRAY">지난 라이브 녹화 방송을 확인해보세요</p>
              </div>
              <div className="w-full py-2">
                <VideoPlayer
                  src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  timeStamp={timeStamp}
                />
              </div>
            </div>
          )}

          <div className="pt-4 pb-4 w-full">
            <p className="font-xs text-md">입찰 로그</p>
            <p className="pt-1 text-xs text-BID_SUB_GRAY">현재까지의 입찰 로그를 확인해보세요</p>
            <div className="px-5">
              <div className="flex justify-between gap-3 w-full border-b pt-4 pb-1 text-center text-sm">
                <p className="w-1/6">입찰자</p>
                <p className="w-1/3">입찰가격</p>
                <p className="w-1/2">입찰시간</p>
              </div>
              <div
                className="h-28 max-h-28 
              py-2 text-[14px] text-BID_SUB_GRAY overflow-y-scroll border-b"
              >
                {bidList.length > 0 ? (
                  <div>
                    {bidList.map(item => {
                      return (
                        <div key={item.id} className="flex justify-between gap-3 text-center py-1 ">
                          <p className="w-1/6">{item.bidder}</p>
                          <p className="w-1/3">{item.bidPrice}원</p>
                          <p className="w-1/2">{getDate(item.bidTime).fullDate2}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex w-full h-20 text-[13px] justify-center items-center text-gray-400 text-center">
                    입찰 기록이 없습니다.
                    <br />첫 입찰 기록을 남겨보는건 어떨까요?
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleDetail;
