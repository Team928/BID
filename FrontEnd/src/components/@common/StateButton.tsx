import { dealStatusType } from '@/types/model';

export type dealType = 'purchase' | 'sale';

interface IStateButtonProp {
  deals: dealType;
  status: dealStatusType;
}

const StateButton = ({ deals, status }: IStateButtonProp) => {
  let name = '';

  if (deals === 'sale') {
    name = '경매';
  } else if (deals === 'purchase') {
    name = '역경매';
  }

  if (status === 'AUCTION') {
    return (
      <div className="inline-block p-1 px-2 bg-[#DEFFE7] text-[#49CC6D] rounded-xl text-xs">
        <p>{name} 진행중</p>
      </div>
    );
  } else if (status === 'BEFORE') {
    return (
      <div className="inline-block p-1 px-2 bg-[#ECF7FF] text-BID_MAIN rounded-xl text-xs">
        <p>{name} 예정</p>
      </div>
    );
  } else if (status === 'END') {
    return (
      <div className="inline-block p-1 px-2 bg-[#E7E7E7] text-[#747474] rounded-xl text-xs">
        <p>{name} 마감</p>
      </div>
    );
  } else if (status === 'LIVE') {
    return (
      <div className="inline-block p-1 px-2 bg-[#FFDEDE] text-[#FF4646] rounded-xl text-xs">
        <p>라이브 진행중</p>
      </div>
    );
  }
};

export default StateButton;
