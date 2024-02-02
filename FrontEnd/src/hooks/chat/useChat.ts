import { getChatLogLisReq, getChatRoomListReq } from "@/service/chat/api"
import { IChatLogListReq, IChatRoomListReq } from "@/types/chat"
import { useQuery } from "@tanstack/react-query"

// 채팅방 목록
export const useChatRoom = () => {
    const useGetChatRoomList = ( props: IChatRoomListReq) => {
        return useQuery({
            queryKey: ['chatRoom', props],
            queryFn: () => getChatRoomListReq(props),
        });
    };
    return { useGetChatRoomList };
}


// 채팅로그 목록
export const useChatLog = () => {
    const useGetChatLogList = ( props: IChatLogListReq) => {
        return useQuery({
            queryKey: ['chatLog', props],
            queryFn: () => getChatLogLisReq(props),
        })
    }
    return { useGetChatLogList };
}

