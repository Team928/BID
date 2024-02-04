import { AiOutlineAudio, AiOutlineAudioMuted } from 'react-icons/ai';
import { LuHand } from 'react-icons/lu';
import BottomSheet from '../@common/BottomSheet';

export interface IParticipantInfo {
  name: string;
  isRequestSpeak: boolean;
  onMike: boolean;
  hopeSalePrice: number;
  discription: string;
  image: string;
}

const SpeakListBottomSheet = ({ speakInfo, onClose }: { speakInfo: IParticipantInfo[]; onClose: () => void }) => {
  return (
    <BottomSheet height="400px" title="발언권" onClose={onClose}>
      <div className="w-full px-8 overflow-y-scroll">
        {speakInfo.map((info, idx) => {
          return (
            <div key={idx} className="w-full h-11 flex justify-between items-center">
              <span className="text-sm">{info.name}</span>
              <div className="flex">
                <div className="mx-3">{info.isRequestSpeak && <LuHand size={20} color="#3498DB" />}</div>
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
