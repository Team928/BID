import Header, { IHeaderInfo } from "@/components/@common/Header";
import { icons } from "@/constants/icons";
import { useLocation } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { useState } from "react";

const ReviewPage = () => {

  const { dealInfo } = useLocation().state;
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');

  const info: IHeaderInfo = {
    left: icons.BACK,
    center: '리뷰',
    right_1: null,
    right_2: null,
    prev: '/',
  };

  const handleStarClick = (starValue: number) => {
    if (rating === starValue) {
      // 별점을 다시 클릭하면 0으로
      setRating(0);
    } else {
      // 별점을 클릭하여 설정하는 경우
      setRating(starValue);
    }
  };


    return (
      <>
        <div className="w-full h-screen">
          <Header info={info} />
          <div className="pt-20">
            <p className="flex justify-center font-bold text-lg py-3">{dealInfo.writer}님과의 거래는 어떠셨나요😄</p>
            <p className="flex justify-center font-bold text-BID_MAIN py-2">리뷰를 남겨서 어쩌구 저쩌구 해보세요</p>
          </div>
          <div className="px-6 py-4">
            {/* 거래글 정보 */}
            <div className="flex gap-4 p-4 items-center">
              <div className="w-24 h-24 bg-BID_LIGHT_GRAY rounded-2xl relative"></div>
                <div className="flex-1 flex flex-col justify-around">
                  <p className="text-sm font-bold">{dealInfo.title}</p>
                  <p className="text-xs text-BID_GRAY py-2">{dealInfo.content}</p>
                  <p className="text-lg font-bold">{dealInfo.endPrice}</p>
                </div>
            </div>
            {/* 별점 */}
            <div className="flex items-center justify-center pt-4">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <CiStar
                  key={index}
                  onClick={() => handleStarClick(starValue)}
                  className={`text-6xl ${starValue <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                />
              );
            })}
          </div>
              {/* 리뷰 쓰는 칸 */}
              <div className="py-4">
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full h-60 p-4 border border-BID_GRAY rounded-2xl"
                  placeholder="소중한 리뷰를 남겨주세요."
                />
              </div>
          
              {/* 생성 버튼 */}
              <div>
                <button className={`w-full text-white rounded-2xl p-4 font-bold text-lg bg-BID_MAIN `}>리뷰 등록</button>
              </div>
          </div>
        </div>
      </>
    );
  };
  
  export default ReviewPage;