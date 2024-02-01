import { getPurchaseListReq } from '@/service/home/api';
import { IDealsListReq } from '@/types/home';
import { useQuery } from '@tanstack/react-query';

export const usePurchase = () => {
  const useGetPurchaseList = (props: IDealsListReq) => {
    return useQuery({
      queryKey: ['purchase', props],
      queryFn: () => getPurchaseListReq(props),
    });
  };

  return { useGetPurchaseList };
};
