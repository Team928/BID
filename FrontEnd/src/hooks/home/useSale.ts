import { getSaleDetailReq, getSaleListReq } from '@/service/home/api';
import { ISalesListReq } from '@/types/home';
import { useQuery } from '@tanstack/react-query';

export const useSale = () => {
  const useGetSaleList = (props: ISalesListReq) => {
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
