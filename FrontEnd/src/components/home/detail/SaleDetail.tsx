import addCommaToPrice from '@/utils/addCommaToPrice';
import { changeEngToKr } from '@/utils/changeCategorie';
import { getPriceName } from '@/utils/getPriceName';
import { PiUser } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const SaleDetail = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* #TODO 추후 실제 데이터로 변경해야함 */}
      <div className="w-full h-full">
        {/* 사진 */}
        <div className="relative w-full h-2/5">
          <img src="/src/assets/image/sample.png" className="object-cover w-full h-full"></img>
          <p className="absolute right-0 bottom-0 text-white p-5 text-lg">1/3</p>
        </div>
        {/* 하위 컨텐츠 */}
        <div className="px-BID_P flex flex-col gap-3 pt-2">
          {/* 라이브 시작 예정 시간 */}
          <p className="text-BID_MAIN font-bold text-lg">1/5 (금) 10:00 경매 시작 예정</p>
          {/* 카테고리 + 지역 */}
          <div className="flex justify-between text-sm text-BID_SUB_GRAY">
            <p>{changeEngToKr(detailItem.dealRes.category)}</p>
            <p>{detailItem.dealRes.area[0]}</p>
          </div>
          {/* 상태에 따른 가격 */}
          <div className="flex text-xl gap-2">
            <p className="font-bold">
              {detailItem.status === 'BEFORE'
                ? addCommaToPrice(detailItem.immediatePrice)
                : addCommaToPrice(detailItem.bid)}
              원
            </p>
            <p className="text-BID_BLACK">{getPriceName(detailItem.status)}</p>
          </div>
          {/* 판매글 제목 + 내용 */}
          <div>
            <p className="text-lg font-bold">{detailItem.dealRes.title}</p>
            <p className="text-BID_BLACK">{detailItem.dealRes.content}</p>
          </div>
          {/* 판매자 정보 */}
          <div className="pt-2">
            <div
              onClick={() => navigate('/profile')}
              className="border rounded-xl border-BID_SUB_GRAY font-bold flex p-3 justify-center items-center gap-2"
            >
              <PiUser size={'1.8rem'} color="#545454" />
              <p className="text-lg">판매자 정보</p>
            </div>
            {/* #TODO 아래에 라이브보러가기 또는 녹화영상 상태에 따라 다르게 보여줘야 함 */}
            <div></div>
          </div>
          {/* #TODO 상태에 따른 로그 보여줄 예정 */}
          <div>로그 자리입니다</div>
        </div>
      </div>
    </>
  );
};

export default SaleDetail;

export type statusType = 'BEFORE' | 'AUCTION' | 'LIVE' | 'END';

export interface ISaleDetaileRes {
  dealRes: {
    id: number;
    title: string;
    content: string;
    writer: string;
    category: string;
    area: string[];
    createTime: string;
    updateTime: string;
    images: string[];
  };
  immediatePrice: number;
  startPrice: number;
  bid: number;
  startTime: string;
  endTime: string;
  status: statusType;
  liveRequestCount: number;
  bidList: [];
  scrap: boolean;
  liveReq: boolean;
}

const detailItem: ISaleDetaileRes = {
  dealRes: {
    id: 1,
    title: '갤럭시S23 팔아요 50만원',
    content: '상태 S급 50만원에 싸게 팔아요~',
    writer: 'user1',
    category: 'Digital',
    area: ['구미시 인의동'],
    createTime: '2024-01-24T10:07:01.749779',
    updateTime: '2024-01-24T10:07:01.749779',
    images: ['', ''],
  },
  immediatePrice: 500000,
  startPrice: 400000,
  bid: 450000,
  startTime: '2024-01-23T05:05:45.943',
  endTime: '2024-01-23T05:05:45.943',
  status: 'BEFORE',
  liveRequestCount: 0,
  bidList: [],
  scrap: false,
  liveReq: false,
};
