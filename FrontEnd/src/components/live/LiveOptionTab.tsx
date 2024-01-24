import { icons } from '@/constants/icons';
import { useState } from 'react';

export type LiveTabOptionType = 'camera' | 'audio' | 'chat' | 'participants' | 'exit';

export interface ILiveOptionInfo {
  type: LiveTabOptionType;
  onIcon?: JSX.Element;
  offIcon?: JSX.Element;
  handleClick: () => void;
}

const LiveOptionTab = () => {
  const liveOptionInfo: ILiveOptionInfo[] = [
    {
      type: 'camera',
      onIcon: icons.CAMERA,
      offIcon: icons.CAMERA_SLASH,
      handleClick: () => handleOption('camera'),
    },
    {
      type: 'audio',
      onIcon: icons.MICROPHONE,
      offIcon: icons.MICROPHONE_SLASH,
      handleClick: () => handleOption('audio'),
    },
    {
      type: 'chat',
      onIcon: icons.CHAT,
      handleClick: () => null,
    },
    {
      type: 'participants',
      onIcon: icons.USER,
      handleClick: () => null,
    },
  ];

  const [cameraFlag, setCameraFlag] = useState<boolean>(false);
  const [audioFlag, setAudioFlag] = useState<boolean>(false);

  const handleOption = (type: LiveTabOptionType) => {
    switch (type) {
      case 'camera': {
        setCameraFlag(!cameraFlag);
        break;
      }
      case 'audio': {
        setAudioFlag(!audioFlag);
        break;
      }
      case 'chat': {
        // @TODO: 채팅창 슬라이드로 열기
        break;
      }
      case 'participants': {
        // @TODO: 참가자 리스트 보기
        break;
      }
      case 'exit': {
        // @TODO: 방송 종료 or 나가기
        break;
      }
    }
  };

  return (
    <div className="w-full h-full p-2 relative">
      <div className="w-8 h-[3px] bg-white/55 absolute left-1/2 top-3 rounded-full translate-x-mHalf">&nbsp;</div>
      <div className="bg-white/30 grid grid-cols-5 place-items-center p-1 pb-2 pt-3 rounded-3xl">
        {liveOptionInfo.map(info => {
          return (
            <button
              key={info.type}
              className="flex justify-center items-center rounded-full bg-white/50 w-16 h-16"
              onClick={() => handleOption(info.type)}
            >
              {info.onIcon}
            </button>
          );
        })}
        <div className="flex justify-center items-center rounded-full bg-white/50 w-16 h-16 bg-red-500">
          {icons.SIGN_OUT}
        </div>
      </div>
    </div>
  );
};

export default LiveOptionTab;
