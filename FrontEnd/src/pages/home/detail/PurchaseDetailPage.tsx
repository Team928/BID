import Header, { IHeaderInfo } from '@/components/@common/Header';
import Toast from '@/components/@common/Toast';
import PurchaseDetail from '@/components/home/detail/PurchaseDetail';
import { usePurchase } from '@/hooks/home/usePurchase';
import { useSale } from '@/hooks/home/useSale';
import useLiveStore from '@/stores/userLiveStore';
import userStore from '@/stores/userStore';
import { IApplyForms } from '@/types/home';
import { useState } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { IoIosArrowBack } from 'react-icons/io';
import { MdLiveTv } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import PurchaseApplyFromModal from './PurchaseApplyFromModal';

const PurchaseDetailPage = () => {
  const { id } = useParams();
  const { nickname } = userStore();

  const { useGetPurchaseDetail } = usePurchase();
  const {
    // isLoading,
    // error,
    data: purchaseDetailInfo,
  } = useGetPurchaseDetail(Number(id));
  const isBuyer = purchaseDetailInfo?.data.dealRes.writer === nickname ? true : false;
  const status = purchaseDetailInfo?.data.status;
  const dealRes = purchaseDetailInfo?.data.dealRes;

  const info: IHeaderInfo = {
    left: <IoIosArrowBack />,
    center: '상세보기',
    right_1: null,
    right_2: null,
  };
  const { usePostDealWishAdd, useDeleteDealWish } = useSale();
  const { mutate: wishAddMuate } = usePostDealWishAdd(Number(id));
  const { mutate: wishDeleteMuate } = useDeleteDealWish(Number(id));
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setTType, setPType } = useLiveStore();

  // #TODO 라이브방 진입하는 함수
  const approachLive = () => {
    if (!dealRes) return;

    setTType('purchase');
    setPType(isBuyer ? 'buyer' : 'seller');

    // 구매자 로직
    if (isBuyer) {
      if (status !== 'END') {
        navigate(`/live/entrance/${dealRes.id}`, {
          state: {
            title: dealRes.title,
          },
        });
      }
    }
    // 판매자 로직
    else {
      if (status === 'END') {
        Toast.error('라이브 방송 진행중이 아닙니다.');
        return;
      }

      const applyForms: IApplyForms[] = purchaseDetailInfo.data.applyForms;
      let isExistForm = false;
      let myForm;

      for (let i = 0; i < applyForms.length; i++) {
        const currentForm = applyForms[i];
        if (currentForm.sellerNickname === nickname) {
          isExistForm = true;
          myForm = currentForm;
          break;
        }
      }

      if (!isExistForm) {
        Toast.error('라이브 신청 내역이 없습니다.');
        return;
      }

      navigate(`/live/entrance/${dealRes.id}`, {
        state: {
          title: dealRes.title,
          myForm: myForm,
        },
      });
    }
  };

  const setButton = () => {
    if (status === 'BEFORE') {
      if (isBuyer) {
        return (
          <button onClick={() => approachLive()} className="detailLiveRedBtn">
            <MdLiveTv size={'1.5rem'} color="rgb(239 68 68 / var(--tw-border-opacity))" />
            <p className="text-red-500">&nbsp;라이브 시작하기</p>
          </button>
        );
      } else {
        if (purchaseDetailInfo?.data.applyForms.length === purchaseDetailInfo?.data.memberLimit) {
          return <div className={`detailBtn bg-BID_BLACK`}>이미 최대 인원에 도달하였습니다</div>;
        } else {
          return (
            <button onClick={() => setShowModal(true)} className={`detailBtn bg-BID_MAIN`}>
              역경매 참여 신청하기
            </button>
          );
        }
      }
    } else if (status === 'LIVE') {
      if (isBuyer) {
        return (
          <button onClick={() => approachLive()} className="detailLiveRedBtn">
            <MdLiveTv size={'1.5rem'} color="red" />
            <p className=" text-red-500">&nbsp;라이브 시작하기</p>
          </button>
        );
      } else {
        return (
          <button onClick={() => approachLive()} className="detailLiveRedBtn">
            <MdLiveTv size={'1.5rem'} color="rgb(239 68 68 / var(--tw-border-opacity))" />
            <p className=" text-red-500">&nbsp;라이브 참가하기</p>
          </button>
        );
      }
    } else if (status === 'END') {
      return <div className={`detailBtn bg-BID_BLACK`}>역경매가 종료되었습니다</div>;
    }
  };

  if (purchaseDetailInfo)
    return (
      <>
        {/* 입찰하기 모달 */}
        {showModal && <PurchaseApplyFromModal setShowModal={setShowModal} id={Number(id)} />}
        <div className="w-full h-screen pb-[65px]">
          <Header info={info} />
          <div className="pt-12 h-full overflow-y-auto">
            <PurchaseDetail info={purchaseDetailInfo.data} />
          </div>
        </div>
        <div className="fixed px-4 bottom-0 w-full h-[65px] bg-white z-10 text-[#A9A9A9] text-xs max-w-[500px]">
          <div className="w-full h-full py-2 flex items-center gap-2 cursor-pointer">
            {purchaseDetailInfo.data.isWished ? (
              <HiHeart onClick={() => wishDeleteMuate()} size={'2.3rem'} color="#FF0000" />
            ) : (
              <HiOutlineHeart onClick={() => wishAddMuate()} size={'2.3rem'} color="#ababab" />
            )}
            {setButton()}
          </div>
        </div>
      </>
    );
};

export default PurchaseDetailPage;
