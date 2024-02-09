import Toast from '@/components/@common/Toast';
import {
  getBuyListHostReq,
  getBuyListParticiReq,
  getSaleListHostReq,
  getSaleListParticiReq,
  getUserProfileReq,
  postChargePoint,
} from '@/service/profile/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useProfile = () => {
  const useSaleHost = (nickName: string) => {
    return useQuery({
      queryKey: ['sale', 'host', nickName],
      queryFn: () => getSaleListHostReq(nickName),
    });
  };

  const useSaleParticipant = () => {
    return useQuery({
      queryKey: ['saleParticipant'],
      queryFn: () => getSaleListParticiReq(),
    });
  };

  const useBuyHost = (nickname: string) => {
    return useQuery({
      queryKey: ['buy', 'host', nickname],
      queryFn: () => getBuyListHostReq(nickname),
    });
  };

  const useBuyParticipant = () => {
    return useQuery({
      queryKey: ['buyParticipant'],
      queryFn: () => getBuyListParticiReq(),
    });
  };

  const useUserProfile = (nickname: string) => {
    return useQuery({
      queryKey: ['profile', nickname],
      queryFn: () => getUserProfileReq(nickname),
    });
  };

  const usePostChargePoint = (amount: number, nickname: string) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey: ['point', 'charge', amount],
      mutationFn: () => postChargePoint(amount),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['profile', nickname] });
        Toast.success('성공적으로 충전되었습니다');
      },
      onError: () => {
        Toast.error('충전에 실패하였습니다 다시 시도해주세요');
      },
    });
  };

  return { useSaleHost, useUserProfile, useBuyHost, useSaleParticipant, useBuyParticipant, usePostChargePoint };
};
