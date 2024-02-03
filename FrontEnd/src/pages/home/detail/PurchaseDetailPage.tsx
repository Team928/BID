import Header, { IHeaderInfo } from '@/components/@common/Header';
import PurchaseDetail from '@/components/home/detail/PurchaseDetail';
import { icons } from '@/constants/icons';
import { usePurchase } from '@/hooks/home/usePurchase';
import { IoBookmarks, IoBookmarksOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

const PurchaseDetailPage = () => {
  const { id } = useParams();

  const { useGetPurchaseDetail } = usePurchase();
  const {
    // isLoading,
    // error,
    data: purchaseDetailInfo,
  } = useGetPurchaseDetail(Number(id));

  const info: IHeaderInfo = {
    left: icons.BACK,
    center: '상세보기',
    right_1: null,
    right_2: null,
    prev: '/',
  };

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
            {purchaseDetailInfo.data.wished ? (
              <IoBookmarks size={'2rem'} color="#3498DB" />
            ) : (
              <IoBookmarksOutline size={'2rem'} color="#545454" />
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