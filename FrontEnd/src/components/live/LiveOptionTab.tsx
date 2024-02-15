import { PARTICIPANT_TYPE } from '@/constants/liveType';
import useLiveStore from '@/stores/userLiveStore';
import { GoPerson } from 'react-icons/go';
import { PiChatsTeardrop, PiHandWaving } from 'react-icons/pi';
import { RiAuctionLine } from 'react-icons/ri';
import { TbCamera, TbCameraOff, TbHeartHandshake, TbMicrophone, TbMicrophoneOff } from 'react-icons/tb';

export interface ILiveOptionInfo {
  type: 'camera' | 'audio' | 'chat' | 'participants' | 'exit' | 'speak' | 'match';
  icon: JSX.Element;
}

const LiveOptionTab = ({
  pType,
  handleMike,
  handleCamera,
  handleSpeak,
  handleChat,
  handleRequestSalePrice,
  handleParticipants,
  handleMatch,
}: {
  pType: string;
  handleMike: () => void;
  handleCamera: () => void;
  handleSpeak: () => void;
  handleChat: () => void;
  handleRequestSalePrice?: () => void;
  handleParticipants?: () => void;
  handleMatch?: () => void;
}) => {
  const { onCamera, onMike } = useLiveStore();

  const liveOption = {
    camera: {
      type: 'camera',
      icon: onCamera ? (
        <TbCamera size={32} color={'#D9D9D9'} style={{ strokeWidth: '1.5px' }} />
      ) : (
        <TbCameraOff size={32} color={'#D9D9D9'} style={{ strokeWidth: '1.5px' }} />
      ),
    },
    audio: {
      type: 'audio',
      icon: onMike ? (
        <TbMicrophone size={32} color={'#D9D9D9'} style={{ strokeWidth: '1.5px' }} />
      ) : (
        <TbMicrophoneOff size={32} color={'#D9D9D9'} style={{ strokeWidth: '1.5px' }} />
      ),
    },
    chat: {
      type: 'chat',
      icon: <PiChatsTeardrop size={32} color={'#D9D9D9'} style={{ strokeWidth: '1.5px' }} />,
    },
    participants: {
      type: 'participants',
      icon: <GoPerson size={32} color={'#D9D9D9'} />,
    },
    match: {
      type: 'match',
      icon: <TbHeartHandshake size={32} color={'#D9D9D9'} />,
    },
    speak: {
      type: 'speak',
      icon: <PiHandWaving size={32} color={'#D9D9D9'} />,
    },
    auction: {
      type: 'auction',
      icon: <RiAuctionLine size={32} color={'#D9D9D9'} />,
    },
  };

  let liveOptionInfo;

  // 구매자
  if (pType === PARTICIPANT_TYPE.BUYER) {
    liveOptionInfo = [liveOption.speak, liveOption.audio, liveOption.chat, liveOption.participants, liveOption.match];
  }
  // 판매자
  else {
    liveOptionInfo = [liveOption.speak, liveOption.camera, liveOption.audio, liveOption.chat, liveOption.auction];
  }

  const handleOption = (type: string) => {
    switch (type) {
      case 'camera': {
        handleCamera();
        break;
      }
      case 'audio': {
        handleMike();
        break;
      }
      case 'chat': {
        handleChat();
        break;
      }
      case 'participants': {
        if (handleParticipants) {
          handleParticipants();
        }
        break;
      }
      case 'speak': {
        handleSpeak();
        break;
      }
      case 'auction': {
        if (handleRequestSalePrice) {
          handleRequestSalePrice();
        }
        break;
      }
      case 'match': {
        if (handleMatch) {
          handleMatch();
        }
        break;
      }
    }
  };

  return (
    <div className="w-full h-full p-2 relative z-[5]">
      <div className="grid grid-cols-5 place-items-center px-2 pb-2 pt-3 ">
        {liveOptionInfo.map(info => {
          return (
            <button
              key={info.type}
              value={info.type}
              className={`liveBtn ${info.type === 'match' ? 'bg-red-600 hover:bg-red-700' : info.type === 'auction' ? 'bg-BID_MAIN hover:bg-BID_HOVER_MAIN' : 'bg-white/20 hover:bg-white/40'}`}
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
