import Header, { IHeaderInfo } from "@/components/@common/header";
import { icons } from "@/constants/icons";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface ChatLog {
  type: string;
  senderId: number;
  message: string;
}

const ChatRoomPage: React.FC = () => {

  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const [message, setMessage] = useState<string>('');
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // TODO: 실제 채팅방 참여 유저로 변경해야함
  const info: IHeaderInfo = {
    left: icons.BACK,
    center: '중고짱좋아',
    right_1: null,
    right_2: null,
  }

  // websocket 연결
  useEffect(() => {
    const chatLogList = async () => {
      try {
        // TODO: 나중에 실제 데이터로 바꾸기 ( test용 roomId=1로 구현 )
        const res = await axios.get('http://localhost:8080/chat/rooms/1')
        const chatLogs: ChatLog[] = res.data.map((item: any) => {
          return { type: item.type, senderId: item.senderId, message: item.message } as ChatLog
        });
        setChatLogs(chatLogs)
        console.log(chatLogs)
        setLoading(false);
      } catch (err) {
        console.log('대화 내용 불러오기 실패', err)
      }
    }
    chatLogList();
  }, [])

  useEffect(() => {
    // 웹소켓 연결
    const ws = new WebSocket('ws://localhost:8080/ws');
    setWebSocket(ws);

    ws.onopen = () => {
      console.log('웹소켓 연결');

      // /sub/chat/rooms/1을 구독합니다.
      ws.send(JSON.stringify({ type: 'subscribe', roomId: 1 }));
    };

    ws.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      console.log('받은 메시지:', receivedMessage);
      // 받은 메시지를 채팅 로그에 추가하기
      setChatLogs((prevLogs) => [...prevLogs, receivedMessage]);
    };

    ws.onclose = () => {
      console.log('웹소켓 연결 종료');
    };

    // 컴포넌트 언마운트 시 웹소켓 연결 종료
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (webSocket && message.trim() !== '') {
      // /pub/message/1로 메시지를 서버로 전송
      webSocket.send(JSON.stringify({ type: 'message', roomId: 1, message }));

      setMessage('');
    }
  };

return (
    <div className="w-full h-screen">
        <Header info={info} />
        <div className="pt-12">
        <div>
          {chatLogs.map((log, index) => (
            <div key={index}>
              <span>{log.message}</span>
            </div>
          ))}
        </div>
        <div className="bg-white w-full px-6 pb-1 h-20 flex items-center border-t border-[#D9D9D9] fixed bottom-0">
            <input
                type="text"
                placeholder="메시지를 입력하세요"
                className="p-3 outline-none border w-full rounded-lg bg-[#F4F4F4]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className="pl-3"  onClick={sendMessage}>
                < FiSend size={'1.8rem'} color="#545454" />
            </button>
        </div>
          </div>
        </div>
    );
  };

export default ChatRoomPage;
