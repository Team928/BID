import { getPurchaseDetailReq, getPurchaseListReq } from '@/service/home/api';
import { IDealsListInfiniteReq, IDealsListReq } from '@/types/home';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

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

  const useGetListPurchaseInfinite = (props: IDealsListInfiniteReq) => {
    return useInfiniteQuery({
      queryKey: ['products', props],
      queryFn: ({ pageParam }) => {
        console.log(pageParam);
        return getPurchaseListReq({ ...props, page: String(pageParam - 1) });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        console.log(nextPage);
        console.log(lastPage);
        // 마지막 페이지면
        if (lastPage.data.last) return;

        return nextPage;
      },
    });
  };

  return { useGetPurchaseList, useGetPurchaseDetail, useGetListPurchaseInfinite };
};
