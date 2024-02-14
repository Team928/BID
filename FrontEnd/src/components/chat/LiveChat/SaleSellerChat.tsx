import { axiosAuthInstance } from '@/apis/axiosInstance';
import useChatStore from '@/stores/useChatStore';
import { Client, StompHeaders } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const SaleSellerChat = () => {
  const accessToken = axiosAuthInstance;

  const [client, setClient] = useState<Client | null>(null);
  const { addChatLog, chatLogs, clearChatLogs } = useChatStore(state => state);
  const { id: dealId } = useParams();

  console.log(client);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 웹소켓 연결
    const newClient = new Client();
    newClient.configure({
      brokerURL: import.meta.env.VITE_CHAT_URL,
      onConnect: () => {
        const headers: StompHeaders = {
          Authorization: 'Bearer ' + accessToken,
        };

        newClient.subscribe(
          `/sub/chats/lives/${dealId}`,
          message => {
            const parsedMessage = JSON.parse(message.body);
            addChatLog(parsedMessage.body.data);

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
      <div className="px-2 max-h-60 overflow-y-auto py-2 relative text-white" ref={chatContainerRef}>
        {chatLogs.map((log, index) => (
          <div key={index} className="py-1 text-sm">
            <span className="font-bold text-white/70">{log.sender}</span>
            <span className="px-2 font-bold">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaleSellerChat;
