import { axiosAuthInstance } from '@/apis/axiosInstance';
import { dealType } from '@/components/@common/StateButton';
import { IPurchaseListRes, ISaleListRes } from '@/types/home';
import { APIResponse } from '@/types/model';

export const getProfileWishSaleReq = async (type: dealType): Promise<APIResponse<ISaleListRes>> => {
  const lookupParam: { page: number; size: number; type: dealType } = {
    page: 0,
    size: 10,
    type: type,
  };
  const { data } = await axiosAuthInstance.get(`members/profiles/wish`, {
    params: lookupParam,
  });
  console.log(data);
  return data;
};

export const getProfileWishPurchaseReq = async (type: dealType): Promise<APIResponse<IPurchaseListRes>> => {
  const { data } = await axiosAuthInstance.get(`members/profiles/wish`, {
    params: {
      lookupParam: {
        page: 0,
        size: 10,
        type: type,
      },
    },
  });
  console.log(data);
  return data;
};
