import React from "react";
import { FiSend } from "react-icons/fi";

const MessageInput: React.FC<{
    message: string;
    setMessage: (value: string) => void;
    sendMessage: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ message, setMessage, sendMessage }) => {

    return (
        <div className="bg-white w-full px-6 pb-1 h-20 flex items-center border-t border-[#D9D9D9] fixed bottom-0">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력하세요"
                className="p-3 outline-none border w-full rounded-lg bg-[#F4F4F4]"
            />
            <button
                onClick={sendMessage
                } className="pl-3">
                < FiSend size={'1.8rem'} color="#545454" />
            </button>
        </div>
    )
}
export default MessageInput;