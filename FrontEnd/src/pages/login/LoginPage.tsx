import logo from '@/assets/image/logo.png';
import KakaoLogin from '@/components/login/KakaoLogin';
import NaverLogin from '@/components/login/NaverLogin';

const LoginPage = () => {
  return (
    <>
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <img src={logo}></img>
        <div className="w-4/5 pt-24 flex flex-col gap-5">
          <KakaoLogin />
          <NaverLogin />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
