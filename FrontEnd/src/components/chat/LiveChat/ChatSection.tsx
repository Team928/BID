import { useEffect, useRef, useState } from "react";
import { Client, StompHeaders } from "@stomp/stompjs";
import { axiosAuthInstance } from "@/apis/axiosInstance";
import useChatStore from "@/stores/useChatStore";
import ChatInput from "./ChatInput";

const ChatSection = () => {
    const accessToken = axiosAuthInstance;

    const [client, setClient] = useState<Client | null>(null);
    const { addChatLog, chatLogs, clearChatLogs } = useChatStore(state => state);
    const [message, setMessage] = useState<string>("");

    console.log(chatLogs);
    console.log(client);
    
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 웹소켓 연결
        const newClient = new Client();
        newClient.configure({
            brokerURL: 'ws://localhost:8081/ws',
            onConnect: () => {
                console.log("웹소켓 연결 완료");

                // '/sub/chat/room/1'로 구독
                const headers: StompHeaders = {
                    Authorization: 'Bearer ' + accessToken,
                };
                newClient.subscribe(`/sub/chats/rooms/1`, (message) => {
                    console.log("받은 메시지 :", message.body);

                    const parsedMessage = JSON.parse(message.body);
                    addChatLog(parsedMessage.body.data);

                    // 대화 내용 로컬 스토리지에 저장
                    localStorage.setItem("chatLogs", JSON.stringify([...chatLogs, parsedMessage.body.data]));
                
                    if (chatContainerRef.current) {
                        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                    }
                
                }, headers);
            },

            onDisconnect: () => {
                clearChatLogs()
                console.log("웹소켓 연결 종료");
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
        if (client !== null && message.trim() !== "") {
            const newMessage = {
                senderId: 1,
                message: message,
                type: "TALK",
            };
            const jsonMessage = JSON.stringify(newMessage);
            console.log("보낸 메시지", jsonMessage);
            client.publish({ destination: '/pub/message/1', body: jsonMessage });
            setMessage(""); // 메시지를 보낸 후에 입력란 초기화
        } else {
            console.error('웹소켓 연결 노활성');
        }
    };

    return (
        <div >
            <div className="px-6 max-h-60 overflow-y-auto pt-2 pb-28 relative bg-black bg-opacity-10" ref={chatContainerRef}>
                {chatLogs.map((log, index) => (
                    <div key={index}>
                        <span className="text-BID_MAIN font-bold">{log.senderId}</span> 
                        <span className="px-2 px-4 font-bold">{log.message}</span>
                    </div>
                ))}
            </div>
            <div>
                <ChatInput message={message} setMessage={setMessage} sendMessage={(message) => {
                    sendMessage(message); 
                    setMessage("");
                }} />
            </div>
        </div>
    );
    
};

export default ChatSection;

/*
컴포넌트 불러올 때 ....

<div className="h-screen flex items-end">
    <div className="w-full h-40vh">
        <ChatSection />
    </div>
</div>;

*/