import { changeEngToKr } from '@/utils/changeCategorie';

export interface ISaleSimpleRes {
  id: number;
  title: string;
  categories: string;
  startTime: string;
  images: string;
}

const Hot = () => {
  return (
    <>
      <div className="py-4">
        <div className="px-BID_P">
          <p className="font-bold text-lg">실시간 핫 경매</p>
          <p className="text-sm text-BID_BLACK">조회, 관심, 입찰 급상승</p>
        </div>
        <div className="pl-4 py-4 flex flex-nowrap overflow-x-auto">
          {list.map(item => {
            return (
              <div key={item.salePostSimpleRes.id} className="w-36 text-xs flex flex-col gap-2">
                <div className="w-32 h-32 bg-BID_LIGHT_GRAY rounded-2xl"></div>
                <div className="px-1 flex flex-col gap-1">
                  <p className=" text-[0.6rem] text-BID_SUB_GRAY">{changeEngToKr(item.salePostSimpleRes.categories)}</p>
                  <p className=" w-32 truncate whitespace-normal leading-4 line-clamp-2">
                    {item.salePostSimpleRes.title}
                  </p>
                  <div className="">
                    <p className="font-bold text-sm">{item.bid}원</p>
                    <p className="text-BID_SUB_GRAY">현재 입찰가</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Hot;

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
