import Modal from './Modal';
import { RequestPayParams, RequestPayResponse } from '@/types/model/iamport';
import { useProfile } from '@/hooks/profile/useProfile';
import { IUserProfile } from '@/types/profile';
import payment_icon from '@/assets/image/payment_icon_yellow_small.png';
import Toast from './Toast';
import amountStore from '@/stores/amountStore';

interface IPointChargeProps {
  setShowChargeModal: React.Dispatch<React.SetStateAction<boolean>>;
  userProfileInfo: IUserProfile | undefined;
}

const PointChargeModal = ({ setShowChargeModal, userProfileInfo }: IPointChargeProps) => {
  const { amount, setAmount } = amountStore();
  const { usePostChargePoint } = useProfile();
  const { mutate } = usePostChargePoint(amount, userProfileInfo!.nickname);

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
      buyer_name: userProfileInfo!.nickname,
      buyer_email: userProfileInfo!.email,
      m_redirect_url: 'https://i10d208.p.ssafy.io/payments/complete',
    };

    const callback = (response: RequestPayResponse) => {
      const { success } = response;
      if (success) {
        console.log(response);
        mutate();
        setAmount(0);
        setShowChargeModal(false);
      } else {
        console.log(response);
      }
    };
    window.IMP?.request_pay(data, callback);
  };

  return (
    <>
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
    </>
  );
};

export default PointChargeModal;
