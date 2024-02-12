import BottomSheet from '@/components/@common/BottomSheet';
import PurchaseChat from '@/components/chat/LiveChat/PurchaseChat';

const ChattingBottomSheet = ({ onClose }: { onClose: () => void }) => {
  return (
    <BottomSheet height="600px" title="현재 참여중인 판매자" onClose={onClose}>
      <div>
        <PurchaseChat />
      </div>
    </BottomSheet>
  );
};

export default ChattingBottomSheet;
