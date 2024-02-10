import naver from '@/assets/image/naver.png';

export default function NaverLogin() {

    const CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID
    const REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI
    const state = `bid_test`
    const link = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=${state}&redirect_uri=${REDIRECT_URI}`;

    const loginHandler = () => {
        window.location.href = link;
    }

    return (
        <>
        <div className="flex items-center gap-3 border border-[#E4E4E4] p-2 px-BID_P rounded-xl">
            <img src={naver}></img>
            <div onClick={loginHandler} className="absolute translate-x-1/2 pl-1">네이버로 시작하기</div>
          </div>
        </>
    )
}