import React from "react";

const ChatLogs: React.FC<{ logs: string[] }> = ({ logs }) => {
    return (
        <div>
            {logs.map((logStr, i) => {
                const chatlog = JSON.parse(logStr);
                console.log(chatlog);
                return (
                    <p key={`${i}`}>
                        {`${chatlog.author} : ${chatlog.message}`}
                    </p>
                )
            })}
        </div>
    )
}
export default ChatLogs;