const LoginPage = () => {
  return (
    <>
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <img src="/src/assets/image/logo.png"></img>
        <div className="font-bold w-4/5 pt-24 flex flex-col gap-5">
          <div className="flex items-center gap-3 border border-[#E4E4E4] p-2 px-BID_P rounded-xl">
            <img src="/src/assets/image/kakao.png"></img>
            <div className="absolute translate-x-1/2 pl-1">카카오로 시작하기</div>
          </div>
          <div className="flex items-center gap-3 border border-[#E4E4E4] p-2 px-BID_P rounded-xl">
            <img src="/src/assets/image/naver.png"></img>
            <div className="absolute translate-x-1/2 pl-1">네이버로 시작하기</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
