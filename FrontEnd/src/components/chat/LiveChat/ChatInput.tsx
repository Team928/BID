import React from "react";
import { FiSend } from "react-icons/fi";

export interface ChatInputProps {
    message: string;
    setMessage: (value: string) => void;
    sendMessage: (message: string) => void;
}
const ChatInput: React.FC<ChatInputProps> = ({ message, setMessage, sendMessage }) => {

    const handleSendMessage = () => {
        if (message.trim() !== "") { // 메시지가 비어있지 않은지 확인
            sendMessage(message); // 메시지 전송
            setMessage(""); // 메시지 입력 필드 초기화
        }
    };

    return (
        <div className="bg-white w-full px-6 pb-1 h-20 flex items-center border-t border-[#D9D9D9] fixed bottom-0">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력하세요"
                className="p-3 outline-none border w-full rounded-lg bg-[#F4F4F4]"
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        handleSendMessage();
                    }
                }}
            />
            <button
                onClick={handleSendMessage}
                className="pl-3"
            >
                <FiSend size={'1.8rem'} color="#545454" />
            </button>
        </div>
    );
};

export default ChatInput;