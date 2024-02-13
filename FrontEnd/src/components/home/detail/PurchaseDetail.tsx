import Accordian from '@/components/@common/Accordian';
import Carousel from '@/components/@common/Carousel';
import userStore from '@/stores/userStore';
import { IPurchaseDetailRes } from '@/types/home';
import addCommaToPrice from '@/utils/addCommaToPrice';
import { changeEngToKr } from '@/utils/changeCategorie';
import { getDate } from '@/utils/getDate';
import { IoIosArrowForward } from 'react-icons/io';
import { PiUser } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const PurchaseDetail = (props: { info: IPurchaseDetailRes }) => {
  const navigate = useNavigate();
  const { nickname } = userStore();
  const { dealRes, minPrice, maxPrice, status, applyForms, memberLimit } = props.info;
  const { month, date, datOfWeek, time } = getDate(dealRes.startTime);

  // 작성자로 사용자 정보 조회
  const getMemberInfo = () => {
    console.log(dealRes.writer);
    navigate(`/profile/${dealRes.writer}`);
  };

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
      <div className="w-full h-full">
        {/* 사진 */}
        <div className="relative w-full h-30">
          {images.length === 1 ? (
            <img
              src={`${import.meta.env.VITE_BASE_URL}static${dealRes.images}`}
              className="object-cover w-full h-full"
              alt={`Slide 0`}
            />
          ) : (
            <Carousel settings={carouselSettings} images={images} />
          )}
          {/* #TODO 이미지 캐러셀 해야함 */}
          {dealRes.images.length !== 1 && (
            <p className="absolute right-0 bottom-0 text-white p-5 text-xs">
              참여자 {applyForms.length}/{memberLimit}
            </p>
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
              {addCommaToPrice(minPrice)} ~ {addCommaToPrice(maxPrice)}
            </p>
            <p className="text-BID_BLACK text-sm">예산</p>
          </div>
          {/* 판매글 제목 + 내용 */}
          <div>
            <p className="text-lg font-bold">{dealRes.title}</p>
            <p className="text-BID_BLACK pt-2 text-sm">{dealRes.content}</p>
          </div>
          {/* 구매자 정보 */}
          <div className="py-2">
            <button onClick={() => getMemberInfo()} className="w-full flex flex-col">
              <div className="text-xs pl-2 text-BID_BLACK">구매자</div>
              <div className="p-2 flex justify-center items-center">
                <PiUser size={'18px'} color="#545454" />
                <div className="pl-2 text-sm">{dealRes.writer}</div>&nbsp;&nbsp;
                <IoIosArrowForward size={'16px'} color="#666666" />
              </div>
            </button>
          </div>

          <div>
            {nickname === dealRes.writer && (
              <>
                <div className="flex gap-3">
                  <p className="font-bold">참여 신청 인원</p>
                  <p>
                    {applyForms.length}/{memberLimit}
                  </p>
                </div>
                <div className="pt-2">
                  {applyForms.map(info => {
                    return (
                      <Accordian key={info.id} titleContent={info.sellerNickname}>
                        <div className="flex items-center py-6">
                          <div className="basis-3/4">
                            <div>
                              <span>판매 희망 가격</span>&nbsp;<span className="text-BID_MAIN">{info.offerPrice}</span>
                            </div>
                            <div>
                              <p className="text-[#929292]">{info.content}</p>
                            </div>
                          </div>
                          <div className="basis-1/4 w-24 h-24">
                            <img
                              src={`${import.meta.env.VITE_BASE_URL}static${info.image}`}
                              alt="물건 사진"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </Accordian>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseDetail;
