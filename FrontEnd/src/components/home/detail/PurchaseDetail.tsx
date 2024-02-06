import sample from '@/assets/image/sample.png';
import { IPurchaseDetailRes } from '@/types/home';
import addCommaToPrice from '@/utils/addCommaToPrice';
import { changeEngToKr } from '@/utils/changeCategorie';
import { getDate } from '@/utils/getDate';
import { PiUser } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const PurchaseDetail = (props: { info: IPurchaseDetailRes }) => {
  const navigate = useNavigate();
  const { dealRes, minPrice, maxPrice, status } = props.info;
  const { month, date, datOfWeek, time } = getDate(dealRes.startTime);

  // #TODO 프로필 파람 해야함
  // 작성자로 사용자 정보 조회
  const getMemberInfo = () => {
    console.log(dealRes.writer);
    navigate('/profile');
  };

  return (
    <>
      <div className="w-full h-full ">
        {/* 사진 */}
        <div className="relative w-full h-2/5">
          <img src={sample} className="object-cover w-full h-full"></img>
          {/* #TODO 이미지 캐러셀 해야함 */}
          {dealRes.images.length !== 1 && <p className="absolute right-0 bottom-0 text-white p-5 text-lg">1/3</p>}
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
          <div className="pt-2">
            <div
              onClick={() => getMemberInfo()}
              className="border rounded-xl border-BID_SUB_GRAY font-bold flex p-3 justify-center items-center gap-2"
            >
              <PiUser size={'1.8rem'} color="#545454" />
              <p className="text-lg">구매자 정보</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseDetail;
