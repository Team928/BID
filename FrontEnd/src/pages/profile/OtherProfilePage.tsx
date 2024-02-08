import Header, { IHeaderInfo } from '@/components/@common/Header';
import ProfileOtherTabBar from '@/components/profile/ProfileOtherTabBar';
import OtherBuy from '@/components/profile/buy/OtherBuy';
import OtherReview from '@/components/profile/review/OtherReview';
import OtherSale from '@/components/profile/sale/OtherSale';
import { useProfile } from '@/hooks/profile/useProfile';
import useOtherTabStore from '@/stores/profileOtherTab';
import { IoIosArrowBack } from 'react-icons/io';

const OtherProfilePage = () => {
  const { useUserProfile } = useProfile();
  const { data: userProfileInfo } = useUserProfile('이승현'); // 임의 닉네임

  const info: IHeaderInfo = {
    left: <IoIosArrowBack />,
    center: `${userProfileInfo?.data.nickname}님의 프로필`,
    right_1: null,
    right_2: null,
  };

  const { tab } = useOtherTabStore();

  return (
    <>
      <div>
        <Header info={info} />
        <div className="pt-12">
          <div className="flex gap-4 p-8 items-center">
            <div className="w-28 h-28 bg-BID_LIGHT_GRAY rounded-3xl relative"></div>
            <div className="flex-1 flex flex-col justify-around">
              <div className="flex">
                <p className="text-xl font-bold">{userProfileInfo?.data.nickname}</p>
              </div>
              <p className="text-xs text-BID_GRAY py-3">{userProfileInfo?.data.email}</p>
              <p className="text-md text-BID_MAIN font-bold">{userProfileInfo?.data.score}</p>
            </div>
          </div>
        </div>
        {/* 경매 및 리뷰 탭 */}
        <div className="pt-200">
          <ProfileOtherTabBar leftTab="받은 리뷰" middleTab="주최한 경매" rightTab="주최한 역경매" />
          <div className="w-full flex px-BID_P bg-white z-[9]">
            <div>
              {tab === 'review' ? <OtherReview /> : null}
              {tab === 'sale' ? <OtherSale /> : null}
              {tab === 'buy' ? <OtherBuy /> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OtherProfilePage;
