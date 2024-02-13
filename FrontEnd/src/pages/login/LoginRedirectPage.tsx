import userStore from '@/stores/userStore';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LoginRedirectPage = () => {
  const navigate = useNavigate();
  const [serchParams] = useSearchParams();
  const { loginUser } = userStore();

  useEffect(() => {
    const userId = Number(serchParams.get('id'));
    const accessToken = serchParams.get('accessToken')!;
    const refreshToken = serchParams.get('refreshToken')!;

    // 이미 회원가입이 되어있는 유저라면
    if (serchParams.get('nickname')) {
      const nickname = serchParams.get('nickname')!;
      const area = [serchParams.get('area')!];
      loginUser({
        userId,
        accessToken,
        refreshToken,
        nickname,
        area,
      });

      navigate('/');
    } else {
      // 그게 아니라면 회원가입 페이지로
      loginUser({ accessToken: accessToken, area: [], nickname: '', refreshToken: refreshToken, userId: userId });
      navigate('/signup');
    }
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative">
      <div>로그인 진행중입니다...</div>
    </div>
  );
};

export default LoginRedirectPage;
