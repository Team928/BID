import { statusType } from '../home/AuctionItem';

type dealsType = 'buy' | 'sale';

interface IStateButtonProp {
  deals: dealsType;
  status: statusType;
}

const StateButton = ({ deals, status }: IStateButtonProp) => {
  let name = '';

  if (deals === 'sale') {
    name = '경매';
  } else if (deals === 'buy') {
    name = '역경매';
  }

  if (status === 'AUCTION') {
    return (
      <div className="inline-block p-2 bg-[#DEFFE7] text-[#2CE05D] rounded-lg font-bold text-xs">
        <p>{name} 진행중</p>
      </div>
    );
  } else if (status === 'BEFORE') {
    return (
      <div className="inline-block p-2 bg-[#ECF7FF] text-BID_MAIN rounded-lg font-bold text-xs">
        <p>{name} 예정</p>
      </div>
    );
  } else if (status === 'END') {
    return (
      <div className="inline-block p-2 bg-[#E7E7E7] text-[#747474] rounded-lg font-bold text-xs">
        <p>{name} 마감</p>
      </div>
    );
  } else if (status === 'LIVE') {
    return (
      <div className="inline-block p-2 bg-[#FFDEDE] text-[#FF4646] rounded-lg font-bold text-xs">
        <p>라이브 진행중</p>
      </div>
    );
  }
};

export default StateButton;
