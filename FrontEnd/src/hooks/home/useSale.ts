import Toast from '@/components/@common/Toast';
import { getSaleDetailReq, getSaleListReq, postImmediateBid, postSaleBid } from '@/service/home/api';
import { IDealsListReq } from '@/types/home';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useSale = () => {
  const useGetSaleList = (props: IDealsListReq) => {
    return useQuery({
      queryKey: ['sale', props],
      queryFn: () => getSaleListReq(props),
    });
  };

  const useGetSaleDetail = (sailId: number) => {
    return useQuery({
      queryKey: ['sale', 'detail', sailId],
      queryFn: () => getSaleDetailReq(sailId),
    });
  };

  const usePostSaleBid = (saleId: number, bidPrice: string) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey: ['bid', saleId, bidPrice],
      mutationFn: () => postSaleBid(saleId, bidPrice),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['sale', 'detail', saleId] });
        Toast.success('성공적으로 입찰되었습니다');
      },
      onError: () => {
        Toast.error('입찰에 실패하였습니다');
      },
    });
  };

  const usePostSaleImmediate = (saleId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey: ['immediate', saleId],
      mutationFn: () => postImmediateBid(saleId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['sale', 'detail', saleId] });
        Toast.success('성공적으로 구매되었습니다');
      },
      onError: () => {
        Toast.error('구매에 실패하였습니다');
      },
    });
  };

  return { useGetSaleList, useGetSaleDetail, usePostSaleBid, usePostSaleImmediate };
};
