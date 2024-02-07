import Toast from '@/components/@common/Toast';
import {
  deleteDealWish,
  getSaleDetailReq,
  getSaleListReq,
  postDealWishAdd,
  postImmediateBid,
  postLiveReq,
  postSaleBid,
} from '@/service/home/api';
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

  const usePostDealWishAdd = (dealId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey: ['wished', 'add', dealId],
      mutationFn: () => postDealWishAdd(dealId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['sale', 'detail', dealId] });
      },
      onError: () => {
        console.log('에러입니다');
      },
    });
  };

  const usePostSaleLive = (saleId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey: ['live', saleId],
      mutationFn: () => postLiveReq(saleId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['sale', 'detail', saleId] });
      },
      onError: () => {
        console.log('에러입니다');
      },
    });
  };

  const useDeleteDealWish = (dealId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey: ['wished', 'delete', dealId],
      mutationFn: () => deleteDealWish(dealId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['sale', 'detail', dealId] });
      },
      onError: () => {
        console.log('에러입니다');
      },
    });
  };

  return {
    useGetSaleList,
    useGetSaleDetail,
    usePostSaleBid,
    usePostSaleImmediate,
    usePostDealWishAdd,
    useDeleteDealWish,
    usePostSaleLive,
  };
};
