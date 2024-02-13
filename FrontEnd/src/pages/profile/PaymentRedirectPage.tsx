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
  const { mutate, data } = usePostChargePoint(amount, nickname);

  useEffect(() => {
    console.log('amount' + amount);
  }, [amount]);

  useEffect(() => {
    if (impSuccess === 'true') {
      console.log('impSuccess' + impSuccess);
      mutate();
    }
  }, []);

  useEffect(() => {
    console.log('data' + data);
    if (data && data.status === 200) {
      setAmount(0);
      navigate('/profile');
    }
  }, [data]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative">
      <div>결제 진행중입니다...</div>
    </div>
  );
};

export default PaymentRedirectPage;
