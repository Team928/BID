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
        <div className="w-full flex px-BID_P bg-white z-[9]">
            <div className="w-1/3 flex justify-center border-b-[3px] py-1 border-BID_MAIN" onClick={() => setTab('review')}>
                {tab === 'review' ? (
                    <p className="font-bold text-BID_MAIN">{leftTab}</p>
                ) : (
                    <p className="text-gray-400 py-1">{leftTab}</p>
                )}
            </div>
            <div className="w-1/3 flex justify-center border-b-[3px] py-1 border-BID_MAIN" onClick={() => setTab('sale')}>
                {tab === 'sale' ? (
                    <p className="font-bold text-BID_MAIN">{middleTab}</p>
                ) : (
                    <p className="text-gray-400 py-1">{middleTab}</p>
                )}
            </div>
            <div className="w-1/3 flex justify-center border-b-[3px] py-1 border-BID_MAIN" onClick={() => setTab('buy')}>
                {tab === 'buy' ? (
                    <p className="font-bold text-BID_MAIN">{rightTab}</p>
                ) : (
                    <p className="text-gray-400 py-1">{rightTab}</p>
                )}
            </div>
        </div>
    );
};

export default ProfileOtherTabBar;
