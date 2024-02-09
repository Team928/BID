import Bottom from '@/components/@common/Bottom';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import NOTIFY from '@/assets/icon/notify.png';
import ARROWRIGHT from '@/assets/icon/arrowRight.png';
import { MdOutlineCreate } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import userStore from '@/stores/userStore';
import { useProfile } from '@/hooks/profile/useProfile';
import { RequestPayParams, RequestPayResponse } from '@/types/model/iamport';
import Modal from '@/components/@common/Modal';
import { useState } from 'react';
import payment_icon from '@/assets/image/payment_icon_yellow_small.png';
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
  const { useUserProfile, usePostChargePoint } = useProfile();
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
  const [amount, setAmount] = useState<number>(0);

  const { mutate } = usePostChargePoint(amount, nickname);
  // 아임포트 결제
  const handleChargePoint = () => {
    window.IMP?.init('imp58677553'); // 발급받은 가맹점 식별코드

    if (!amount) {
      Toast.error('결제 금액을 확인해주세요');
      return;
    }
    const data: RequestPayParams = {
      pg: 'kakaopay',
      merchant_uid: `mid_${new Date().getTime()}`,
      name: '포인트 충전',
      amount: amount,
      buyer_name: userProfileInfo?.data.nickname,
      buyer_email: userProfileInfo?.data.email,
      // m_redirect_url: '/', 모바일 환경에서는 리다이렉트 url이 필수라 혹시몰라 주석처리
    };

    const callback = (response: RequestPayResponse) => {
      const { success } = response;
      if (success) {
        console.log(response);
        mutate();
        setShowChargeModal(false);
      } else {
        console.log(response);
      }
    };
    window.IMP?.request_pay(data, callback);
  };

  return (
    <>
      {/* 포인트 충전 모달 */}
      {showChargeModal && (
        <Modal width="300px" height="auto" title="포인트 충전" onClose={() => setShowChargeModal(false)}>
          <div className="w-full flex flex-col justify-center items-center px-8 py-2">
            <div className="w-full">
              <p className="font-bold">충전 금액</p>
              <input
                type="text"
                name="amount"
                onChange={e => setAmount(Number(e.target.value))}
                placeholder="충전할 금액을 입력해주세요"
                className="w-full outline-none border-b p-2"
              ></input>
            </div>
            <div className="w-full pt-6 pb-2">
              <p className="font-bold pb-3">결제 수단 선택</p>
              <div className="flex gap-2">
                <input type="radio" className="w-4" />
                <img src={payment_icon} className="h-6" />
              </div>
            </div>
            <div className="w-full flex gap-5 py-5">
              <button
                className="w-full bg-BID_SUB_GRAY text-white px-4 py-2 rounded-2xl"
                onClick={() => setShowChargeModal(false)}
              >
                취소
              </button>
              <button
                className="w-full bg-BID_MAIN text-white px-4 py-2 rounded-2xl"
                onClick={() => {
                  handleChargePoint();
                }}
              >
                결제
              </button>
            </div>
          </div>
        </Modal>
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
              <button className="px-2 py-1 text-gray-400">환급</button>
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
