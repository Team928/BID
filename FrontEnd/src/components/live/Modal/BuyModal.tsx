import Modal from '@/components/@common/Modal';
import { MODAL_TITLE } from '@/constants/modalTitle';
import { useSale } from '@/hooks/home/useSale';
import { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import ParrarelModalButtons from './ParrarelModalButtons';

const BuyModal = ({ onClose }: { onClose: () => void }) => {
  const buyModalInfo = {
    highestPrice: 80000,
    point: 32000,
  };

  const [bidPrice, setBidPrice] = useState<number>(0);
  const { id } = useParams();
  const { usePostSaleBid } = useSale();
  const { mutate: bidMuate } = usePostSaleBid(Number(id), String(bidPrice));

  const handleChangeBid = (e: ChangeEvent<HTMLInputElement>) => {
    setBidPrice(Number(e.target.value));
  };

  const sendBid = () => {
    bidMuate();
    onClose();
  };

  // @TODO: 포인트 충전 함수
  const handleCharging = () => {};

  return (
    <Modal width="300px" height="auto" title={MODAL_TITLE.SUGGEST_BUY} onClose={onClose}>
      <div className="w-full h-full px-8">
        <div className="grid grid-cols-2 py-1 place-items-center">
          <div className="col-span-1">현재 최고가</div>
          <div className="col-span-1 mx-auto font-semibold text-BID_HOVER_MAIN">{buyModalInfo.highestPrice}원</div>
        </div>
        <div className="grid grid-cols-2 py-1 place-items-center">
          <div className="col-span-1">내 포인트</div>
          <div className="col-span-1 mx-auto font-semibold text-BID_HOVER_MAIN">{buyModalInfo.point}원</div>
        </div>
        <div className="text-xs pt-2 pb-4 text-center">
          입찰 금액이 부족하신가요?&nbsp;&nbsp;
          <button
            className="border-b-[1px] border-BID_SUB_GRAY text-BID-SUB-GRAY hover:text-black"
            onClick={handleCharging}
          >
            충전하러 가기
          </button>
        </div>
        {/* @TODO: input component */}
        <div className="bg-white w-full h-12 py-1 mb-4 flex items-center border-BID-GRAY">
          <input
            type="number"
            placeholder="입찰가를 입력해주세요"
            onChange={handleChangeBid}
            className="px-3 h-full outline-none border w-full rounded-full"
          ></input>
        </div>
      </div>
      {/* @TODO: 각 호출별 함수 로직 작성 */}
      <ParrarelModalButtons leftText="취소" rightText="입찰" handleLeft={() => onClose()} handleRight={sendBid} />
    </Modal>
  );
};

export default BuyModal;
