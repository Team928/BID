import Header, { IHeaderInfo } from '@/components/@common/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useReview } from '@/hooks/review/useReview';
import { ICreateReviewReq } from '@/types/review';
import { BsFillStarFill } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import useReviewStore from '@/stores/useReviewStore';

const ReviewPage = () => {
  const { dealInfo, userInfo } = useLocation().state;
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const { usePostReview } = useReview();
  const navigate = useNavigate();
  const setReviewPosted = useReviewStore(state => state.setReviewPosted);

  const reviewReq: ICreateReviewReq = {
    content: reviewText,
    dealId: dealInfo.dealId,
    score: rating,
    targetNickname: userInfo.audienceMemberRes.opponentNick,
  };

  console.log(dealInfo)

  const { mutate } = usePostReview(reviewReq);
  const info: IHeaderInfo = {
    left: <IoIosArrowBack />,
    center: '리뷰',
    right_1: null,
    right_2: null,
  };

  const handleStarClick = (starValue: number) => {
    if (rating === starValue) {
      setRating(0);
    } else {
      setRating(starValue);
    }
  };

  const handleReviewCreate = () => {
    mutate();
    setReviewPosted(dealInfo.dealId, true);
    navigate(`/profile`);
  };
  return (
    <>
      <div className="w-full h-screen">
        <Header info={info} />
        <div className="pt-20">
          <p className="flex justify-center font-bold text-lg py-3">{userInfo.audienceMemberRes.opponentNick}님과의 거래는 어떠셨나요😄</p>
          <p className="flex justify-center font-bold text-BID_MAIN py-2">리뷰를 통해 거래의 후기를 남겨주세요</p>
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
                <BsFillStarFill
                  key={index}
                  onClick={() => handleStarClick(starValue)}
                  className={`text-6xl px-1 ${starValue <= rating ? 'text-yellow-300' : 'text-gray-100'}`}
                />
              );
            })}
          </div>
          {/* 리뷰 쓰는 칸 */}
          <div className="py-4">
            <textarea
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              className="w-full h-60 p-4 border border-BID_GRAY rounded-2xl outline-none"
              placeholder="소중한 리뷰를 남겨주세요."
            />
          </div>

          {/* 생성 버튼 */}
          <div onClick={handleReviewCreate}>
            <button className={`w-full text-white rounded-2xl p-4 font-bold text-lg bg-BID_MAIN `}>리뷰 등록</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
