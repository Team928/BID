import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PointRedirectPage = () => {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const info = {
    isSuccess: true,
  };
  useEffect(() => {
    if (query.get('imp_success') === 'true') {
      navigate('/profile', { state: info });
    }
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative">
      <div>충전이 진행중입니다...</div>
    </div>
  );
};

export default PointRedirectPage;
// ?imp_uid=imp_310572266702&merchant_uid=mid_1707797567445&imp_success=true
