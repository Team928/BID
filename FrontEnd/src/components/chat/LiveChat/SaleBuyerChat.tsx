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

  const sendMessage = (message: string) => {
    if (client !== null && message.trim() !== '') {
      const newMessage = {
        senderId: userId,
        message: message,
        type: 'TALK',
      };
      const jsonMessage = JSON.stringify(newMessage);
      console.log('보낸 메시지', jsonMessage);
      client.publish({ destination: `/pub/message/lives/${dealId}`, body: jsonMessage });
      setMessage(''); // 메시지를 보낸 후에 입력란 초기화
    } else {
      console.error('웹소켓 연결 노활성');
    }
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      // 메시지가 비어있지 않은지 확인
      sendMessage(message); // 메시지 전송
      setMessage(''); // 메시지 입력 필드 초기화
    }
  };

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

/*
컴포넌트 불러올 때 ....

<div className="h-screen flex items-end">
    <div className="w-full h-40vh">
        <ChatSection />
    </div>
</div>;

*/
