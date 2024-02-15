import { useSale } from '@/hooks/home/useSale';
import useLiveStore from '@/stores/userLiveStore';
import { changeEngToKr } from '@/utils/changeCategorie';
import { useNavigate } from 'react-router-dom';

const Live = () => {
  const { useGetSaleList } = useSale();
  const {
    // isLoading,
    // error,
    data: liveInfo,
  } = useGetSaleList({ page: '0', size: '10', order: 'asc', status: 'LIVE' });

  const { setTType, setPType } = useLiveStore();
  const navigate = useNavigate();

  return (
    <>
      <div className="pt-4 border-b border-[#D9D9D9]">
        <div className="px-BID_P">
          <p className="font-bold">라이브 진행 중</p>
          <p className="text-xs text-BID_BLACK">현재 라이브가 진행중입니다</p>
        </div>
        <div className="pl-4 py-4 flex flex-nowrap overflow-x-auto gap-2">
          {liveInfo?.data.saleSimpleResList.map(item => {
            return (
              <div
                key={item.dealSimpleRes.id}
                className="w-44 text-xs flex flex-col gap-1 cursor-pointer"
                onClick={() => {
                  setTType('sale');
                  setPType('buyer');
                  navigate(`/live/sale/${item.dealSimpleRes.id}`, {
                    state: {
                      startPrice: item.startPrice,
                    },
                  });
                }}
              >
                <div className="relative">
                  <img className="w-44 h-32" src={`${import.meta.env.VITE_BASE_URL}${item.dealSimpleRes.image}`} />
                  <div className="absolute top-2 left-2 text-center bg-[#FF0000] pr-[0.4rem] pl-1 rounded-sm">
                    <p className="text-white text-xs font-bold italic">LIVE</p>
                  </div>
                </div>

                <div className="px-1 flex flex-col gap-1">
                  <p className=" text-[0.6rem] text-BID_SUB_GRAY">{changeEngToKr(item.dealSimpleRes.category)}</p>
                  <p className=" w-44 truncate whitespace-normal leading-4 line-clamp-2">{item.dealSimpleRes.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Live;
