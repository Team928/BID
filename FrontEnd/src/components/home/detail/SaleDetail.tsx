import Carousel from '@/components/@common/Carousel';
import Modal from '@/components/@common/Modal';
import Toast from '@/components/@common/Toast';
import { useSale } from '@/hooks/home/useSale';
import useLiveStore from '@/stores/userLiveStore';
import { ISaleDetailRes } from '@/types/home';
import addCommaToPrice from '@/utils/addCommaToPrice';
import { changeEngToKr } from '@/utils/changeCategorie';
import { getDate } from '@/utils/getDate';
import { getPriceName } from '@/utils/getPriceName';
import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { MdLiveTv } from 'react-icons/md';
import { PiUser } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

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

  // #TODO 녹화 영상 볼 수 있는 함수
  const viewVideo = () => {};

  // #TODO 라이브 요청하는 함수
  const liveRequest = () => {};

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true, 
    autoplaySpeed: 2000, 
    pauseOnFocus: false,
  }

  const images = [];

  for (let i = 0; i < dealRes.images.length; i++) {
    images.push(`${import.meta.env.VITE_BASE_URL}static${dealRes.images[i]}`);
  }
  console.log(images)
  console.log(images.length)

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
        <div className="relative w-full">
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
                onClick={() => liveRequest()}
                className="absolute left-3 bottom-3 p-2 px-3 text-sm bg-white text-black rounded-full font-bold flex items-center gap-1"
              >
                <p onClick={() => setShowModal(true)} className="">
                  라이브 요청
                </p>
              </div>
            )}
          </div>
        {/* 하위 컨텐츠 */}
        <div className="px-BID_P flex flex-col gap-3 pt-2">
          {status === 'BEFORE' && (
            <p className="text-BID_MAIN font-bold text-lg">
              {month}/{date} ({datOfWeek}) {time} 경매 시작 예정
            </p>
          )}
          {/* 카테고리 + 지역 */}
          <div className="flex justify-between text-sm text-BID_SUB_GRAY">
            <p>{changeEngToKr(dealRes.category)}</p>
            <p>{dealRes.area[0]}</p>
          </div>
          {/* 상태에 따른 가격 */}
          <div className="flex items-center gap-2">
            <p className="font-bold text-xl ">
              {status === 'BEFORE'
                ? addCommaToPrice(immediatePrice)
                : highestBid === 0
                  ? addCommaToPrice(startPrice)
                  : addCommaToPrice(highestBid)}
              원
            </p>
            <p className="text-base text-BID_BLACK">{getPriceName(status)}</p>
          </div>
          {/* 판매글 제목 + 내용 */}
          <div>
            <p className="text-xl font-bold">{dealRes.title}</p>
            <p className="text-BID_BLACK pt-2">{dealRes.content}</p>
          </div>
          {/* 판매자 정보 */}
          <div className="py-2 border-b-[1px]">
            <button onClick={() => getMemberInfo()} className="w-full flex flex-col">
              <div className="text-xs pl-2 text-BID_BLACK">판매자</div>
              <div className="p-2 flex justify-center items-center">
                <PiUser size={'1.8rem'} color="#545454" />
                <div className="pl-2">{dealRes.writer}</div>&nbsp;&nbsp;
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
              <p className="text-lg">라이브 보러가기</p>
            </button>
          )}
          {status === 'AUCTION' && (
            <button
              onClick={() => viewVideo()}
              className=" border rounded-xl border-BID_MAIN font-bold flex p-3 justify-center items-center gap-2 text-BID_MAIN"
            >
              <MdLiveTv size={'1.8rem'} color="#3498DB" />
              <p className="text-lg">녹화 영상 보기</p>
            </button>
          )}

          <div className="pt-4 pb-10 w-full">
            <p className="text-lg font-bold">입찰 로그</p>
            <p className="pt-1 text-sm text-BID_SUB_GRAY">현재까지의 입찰 로그를 확인해보세요</p>
            <div className="px-5">
              <div className="flex justify-between gap-3 w-full border-b pt-4 pb-1 text-center">
                <p className="w-1/6">입찰자</p>
                <p className="w-1/3">입찰가격</p>
                <p className="w-1/2">입찰시간</p>
              </div>
              {bidList.length > 0 ? (
                <div className="py-2 text-sm text-BID_SUB_GRAY max-h-28 overflow-y-scroll border-b">
                  {bidList.map(item => {
                    return (
                      <div key={item.id} className="flex justify-between gap-3 text-center py-1">
                        <p className="w-1/6">{item.bidder}</p>
                        <p className="w-1/3">{item.bidPrice}원</p>
                        <p className="w-1/2">{getDate(item.bidTime).fullDate2}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex w-full h-36 justify-center items-center text-gray-400 text-center">
                  입찰 기록이 없습니다.
                  <br />첫 입찰 기록을 남겨보는건 어떨까요?
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleDetail;
