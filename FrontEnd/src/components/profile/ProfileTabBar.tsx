import useTabStore from '@/stores/auctionTabStore';
import React from 'react';

interface ProfileTabBarProps {
  leftTab: string;
  rightTab: string;
}

const ProfileTabBar: React.FC<ProfileTabBarProps> = ({ leftTab, rightTab }) => {
  const { tab, setTab } = useTabStore();

  return (
    <div className="w-full flex px-BID_P fixed top-0 pt-16 bg-white z-[9] max-w-[500px]">
      <div className="w-1/2 flex justify-center border-b-[3px] py-1 border-BID_MAIN" onClick={() => setTab('sale')}>
        {tab === 'sale' ? (
          <p className="font-bold text-BID_MAIN">{leftTab}</p>
        ) : (
          <p className="text-gray-400 py-1">{leftTab}</p>
        )}
      </div>
      <div className="w-1/2 flex justify-center border-b-[3px] py-1 border-BID_MAIN" onClick={() => setTab('purchase')}>
        {tab === 'purchase' ? (
          <p className="font-bold text-BID_MAIN">{rightTab}</p>
        ) : (
          <p className="text-gray-400 py-1">{rightTab}</p>
        )}
      </div>
    </div>
  );
};

export default ProfileTabBar;
