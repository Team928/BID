import useTabStore from '@/stores/auctionTabStore';

const AuctionTabBar = () => {
  const { tab, setTab } = useTabStore();
  return (
    <div className="w-full flex gap-4 px-BID_P fixed top-0 pt-12 bg-white border-b border-[#D9D9D9] z-[9]">
      <div onClick={() => setTab('sale')}>
        {tab === 'sale' ? (
          <p className="font-bold border-b-[3px] py-1 border-black">경매</p>
        ) : (
          <p className="py-1">경매</p>
        )}
      </div>
      <div onClick={() => setTab('buy')}>
        {tab === 'buy' ? (
          <p className="font-bold border-b-[3px] py-1 border-black">역경매</p>
        ) : (
          <p className="py-1">역경매</p>
        )}
      </div>
    </div>
  );
};

export default AuctionTabBar;
