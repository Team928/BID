import Header, { IHeaderInfo } from '@/components/@common/Header';
import ProfileTabBar from '@/components/profile/ProfileTabBar';
import SaleHost from '@/components/profile/sale/SaleHost';
import SaleParticipant from '@/components/profile/sale/SaleParticipant';
import useTabStore from '@/stores/auctionTabStore';
import { IoIosArrowBack } from 'react-icons/io';

const ProfileSalePage = () => {
  const info: IHeaderInfo = {
    left: <IoIosArrowBack />,
    center: '내 경매 내역',
    right_1: null,
    right_2: null,
  };

  const { tab } = useTabStore();

  return (
    <>
      <div>
        <Header info={info} />
        <ProfileTabBar leftTab="내가 주최한 경매" rightTab="내가 참여한 경매" />
        {/* 탭에 따른 컴포넌트 보여주기 */}
        {tab === 'sale' ? <SaleHost></SaleHost> : <SaleParticipant></SaleParticipant>}
      </div>
    </>
  );
};
export default ProfileSalePage;
