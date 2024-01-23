import Header, { IHeaderInfo } from '@/components/@common/header';
import { icons } from '@/constants/icons';
import useTabStore from '@/stores/auctionTabStore';
import { useEffect } from 'react';

const HomePage = () => {
  const { tab, setTab } = useTabStore();

  const info: IHeaderInfo = {
    left: null,
    center: null,
    right_1: icons.SEARCH,
    right_2: icons.NOTIFY,
  };

  useEffect(() => {
    console.log(tab);
  }, [tab]);

  return (
    <div className="w-full h-screen">
      <Header info={info} />
      <div className="pt-12 h-full">
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
        {/* #TODO 추후 이미지 찾아서 넣고 위에 글자 넣기 */}
        <div className="w-full h-1/5 bg-gray-300"></div>
        <div></div>
      </div>
    </div>
  );
};

export default HomePage;
