import { useSale } from '@/hooks/home/useSale';
import { changeEngToKr } from '@/utils/changeCategorie';

const Live = () => {
  const { useGetSaleList } = useSale();
  const {
    // isLoading,
    // error,
    data: liveInfo,
  } = useGetSaleList({ page: '0', size: '10', order: 'asc', status: 'LIVE' });

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
              <div key={item.dealSimpleRes.id} className="w-44 text-xs flex flex-col gap-1">
                <div className="w-44 h-32 bg-BID_LIGHT_GRAY relative">
                  <div className="absolute top-3 left-3 text-center bg-[#FF0000] pr-[0.4rem] pl-1 rounded-sm">
                    <p className="text-white text-sm font-bold italic">LIVE</p>
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
