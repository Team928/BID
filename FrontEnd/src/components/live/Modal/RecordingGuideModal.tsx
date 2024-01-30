import Modal from '@/components/@common/Modal';
import { MODAL_TITLE } from '@/constants/modalTitle';

const RecordingGuideModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal width="300px" height="auto" title={MODAL_TITLE.START_RECORDING} onClose={onClose}>
      <div className="flex ite px-8 py-4">
        지금부터 라이브 녹화를 시작합니다. 가이드를 따라서 상품의 상세 정보를 보여주세요.
      </div>
      <div className="w-full h-10 px-12 mb-4">
        <button type="button" className="blueBtn">
          시작하기
        </button>
      </div>
    </Modal>
  );
};

export default RecordingGuideModal;
