import Accordian from '@/components/@common/Accordian';
import BottomSheet from '@/components/@common/BottomSheet';
import { ISellerInfo } from '@/types/live';

const ParticipantsBottomSheet = ({
  onClose,
  handleResign,
  participants,
}: {
  onClose: () => void;
  handleResign: (userId: number) => void;
  participants: ISellerInfo[];
}) => {
  return (
    <BottomSheet height="600px" title="참여중인 판매자" onClose={onClose}>
      <div className="pl-6 pb-2 text-sm text-gray-500">전체 {participants.length}명</div>
      {participants.map((info, idx) => {
        return (
          <div key={idx}>
            <Accordian titleContent={info.nickName}>
              <div className="grid grid-cols-4 px-3 py-6">
                <div className="col-span-3">
                  <div>
                    <span>판매 희망 가격</span>&nbsp;<span className="text-BID_MAIN">{info.offerPrice}</span>
                  </div>
                  <div>
                    <span className="text-[#929292]">{info.content}</span>
                  </div>
                </div>
                <div className="col-span-1">
                  <img src={`${import.meta.env.VITE_BASE_URL}static${info.image}`} alt="물건 사진" />
                </div>
              </div>
              <div className="text-right p-2">
                <button
                  type="button"
                  className="border border-red-500 px-2.5 py-0.5 rounded-lg text-red-500 hover:bg-red-100/50"
                  onClick={() => handleResign(info.userId)}
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
