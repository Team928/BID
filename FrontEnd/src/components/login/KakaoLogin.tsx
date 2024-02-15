import kakao from '@/assets/image/kakao.png';

export default function KakaoLogin() {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <>
      <button className="flex items-center gap-3 border border-[#E4E4E4] p-2 px-BID_P rounded-xl">
        <img src={kakao}></img>
        <div onClick={loginHandler} className="absolute translate-x-1/2 pl-1">
          카카오로 시작하기
        </div>
      </button>
    </>
  );
}
