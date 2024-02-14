import { axiosAuthInstance } from '@/apis/axiosInstance';
import useChatStore from '@/stores/useChatStore';
import userStore from '@/stores/userStore';
import { Client, StompHeaders } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { RiAuctionFill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';

const SaleBuyerChat = ({ handleBid }: { handleBid: () => void }) => {
  const accessToken = axiosAuthInstance;

  const [client, setClient] = useState<Client | null>(null);
  const { addChatLog, chatLogs, clearChatLogs } = useChatStore(state => state);
  const [message, setMessage] = useState<string>('');
  const { userId } = userStore();
  const { id: dealId } = useParams();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  const sendMessage = (message: string) => {
    if (client !== null && message.trim() !== '') {
      const newMessage = {
        senderId: userId,
        message: message,
        type: 'TALK',
      };
      const jsonMessage = JSON.stringify(newMessage);
      client.publish({ destination: `/pub/message/lives/${dealId}`, body: jsonMessage });
      setMessage('');
    } else {
      console.error('웹소켓 연결 노활성');
    }
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div>
      <div className="px-2 w-full max-h-60 overflow-y-auto py-2 absolute bottom-20 text-white" ref={chatContainerRef}>
        {chatLogs.map((log, index) => (
          <div key={index} className="py-1 text-sm">
            <span className="font-bold text-white/70">{log.sender}</span>
            <span className="px-2 font-bold">{log.message}</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 h-20 left-0 right-0 flex justify-center flex items-center">
        <button
          type="button"
          className="bg-BID_MAIN w-[50px] h-[50px] rounded-full flex justify-center items-center hover:bg-BID_HOVER_MAIN"
          onClick={handleBid}
        >
          <RiAuctionFill color="white" size="25" />
        </button>
        <div className="flex-1 ml-2 h-12 rounded-full border border-[1px] border-BID_SUB_GRAY bg-BID_SUB_GRAY/20 flex">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="채팅을 입력해주세요"
            onKeyPress={e => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            className="w-full h-full px-4 bg-white/0 focus:outline-none text-white"
          />
          <button type="button" className="w-12" onClick={handleSendMessage}>
            <FiSend color="#969696" size="28" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleBuyerChat;
