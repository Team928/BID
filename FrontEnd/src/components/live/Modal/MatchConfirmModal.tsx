import Modal from '@/components/@common/Modal';
import { IMatchReqInfo } from '@/types/live';
import { TbHeartHandshake } from 'react-icons/tb';

const MatchConfirmModal = ({
  matchReqInfo,
  onClose,
  sendMatchConfirm,
}: {
  matchReqInfo: IMatchReqInfo;
  onClose: () => void;
  sendMatchConfirm: (nickname: string) => void;
}) => {
  return (
    <Modal width="300px" height="230px" title="매칭 확정하기" onClose={onClose}>
      <div className="mx-5 flex justify-center items-center flex-col">
        <div className="text-center py-4 text-gray-700 text-xs">
          <div className="font-semibold text-sm pb-2">
            <span className="text-BID_MAIN">{matchReqInfo.nickname}</span>님이{' '}
            <span className="text-BID_MAIN">{matchReqInfo.finalOfferPrice}</span>
            원으로 최종 구매를 원합니다. <br />
          </div>
          해당 내용이 합의된 판매 가격이 맞은지 확인 후, 매칭 확정하기 버튼을 선택해주세요.
          <br /> 매칭 확정 시 구매자와의 1:1 채팅방으로 이동합니다.
        </div>
        <button
          onClick={() => {
            sendMatchConfirm(matchReqInfo.nickname);
            onClose();
          }}
          className="float-right border border-red-500 p-2 rounded-md"
        >
          <div className="flex text-red-500 text-sm">
            <TbHeartHandshake size={20} color={'red'} /> 매칭 확정하기
          </div>
        </button>
      </div>
    </Modal>
  );
};

export default MatchConfirmModal;
