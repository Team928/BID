import Bottom from '@/components/@common/Bottom';
import StateButton from '@/components/@common/StateButton';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import AuctionTabBar from '@/components/home/AuctionTabBar';
import { icons } from '@/constants/icons';
import useTabStore from '@/stores/auctionTabStore';
import { HiHeart } from 'react-icons/hi';

const ScrapPage = () => {
  const { tab } = useTabStore();

  const info: IHeaderInfo = {
    left: null,
    center: '위시',
    right_1: null,
    right_2: icons.NOTIFY,
    prev: '/scrap',
  };

  return (
    <>
      <div className="w-full h-screen pb-[4.5rem]">
        <Header info={info} />
        <AuctionTabBar />
        <div className="pt-[5.1rem] h-full overflow-y-auto">
          <div className="pt-3 flex flex-col ">
            {/* map() 으로 구현해야함 */}
            <div className="px-BID_P py-3 flex gap-4 border-b border-[#D9D9D9]">
              <div className="w-32 h-32">
                <img className="w-full h-full rounded-xl" src="/src/assets/image/sample.png"></img>
              </div>
              <div className="flex-1 flex flex-col py-2">
                <div className="flex items-center justify-between">
                  <StateButton deals={tab} status={'AUCTION'} />
                  <HiHeart size={'1.6rem'} color="#FF0000" />
                </div>
                <div className="py-2">
                  <p className="text-sm truncate whitespace-normal line-clamp-2">
                    1년도 안쓴 아이폰 15 프로 팝니다. 상태 좋아요
                  </p>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-bold text-BID_BLACK">71,000원</p>
                    <p className="text-xs text-BID_BLACK">현재 입찰가</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-BID_P py-3 flex gap-4 border-b border-[#D9D9D9]">
              <div className="w-32 h-32">
                <img className="w-full h-full rounded-xl" src="/src/assets/image/sample.png"></img>
              </div>
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="flex items-center justify-between">
                  <StateButton deals={tab} status={'BEFORE'} />
                  <HiHeart size={'1.6rem'} color="#FF0000" />
                </div>
                <p className="text-sm truncate whitespace-normal line-clamp-2">
                  1년도 안쓴 아이폰 15 프로 팝니다. 상태 좋아요
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-lg font-bold text-BID_BLACK">71,000원</p>
                  <p className="text-xs text-BID_BLACK">현재 입찰가</p>
                </div>
              </div>
            </div>
            <div className="px-BID_P py-3 flex gap-4 border-b border-[#D9D9D9]">
              <div className="w-32 h-32">
                <img className="w-full h-full rounded-xl" src="/src/assets/image/sample.png"></img>
              </div>
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="flex items-center justify-between">
                  <StateButton deals={tab} status={'END'} />
                  <HiHeart size={'1.6rem'} color="#FF0000" />
                </div>
                <p className="text-sm truncate whitespace-normal line-clamp-2">
                  1년도 안쓴 아이폰 15 프로 팝니다. 상태 좋아요
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-lg font-bold text-BID_BLACK">71,000원</p>
                  <p className="text-xs text-BID_BLACK">현재 입찰가</p>
                </div>
              </div>
            </div>
            <div className="px-BID_P py-3 flex gap-4 border-b border-[#D9D9D9]">
              <div className="w-32 h-32">
                <img className="w-full h-full rounded-xl" src="/src/assets/image/sample.png"></img>
              </div>
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="flex items-center justify-between">
                  <StateButton deals={tab} status={'LIVE'} />
                  <HiHeart size={'1.6rem'} color="#FF0000" />
                </div>
                <p className="text-sm truncate whitespace-normal line-clamp-2">
                  1년도 안쓴 아이폰 15 프로 팝니다. 상태 좋아요
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-lg font-bold text-BID_BLACK">71,000원</p>
                  <p className="text-xs text-BID_BLACK">현재 입찰가</p>
                </div>
              </div>
            </div>
          </div>

          {/* 탭에 따른 컴포넌트 보여주기 */}
          {/* {tab === 'sale' ? <SaleTab></SaleTab> : <BuyTab></BuyTab>} */}
        </div>
      </div>
      <Bottom />
    </>
  );
};

export default ScrapPage;
