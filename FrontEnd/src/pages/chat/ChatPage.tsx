import Header, { IHeaderInfo } from '@/components/@common/header';
import ChatItem, { IItem } from '@/components/chat/ChatItem';
import Bottom from '@/components/@common/Bottom';

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
    // 채팅목록 페이지는 하단바로 이동하므로 left에 null
    left: null,
    center: '채팅',
    right_1: null,
    right_2: null,
    prev: '/'
  }
  return (
    <>
      <div className="w-full h-screen">
        <Header info={info} />
        <div className="pt-12">
          {chatList.map((item, index) => {
            return <ChatItem key={index} item={item} />;
          })}
        </div>
      </div>
    <Bottom />
    </>
  );
};

export default ChatPage;

