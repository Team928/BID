import Header, { IHeaderInfo } from '@/components/@common/Header';
import Bottom from '@/components/@common/Bottom';
import ChatItem from '@/components/chat/ChatItem';
import { useChatRoom } from '@/hooks/chat/useChat';

const ChatPage = () => {

  const info: IHeaderInfo = {
    left: null,
    center: '채팅',
    right_1: null,
    right_2: null,
    prev: '/'
  }

  const { useGetChatRoomList } = useChatRoom()

  const {
    data: chatRoomInfo,
    isLoading,
    error,
  } = useGetChatRoomList({ userId: 1, })

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="w-full h-screen">
        <Header info={info} />
        <div className="pt-12">
          <div>
            {chatRoomInfo && chatRoomInfo.data.map((item, index) => (
              <ChatItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
      <Bottom />
    </>
  );
};

export default ChatPage;
