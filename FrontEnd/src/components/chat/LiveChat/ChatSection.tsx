import { useEffect, useState } from "react";
import { Client, StompHeaders } from "@stomp/stompjs";
import { axiosAuthInstance } from "@/apis/axiosInstance";
import useChatStore from "@/stores/useChatStore";

const ChatSection = () => {
    const accessToken = axiosAuthInstance;

    const [client, setClient] = useState<Client | null>(null);
    const { addChatLog, chatLogs, clearChatLogs } = useChatStore(state => state);
    const [message, setMessage] = useState<string>("");

    console.log(chatLogs);
    console.log(client);

    useEffect(() => {
        const savedChatLogs = localStorage.getItem("chatLogs");
        if (savedChatLogs) {
            addChatLog(JSON.parse(savedChatLogs));
        }

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

    const sendMessage = () => {
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
        <div>
            <h1>채팅 섹션</h1>
            <div>
                {chatLogs.map((log, index) => (
                    <div key={index}>{log.senderId} : {log.message}</div>
                ))}
            </div>

            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지를 입력하세요"
                />
                <button onClick={sendMessage}>전송</button>
            </div>
        </div>
    );
};

export default ChatSection;
