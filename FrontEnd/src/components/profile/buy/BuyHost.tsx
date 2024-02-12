import sample from '@/assets/image/sample.png';
import StateButton from '@/components/@common/StateButton';
import { useProfile } from '@/hooks/profile/useProfile';
import userStore from '@/stores/userStore';

const BuyHost = () => {
  const { nickname } = userStore(state => state)

  const { useBuyHost } = useProfile();
  const { data: buyHostInfo } = useBuyHost(nickname); 

  return (
    <div className="pt-28">
      {buyHostInfo?.data.purchaseSimpleRes.map((item, index) => (
        <div key={index} className="px-BID_P py-3 flex gap-4 border-b border-[#D9D9D9]">
          <div className="w-32 h-32">
            <img className="w-full h-full rounded-xl" src={sample}></img>
          </div>
          <div className="flex-1 flex flex-col py-2">
            <div className="flex items-center justify-between">
              <StateButton deals={'purchase'} status={`${item.status}`} />
            </div>
            <div className="py-2">
              <p className="text-lg truncate whitespace-normal line-clamp-2">{item.dealSimpleRes.title}</p>
              <div className="flex items-center gap-3">
                <p className="text-sm text-BID_BLACK">{item.dealSimpleRes.content}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuyHost;
