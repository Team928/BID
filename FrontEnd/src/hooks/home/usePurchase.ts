import { getPurchaseDetailReq, getPurchaseListReq } from '@/service/home/api';
import { IDealsListReq } from '@/types/home';
import { useQuery } from '@tanstack/react-query';

export const usePurchase = () => {
  const useGetPurchaseList = (props: IDealsListReq) => {
    return useQuery({
      queryKey: ['purchase', props],
      queryFn: () => getPurchaseListReq(props),
    });
  };

  const useGetPurchaseDetail = (purchaseId: number) => {
    return useQuery({
      queryKey: ['purchase', 'detail', purchaseId],
      queryFn: () => getPurchaseDetailReq(purchaseId),
    });
  };

  return { useGetPurchaseList, useGetPurchaseDetail };
};
