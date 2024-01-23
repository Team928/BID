import Header, { IHeaderInfo } from '@/components/@common/header';
import NotifyItem, { IItem } from '@/components/notify/NotifyItem';
import { icons } from '@/constants/icons';
import { useLocation } from 'react-router-dom';

const NotifyPage = () => {
  const location = useLocation();
  const prev = location.state.prev;

  // #TODO 실제 데이터로 추후에 수정해야함
  const notifyList: IItem[] = [
    {
      type: '라이브 시작',
      content: `"1년도 안쓴 아이폰 .." 글의 라이브가 5분뒤에 시작 됩니다. 바로 입장해주세요`,
      time: '30분전',
    },
    {
      type: '라이브 시작',
      content: `"1년도 안쓴 아이폰 .." 글의 라이브가 5분뒤에 시작 됩니다. 바로 입장해주세요`,
      time: '30분전',
    },
    {
      type: '라이브 시작',
      content: `이미 입찰한 "1년도 안쓴 아이폰 .." 글에서 더 높은 입찰금액이 나왔어요. 확인해주세요`,
      time: '30분전',
    },
    {
      type: '라이브 시작',
      content: `"1년도 안쓴 아이폰 .." 글의 라이브가 5분뒤에 시작 됩니다. 바로 입장해주세요`,
      time: '30분전',
    },
    {
      type: '라이브 시작',
      content: `"1년도 안쓴 아이폰 .." 글의 라이브가 5분뒤에 시작 됩니다. 바로 입장해주세요`,
      time: '30분전',
    },
  ];

  const info: IHeaderInfo = {
    left: icons.BACK,
    center: '알림',
    right_1: null,
    right_2: null,
    prev: prev,
  };

  return (
    <div className="w-full h-screen">
      <Header info={info} />
      <div className="pt-12">
        {notifyList.map((item, index) => {
          return <NotifyItem key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

export default NotifyPage;
