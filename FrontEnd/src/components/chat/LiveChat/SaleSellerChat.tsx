import { axiosAuthInstance } from '@/apis/axiosInstance';
import useChatStore from '@/stores/useChatStore';
import { Client, StompHeaders } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const SaleSellerChat = () => {
  const accessToken = axiosAuthInstance;

  const [client, setClient] = useState<Client | null>(null);
  const { addChatLog, chatLogs, clearChatLogs } = useChatStore(state => state);
  // const [message, setMessage] = useState<string>('');
  // const { userId } = userStore();
  const { id: dealId } = useParams();

  console.log(chatLogs);
  console.log(client);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 웹소켓 연결
    const newClient = new Client();
    newClient.configure({
      brokerURL: 'wss://i10d208.p.ssafy.io/api/ws',
      onConnect: () => {
        console.log('웹소켓 연결 완료');

        // '/sub/chat/room/1'로 구독
        const headers: StompHeaders = {
          Authorization: 'Bearer ' + accessToken,
        };
        newClient.subscribe(
          `/sub/chats/lives/${dealId}`,
          message => {
            console.log('받은 메시지 :', message.body);

            const parsedMessage = JSON.parse(message.body);
            addChatLog(parsedMessage.body.data);

            // 대화 내용 로컬 스토리지에 저장
            localStorage.setItem('chatLogs', JSON.stringify([...chatLogs, parsedMessage.body.data]));

            if (chatContainerRef.current) {
              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
          },
          headers,
        );
      },

      onDisconnect: () => {
        clearChatLogs();
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

  return (
    <div>
      <div className="px-6 max-h-60 overflow-y-auto pt-2 pb-28 relative bg-black bg-opacity-10" ref={chatContainerRef}>
        {chatLogs.map((log, index) => (
          <div key={index}>
            <span className="text-BID_MAIN font-bold">{log.senderId}</span>
            <span className="px-2 font-bold">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaleSellerChat;

/*
컴포넌트 불러올 때 ....

<div className="h-screen flex items-end">
    <div className="w-full h-40vh">
        <ChatSection />
    </div>
</div>;

*/
