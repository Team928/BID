import Bottom from '@/components/@common/Bottom';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import NOTIFY from '@/assets/icon/notify.png';
import ARROWRIGHT from '@/assets/icon/arrowRight.png';
import { MdOutlineCreate } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import userStore from '@/stores/userStore';
import { useProfile } from '@/hooks/profile/useProfile';
import { useState } from 'react';
import PointChargeModal from '@/components/@common/PointChargeModal';
import Toast from '@/components/@common/Toast';

const ProfilePage = () => {
  const info: IHeaderInfo = {
    left: null,
    center: '내 프로필',
    right_1: null,
    right_2: <img src={NOTIFY} />,
  };

  const navigate = useNavigate();

  const { nickname } = userStore();
  const { useUserProfile } = useProfile();
  const { data: userProfileInfo } = useUserProfile(`${nickname}`); // 임의 닉네임

  const moveToNavigate = (path: string) => {
    navigate(path);
  };

  // 로그아웃 추가
  const { logoutUser } = userStore();
  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const [showChargeModal, setShowChargeModal] = useState<boolean>(false);

  return (
    <>
      {/* 포인트 충전 모달 */}
      {showChargeModal && (
        <PointChargeModal setShowChargeModal={setShowChargeModal} userProfileInfo={userProfileInfo?.data} />
      )}
      <div>
        <Header info={info} />
        {/* 내 프로필 섹션 */}
        <div className="pt-12">
          <div className="flex gap-4 p-8 items-center">
            <div className="w-24 h-24 bg-BID_LIGHT_GRAY rounded-3xl relative"></div>
            <div className="flex-1 flex flex-col justify-around">
              <div className="flex">
                <p className="text-lg font-bold">{userProfileInfo?.data.nickname}</p>
                <button className="px-2">
                  <MdOutlineCreate />
                </button>
              </div>
              <p className="text-xs text-BID_GRAY py-2">{userProfileInfo?.data.email}</p>
              <p className="text-md text-BID_MAIN font-bold">{userProfileInfo?.data.score}</p>
            </div>
          </div>
        </div>
        {/* 포인트 섹션 */}
        <div className="px-6">
          <div className="w-full h-30 border p-4 rounded-lg">
            <div className="flex px-2 py-1 justify-between items-center">
              <p>나의 포인트</p>
              <p className="text-2xl font-bold">{userProfileInfo?.data.point} P</p>
            </div>
            <div className="flex justify-end px-2 pt-2 text-lg font-bold">
              <button onClick={() => setShowChargeModal(true)} className="px-2 text-gray-400">
                충전
              </button>
              <button
                onClick={() => Toast.error('아직 준비되지 않은 서비스입니다')}
                className="px-2 py-1 text-gray-400"
              >
                환급
              </button>
            </div>
          </div>
        </div>
        {/* 거래 및 리뷰 내역 */}
        <div className="px-6 pt-4">
          <p className="font-bold px-3 text-xl">나의 거래</p>
          <div className="px-4 py-2">
            <div className="flex justify-between px-2 py-4 border-b">
              <p className="text-gray-500 text-lg">내 경매 내역</p>
              <button className="bg-BID_MAIN p-1 rounded-2xl" onClick={() => moveToNavigate('/profile/sale')}>
                <img src={ARROWRIGHT} />
              </button>
            </div>
            <div className="flex justify-between px-2 py-4 border-b">
              <p className="text-gray-500 text-lg">내 역경매 내역</p>
              <button className="bg-BID_MAIN p-1 rounded-2xl" onClick={() => moveToNavigate('/profile/buy')}>
                <img src={ARROWRIGHT} />
              </button>
            </div>
            <div className="flex justify-between px-2 py-4 border-b">
              <p className="text-gray-500 text-lg">나의 리뷰 내역</p>
              <button className="bg-BID_MAIN p-1 rounded-2xl" onClick={() => moveToNavigate('/profile/review')}>
                <img src={ARROWRIGHT} />
              </button>
            </div>
            {/* 로그아웃 로직 */}
            <div className="flex justify-between px-2 py-4 border-b">
              <p className="text-gray-500 text-lg">로그아웃</p>
              <button className="bg-BID_MAIN p-1 rounded-2xl" onClick={handleLogout}>
                <img src={ARROWRIGHT} />
              </button>
            </div>
          </div>
        </div>
        <Bottom />
      </div>
    </>
  );
};

export default ProfilePage;
