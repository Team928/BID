import StateButton from "@/components/@common/StateButton";
import { HiHeart } from "react-icons/hi";

const BuyHost = () => {
    return (
        // TODO : 실제 데이터로 수정해야함
      <div className="pt-28">
        <div className="px-BID_P py-3 flex gap-4 border-b border-[#D9D9D9]">
              <div className="w-32 h-32">
                <img className="w-full h-full rounded-xl" src="/src/assets/image/sample.png"></img>
              </div>
              <div className="flex-1 flex flex-col py-2">
                <div className="flex items-center justify-between">
                  <StateButton deals={'buy'} status={'AUCTION'} />
                  <HiHeart size={'1.6rem'} color="#FF0000" />
                </div>
                <div className="py-2">
                  <p className="text-sm truncate whitespace-normal line-clamp-2">
                    1년도 안쓴 아이폰 15 프로 팝니다. 상태 좋아요
                  </p>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-bold text-BID_BLACK">71,000원</p>
                    <p className="text-xs text-BID_BLACK">현재 입찰가</p>
                  </div>
                </div>
              </div>
            </div>
      </div>
    );
  };
  
  export default BuyHost;