import userImage from '@/assets/icon/user.png';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import ProfileOtherTabBar from '@/components/profile/ProfileOtherTabBar';
import OtherBuy from '@/components/profile/buy/OtherBuy';
import OtherReview from '@/components/profile/review/OtherReview';
import OtherSale from '@/components/profile/sale/OtherSale';
import { useProfile } from '@/hooks/profile/useProfile';
import useOtherTabStore from '@/stores/profileOtherTab';
import { IoIosArrowBack } from 'react-icons/io';
import { useParams } from 'react-router-dom';

const OtherProfilePage = () => {
  const { useUserProfile } = useProfile();
  const { nickname } = useParams();

  const { data: userProfileInfo } = useUserProfile(nickname!);

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
        <div className="pt-14">
          <div className="flex gap-4 px-8 items-center">
            <div className="w-20 h-20 rounded-full relative">
              {userProfileInfo?.data.profileImage ? (
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${userProfileInfo?.data.profileImage}`}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <img src={userImage} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex-1 flex flex-col justify-around">
              <div className="flex">
                <p className="text-lg font-bold">{userProfileInfo?.data.nickname}</p>
              </div>
              <p className="text-xs text-BID_GRAY py-2">{userProfileInfo?.data.email}</p>
            </div>
          </div>
        </div>
        <div className="px-8 py-5">
          <div className="flex justify-between">
            <p className="font-bold text-BID_MAIN ">신뢰지수 {userProfileInfo && userProfileInfo.data.score! * 20}</p>
            <p className="text-sm text-BID_SUB_GRAY ">100</p>
          </div>
          <progress
            id="progress"
            className="w-full h-2"
            value={userProfileInfo && userProfileInfo.data.score! * 20}
            max="100"
          ></progress>
        </div>
        {/* 경매 및 리뷰 탭 */}
        <div className="pt-1">
          <ProfileOtherTabBar leftTab="받은 리뷰" middleTab="주최한 경매" rightTab="주최한 역경매" />
          <div className="w-full h-full flex px-BID_P bg-white z-[9]">
            {tab === 'review' ? <OtherReview /> : null}
            {tab === 'sale' ? <OtherSale /> : null}
            {tab === 'buy' ? <OtherBuy /> : null}
          </div>
        </div>
      </div>
    </>
  );
};
export default OtherProfilePage;
