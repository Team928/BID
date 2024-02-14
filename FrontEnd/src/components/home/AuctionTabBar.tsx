import useTabStore from '@/stores/auctionTabStore';

const AuctionTabBar = () => {
  const { tab, setTab } = useTabStore();
  return (
    <div className="w-full flex gap-4 px-BID_P fixed top-0 pt-12 bg-white border-b border-[#D9D9D9] z-[9] max-w-[500px]">
      <button onClick={() => setTab('sale')} className="cursor-pointer">
        {tab === 'sale' ? (
          <p className="font-bold border-b-[3px] py-1 border-black">경매</p>
        ) : (
          <p className="py-1">경매</p>
        )}
      </button>
      <button onClick={() => setTab('purchase')} className="cursor-pointer">
        {tab === 'purchase' ? (
          <p className="font-bold border-b-[3px] py-1 border-black">역경매</p>
        ) : (
          <p className="py-1">역경매</p>
        )}
      </button>
    </div>
  );
};

export default AuctionTabBar;
