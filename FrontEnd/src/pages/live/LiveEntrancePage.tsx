import Header, { IHeaderInfo } from '@/components/@common/Header';
import Toggle from '@/components/@common/Toggle';
import BACK from '@/assets/icon/back.png';
import { PARTICIPANT_TYPE, TRANSACTION_TYPE } from '@/constants/liveType';
import useLiveStore from '@/stores/userLiveStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface IBeforeLiveOptionFlag {
  video: boolean;
  audio: boolean;
}

const LiveEntrancePage = () => {
  const navigate = useNavigate();
  const { onMike, onCamera, setOnCamera, setOnMike } = useLiveStore();

  // 일단 테스트 할때는 여기서 변경
  const tType = 'purchase';
  const pType = 'saler';

  const [isPossibleToggle, setIsPossibleToggle] = useState<IBeforeLiveOptionFlag>({
    video: false,
    audio: false,
  });

  const handleToggle = (type: 'camera' | 'mike') => {
    if (type === 'camera') {
      setOnCamera(!onCamera);
    } else if (type === 'mike') {
      setOnMike(!onMike);
    }
  };

  const info: IHeaderInfo = {
    left: <img src={BACK} />,
    center: '라이브 입장하기',
    right_1: null,
    right_2: null,
    prev: '/',
  };

  const checkType = () => {
    if (tType === TRANSACTION_TYPE.PURCHASE) {
      if (pType === PARTICIPANT_TYPE.SELLER) {
        setIsPossibleToggle(prev => {
          return {
            ...prev,
            audio: true,
            video: true,
          };
        });
      }
    } else if (tType === TRANSACTION_TYPE.SALE) {
      if (pType === PARTICIPANT_TYPE.SELLER) {
        setIsPossibleToggle(prev => {
          return {
            ...prev,
            video: true,
          };
        });
      } else if (pType === PARTICIPANT_TYPE.BUYER) {
        setIsPossibleToggle(prev => {
          return {
            ...prev,
            audio: true,
            video: true,
          };
        });
      }
    }
  };

  const handleEnterLive = () => {
    if (tType === TRANSACTION_TYPE.PURCHASE) {
      navigate('/live/buy/1');
    } else if (tType === TRANSACTION_TYPE.SALE) {
      navigate('/live/sale/1');
    }
  };

  useEffect(() => {
    checkType();
  }, []);

  return (
    <div className="w-full h-full">
      <Header info={info} />
      <div className="w-full h-auto px-8 py-4 relative top-12">
        {isPossibleToggle.video && (
          <div className="flex justify-between py-1">
            <div className="flex items-center">
              <span className="pl-2">비디오 켜짐</span>
            </div>
            <Toggle isOn={onCamera} handleToggle={() => handleToggle('camera')} />
          </div>
        )}
        {isPossibleToggle.audio && (
          <div className="flex justify-between py-1">
            <div className="flex items-center">
              <span className="pl-2">오디오 켜짐</span>
            </div>
            <Toggle isOn={onMike} handleToggle={() => handleToggle('mike')} />
          </div>
        )}
      </div>
      <div className="w-full h-[52px] px-8 mb-4 absolute bottom-2">
        <button type="button" className="blueBtn" onClick={handleEnterLive}>
          입장하기
        </button>
      </div>
    </div>
  );
};

export default LiveEntrancePage;
