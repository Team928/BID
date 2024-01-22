import Header, { IHeaderInfo } from '@/components/@common/header';
import ChatItem, { IItem } from '@/components/chat/ChatItem';
import { icons } from '@/constants/icons';

const ChatPage = () => {
  // #TODO 실제 데이터로 추후에 수정해야함
  const chatList: IItem[] = [
    {
      username: '중고짱좋아',
      message: `거래 감사합니다.`,
      time: '14분전',
    },
    {
      username: '중고짱좋아',
      message: `거래 감사합니다.`,
      time: '14분전',
    },
    {
      username: '중고짱좋아',
      message: `거래 감사합니다.`,
      time: '14분전',
    },
  ];

  const info: IHeaderInfo = {
    left: icons.BACK,
    center: '채팅',
    right_1: null,
    right_2: null,
  }
  return (
    <div className="w-full h-screen">
      <Header info={info} />
      <div className="pt-12">
        {chatList.map((item, index) => {
          return <ChatItem key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

export default ChatPage;

