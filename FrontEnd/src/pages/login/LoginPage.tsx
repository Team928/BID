import logo from '@/assets/image/logo.png';
import naver from '@/assets/image/naver.png';
import KakaoLogin from '@/components/login/kakaoLogin';

const LoginPage = () => {

  return (
    <>
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <img src={logo}></img>
        <div className="font-bold w-4/5 pt-24 flex flex-col gap-5">
          <KakaoLogin />

          <a href="https://i10d208.p.ssafy.io/api/oauth2/authorization/naver">
            <div className="flex items-center gap-3 border border-[#E4E4E4] p-2 px-BID_P rounded-xl">
              <img src={naver}></img>
              <div className="absolute translate-x-1/2 pl-1">네이버로 시작하기</div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
