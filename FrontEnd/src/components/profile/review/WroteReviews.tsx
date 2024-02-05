import { CiStar } from "react-icons/ci";

const WroteReviews = () => {
    return (
        // TODO : 실제 데이터로 수정해야함
      <div className="pt-28">
        {/* 후기 몇 개 ?? */}
        <div className="px-6 ">
            <p className="text-md text-gray-500 py-3">총 n개의 후기가 있어요</p>
        </div>
        {/* 리뷰 불러오기 */}
        <div className="px-BID_P py-3 flex gap-4 border-b border-[#D9D9D9]">
            <div className="flex-1 flex flex-col justify-around px-2">
                <div className="flex items-center justify-between pr-3">
                    <div className="flex items-center">
                        <p className="text-md font-bold">닉네임</p>
                        <p className="pl-2"><CiStar className="text-xl text-yellow-500" /></p>
                    </div>
                    <p className="text-xs">2024.01.03</p>
                </div>
            <p className="text-lg py-2">와와와오아좋은 거래 감사합니다 ~ 좋은 거래 감사합니다 ~ 좋은 거래 감사합니다 ~ 좋은 거래 감사합니다 ~ </p>
        </div>
        </div>
      </div>
    );
  };
  
  export default WroteReviews;