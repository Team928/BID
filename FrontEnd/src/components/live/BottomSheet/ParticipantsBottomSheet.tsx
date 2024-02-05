import Accordian from '@/components/@common/Accordian';
import BottomSheet from '@/components/@common/BottomSheet';
import iphone from '../../../assets/image/iphone.png';
import { IParticipantInfo } from './SpeakListBottomSheet';

const ParticipantsBottomSheet = ({
  onClose,
  participants,
}: {
  onClose: () => void;
  participants: IParticipantInfo[];
}) => {
  return (
    <BottomSheet height="600px" title="현재 참여중인 판매자" onClose={onClose}>
      {participants.map(info => {
        return (
          <div>
            <Accordian titleContent={'중고 짱좋아'}>
              <div className="grid grid-cols-3 px-3 py-6">
                <div className="col-span-2">
                  <div>
                    <span>판매 희망 가격</span>&nbsp;<span className="text-BID_MAIN">{info.offerPrice}</span>
                  </div>
                  <div>
                    <span className="text-[#929292]">{info.content}</span>
                  </div>
                </div>
                <div className="col-span-1">
                  <img src={iphone} alt="물건 사진" />
                </div>
              </div>
              <div className="text-right p-2">
                <button
                  type="button"
                  className="border border-red-500 px-2.5 py-0.5 rounded-lg text-red-500 hover:bg-red-100/50"
                >
                  강퇴
                </button>
              </div>
            </Accordian>
          </div>
        );
      })}
    </BottomSheet>
  );
};

export default ParticipantsBottomSheet;
