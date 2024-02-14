import { useReview } from '@/hooks/review/useReview';
import userStore from '@/stores/userStore';
import { getTimeDifference } from '@/utils/getTimeDifference';

const GetReviews = () => {
  const { nickname } = userStore(state => state);
  const { useGetReviewList } = useReview();

  const { data: reviewInfo } = useGetReviewList(nickname);

  const reviewCnt = reviewInfo?.data.total;

  return (
    <div className="">
      {/* 후기 몇 개 ?? */}
      <div className="px-6 ">
        <p className="text-md pb-2 pt-4 text-gray-500">
          {reviewCnt ? `총 ${reviewCnt}개의 후기가 있어요` : '아직 후기가 없어요'}
        </p>
      </div>
      {/* 리뷰 불러오기 */}
      <div className="px-BID_P">
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
    </div>
  );
};

export default GetReviews;
