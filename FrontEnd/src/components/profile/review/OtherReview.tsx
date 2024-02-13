import { useReview } from '@/hooks/review/useReview';
import { useParams } from 'react-router-dom';

const OtherReview = () => {
  const { nickname } = useParams();
  const { useGetReviewList } = useReview();

  const { data: reviewInfo } = useGetReviewList(nickname!);

  const reviewCnt = reviewInfo?.data.total;

  return (
    <div className="">
      {/* 후기 몇 개 ?? */}
      <div className="px-6 ">
        <p className="text-md text-gray-500 py-3">
          {reviewCnt ? `총 ${reviewCnt}개의 후기가 있어요` : '아직 후기가 없어요'}
        </p>
      </div>
      {/* 리뷰 불러오기 */}
      <div>
        {reviewInfo?.data.reviewSimpleRes.map((item, index) => (
          <div key={index} className="px-BID_P py-3 flex gap-4 border-b border-[#D9D9D9]">
            <div className="flex-1 flex flex-col justify-around px-2">
              <div className="flex items-center justify-between pr-3">
                <div className="flex items-center">
                  <p className="text-md font-bold">{item.reviewerNickname}</p>
                </div>
                <p className="text-xs">{item.createtime}</p>
              </div>
              <p className="text-lg py-2">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OtherReview;
