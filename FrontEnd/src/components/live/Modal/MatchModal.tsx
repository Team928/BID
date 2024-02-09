import Modal from '@/components/@common/Modal';
import Toast from '@/components/@common/Toast';
import { ISellerInfo } from '@/types/live';
import { useState } from 'react';
import { TbHeartHandshake } from 'react-icons/tb';

const MatchModal = ({
  handleMatch,
  participants,
  onClose,
}: {
  handleMatch: (userId: number, formId: number, price: number, nickName: string) => void;
  participants: ISellerInfo[];
  onClose: () => void;
}) => {
  const [finalPrice, setFinalPrice] = useState<number>();
  const [clickId, setClickId] = useState<number>(-1);

  const handleClick = (idx: number) => {
    if (clickId === -1) {
      setClickId(idx);
    } else {
      if (clickId === idx) {
        setClickId(-1);
      } else {
        setClickId(idx);
      }
    }
  };

  const handlePrice = (e: any) => {
    setFinalPrice(e.target.value);
  };

  // 매칭하기 함수
  const match = () => {
    if (clickId === -1) {
      Toast.error('판매자를 선택해주세요.');
      return;
    }

    if (!finalPrice) {
      Toast.error('최종 구매가를 입력해주세요.');
      return;
    }

    const info = participants[clickId];

    if (window.confirm(`${info.nickName}님의 물품을 ${finalPrice}원으로 최종 낙찰하시겠습니까?`)) {
      handleMatch(info.userId, info.formId, finalPrice, info.nickName);
      onClose();
    }
  };

  return (
    <Modal width="350px" height="400px" title="매칭하기" onClose={onClose}>
      <div className="mx-5 my-2">
        <div className="py-2 text-sm text-gray-700">거래를 원하는 판매자를 선택해주세요</div>
        <div className="border h-40 overflow-y-scroll rounded-md">
          {participants.map((info, idx) => {
            return (
              <div
                key={idx}
                className={`px-2 h-11 flex justify-between items-center hover:bg-gray-100 ${clickId === idx && 'bg-gray-100'}`}
                onClick={() => handleClick(idx)}
              >
                <span className="text-sm">{info.nickName}</span>
              </div>
            );
          })}
        </div>
        <div className="py-2 text-sm text-gray-700">최종 구매가</div>
        <input
          type="number"
          value={finalPrice}
          onChange={handlePrice}
          placeholder="최종 구매가를 입력해주세요"
          className="w-full px-2 border rounded-md outline-none h-10"
        />

        <button onClick={match} className="float-right border border-red-500 p-2 rounded-md my-4">
          <div className="flex text-red-500 text-sm">
            <TbHeartHandshake size={20} color={'red'} /> 매칭하기
          </div>
        </button>
      </div>
    </Modal>
  );
};

export default MatchModal;
