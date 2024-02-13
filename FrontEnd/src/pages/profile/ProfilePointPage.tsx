import Header, { IHeaderInfo } from '@/components/@common/Header';
import ProfilePointHistory from '@/components/profile/ProfilePointHistory';
import { IoIosArrowBack } from 'react-icons/io';

const ProfilePointPage = () => {
  const info: IHeaderInfo = {
    left: <IoIosArrowBack />,
    center: '포인트 사용 내역',
    right_1: null,
    right_2: null,
  };

  return (
    <>
      <div>
        <Header info={info} />
        <div className="pt-12 px-BID_P">
          <ProfilePointHistory />
        </div>
      </div>
    </>
  );
};

export default ProfilePointPage;
