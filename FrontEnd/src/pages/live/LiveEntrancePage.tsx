import Header, { IHeaderInfo } from '@/components/@common/header';
import LivePermissonModal from '@/components/live/Modal/LivePermissonModal';
import { icons } from '@/constants/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface IBeforeLiveOptionFlag {
  video: boolean;
  audio: boolean;
}

const LiveEntrancePage = () => {
  const navigate = useNavigate();

  // @TODO: 라이브 진행되기 이전 페이지로 설정
  const info: IHeaderInfo = {
    left: icons.BACK,
    center: '라이브 입장하기',
    right_1: null,
    right_2: null,
    prev: '/',
  };

  // 라이브 입장 함수
  const handleEnterLive = () => {
    // @TODO: /live/세션id로 이동
    navigate('/live');
  };

  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="w-full h-full">
      <Header info={info} />
      <div className="w-full h-auto px-8 py-4 relative top-12"></div>
      <div className="w-full h-[52px] px-12 mb-4 absolute bottom-2">
        <button type="button" className="blueBtn" onClick={handleEnterLive}>
          입장하기
        </button>
      </div>
      {/* main에서 허용 */}
      {open && <LivePermissonModal onClose={() => setOpen(false)} />}
    </div>
  );
};

export default LiveEntrancePage;
