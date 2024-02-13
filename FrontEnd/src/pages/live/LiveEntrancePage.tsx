import Header, { IHeaderInfo } from '@/components/@common/Header';
import Toggle from '@/components/@common/Toggle';
import { PARTICIPANT_TYPE } from '@/constants/liveType';
import useLiveStore from '@/stores/userLiveStore';
import { IoIosArrowBack } from 'react-icons/io';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export interface IBeforeLiveOptionFlag {
  video: boolean;
  audio: boolean;
}

const LiveEntrancePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const { onMike, onCamera, pType, setOnCamera, setOnMike } = useLiveStore();

  const handleToggle = (type: 'camera' | 'mike') => {
    if (type === 'camera') {
      setOnCamera(!onCamera);
    } else if (type === 'mike') {
      setOnMike(!onMike);
    }
  };

  const info: IHeaderInfo = {
    left: <IoIosArrowBack />,
    center: '라이브 입장하기',
    right_1: null,
    right_2: null,
  };

  const handleEnterLive = () => {
    if (pType === 'buyer') {
      navigate(`/live/purchase/${id}`, {
        state: {
          title: state.title,
        },
      });
    } else {
      setOnMike(false);
      navigate(`/live/purchase/${id}`, {
        state: {
          title: state.title,
          myForm: state.myForm,
        },
      });
    }
  };

  return (
    <div className="w-full h-full max-w-[500px]">
      <Header info={info} />
      <div className="w-full h-auto px-8 py-4 relative top-12">
        <div className="flex justify-between py-1">
          <div className="flex items-center">
            <span className="pl-2">비디오 켜짐</span>
          </div>
          <Toggle isOn={onCamera} handleToggle={() => handleToggle('camera')} />
        </div>
        {pType === PARTICIPANT_TYPE.BUYER && (
          <div className="flex justify-between py-1">
            <div className="flex items-center">
              <span className="pl-2">오디오 켜짐</span>
            </div>
            <Toggle isOn={onMike} handleToggle={() => handleToggle('mike')} />
          </div>
        )}
      </div>
      <div className="w-full h-[52px] px-8 mb-4 absolute bottom-2 max-w-[500px]">
        <button type="button" className="blueBtn" onClick={handleEnterLive}>
          입장하기
        </button>
      </div>
    </div>
  );
};

export default LiveEntrancePage;
