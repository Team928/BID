import AuctionItem, { ISaleSimpleRes } from '../AuctionItem';

const Soon = () => {
  return (
    <>
      <div className="py-4 border-b border-[#D9D9D9]">
        <div className="px-BID_P">
          <p className="font-bold">진행 예정 경매</p>
          <p className="text-xs text-BID_BLACK">잠시 후 라이브가 시작합니다</p>
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

export default Soon;

const list: ISaleSimpleRes[] = [
  {
    salePostSimpleRes: {
      id: 1,
      title: '1년도 안쓴 아이폰 15프로 팝니다. 상태좋아요 짱입니다.',
      categories: 'Digital',
      createTime: '2024-01-17 15:30:00',
      image: '',
    },
    immediate_price: 1300000,
    startTime: '2024-01-16 15:30:00',
    startPrice: 100000,
    endTime: null,
    bid: null,
    status: 'BEFORE',
  },
  {
    salePostSimpleRes: {
      id: 2,
      title: '아이폰 팔아요~',
      categories: 'Digital',
      createTime: '2024-01-17 15:30:00',
      image: '',
    },
    immediate_price: 1300000,
    startTime: '2024-01-16 15:30:00',
    startPrice: 100000,
    endTime: null,
    bid: null,
    status: 'BEFORE',
  },
  {
    salePostSimpleRes: {
      id: 3,
      title: '아이폰 팔아요~',
      categories: 'Digital',
      createTime: '2024-01-17 15:30:00',
      image: '',
    },
    immediate_price: 1300000,
    startTime: '2024-01-16 15:30:00',
    startPrice: 100000,
    endTime: null,
    bid: null,
    status: 'BEFORE',
  },
  {
    salePostSimpleRes: {
      id: 4,
      title: '아이폰 팔아요~',
      categories: 'Digital',
      createTime: '2024-01-17 15:30:00',
      image: '',
    },
    immediate_price: 1300000,
    startTime: '2024-01-16 15:30:00',
    startPrice: 100000,
    endTime: null,
    bid: null,
    status: 'BEFORE',
  },
];
