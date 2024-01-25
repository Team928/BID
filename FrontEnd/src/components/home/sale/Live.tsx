import { changeEngToKr } from '@/utils/changeCategorie';

const Live = () => {
  return (
    <>
      <div className="pt-4 border-b border-[#D9D9D9]">
        <div className="px-BID_P">
          <p className="font-bold">라이브 진행 중</p>
          <p className="text-xs text-BID_BLACK">현재 라이브가 진행중입니다</p>
        </div>
        <div className="pl-4 py-4 flex flex-nowrap overflow-x-auto gap-2">
          {list.map(item => {
            return (
              <div key={item.salePostSimpleRes.id} className="w-44 text-xs flex flex-col gap-1">
                <div className="w-44 h-32 bg-BID_LIGHT_GRAY relative">
                  <div className="absolute top-3 left-3 text-center bg-[#FF0000] pr-[0.4rem] pl-1 rounded-sm">
                    <p className="text-white text-sm font-bold italic">LIVE</p>
                  </div>
                </div>
                <div className="px-1 flex flex-col gap-1">
                  <p className=" text-[0.6rem] text-BID_SUB_GRAY">{changeEngToKr(item.salePostSimpleRes.categories)}</p>
                  <p className=" w-44 truncate whitespace-normal leading-4 line-clamp-2">
                    {item.salePostSimpleRes.title}
                  </p>
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

const list = [
  {
    salePostSimpleRes: {
      id: 1,
      title: '1년도 안쓴 아이폰 15프로 팝니다. 상태좋아요 짱입니다.',
      categories: 'Digital',
      createTime: '2024-01-17 15:30:00',
      image: '',
    },
    immediate_price: null,
    startTime: null,
    startPrice: 100000,
    endTime: '2024-01-17 15:30:00',
    bid: 1124360,
    status: 'ING',
  },
  {
    salePostSimpleRes: {
      id: 2,
      title: '아이폰 삽니다~',
      categories: 'Digital',
      createTime: '2024-01-17 15:30:00',
      image: '',
    },
    immediate_price: null,
    startTime: null,
    startPrice: 100000,
    endTime: '2024-01-17 15:30:00',
    bid: 1124360,
    status: 'ING',
  },
  {
    salePostSimpleRes: {
      id: 3,
      title: '아이폰 삽니다~',
      categories: 'Digital',
      createTime: '2024-01-17 15:30:00',
      image: '',
    },
    immediate_price: null,
    startTime: null,
    startPrice: 100000,
    endTime: '2024-01-17 15:30:00',
    bid: 1124360,
    status: 'ING',
  },
  {
    salePostSimpleRes: {
      id: 4,
      title: '아이폰 삽니다~',
      categories: 'Digital',
      createTime: '2024-01-17 15:30:00',
      image: '',
    },
    immediate_price: null,
    startTime: null,
    startPrice: 100000,
    endTime: '2024-01-17 15:30:00',
    bid: 1124360,
    status: 'ING',
  },
];
