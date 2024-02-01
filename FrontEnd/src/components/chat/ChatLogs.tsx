import { formatDateTime } from "@/utils/formatDateTime";
import React, { useEffect, useRef } from "react";

export interface ChatLog {
  senderId: number;
  type: string;
  createTime: Date;
  message: string;
  read: boolean;
}

interface ChatLogsProps {
  chatLogs: ChatLog[];
}

const ChatLogs: React.FC<ChatLogsProps> = ({ chatLogs }) => {

  // 마지막 내용 바로 보여주기
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [chatLogs]);

  return (
    <div className="w-full flex flex-col space-y-2 px-6 pt-40 pb-24 flex-nowrap overflow-x-auto">
      {chatLogs.map((log, index) => (
        <div
          className={`flex ${log.senderId !== 1 ? 'justify-start' : 'justify-end'}`}
          key={index}
        >
          <div className='flex items-end'>
            {log.senderId !== 1 ? (
              <>
                <p className="bg-gray-200 rounded-lg p-3">{`${log.message}`}</p>
                <p className="text-sm text-gray-400 ml-2">{`${formatDateTime(log.createTime.toString())}`}</p>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-400 mr-2">{`${formatDateTime(log.createTime.toString())}`}</p>
                <p className="bg-BID_MAIN rounded-lg p-3">{`${log.message}`}</p>
              </>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatLogs;
