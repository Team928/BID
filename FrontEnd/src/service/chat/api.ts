import { axiosAuthInstance } from "@/apis/axiosInstance"
import { IChatLogListRes, IChatRoomListReq, IChatRoomListRes, IChatLogListReq } from "@/types/chat"
import { APIResponse } from "@/types/model"

// 채팅방 목록
export const getChatRoomListReq = async ({
    userId,
}: IChatRoomListReq): Promise<APIResponse<IChatRoomListRes[]>> => {
    const { data } = await axiosAuthInstance.get(`chats/rooms`, {
        params: {
            userId: userId,
        },
    });
    console.log(data);
    return data;
}

// 채팅로그 목록
export const getChatLogLisReq = async ({
    roomId,
}: IChatLogListReq): Promise<APIResponse<IChatLogListRes[]>> => {
    const { data } = await axiosAuthInstance.get(`chats/rooms/${roomId}`)
    console.log(data)
    return data
}
