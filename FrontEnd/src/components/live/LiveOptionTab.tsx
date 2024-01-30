import useLiveStore from '@/stores/userLiveStore';
import { GoPerson } from 'react-icons/go';
import { PiChatsTeardrop } from 'react-icons/pi';
import { RxExit } from 'react-icons/rx';
import { TbCamera, TbCameraOff, TbMicrophone, TbMicrophoneOff } from 'react-icons/tb';
export interface ILiveOptionInfo {
  type: 'camera' | 'audio' | 'chat' | 'participants' | 'exit';
  icon: JSX.Element;
}

const LiveOptionTab = () => {
  const { onCamera, onMike, setOnCamera, setOnMike } = useLiveStore();

  const liveOption = {
    camera: {
      type: 'camera',
      icon: onCamera ? <TbCamera size={35} color={'white'} /> : <TbCameraOff size={35} color={'white'} />,
    },
    audio: {
      type: 'audio',
      icon: onMike ? <TbMicrophone size={35} color={'white'} /> : <TbMicrophoneOff size={35} color={'white'} />,
    },
    chat: {
      type: 'chat',
      icon: <PiChatsTeardrop size={35} style={{ strokeWidth: '4px' }} color={'white'} />,
    },
    participants: {
      type: 'participants',
      icon: <GoPerson size={35} style={{ strokeWidth: '0.5px' }} color={'white'} />,
    },
    exit: {
      type: 'exit',
      icon: <RxExit size={30} style={{ strokeWidth: '0.6px' }} color="white" />,
    },
  };
  const liveOptionInfo = [
    liveOption.camera,
    liveOption.audio,
    liveOption.chat,
    liveOption.participants,
    liveOption.exit,
  ];

  // @TODO: 사용자에 따라 메뉴 다르게
  const handleOption = (type: string) => {
    switch (type) {
      case 'camera': {
        setOnCamera(!onCamera);
        break;
      }
      case 'audio': {
        setOnMike(!onMike);
        break;
      }
      case 'chat': {
        // @TODO: 채팅창 on
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
    <div className="w-full h-full p-2 relative z-[5]">
      <div className="w-8 h-[3px] bg-white/55 absolute left-1/2 top-3 rounded-full translate-x-mHalf">&nbsp;</div>
      <div className="bg-black/50 grid grid-cols-5 place-items-center px-4 pb-2 pt-3 rounded-3xl">
        {liveOptionInfo.map(info => {
          return (
            <button
              key={info.type}
              value={info.type}
              className={`liveBtn ${info.type === 'exit' ? 'bg-red-500 hover:bg-red-600' : 'bg-[#D9D9D9]/50 hover:bg-[#D9D9D9]/80'}`}
              onClick={e => handleOption(e.currentTarget.value)}
            >
              {info.icon}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LiveOptionTab;
