import { deleteChatRoomReq, getChatLogLisReq, getChatRoomListReq } from '@/service/chat/api';
import { IChatLogListReq, IChatRoomListReq } from '@/types/chat';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 채팅방 목록
export const useChatRoom = () => {
  const useGetChatRoomList = (props: IChatRoomListReq) => {
    return useQuery({
      queryKey: ['chatRoom', props],
      queryFn: () => getChatRoomListReq(props),
    });
  };

  const useDeleteChatRoom = (dealId: number) => {
    const queryClient = useQueryClient();

    const deleteChatRoom = useMutation({
      mutationKey: ['delete', dealId],
      mutationFn: () => deleteChatRoomReq(dealId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['chatRoom'] });
      },
    });

    return { deleteChatRoom };
  };

  return { useGetChatRoomList, useDeleteChatRoom };
};

// 채팅로그 목록
export const useChatLog = () => {
  const useGetChatLogList = (props: IChatLogListReq) => {
    return useQuery({
      queryKey: ['chatLog', props],
      queryFn: () => getChatLogLisReq(props),
    });
  };
  return { useGetChatLogList };
};
