// 미완성

import ChatLogs from "@/components/chat/ChatLogs";
import MessageInput from "@/components/chat/MessageInput";
import UserNameInput from "@/components/chat/UserNameInput";
import React, { useEffect, useRef, useState } from "react";


const ChatRoomPage: React.FC = () => {

  const [userNameInput, setUserNameInput] = useState("");
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
        return (
          <div>
              <h1>임시</h1>
              <ChatLogs logs={chatLogs} />
              {!userName ? (
                  <form
                  onSubmit={(e) => {
                      e.preventDefault();
                      if(userNameInput) {
                          setUserName(userNameInput);
                      }
                  }}
                  >
                      <UserNameInput
                          userNameInput={userNameInput}
                          setUserNameInput={setUserNameInput}
                          setUserName={setUserName} 
                      />
                  </form>
              ) : (
                  <form
                  onSubmit={(e) => {
                      e.preventDefault();
                      sendMessage();
                  }}
                  >
                      <MessageInput 
                          message={message}
                          setMessage={setMessage}
                          sendMessage={() => sendMessage()}
                      />
                  </form>
              )}
          </div>
      );
    };

export default ChatRoomPage;
