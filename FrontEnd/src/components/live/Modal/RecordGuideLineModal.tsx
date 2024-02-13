import Modal from '@/components/@common/Modal';
import { MODAL_TITLE } from '@/constants/modalTitle';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { HiOutlineVideoCamera } from 'react-icons/hi2';
const RecordGuideLineModal = ({
  onClose,
  handleStartRecord,
}: {
  onClose: () => void;
  handleStartRecord: () => void;
}) => {
  return (
    <Modal width="320px" height="auto" title={MODAL_TITLE.START_RECORDING} onClose={onClose}>
      <div className="flex ite px-5 py-4 text-md">
        본 라이브 방송은 녹화가 진행됩니다. 원활한 라이브 진행을 위해 가이드라인이 안내됩니다.
      </div>
      <div className="flex px-5 py-2 text-sm text-BID_MAIN ">
        가이드라인은 총 6단계로 이루어져 있습니다. 각 단계는 건너 뛰기가 가능합니다.
      </div>
      <div className="p-5">
        <div className="font-bold py-1">가이드라인</div>
        <div className="bg-[#F0F9FF] p-2 rounded-md text-sm">
          <div className="flex items-center py-1.5">
            <FaRegCircleCheck color="#79C2F2" />
            <span className="pl-2">전면을 보여주세요.</span>
          </div>
          <div className="flex items-center py-1.5">
            <FaRegCircleCheck color="#79C2F2" />
            <span className="pl-2">후면을 보여주세요.</span>
          </div>
          <div className="flex items-center py-1.5">
            <FaRegCircleCheck color="#79C2F2" />
            <span className="pl-2">다각도로 보여주세요.</span>
            <span className="text-xs text-gray-400"> (360도 회전)</span>
          </div>
          <div className="flex items-center py-1.5">
            <FaRegCircleCheck color="#79C2F2" />
            <span className="pl-2">작동 상태를 보여주세요.</span>
          </div>
          <div className="flex items-center py-1.5">
            <FaRegCircleCheck color="#79C2F2" />
            <span className="pl-2">다른 물건과의 크기를 비교해주세요.</span>
          </div>
          <span className="text-xs text-gray-400 pl-5">
            {' '}
            (해당 물건의 사이즈를 비교할 만한 물건과 크기를 <br />
          </span>
          <span className="text-xs text-gray-400 pl-5">비교해주세요.)</span>
          <div className="flex items-center py-1.5">
            <FaRegCircleCheck color="#79C2F2" />
            <span className="pl-2">
              <span>물건의 세부 사항을 보여주세요.</span>
            </span>
          </div>
          <span className="text-xs text-gray-400 pl-5">
            {' '}
            (질감, 스크래치 등을 클로즈업 하여 화면에 비춰
            <br />
          </span>
          <span className="text-xs text-gray-400 pl-5">주세요.)</span>
        </div>
      </div>
      <div className="w-full h-10 mb-4 flex justify-end pr-4">
        <button
          type="button"
          className="border border-[#FF3939] p-2 rounded-md text-[#FF3939] flex items-center"
          onClick={handleStartRecord}
        >
          <HiOutlineVideoCamera size="24" />
          <span className="pl-2">시작하기</span>
        </button>
      </div>
    </Modal>
  );
};

export default RecordGuideLineModal;
