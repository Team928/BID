import { useProfile } from '@/hooks/profile/useProfile';
import amountStore from '@/stores/amountStore';
import userStore from '@/stores/userStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentRedirectPage = () => {
  const queryParams = new URLSearchParams(location.search);
  const impSuccess = queryParams.get('imp_success'); // 인가 코드
  const navigate = useNavigate();

  const { amount, setAmount } = amountStore();
  const { nickname } = userStore();
  const { usePostChargePoint } = useProfile();
  const { mutate } = usePostChargePoint(amount, nickname);

  useEffect(() => {
    if (impSuccess === 'true') {
      mutate();
      setAmount(0);
      navigate('/profile');
    }
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center relative">
      <div>결제 진행중입니다...</div>
    </div>
  );
};

export default PaymentRedirectPage;
