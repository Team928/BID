import useTabStore from '@/stores/auctionTabStore';

const AuctionTabBar = () => {
  const { tab, setTab } = useTabStore();
  return (
    <div className="flex gap-4 text-lg px-6 ">
      <div onClick={() => setTab('buy')}>
        {tab === 'buy' ? (
          <p className="font-bold border-b-[3px] py-1 border-black">경매</p>
        ) : (
          <p className="py-1">경매</p>
        )}
      </div>
      <div onClick={() => setTab('sale')}>
        {tab === 'sale' ? (
          <p className="font-bold border-b-[3px] py-1 border-black">역경매</p>
        ) : (
          <p className="py-1">역경매</p>
        )}
      </div>
    </div>
  );
};

export default AuctionTabBar;
