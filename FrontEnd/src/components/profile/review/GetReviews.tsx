import { useReview } from "@/hooks/review/useReview";
import { CiStar } from "react-icons/ci";

const GetReviews = () => {

    const { useGetReviewList } = useReview()
    const {
        data: reviewInfo,
    } = useGetReviewList()

    const cntReviews = reviewInfo?.data.reviewSimpleRes.length;

    return (
        // TODO : 실제 데이터로 수정해야함
      <div className="pt-28">
        {/* 후기 몇 개 ?? */}
        <div className="px-6 ">
        <p className="text-md text-gray-500 py-3">
                    {cntReviews ? `총 ${cntReviews}개의 후기가 있어요` : '아직 후기가 없어요'}
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
                            <p className="pl-2"><CiStar className="text-xl text-yellow-500" /></p>
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
  
  export default GetReviews;