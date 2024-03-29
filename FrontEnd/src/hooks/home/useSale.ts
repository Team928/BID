import Toast from '@/components/@common/Toast';
import {
  deleteDealWish,
  getRecordVideo,
  getSaleDetailReq,
  getSaleListReq,
  getVideoSTT,
  postDealWishAdd,
  postImmediateBid,
  postLiveReq,
  postSaleBid,
} from '@/service/home/api';
import { IDealsListInfiniteReq, IDealsListReq } from '@/types/home';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useSale = () => {
  const queryClient = useQueryClient();

  const useGetSaleList = (props: IDealsListReq) => {
    return useQuery({
      queryKey: ['sale', props],
      queryFn: () => getSaleListReq(props),
    });
  };

  const useGetListInfinite = (props: IDealsListInfiniteReq) => {
    return useInfiniteQuery({
      queryKey: ['products', props],
      queryFn: ({ pageParam }) => {
        return getSaleListReq({ ...props, page: String(pageParam - 1) });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        // 마지막 페이지면
        if (lastPage.data.last) return;

        return nextPage;
      },
    });
  };

  const useGetSaleDetail = (sailId: number) => {
    return useQuery({
      queryKey: ['sale', 'detail', sailId],
      queryFn: () => getSaleDetailReq(sailId),
    });
  };

  const usePostSaleBid = (saleId: number, bidPrice: string, nickname: string) => {
    return useMutation({
      mutationKey: ['bid', saleId, bidPrice],
      mutationFn: () => postSaleBid(saleId, bidPrice),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['sale', 'detail', saleId] });
        queryClient.invalidateQueries({ queryKey: ['profile', nickname] });
        Toast.success('성공적으로 입찰되었습니다');
      },
      onError: () => {
        Toast.error('입찰에 실패하였습니다');
      },
    });
  };

  const usePostSaleImmediate = (saleId: number) => {
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
    return useMutation({
      mutationKey: ['wished', 'add', dealId],
      mutationFn: () => postDealWishAdd(dealId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['purchase', 'detail', dealId] });
        queryClient.invalidateQueries({ queryKey: ['sale', 'detail', dealId] });
      },
      onError: () => {
        console.log('에러입니다');
      },
    });
  };

  const usePostSaleLive = (saleId: number) => {
    return useMutation({
      mutationKey: ['live', saleId],
      mutationFn: () => postLiveReq(saleId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['sale', 'detail', saleId] });
        Toast.success('라이브 요청이 성공적으로 이루어졌습니다');
      },
      onError: () => {
        Toast.error('이미 진행한 요청입니다');
      },
    });
  };

  const useDeleteDealWish = (dealId: number) => {
    return useMutation({
      mutationKey: ['wished', 'delete', dealId],
      mutationFn: () => deleteDealWish(dealId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['purchase', 'detail', dealId] });
        queryClient.invalidateQueries({ queryKey: ['sale', 'detail', dealId] });
      },
      onError: () => {
        console.log('에러입니다');
      },
    });
  };

  const useGetRecordVideo = (dealId: number) => {
    return useQuery({
      queryKey: ['video', dealId],
      queryFn: () => getRecordVideo(dealId),
    });
  };

  const useGetVideoSTT = (videoId: number) => {
    return useQuery({
      queryKey: ['video', 'stt', videoId],
      queryFn: () => getVideoSTT(videoId),
    });
  };

  return {
    useGetSaleList,
    useGetListInfinite,
    useGetSaleDetail,
    usePostSaleBid,
    usePostSaleImmediate,
    usePostDealWishAdd,
    useDeleteDealWish,
    usePostSaleLive,
    useGetRecordVideo,
    useGetVideoSTT,
  };
};
