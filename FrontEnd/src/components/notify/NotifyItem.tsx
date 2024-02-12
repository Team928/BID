import { INotifyInfo } from '@/types/notify';
import { getTimeDifference } from '@/utils/getTimeDifference';
import bid from '@/assets/image/BID.png';

const NotifyItem = (props: { item: INotifyInfo }) => {
  const { type, message, time } = props.item;

  const getNotifyType = (type: string) => {
    switch (type) {
      case 'START_AUCTION':
        return '경매 시작';
      case 'START_AUCTION_BEFORE':
        return '경매 시작';
      case 'SUCCESS_BID':
        return '낙찰';
      case 'CANCEL_BID':
        return '입찰';
      case 'START_LIVE':
        return '라이브 시작';
      case 'TEST_MSG':
        return '테스트';
    }
  };

  return (
    <div className="flex gap-4 px-BID_P py-3 border-b border-[#D9D9D9]">
      <div className="w-10 h-10 border rounded-full flex justify-center items-center">
        <img src={bid} className="w-5" />
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <p>{getNotifyType(type)}</p>
        <p className="font-bold">{message}</p>
        <p className="text-[#A9A9A9] text-xs">{getTimeDifference(time)}</p>
      </div>
    </div>
  );
};

export default NotifyItem;
