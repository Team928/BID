import Modal from '@/components/@common/Modal';
import { useSale } from '@/hooks/home/useSale';
import { ISaleDetailRes } from '@/types/home';
import { useState } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';

const DetailBottom = (props: { info: ISaleDetailRes }) => {
  const { status, wished, highestBid, startPrice, dealRes } = props.info;
  const [showBidModal, setShowBidModal] = useState<boolean>(false);
  const [showImmediateModal, setShowImmediateModal] = useState<boolean>(false);

  const [bidPrice, setBidPrice] = useState<string>('');

  const { usePostSaleBid, usePostSaleImmediate, usePostDealWishAdd, useDeleteDealWish } = useSale();
  const { mutate: bidMuate } = usePostSaleBid(dealRes.id, bidPrice);
  const { mutate: immediateMuate } = usePostSaleImmediate(dealRes.id);
  const { mutate: wishAddMuate } = usePostDealWishAdd(dealRes.id);
  const { mutate: wishDeleteMuate } = useDeleteDealWish(dealRes.id);

  const handleBtnClick = () => {
    if (status === 'BEFORE') {
      setShowImmediateModal(true);
    } else if (status === 'END') {
      return;
    } else {
      setShowBidModal(true);
    }
  };

  // #TODO 위시 등록 및 삭제 해야함
  return (
    <>
      {/* 입찰하기 모달 */}
      {showBidModal && (
        <Modal width="300px" height="auto" title="입찰하기" onClose={() => setShowBidModal(false)}>
          <div className="w-full flex flex-col justify-center items-center p-3 px-10">
            <div className="w-full flex gap-3">
              <p className="">현재 최고가</p>
              <p className="text-BID_MAIN">{highestBid === 0 ? startPrice : highestBid}원</p>
              <p className=""></p>
            </div>
            <div className="w-full flex gap-3 items-center">
              <p className="">내 포인트</p>
              {/* 내포인트 조회해야함 */}
              <p className="text-BID_MAIN">32,000원</p>
              <span className="text-BID_SUB_GRAY border-b text-xs">충전하기</span>
            </div>
            <div className="w-full pt-3">
              <input
                type="text"
                value={bidPrice}
                onChange={e => setBidPrice(e.target.value)}
                placeholder="입찰가를 입력해주세요"
                className="w-full outline-none border p-2 text-sm rounded-xl"
              />
            </div>
            <div className="w-full flex gap-5 py-4">
              <button
                className="w-full bg-BID_SUB_GRAY text-white px-4 py-2 rounded-2xl"
                onClick={() => setShowBidModal(false)}
              >
                취소
              </button>
              <button
                className="w-full bg-BID_MAIN text-white px-4 py-2 rounded-2xl"
                onClick={() => {
                  bidMuate();
                  setShowBidModal(false);
                }}
              >
                확인
              </button>
            </div>
          </div>
        </Modal>
      )}
      {/* 구매하기 모달 */}
      {showImmediateModal && (
        <Modal width="300px" height="auto" title="구매하기" onClose={() => setShowImmediateModal(false)}>
          <div className="w-full flex flex-col justify-center items-center p-3 px-10">
            <div className="w-full flex gap-3">
              <p className="">현재 최고가</p>
              <p className="text-BID_MAIN">{highestBid === 0 ? startPrice : highestBid}원</p>
              <p className=""></p>
            </div>
            <div className="w-full flex gap-3 items-center">
              <p className="">내 포인트</p>
              {/* 내포인트 조회해야함 */}
              <p className="text-BID_MAIN">32,000원</p>
              <span className="text-BID_SUB_GRAY border-b text-xs">충전하기</span>
            </div>
            <div className="w-full flex gap-5 py-4">
              <button
                className="w-full bg-BID_SUB_GRAY text-white px-4 py-2 rounded-2xl"
                onClick={() => setShowImmediateModal(false)}
              >
                취소
              </button>
              <button
                className="w-full bg-BID_MAIN text-white px-4 py-2 rounded-2xl"
                onClick={() => {
                  immediateMuate();
                  setShowImmediateModal(false);
                }}
              >
                확인
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div className="fixed px-4 bottom-0 w-full h-[4.5rem] bg-white z-10 text-[#A9A9A9] border-t border-[#D9D9D9] text-sm">
        <div className="w-full h-full py-2 flex items-center gap-3">
          {wished ? (
            <HiHeart onClick={() => wishDeleteMuate()} size={'2.3rem'} color="#FF0000" />
          ) : (
            <HiOutlineHeart onClick={() => wishAddMuate()} size={'2.3rem'} color="#ababab" />
          )}
          <div
            onClick={handleBtnClick}
            className={`w-full py-3  text-white rounded-xl text-center text-lg font-bold 
          ${status === 'END' ? 'bg-BID_BLACK' : 'bg-BID_MAIN'}`}
          >
            {status === 'BEFORE' ? '즉시 구매하기' : status === 'END' ? '이미 종료된 경매입니다' : '입찰하기'}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailBottom;

/* BEFORE -> 즉시 구매하기
   END -> 이미 종료된 경매입니다
   나머지 -> 입찰하기
*/
