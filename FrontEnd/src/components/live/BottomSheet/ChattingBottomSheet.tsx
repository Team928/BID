import BottomSheet from '@/components/@common/BottomSheet';
import PurchaseChat from '@/components/chat/LiveChat/PurchaseChat';

const ChattingBottomSheet = ({ onClose }: { onClose: () => void }) => {
  return (
    <BottomSheet height="600px" title="채팅하기" onClose={onClose}>
      <div>
        <PurchaseChat />
      </div>
    </BottomSheet>
  );
};

export default ChattingBottomSheet;
