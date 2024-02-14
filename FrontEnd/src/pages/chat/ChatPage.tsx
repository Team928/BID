import chatting from '@/assets/icon/chatting.png';
import Bottom from '@/components/@common/Bottom';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import ChatItem from '@/components/chat/ChatItem';
import { useChatRoom } from '@/hooks/chat/useChat';
import userStore from '@/stores/userStore';

const ChatPage = () => {
  const info: IHeaderInfo = {
    left: null,
    center: '채팅',
    right_1: null,
    right_2: null,
  };

  const { useGetChatRoomList } = useChatRoom();
  const { userId } = userStore();

  const {
    data: chatRoomInfo,
    // isLoading,
    // error,
  } = useGetChatRoomList({ userId: userId });

  return (
    <>
      <div className="w-full h-screen">
        <Header info={info} />
        <div className="pt-12">
          {chatRoomInfo && !chatRoomInfo.data.length ? (
            <div className="w-full h-[calc(100vh-90px)] flex flex-col justify-center items-center">
              <img src={chatting} width={80} />
              <div className="pt-5">채팅이 진행된 거래가 없어요</div>
              <div>지금 거래를 진행해 채팅방을 생성해보아요</div>
            </div>
          ) : (
            <div>{chatRoomInfo && chatRoomInfo.data.map((item, index) => <ChatItem key={index} item={item} />)}</div>
          )}
        </div>
      </div>
      <Bottom />
    </>
  );
};

export default ChatPage;
