import useTabStore from '@/stores/auctionTabStore';
import React from 'react';

interface ProfileTabBarProps {
  leftTab: string;
  rightTab: string;
}

const ProfileTabBar: React.FC<ProfileTabBarProps> = ({ leftTab, rightTab }) => {
  const { tab, setTab } = useTabStore();

  return (
    <div className="w-full flex  relative pb-2 text-center pt-16 max-w-[500px]">
      <div
        onClick={() => setTab('sale')}
        className={tab === 'sale' ? ' font-bold flex-1 text-BID_MAIN' : 'text-gray-400 flex-1'}
      >
        <p>{leftTab}</p>
      </div>
      <div
        onClick={() => setTab('purchase')}
        className={tab === 'purchase' ? ' font-bold flex-1 text-BID_MAIN' : 'text-gray-400 flex-1'}
      >
        <p>{rightTab}</p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-300">
        <div
          className={`${
            tab !== 'sale' ? 'left-1/2' : 'left-0'
          } duration-500 ease-in-out relative bottom-[2px] z-10 w-1/2 h-[3px] bg-BID_MAIN`}
        ></div>
      </div>
    </div>
  );
};

export default ProfileTabBar;
