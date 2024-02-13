import React from 'react';
import useOtherTabStore from '@/stores/profileOtherTab';

interface ProfileTabBarProps {
  leftTab: string;
  middleTab: string;
  rightTab: string;
}

const ProfileOtherTabBar: React.FC<ProfileTabBarProps> = ({ leftTab, middleTab, rightTab }) => {
  const { tab, setTab } = useOtherTabStore();

  return (
    <>
      <div className="w-screen flex px-BID_P relative pb-2 text-center pt-16 max-w-[500px]">
        <div
          onClick={() => setTab('review')}
          className={tab === 'review' ? ' font-bold flex-1 text-BID_MAIN' : 'text-gray-400 flex-1'}
        >
          <p>{leftTab}</p>
        </div>
        <div
          onClick={() => setTab('sale')}
          className={tab === 'sale' ? ' font-bold flex-1 text-BID_MAIN' : 'text-gray-400 flex-1'}
        >
          <p>{middleTab}</p>
        </div>
        <div
          onClick={() => setTab('buy')}
          className={tab === 'buy' ? ' font-bold flex-1 text-BID_MAIN' : 'text-gray-400 flex-1'}
        >
          <p>{rightTab}</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-300">
          <div
            className={`${
              tab === 'review' ? 'left-0' : tab === 'sale' ? 'left-1/3' : 'left-2/3'
            } duration-500 ease-in-out relative bottom-[2px] z-10 w-1/3 h-[3px] bg-BID_MAIN`}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ProfileOtherTabBar;
