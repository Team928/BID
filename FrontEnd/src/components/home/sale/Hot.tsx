import AuctionItem, { ISaleSimpleRes } from '../AuctionItem';

const Hot = () => {
  return (
    <>
      <div className="py-4 border-b border-[#D9D9D9]">
        <div className="px-BID_P">
          <p className="font-bold">실시간 핫 경매</p>
          <p className="text-xs text-BID_BLACK">조회, 관심, 입찰 급상승</p>
        </div>
        <div className="pl-4 py-4 flex flex-nowrap overflow-x-auto">
          {list.map(item => {
            return <AuctionItem key={item.salePostSimpleRes.id} item={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Hot;

const list: ISaleSimpleRes[] = [
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
    status: 'AUCTION',
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
    status: 'AUCTION',
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
    status: 'AUCTION',
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
    status: 'AUCTION',
  },
];
