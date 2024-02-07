import Header, { IHeaderInfo } from '@/components/@common/Header';
import PurchaseDetail from '@/components/home/detail/PurchaseDetail';
import BACK from '@/assets/icon/back.png';
import { usePurchase } from '@/hooks/home/usePurchase';
import { useParams } from 'react-router-dom';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { useSale } from '@/hooks/home/useSale';

const PurchaseDetailPage = () => {
  const { id } = useParams();

  const { useGetPurchaseDetail } = usePurchase();
  const {
    // isLoading,
    // error,
    data: purchaseDetailInfo,
  } = useGetPurchaseDetail(Number(id));

  const info: IHeaderInfo = {
    left: <img src={BACK} />,
    center: '상세보기',
    right_1: null,
    right_2: null,
    prev: '/',
  };
  const { usePostDealWishAdd, useDeleteDealWish } = useSale();
  const { mutate: wishAddMuate } = usePostDealWishAdd(Number(id));
  const { mutate: wishDeleteMuate } = useDeleteDealWish(Number(id));

  // #TODO 역경매 참가 신청 해야함
  const handleApplyForm = () => {};

  if (purchaseDetailInfo)
    return (
      <>
        <div className="w-full h-screen pb-[4.5rem]">
          <Header info={info} />
          <div className="pt-12 h-full overflow-y-auto">
            <PurchaseDetail info={purchaseDetailInfo.data} />
          </div>
        </div>
        <div className="fixed px-4 bottom-0 w-full h-[4.5rem] bg-white z-10 text-[#A9A9A9] border-t border-[#D9D9D9] text-sm">
          <div className="w-full h-full py-2 flex items-center gap-3">
            {purchaseDetailInfo.data.isWished ? (
              <HiHeart onClick={() => wishDeleteMuate()} size={'2.3rem'} color="#FF0000" />
            ) : (
              <HiOutlineHeart onClick={() => wishAddMuate()} size={'2.3rem'} color="#ababab" />
            )}
            <div
              onClick={handleApplyForm}
              className={`w-full py-3  text-white rounded-xl text-center text-base font-bold 
          ${purchaseDetailInfo.data.applyForms.length === purchaseDetailInfo.data.memberLimit ? 'bg-BID_BLACK' : 'bg-BID_MAIN'}`}
            >
              {purchaseDetailInfo.data.applyForms.length === purchaseDetailInfo.data.memberLimit
                ? '이미 최대 인원에 도달하였습니다.'
                : '역경매 참여 신청하기'}
            </div>
          </div>
        </div>
      </>
    );
};

export default PurchaseDetailPage;
