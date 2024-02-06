import { axiosAuthInstance } from '@/apis/axiosInstance';
import { IDealsListReq, ISaleListRes, ISaleDetailRes, IPurchaseListRes, IPurchaseDetailRes } from '@/types/home';
import { APIResponse } from '@/types/model';

export const getSaleListReq = async ({
  page,
  size,
  catg,
  area,
  order,
  status,
  keyword,
}: IDealsListReq): Promise<APIResponse<ISaleListRes>> => {
  const { data } = await axiosAuthInstance.get(`deals/sales`, {
    params: {
      page: page,
      size: size,
      catg: catg,
      area: area,
      order: order,
      status: status,
      keyword: keyword,
    },
  });
  console.log(data);
  return data;
};

export const getSaleDetailReq = async (saleId: number): Promise<APIResponse<ISaleDetailRes>> => {
  const { data } = await axiosAuthInstance.get(`deals/sales/${saleId}`);
  console.log(data);
  return data;
};

export const getPurchaseListReq = async ({
  page,
  size,
  catg,
  area,
  order,
  status,
  keyword,
}: IDealsListReq): Promise<APIResponse<IPurchaseListRes>> => {
  const { data } = await axiosAuthInstance.get(`deals/purchases`, {
    params: {
      page: page,
      size: size,
      catg: catg,
      area: area,
      order: order,
      status: status,
      keyword: keyword,
    },
  });
  console.log(data);
  return data;
};

export const getPurchaseDetailReq = async (purchaseId: number): Promise<APIResponse<IPurchaseDetailRes>> => {
  const { data } = await axiosAuthInstance.get(`deals/purchases/${purchaseId}`);
  console.log(data);
  return data;
};

// 경매 입찰하기
export const postSaleBid = async (saleId: number, bidPrice: string): Promise<APIResponse<string>> => {
  try {
    const { data } = await axiosAuthInstance.post(`deals/sales/${saleId}/bids`, {
      bidPrice: bidPrice,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 즉시 구매하기
export const postImmediateBid = async (saleId: number): Promise<APIResponse<string>> => {
  try {
    const { data } = await axiosAuthInstance.post(`deals/sales/${saleId}/immediate`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postLiveReq = async (saleId: number): Promise<APIResponse<string>> => {
  try {
    const { data } = await axiosAuthInstance.post(`deals/sales/${saleId}/livereqs`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
