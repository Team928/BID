import React, { useEffect, useState } from "react";
import { Client, StompHeaders } from "@stomp/stompjs";
import Header, { IHeaderInfo } from "@/components/@common/Header";
import { icons } from "@/constants/icons";
import MessageInput from "@/components/chat/MessageInput";
import ChatLogs, { ChatLog } from "@/components/chat/ChatLogs";
import axios from "axios";

const ChatRoomPage: React.FC = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [message, setMessage] = useState<string>("");

  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);

  // TODO: 실제 채팅방 참여 유저로 변경해야함
  const info: IHeaderInfo = {
    left: icons.BACK,
    center: '방제목',
    right_1: null,
    right_2: null,
    prev: '/chat',
  }

  

  useEffect(() => {
    // 웹소켓 연결
    const newClient = new Client();
    newClient.configure({
      brokerURL: 'ws://localhost:8080/ws',
      onConnect: () => {
        console.log("웹소켓 연결 완료");

        // '/sub/chat/room/1'로 구독
        const headers: StompHeaders = {};
        newClient.subscribe('/sub/chat/room/1', (message) => {
          console.log("받은 메시지 :", message.body);
          // 메시지를 받으면 body를 파싱하여 chatLogs에 추가
          const parsedMessage = JSON.parse(message.body);

          // 새로운 채팅이 도착할 때마다 상태를 업데이트
          setChatLogs(prevChatLogs => [...prevChatLogs, parsedMessage.body.data])
      }, headers);
    },

      onDisconnect: () => {
        console.log("웹소켓 연결 종료");
      },
    });

    // 웹소켓 세션 활성화
    newClient.activate();
    setClient(newClient);

    // Axios를 이용한 데이터 가져오기
    axios.get('http://localhost:8080/chat/rooms/1')
      .then(response => {
        // 서버로부터 받은 데이터를 채팅 로그 상태로 업데이트
        setChatLogs(response.data.data);
        console.log("업데이트 ", response.data.data)
      })
      .catch(error => {
        console.error('데이터를 불러오는 도중 오류가 발생 !!', error);
      });

    return () => {
      newClient.deactivate();
    };

  }, []);

  // Message 전달 형태 {"senderId":1, "roomId":1, "message":"안녕","type":"TALK"}
  // dummy user 로 테스트 진행
  const sendMessage = (message: string) => {
    if (client !== null) {
      const newMessage = {
        senderId: 1,
        roomId: 1,
        message: message,
        type: "TALK",
      };
      const jsonMessage = JSON.stringify(newMessage);
      console.log(jsonMessage)
      client.publish({ destination: '/pub/message/1', body: jsonMessage });
      
    } else {
      console.error('웹소켓 연결 노활성화.');
    }
  };

  return (
    <div className="w-full h-screen pb-[4.5rem]">
      <Header info={info} />
      <div className="pt-12">
        <ChatLogs chatLogs={chatLogs}/>
      </div>
      <MessageInput
        message={message}
        setMessage={setMessage}
        sendMessage={(message) => {
          sendMessage(message); 
          setMessage("");
        }}
      />
    </div>
  );
};

export default ChatRoomPage;
