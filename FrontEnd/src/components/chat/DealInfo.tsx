import React, { useState } from 'react';

const DealInfo: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    // TODO: 거래 확정 처리 로직 추가
    console.log('거래를 확정합니다.');
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fixed top-0 w-full bg-white border-b">
      <div className="flex gap-4 pt-14 px-4 pb-2 border items-center">
        <div className="w-20 h-20 bg-BID_LIGHT_GRAY rounded-2xl relative"></div>
        <div className="flex-1 flex flex-col justify-around">
          <p className="text-sm">중고 갤럭시 s23</p>
          <p className="text-xs text-BID_MAIN">최종 낙찰가</p>
          <p className="text-lg font-bold">150,000원</p>
        </div>
        <button 
          className="p-3 h-12 text-BID_MAIN border border-BID_MAIN rounded-2xl font-bold"
          onClick={() => setIsModalOpen(true)}
        >
          거래확정
        </button>
      </div>

      {/* 모달 영역 */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <p>징짜루 거래 확정 하시겠습니까??</p>
            <p>거래 확정하고 리뷰 쓰러가긩</p>
            <div className="flex justify-center mt-6">
              <button className="px-4 py-2 mr-2 border bg-BID_MAIN text-white rounded-lg" onClick={handleConfirm}>
                확인
              </button>
              <button className="px-4 py-2 bg-BID_LIGHT_GRAY border rounded-lg" onClick={handleCancel}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealInfo;
