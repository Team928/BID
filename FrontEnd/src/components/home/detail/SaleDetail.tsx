import sample from '@/assets/image/sample.png';
import Modal from '@/components/@common/Modal';
import { useSale } from '@/hooks/home/useSale';
import { ISaleDetailRes } from '@/types/home';
import addCommaToPrice from '@/utils/addCommaToPrice';
import { changeEngToKr } from '@/utils/changeCategorie';
import { getDate } from '@/utils/getDate';
import { getPriceName } from '@/utils/getPriceName';
import { useState } from 'react';
import { MdLiveTv } from 'react-icons/md';
import { PiUser } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
// import { LiaHandPointerSolid } from 'react-icons/lia';

const SaleDetail = (props: { info: ISaleDetailRes }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { dealRes, immediatePrice, startPrice, status, highestBid, bidList } = props.info;
  const { month, date, datOfWeek, time } = getDate(dealRes.startTime);
  const { usePostSaleLive } = useSale();
  const { mutate: liveMutate } = usePostSaleLive(dealRes.id);
  // #TODO 프로필 파람 해야함
  // 작성자로 사용자 정보 조회
  const getMemberInfo = () => {
    console.log(dealRes.writer);
    navigate('/profile');
  };

  // #TODO 라이브방 진입하는 함수
  const approachLive = () => {};

  // #TODO 녹화 영상 볼 수 있는 함수
  const viewVideo = () => {};

  // #TODO 라이브 요청하는 함수
  const liveRequest = () => {};

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
        {/* 사진 */}
        <div className="relative w-full h-2/5">
          <img src={sample} className="object-cover w-full h-full"></img>
          {/* #TODO 이미지 캐러셀 해야함 */}
          {dealRes.images.length !== 1 && <p className="absolute right-0 bottom-0 text-white p-5 text-lg">1/3</p>}

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
          <div className="pt-2">
            <div
              onClick={() => getMemberInfo()}
              className="border rounded-xl border-BID_SUB_GRAY font-bold flex p-3 justify-center items-center gap-2"
            >
              <PiUser size={'1.8rem'} color="#545454" />
              <p className="text-lg">판매자 정보</p>
            </div>
          </div>
          {status !== 'BEFORE' && status === 'LIVE' ? (
            <div
              onClick={() => approachLive()}
              className="border rounded-xl border-BID_SUB_GRAY font-bold flex p-3 justify-center items-center gap-2"
            >
              <MdLiveTv size={'1.8rem'} color="#545454" />
              <p className="text-lg">라이브 보러가기</p>
            </div>
          ) : (
            <div
              onClick={() => viewVideo()}
              className=" border rounded-xl border-BID_MAIN font-bold flex p-3 justify-center items-center gap-2 text-BID_MAIN"
            >
              <MdLiveTv size={'1.8rem'} color="#3498DB" />
              <p className="text-lg">녹화 영상 보기</p>
            </div>
          )}

          <div className="pt-8 pb-10 w-full">
            <p className="text-lg font-bold">입찰 로그</p>
            <p className="pt-1 text-sm text-BID_SUB_GRAY">현재까지의 입찰 로그를 확인해보세요</p>
            <div className="px-5">
              <div className="flex gap-3 w-full border-b pt-4 pb-1">
                <p className="basis-1/5">입찰자</p>
                <p className="basis-2/5 text-right">입찰가격</p>
                <p className="basis-2/5 text-center">입찰시간</p>
              </div>
              <div className="pt-2 text-sm text-BID_SUB_GRAY max-h-28 overflow-y-scroll pb-2  border-b">
                {bidList.map(item => {
                  return (
                    <div key={item.id} className="flex justify-around gap-3">
                      <p className="basis-1/5">{item.bidder}</p>
                      <p className="basis-2/5 text-right">{item.bidPrice}원</p>
                      <p className="basis-2/5 text-right">{getDate(item.bidTime).fullDate2}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleDetail;
