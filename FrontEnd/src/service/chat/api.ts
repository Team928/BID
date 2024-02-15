import { axiosAuthInstance } from '@/apis/axiosInstance';
import { IChatLogListRes, IChatRoomListReq, IChatRoomListRes, IChatLogListReq } from '@/types/chat';
import { APIResponse } from '@/types/model';

// 채팅방 목록
export const getChatRoomListReq = async ({ userId }: IChatRoomListReq): Promise<APIResponse<IChatRoomListRes[]>> => {
  const { data } = await axiosAuthInstance.get(`chats/rooms`, {
    params: {
      userId: userId,
    },
  });

  return data;
};

// 채팅방 목록 삭제
export const deleteChatRoomReq = async (dealId: number): Promise<APIResponse<IChatRoomListRes[]>> => {
  const { data } = await axiosAuthInstance.delete(`chats/rooms/${dealId}`);

  return data;
};

// 구매확정 전달
export const confirmedDealReq = async (dealId: number): Promise<APIResponse<IChatRoomListRes[]>> => {
  const { data } = await axiosAuthInstance.get(`chats/confirmed/${dealId}`);

  return data;
};

// 채팅로그 목록
export const getChatLogLisReq = async ({ dealId }: IChatLogListReq): Promise<APIResponse<IChatLogListRes>> => {
  const { data } = await axiosAuthInstance.get(`chats/rooms/${dealId}`);
  return data;
};
