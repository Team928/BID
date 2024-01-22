import React from "react";

const MessageInput: React.FC<{
    message: string;
    setMessage: (value: string) => void;
    sendMessage: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ message, setMessage, sendMessage }) => {

    return (
        <div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력하세요 !"
            />
            <button
                onClick={sendMessage
                }>
                전송하기
            </button>
        </div>
    )
}
export default MessageInput;