import Modal from '@/components/@common/Modal';
import { MODAL_TITLE } from '@/constants/modalTitle';
import ParrarelModalButtons from './ParrarelModalButtons';

const RequestSalePriceModal = ({ onClose }: { onClose: () => void }) => {
  // 현재 구매 희망가
  const currentBuyPrice = 50000;

  return (
    <Modal width="280px" height="auto" title={MODAL_TITLE.REQUEST_SALE_PRICE} onClose={onClose}>
      <div className="px-6 pt-1 pb-6">
        {/* @TODO: input component */}
        <div className="bg-white w-full h-12 py-1 flex items-center border-BID-GRAY">
          <input
            type="number"
            placeholder="판매희망가를 입력해주세요"
            className="px-3 h-full outline-none border w-full rounded-full text-sm"
          ></input>
        </div>
        <div className="text-center text-sm">
          현재 구매 희망가 <span className="text-BID_MAIN font-semibold">{currentBuyPrice}원</span>
        </div>
      </div>
      {/* @TODO: 각 호출별 함수 로직 작성 */}
      <ParrarelModalButtons leftText="취소" rightText="입력" handleLeft={() => onClose()} handleRight={() => null} />
    </Modal>
  );
};

export default RequestSalePriceModal;
