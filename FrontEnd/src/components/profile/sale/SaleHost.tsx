import StateButton from '@/components/@common/StateButton';
import { useProfile } from '@/hooks/profile/useProfile';
import userStore from '@/stores/userStore';
import { useNavigate } from 'react-router-dom';

const SaleHost = () => {
  const { nickname } = userStore(state => state);
  const navigate = useNavigate();

  const { useSaleHost } = useProfile();
  const { data: saleHostInfo } = useSaleHost(nickname);

  const handleClick = (dealId: number) => {
    navigate(`/sale/detail/${dealId}`);
  };

  return (
    <div className="">
      {saleHostInfo?.data.saleSimpleResList.map((item, index) => (
        <div
          key={index}
          className="px-BID_P py-3 flex gap-4 border-b border-[#D9D9D9]"
          onClick={() => handleClick(item.dealSimpleRes.id)}
        >
          <div></div>
          <div className="w-32 h-32">
            <img
              className="w-full h-full rounded-xl"
              src={`${import.meta.env.VITE_BASE_URL}static${item.dealSimpleRes.image}`}
            ></img>
          </div>
          <div className="flex-1 flex flex-col py-2">
            <div className="flex items-center justify-between">
              <StateButton deals={'sale'} status={`${item.status}`} />
            </div>
            <div className="py-2">
              <p className="text-md">{item.dealSimpleRes.title}</p>
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

export default SaleHost;
