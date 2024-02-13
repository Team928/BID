import { useReview } from '@/hooks/review/useReview';
import { useParams } from 'react-router-dom';

const OtherReview = () => {
  const { nickname } = useParams();
  const { useGetReviewList } = useReview();

  const { data: reviewInfo } = useGetReviewList(nickname!);

  const reviewCnt = reviewInfo?.data.total;

  return (
    <div className="w-full h-full">
      {!reviewCnt ? (
        <div className="w-full h-full pt-16 text-center text-gray-500 text-md ">
          <p>아직 후기가 없어요</p>
          <p>글을 작성하고 후기를 받아 보세요</p>
        </div>
      ) : (
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
      )}
    </div>
  );
};
export default OtherReview;
