import { useReview } from '@/hooks/review/useReview';
import { getTimeDifference } from '@/utils/getTimeDifference';
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
            <div key={index} className="py-3 flex border-b border-[#D9D9D9]">
              <div className="flex-1 flex flex-col gap-1 px-2">
                <div className="flex items-center justify-between pr-3">
                  <div className="flex items-center gap-3">
                    <p className="text-md font-bold">{item.reviewerNickname}</p>
                    <p className="text-xs text-BID_SUB_GRAY">{item.role === 'SELLER' ? '판매자' : '구매자'}</p>
                  </div>
                  <div className="flex gap-2  text-sm">
                    <p className="text-yellow-400">별점</p>
                    <p className="">{item.score}.0점</p>
                  </div>
                </div>

                <p className="text-sm">{item.content}</p>
                <p className="text-BID_SUB_GRAY text-xs">{getTimeDifference(item.createTime)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default OtherReview;
