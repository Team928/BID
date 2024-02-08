import { dealType } from '@/components/@common/StateButton';
import { getProfileWishSaleReq, getProfileWishPurchaseReq } from '@/service/scrap/api';
import { useQuery } from '@tanstack/react-query';

export const useWish = () => {
  const useGetWishSaleList = (type: dealType) => {
    return useQuery({
      queryKey: ['wish', 'list', type],
      queryFn: () => getProfileWishSaleReq(type),
    });
  };

  const useGetWishPurchaseList = (type: dealType) => {
    return useQuery({
      queryKey: ['wish', 'list', type],
      queryFn: () => getProfileWishPurchaseReq(type),
    });
  };

  return { useGetWishSaleList, useGetWishPurchaseList };
};
