import sample from '@/assets/image/sample.png';
import StateButton from '@/components/@common/StateButton';
import { useProfile } from '@/hooks/profile/useProfile';
import { HiHeart } from 'react-icons/hi';

const BuyParticipant = () => {
  const { useBuyParticipant } = useProfile();
  const { data: buyParticipantInfo } = useBuyParticipant();

  return (
    // TODO : 실제 데이터로 수정해야함
    <div className="pt-28">
      {buyParticipantInfo?.data.purchaseSimpleRes.map((item, index) => (
        <div key={index} className="px-BID_P py-3 flex gap-4 border-b border-[#D9D9D9]">
          <div className="w-32 h-32">
            <img className="w-full h-full rounded-xl" src={sample}></img>
          </div>
          <div className="flex-1 flex flex-col py-2">
            <div className="flex items-center justify-between">
              <StateButton deals={'purchase'} status={'AUCTION'} />
              <HiHeart size={'1.6rem'} color="#FF0000" />
            </div>
            <div className="py-2">
              <p className="text-sm truncate whitespace-normal line-clamp-2">{item.dealSimpleRes.content}</p>
              <div className="flex items-center gap-3">
                <p className="text-lg font-bold text-BID_BLACK">{item.immediatePrice}</p>
                <p className="text-xs text-BID_BLACK">현재 가격</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuyParticipant;
