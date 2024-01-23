// 미완성

import Header, { IHeaderInfo } from "@/components/@common/header";
import ChatLogs from "@/components/chat/ChatLogs";
import MessageInput from "@/components/chat/MessageInput";
import { icons } from "@/constants/icons";
import React, { useEffect, useRef, useState } from "react";


const ChatRoomPage: React.FC = () => {

    const [userName, setUserName] = useState("");
    const [message, setMessage] = useState("");
    const [chatLogs, setChatLogs] = useState<string[]>([]);

    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (userName) {
            console.log(userName)
            wsRef.current = new WebSocket(`ws://localhost:8080/chat`);

            wsRef.current.onopen = () => console.log("Connection opened!!");

            wsRef.current.onmessage = (event) => 
                setChatLogs((prevChatLogs) => [...prevChatLogs, event.data]);

            wsRef.current.onclose = (event) => {
                if (event.wasClean) {
                    console.log("Connection colsed");
                } else {
                    console.log("connection failed");
                }
            };
            return () => wsRef.current?.close();
            } 
            return undefined;
        }, [userName]);

        const sendMessage = () => {
            if (
                message.trim() !== "" &&
                userName.trim() !== "" &&
                wsRef.current &&
                wsRef.current.readyState === WebSocket.OPEN
            ) {
                const payload = JSON.stringify({ author: userName, message: message});
                console.log(payload);
                wsRef.current.send(payload);

                setMessage("");
            }
        };

        // TODO: 실제 채팅방 참여 유저로 변경해야함
        const info: IHeaderInfo = {
            left: icons.BACK,
            center: '중고짱좋아',
            right_1: null,
            right_2: null,
          }
        return (
            <div className="w-full h-screen">
                <Header info={info} />
                <div className="pt-12 pb-20">
                    <ChatLogs />
                    </div>
                    <div>
                        <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            sendMessage();
                        }}>
                            <MessageInput 
                                message={message}
                                setMessage={setMessage}
                                sendMessage={() => sendMessage()}
                            />
                        </form>
                    </div>
                
          </div>
      );
    };

export default ChatRoomPage;
