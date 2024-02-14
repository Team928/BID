import userImage from '@/assets/icon/defaultProfile.png';
import NOTIFY from '@/assets/icon/notify.png';
import Bottom from '@/components/@common/Bottom';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import PointChargeModal from '@/components/@common/PointChargeModal';
import Toast from '@/components/@common/Toast';
import ProfileModal from '@/components/profile/ProfileModal';
import { useProfile } from '@/hooks/profile/useProfile';
import userStore from '@/stores/userStore';
import { useState } from 'react';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { MdOutlineCreate } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

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
  const { data: userProfileInfo } = useUserProfile(`${nickname}`);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <>
        <Header info={info} />
        {/* 내 프로필 섹션 */}
        <div className="pt-12">
          <div className="flex gap-4 p-8 items-center">
            <div className="w-20 h-20 rounded-3xl relative">
              {userProfileInfo?.data.profileImage ? (
                <img
                  src={`${import.meta.env.VITE_BASE_URL}static${userProfileInfo?.data.profileImage}`}
                  className="w-full h-full rounded-2xl object-cover"
                />
              ) : (
                <img src={userImage} className="w-full h-full object-cover" />
              )}
              <button
                className="p-1 bg-[#EEEEEE] rounded-3xl absolute right-1 bottom-1"
                onClick={() => setIsModalOpen(true)}
              >
                <MdOutlineCreate color="#6C6C6C" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-around">
              <div className="flex">
                <p className="text-lg font-bold">{userProfileInfo?.data.nickname}</p>
              </div>
              <p className="text-xs text-BID_GRAY py-2">{userProfileInfo?.data.email}</p>
              <p className="text-xs text-BID_MAIN">신뢰지수 {userProfileInfo?.data.score}</p>
            </div>
          </div>
        </div>

        {/* 포인트 섹션 */}
        <div className="px-6">
          <div className="w-full h-30 border p-4 rounded-lg">
            <div className="flex px-2 py-1 justify-between items-center">
              <p className="font-bold">나의 포인트</p>
              <p className="text-lg">{userProfileInfo?.data.point} P</p>
            </div>
            <div className="flex justify-end px-2 pt-2 text-sm font-bold">
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
        <div className="px-6 pt-8">
          <p className="font-bold px-3 text-lg">내역 조회</p>
          <div className="px-4 py-2">
            <div onClick={() => moveToNavigate('/profile/sale')} className="flex justify-between px-2 py-2.5 border-b">
              <p className="text-gray-500 text-sm leading-7">경매 내역</p>
              <button>
                <IoIosArrowDroprightCircle size={30} color="#3498DB" />
              </button>
            </div>
            <div onClick={() => moveToNavigate('/profile/buy')} className="flex justify-between px-2 py-2.5 border-b">
              <p className="text-gray-500 text-sm leading-7">역경매 내역</p>
              <button>
                <IoIosArrowDroprightCircle size={30} color="#3498DB" />
              </button>
            </div>
            <div
              onClick={() => moveToNavigate('/profile/review')}
              className="flex justify-between px-2 py-2.5 border-b"
            >
              <p className="text-gray-500 text-sm leading-7">리뷰 내역</p>
              <button>
                <IoIosArrowDroprightCircle size={30} color="#3498DB" />
              </button>
            </div>
            <div onClick={() => moveToNavigate('/profile/point')} className="flex justify-between px-2 py-2.5 border-b">
              <p className="text-gray-500 text-sm leading-7">포인트 사용 내역</p>
              <button>
                <IoIosArrowDroprightCircle size={30} color="#3498DB" />
              </button>
            </div>
            <div className="flex justify-between px-2 py-2.5 border-b">
              <p className="text-gray-500 text-sm leading-7">로그아웃</p>
              <button onClick={handleLogout}>
                <IoIosArrowDroprightCircle size={30} color="#3498DB" />
              </button>
            </div>
          </div>
        </div>
        <Bottom />

        {/* 모달 영역 */}
        {isModalOpen && <ProfileModal onClose={() => setIsModalOpen(false)} />}
      </>
    </>
  );
};

export default ProfilePage;
