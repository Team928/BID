import { GoBroadcast } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

const LiveEndPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black/80">
      <div className="mx-10 flex flex-col items-center text-white/80">
        <GoBroadcast size="60" />
        <span className="font-bold text-xl py-3">라이브 방송 종료</span>
        <span className="pt-1.5 pb-5 text-sm text-center text-white/60">
          본 방송 영상은 해당 거래의 <br />
          상세보기 페이지에서 다시 볼 수 있습니다.
        </span>
      </div>
      <div className="w-[40%] h-12">
        <button
          className="w-full h-full rounded-2xl shadow-sm text-white/80 text-md bg-black/20 hover:bg-black/30"
          onClick={() => navigate('/')}
        >
          홈으로 이동하기
        </button>
      </div>
    </div>
  );
};

export default LiveEndPage;
