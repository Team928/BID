import Toggle from '@/components/@common/Toggle';
import Header, { IHeaderInfo } from '@/components/@common/header';
import LivePermissonModal from '@/components/live/Modal/LivePermissonModal';
import { icons } from '@/constants/icons';
import { PARTICIPANT_TYPE, TRANSACTION_TYPE } from '@/constants/liveType';
import { useEffect, useState } from 'react';
import { AiOutlineAudio } from 'react-icons/ai';
import { IoCameraOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export interface IBeforeLiveOptionFlag {
  video: boolean;
  audio: boolean;
}

const LiveEntrancePage = () => {
  const navigate = useNavigate();

  const [toggleFlag, setToggleFlag] = useState<IBeforeLiveOptionFlag>({
    video: false,
    audio: false,
  });

  const [isPossibleToggle, setIsPossibleToggle] = useState<IBeforeLiveOptionFlag>({
    video: false,
    audio: false,
  });

  const handleToggle = (type: keyof IBeforeLiveOptionFlag) => {
    setToggleFlag(prev => {
      return {
        ...prev,
        [type]: !prev[`${type}`],
      };
    });
  };

  // @TODO: 라이브 진행되기 이전 페이지로 설정
  const info: IHeaderInfo = {
    left: icons.BACK,
    center: '라이브 입장하기',
    right_1: null,
    right_2: null,
    prev: '/',
  };

  // 경매 = buy
  // 역경매 = sell

  // @TODO: 전역으로 저장
  const tType = TRANSACTION_TYPE.BUY;
  const pType = PARTICIPANT_TYPE.SELLER;

  // @TODO: 판별하기
  // 경매 판매자 : 물건을 업로드 한 사람의 id === 내 id
  // 경매 구매자 : 물건을 업로드 한 사람이 아닌 그냥 참가하기를 클릭한 사람

  // 역경매 판매자 : 삽니다 글을 업로드 한 사람이 아닌 사람 중에 참여 신청 리스트에 자신의 아이디가 존재하는 사람
  // 역경매 구매자 : 글 작성자 id === 내 id

  const checkType = () => {
    if (tType === TRANSACTION_TYPE.BUY) {
      // 경매 판매자
      if (pType === PARTICIPANT_TYPE.SELLER) {
        // 카메라, 음소거 설정 가능
        setIsPossibleToggle(prev => {
          return {
            ...prev,
            audio: true,
            video: true,
          };
        });
      }

      // 경매 구매자
      else if (pType === PARTICIPANT_TYPE.BUYER) {
        const liveId = '1';
        // 라이브 진행 중이면 라이브 화면 이동
        navigate(`/live/buy/${liveId}`);
      }
    } else if (tType === TRANSACTION_TYPE.SELL) {
      // 역경매 판매자
      if (pType === PARTICIPANT_TYPE.SELLER) {
        // 카메라 설정 가능
        setIsPossibleToggle(prev => {
          return {
            ...prev,
            video: true,
          };
        });
      }

      // 역경매 구매자
      else if (pType === PARTICIPANT_TYPE.BUYER) {
        // 카메라, 음소거 설정 가능
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

  // 라이브 입장 함수
  const handleEnterLive = () => {
    // @TODO: /live/세션id로 이동
    navigate('/live');
  };

  useEffect(() => {
    checkType();
  }, []);

  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="w-full h-full">
      <Header info={info} />
      <div className="w-full h-auto px-8 py-4 relative top-12">
        {isPossibleToggle.video && (
          <div className="flex justify-between py-1">
            <div className="flex items-center">
              <IoCameraOutline size={24} color={'#545454'} />
              <span className="font-semibold pl-2">비디오 켜짐</span>
            </div>
            <div>
              <Toggle isOn={toggleFlag.video} handleToggle={() => handleToggle('video')} />
            </div>
          </div>
        )}
        {isPossibleToggle.audio && (
          <div className="flex justify-between py-1">
            <div className="flex items-center">
              <AiOutlineAudio size={24} color={'#545454'} />
              <span className="font-semibold pl-2">오디오 켜짐</span>
            </div>
            <div>
              <Toggle isOn={toggleFlag.audio} handleToggle={() => handleToggle('audio')} />
            </div>
          </div>
        )}
      </div>
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
