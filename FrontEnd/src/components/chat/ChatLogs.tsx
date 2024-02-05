import { useChatLog } from "@/hooks/chat/useChat";
import { IChatResList } from "@/types/chat";
import { formatDateTime } from "@/utils/formatDateTime";
import { useEffect, useRef } from "react";

interface ChatLogsProps {
  chatResList: IChatResList;
}

const ChatLogs: React.FC<ChatLogsProps> = () => {

  const { useGetChatLogList }  = useChatLog()

    const {
      data:chatLogInfo,
    } = useGetChatLogList({ roomId: 1 })

    const chatLogs = chatLogInfo?.data.chatResList
  

  // 마지막 내용 바로 보여주기
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  });

  return (
    <div className="w-full flex flex-col space-y-2 flex-nowrap overflow-x-auto">
      {chatLogs &&
        chatLogs.map((chatLog, index) => (
          <div
            key={index}
            className={`flex ${
              chatLog.senderId !== 1 ? "justify-start" : "justify-end"
            }`}
          >
            <div className="flex items-end">
              {chatLog.senderId !== 1 ? (
                <>
                  <p className="bg-gray-200 rounded-lg p-3">{`${chatLog.message}`}</p>
                  <p className="text-sm text-gray-400 ml-2">{`${formatDateTime(
                    chatLog.createTime.toString()
                  )}`}</p>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-400 mr-2">{`${formatDateTime(
                    chatLog.createTime.toString()
                  )}`}</p>
                  <p className="bg-BID_MAIN rounded-lg p-3">{chatLog.message}</p>
                </>
              )}
            </div>
          </div>
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatLogs;
