import { IPurchaseDetailRes } from '@/types/home';
import addCommaToPrice from '@/utils/addCommaToPrice';
import { changeEngToKr } from '@/utils/changeCategorie';
import { getDate } from '@/utils/getDate';
import { IoIosArrowForward } from 'react-icons/io';
import { PiUser } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const PurchaseDetail = (props: { info: IPurchaseDetailRes }) => {
  const navigate = useNavigate();
  const { dealRes, minPrice, maxPrice, status, applyForms } = props.info;
  const { month, date, datOfWeek, time } = getDate(dealRes.startTime);

  // 작성자로 사용자 정보 조회
  const getMemberInfo = () => {
    console.log(dealRes.writer);
    navigate(`/profile/${dealRes.writer}`);
  };

  return (
    <>
      <div className="w-full h-full ">
        {/* 사진 */}
        <div className="relative w-full h-2/5">
          <img
            src={`${import.meta.env.VITE_OPEN_URL}static${dealRes.images[0]}`}
            className="object-cover w-full h-full"
          ></img>
          {/* #TODO 이미지 캐러셀 해야함 */}
          {dealRes.images.length !== 1 && (
            <p className="absolute right-0 bottom-0 text-white p-5 text-xs">참여자 {applyForms.length}/8</p>
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
              {addCommaToPrice(minPrice)} ~ {addCommaToPrice(maxPrice)}
            </p>
            <p className="text-base text-BID_BLACK">예산</p>
          </div>
          {/* 판매글 제목 + 내용 */}
          <div>
            <p className="text-xl font-bold">{dealRes.title}</p>
            <p className="text-BID_BLACK pt-2">{dealRes.content}</p>
          </div>
          {/* 판매자 정보 */}
          <div className="py-2">
            <button onClick={() => getMemberInfo()} className="w-full flex flex-col">
              <div className="text-xs pl-2 text-BID_BLACK">구매자</div>
              <div className="p-2 flex justify-center items-center">
                <PiUser size={'1.8rem'} color="#545454" />
                <div className="pl-2">{dealRes.writer}</div>&nbsp;&nbsp;
                <IoIosArrowForward size={'16px'} color="#666666" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseDetail;
