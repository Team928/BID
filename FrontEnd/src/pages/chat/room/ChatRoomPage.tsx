import { useEffect, useState } from 'react';
import { Client, StompHeaders } from '@stomp/stompjs';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import BACK from '@/assets/icon/back.png';
import MessageInput from '@/components/chat/MessageInput';
import ChatLogs from '@/components/chat/ChatLogs';
import DealInfo from '@/components/chat/DealInfo';
import { useChatLog } from '@/hooks/chat/useChat';
import { axiosAuthInstance } from '@/apis/axiosInstance';
import { IChatResList } from '@/types/chat';
import userStore from '@/stores/userStore';

const ChatRoomPage = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [message, setMessage] = useState<string>('');
  const [chatLogs, setChatLogs] = useState<IChatResList[]>([]);

  // 나중에 prop으로 받아야함
  const dealId = 1

  // TODO: 실제 채팅방 참여 유저로 변경해야함
  const info: IHeaderInfo = {
    left: <img src={BACK} />,
    center: '방제목',
    right_1: null,
    right_2: null,
  };

  const { useGetChatLogList } = useChatLog();
  const { userId } = userStore()

  const { data: chatLogInfo } = useGetChatLogList({ dealId });
  console.log(chatLogInfo)

  const accessToken = axiosAuthInstance;

  useEffect(() => {
    // 웹소켓 연결
    const newClient = new Client();
    newClient.configure({
      brokerURL: 'wss://i10d208.p.ssafy.io/api/ws',
      onConnect: () => {
        console.log('웹소켓 연결 완료');

        const headers: StompHeaders = {
          Authorization: 'Bearer ' + accessToken,
        };
        newClient.subscribe(
          `/sub/chats/rooms/${dealId}`,
          message => {
            console.log('받은 메시지 :', message.body);

            const parsedMessage = JSON.parse(message.body);
            console.log(setChatLogs);
            setChatLogs(prevChatLogs => [...prevChatLogs, parsedMessage.body.data]);
          },
          headers,
        );
      },

      onDisconnect: () => {
        console.log('웹소켓 연결 종료');
      },
    });

    // 웹소켓 세션 활성화
    newClient.activate();
    setClient(newClient);

    return () => {
      newClient.deactivate();
    };
  }, []);

  // Message 전달 형태 {"senderId":1, "message":"안녕","type":"TALK"}
  const sendMessage = (message: string) => {
    if (client !== null) {
      const newMessage = {
        senderId: userId,
        message: message,
        type: 'TALK',
      };
      const jsonMessage = JSON.stringify(newMessage);
      console.log('보낸 메시지', jsonMessage);
      client.publish({ destination: `/pub/message/${dealId}`, body: jsonMessage });
    } else {
      console.error('웹소켓 연결 노활성화.');
    }
  };

  return (
    <div className="w-full h-screen pb-[4.5rem]">
      <Header info={info} />
      <DealInfo />
      <div className="px-6 pt-40 pb-20">
        {/* 이전 대화내용 불러오기 */}
        {chatLogInfo &&
          chatLogInfo.data.chatResList.map((chatLog, index) => <ChatLogs key={index} chatResList={chatLog} />)}
        {/* 실시간 채팅 내용 불러오기 */}
        {chatLogs.map((chatLog, index) => (
          <ChatLogs key={index} chatResList={chatLog} />
        ))}
      </div>
      <div>
        <MessageInput
          message={message}
          setMessage={setMessage}
          sendMessage={message => {
            sendMessage(message);
            setMessage('');
          }}
        />
      </div>
    </div>
  );
};

export default ChatRoomPage;
