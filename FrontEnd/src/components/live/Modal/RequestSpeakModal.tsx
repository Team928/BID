import Modal from '@/components/@common/Modal';
import { MODAL_TITLE } from '@/constants/modalTitle';
import ParrarelModalButtons from './ParrarelModalButtons';

const RequestSpeakModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal width="280px" height="auto" title={MODAL_TITLE.REQUEST_SPEAK} onClose={onClose}>
      <div className="flex justify-center items-center mt-3 mb-4">발언권을 신청하시겠습니까?</div>
      {/* @TODO: 각 호출별 함수 로직 작성 */}
      <ParrarelModalButtons leftText="취소" rightText="신청" handleLeft={() => onClose()} handleRight={() => null} />
    </Modal>
  );
};

export default RequestSpeakModal;
