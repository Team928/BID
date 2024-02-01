import { getSaleDetailReq, getSaleListReq } from '@/service/home/api';
import { IDealsListReq } from '@/types/home';
import { useQuery } from '@tanstack/react-query';

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

  return { useGetSaleList, useGetSaleDetail };
};
