import Header, { IHeaderInfo } from '@/components/@common/Header';
import ProfileTabBar from '@/components/profile/ProfileTabBar';
import GetReviews from '@/components/profile/review/GetReviews';
import WroteReviews from '@/components/profile/review/WroteReviews';
import BACK from '@/assets/icon/back.png';
import useTabStore from '@/stores/auctionTabStore';

const ProfileReviewPage = () => {
  const info: IHeaderInfo = {
    left: <img src={BACK} />,
    center: '내 리뷰 내역',
    right_1: null,
    right_2: null,
    prev: '/profile',
  };

  const { tab } = useTabStore();

  return (
    <>
      <div>
        <Header info={info} />
        <ProfileTabBar leftTab="나의 리뷰" rightTab="내가 작성한 리뷰" />
        {/* 탭에 따른 컴포넌트 보여주기 */}
        {tab === 'sale' ? <GetReviews></GetReviews> : <WroteReviews></WroteReviews>}
      </div>
    </>
  );
};
export default ProfileReviewPage;
