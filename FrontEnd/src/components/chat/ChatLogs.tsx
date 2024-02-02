
import { IChatLogListRes } from "@/types/chat";
import { formatDateTime } from "@/utils/formatDateTime";
import { useEffect, useRef } from "react";



const ChatLogs = (props: {chatLogs: IChatLogListRes}) => {
  const {senderId, message, createTime} = props.chatLogs

  // 마지막 내용 바로 보여주기
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  });

  return (
    <div className="w-full flex flex-col space-y-2 flex-nowrap overflow-x-auto">
        <div
          className={`flex ${senderId !== 1 ? 'justify-start' : 'justify-end'}`}
        >
          <div className='flex items-end'>
            {senderId !== 1 ? (
              <>
                <p className="bg-gray-200 rounded-lg p-3">{`${message}`}</p>
                <p className="text-sm text-gray-400 ml-2">{`${formatDateTime(createTime.toString())}`}</p>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-400 mr-2">{`${formatDateTime(createTime.toString())}`}</p>
                <p className="bg-BID_MAIN rounded-lg p-3">{message}</p>
              </>
            )}
          </div>
        </div>
      <div/>
    </div>
  );
}

export default ChatLogs;
