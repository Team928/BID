import { useNavigate } from 'react-router-dom';

const LiveEndPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="mx-10 flex flex-col items-center">
        <span className="font-bold text-xl">라이브 방송이 종료되었습니다.</span>
        <span className="pt-1.5 pb-5 text-sm text-BID_BLACK">
          본 방송 영상은 물품의 상세보기 페이지에서 다시 볼 수 있습니다.
        </span>
      </div>
      <div className="w-[40%] h-12">
        <button className="blueBtn" onClick={() => navigate('/')}>
          홈으로 가기
        </button>
      </div>
    </div>
  );
};

export default LiveEndPage;
