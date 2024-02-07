import { ISellerInfo } from '@/pages/live/PurchaseLivePage';
import { AiOutlineAudio, AiOutlineAudioMuted } from 'react-icons/ai';
import { LuHand } from 'react-icons/lu';
import BottomSheet from '../../@common/BottomSheet';

const SpeakListBottomSheet = ({
  speakInfo,
  onClose,
  handleResolveSpeakRequest,
}: {
  speakInfo: ISellerInfo[];
  onClose: () => void;
  handleResolveSpeakRequest: (userId: number, nickName: string) => void;
}) => {
  console.log(speakInfo);

  const handleResolve = (userId: number, nickName: string) => {
    if (window.confirm(`${nickName}님께 발언권을 주시겠습니까?`)) {
      handleResolveSpeakRequest(userId, nickName);
      onClose();
    }
  };

  return (
    <BottomSheet height="400px" title="발언권" onClose={onClose}>
      <div className="w-full px-8">
        {speakInfo.map((info, idx) => {
          return (
            <div key={idx} className="w-full h-11 flex justify-between items-center">
              <span className="text-sm">{info.nickName}</span>
              <div className="flex">
                <div className="mx-3 cursor-pointer" onClick={() => handleResolve(info.userId, info.nickName)}>
                  {info.isRequestSpeak && <LuHand size={20} color="#3498DB" />}
                </div>
                <div>
                  {info.onMike ? <AiOutlineAudio size={20} /> : <AiOutlineAudioMuted size={20} color="#D9D9D9" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </BottomSheet>
  );
};

export default SpeakListBottomSheet;
