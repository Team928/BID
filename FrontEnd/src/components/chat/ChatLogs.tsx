import { formatDateTime } from "@/utils/formatDateTime";
import React from "react";


export interface ChatLog {
  senderId: number,
  type: string;
  createTime: Date;
  message: string;
  read: boolean;
}

interface ChatLogsProps {
  chatLogs: ChatLog[];
}

const ChatLogs: React.FC<ChatLogsProps> = ({ chatLogs }) => {

      return (
        <div className="w-full flex flex-col space-y-2 px-6 py-3">
          {chatLogs.map((log, i) => (
            <div
              className={`flex ${log.senderId !== 1 ? 'justify-start' : 'justify-end'}`}
              key={`${i}`}
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
        </div>
      );
}
export default ChatLogs;

/**
 * 이런식으로 get
 {"status":200,"message":"판매글 조회에 성공하였습니다.",
 "data":[{"sender":"test1","senderId":1,"roomId":1,"createTime":"2024-01-30T10:48:10.018745200","message":"하이요","type":"TALK","read":false},
 {"sender":"test1","senderId":1,"roomId":1,"createTime":"2024-01-30T10:48:16.762795200","message":"반가워요?","type":"TALK","read":false},
 {"sender":"test1","senderId":1,"roomId":1,"createTime":"2024-01-30T10:48:22.611945300","message":"대답 좀.","type":"TALK","read":false},
 {"sender":"test2","senderId":2,"roomId":1,"createTime":"2024-01-30T13:50:44.995501200","message":"안녕하세요","type":"TALK","read":false},
 {"sender":"test2","senderId":2,"roomId":1,"createTime":"2024-01-30T16:07:41.998319300","message":"계세요?","type":"TALK","read":false}]}
 * 
 */