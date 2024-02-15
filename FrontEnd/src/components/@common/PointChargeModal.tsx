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
  const { mutate } = usePostChargePoint(Number(amount), userProfileInfo!.nickname);

  // 아임포트 결제
  const handleChargePoint = () => {
    window.IMP?.init('imp58677553'); // 발급받은 가맹점 식별코드
    console.log(amount);
    if (!amount) {
      Toast.error('결제 금액을 확인해주세요');
      return;
    }
    const data: RequestPayParams = {
      pg: 'kakaopay',
      merchant_uid: `mid_${new Date().getTime()}`,
      name: '포인트 충전',
      amount: Number(amount),
      buyer_name: userProfileInfo!.nickname,
      buyer_email: userProfileInfo!.email,
      m_redirect_url: 'https://i10d208.p.ssafy.io/payments/complete',
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
      <Modal width="300px" height="auto" title="포인트 충전" onClose={() => setShowChargeModal(false)}>
        <div className="w-full flex flex-col justify-center items-center px-8 py-2">
          <div className="w-full">
            <p className="font-bold text-xs">충전금액</p>
            <input
              type="text"
              name="amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="충전할 금액을 입력해주세요"
              className="w-full outline-none border-b p-2 text-sm"
            ></input>
          </div>
          <div className="w-full pt-5">
            <p className="font-bold pb-3 text-xs">결제수단</p>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                <input type="radio" name="pay" className="w-4" />
                <img src={payment_icon} className="h-5" />
                <p className="text-xs">카카오 페이</p>
              </div>
              <div className="flex gap-2 items-center">
                <input type="radio" name="pay" className="w-4" />
                <p className="text-xs">카드 결제(신용/체크)</p>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <div className="w-full pt-4 border-t text-left">
              <p className="font-bold pb-3 text-xs">구매조건을 모두 확인하였으며, 결제에 동의합니다</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input type="radio" className="w-4" />
                  <p className="text-xs">개인 정보 수집 동의(필수)</p>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" className="w-4" />
                  <p className="text-xs">전자금융거래 이용약관 동의(필수)</p>
                </div>
              </div>
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
