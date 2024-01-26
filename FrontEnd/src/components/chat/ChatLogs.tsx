import React from "react";

// const ChatLogs: React.FC<{ logs: string[] }> = ({ logs }) => {
  
const ChatLogs: React.FC = () => {

    // TODO 나중에 실제 데이터로 수정해야함

    const dummyChatData = [
        { author: "사용자1", message: "안녕하세요", time: '09:10' },
        { author: "사용자1", message: "내일 거래해요", time: '09:10' },
        { author: "나", message: "좋습니다", time: '09:10' },
        { author: "나", message: "ㅎㅎㅎ", time: '09:10' },
        
      ];

      return (
        <div className="w-full flex flex-col space-y-2 px-6 py-3">
          {dummyChatData.map((log, i) => (
            <div
              className={`flex ${log.author !== '나' ? 'justify-start' : 'justify-end'}`}
              key={`${i}`}
            >
              <div className='flex items-end'>
                {log.author !== '나' ? (
                  <>
                    <p className="bg-gray-200 rounded-lg p-3">{`${log.message}`}</p>
                    <p className="text-sm text-gray-400 ml-2">{`${log.time}`}</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-400 mr-2">{`${log.time}`}</p>
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