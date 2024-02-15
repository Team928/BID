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
import { MdOutlineCreate } from 'react-icons/md';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import '@/components/profile/progress.css';

const ProfilePage = () => {
  const info: IHeaderInfo = {
    left: null,
    center: '프로필',
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
    localStorage.clear();
    navigate('/login');
  };

  const [showChargeModal, setShowChargeModal] = useState<boolean>(false);

  return (
    <>
      {/* 포인트 충전 모달 */}
      {showChargeModal && (
        <PointChargeModal setShowChargeModal={setShowChargeModal} userProfileInfo={userProfileInfo?.data} />
      )}
      <div className="h-[calc(100vh-4rem)] overflow-y-scroll">
        <Header info={info} />
        {/* 내 프로필 섹션 */}
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
        </div>

        {/* 포인트 섹션 */}
        <div className="px-6">
          <div className="flex justify-between w-full border p-4 rounded-lg">
            <div className="flex flex-col gap-1 items-center">
              <p className="text-sm">나의 포인트</p>
              <p className="font-bold">{userProfileInfo?.data.point} P</p>
            </div>
            <div className="flex items-center justify-end text-sm font-bold gap-2 text-[#545454]">
              <button onClick={() => setShowChargeModal(true)} className="">
                충전
              </button>
              <p className="">|</p>
              <button onClick={() => Toast.error('아직 준비되지 않은 서비스입니다')} className="">
                환급
              </button>
            </div>
          </div>
        </div>
        <div className="px-6 py-6">
          <div className="border h-11 rounded-lg flex items-center px-4 gap-2">
            <p className="font-black text-BID_MAIN">TIP</p>
            <p className="text-sm font-semibold text-BID_BLACK">[이용 안내] 실시간 라이브 미지원 OS</p>
          </div>
        </div>
        <div className="border-y">
          {/* 거래 및 리뷰 내역 */}
          <div className="">
            <div className="px-BID_P">
              <div onClick={() => moveToNavigate('/profile/sale')} className="w-full flex justify-between px-2 py-2.5">
                <p className="text-sm leading-7">경매 내역</p>
                <button>
                  <RiArrowRightSLine size={25} color="#545454" />
                </button>
              </div>
              <div onClick={() => moveToNavigate('/profile/buy')} className="flex justify-between px-2 py-2.5">
                <p className="text-sm leading-7">역경매 내역</p>
                <button>
                  <RiArrowRightSLine size={25} color="#545454" />
                </button>
              </div>
              <div
                onClick={() => moveToNavigate('/profile/review')}
                className="w-full flex justify-between px-2 py-2.5"
              >
                <p className="text-sm leading-7">리뷰 내역</p>
                <button>
                  <RiArrowRightSLine size={25} color="#545454" />
                </button>
              </div>
              <div onClick={() => moveToNavigate('/profile/point')} className="flex justify-between px-2 py-2.5">
                <p className="text-sm leading-7">포인트 사용 내역</p>
                <button>
                  <RiArrowRightSLine size={25} color="#545454" />
                </button>
              </div>
              <div className="flex justify-between px-2 py-2.5">
                <p className="text-sm leading-7">로그아웃</p>
                <button onClick={handleLogout}>
                  <RiArrowRightSLine size={25} color="#545454" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <Bottom />

        {/* 모달 영역 */}
        {isModalOpen && <ProfileModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </>
  );
};

export default ProfilePage;
