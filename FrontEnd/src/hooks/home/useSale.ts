import { getSaleDetailReq, getSaleListReq, postSaleBid } from '@/service/home/api';
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
      },
    });
  };
  return { useGetSaleList, useGetSaleDetail, usePostSaleBid };
};
