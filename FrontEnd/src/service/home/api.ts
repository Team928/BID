import { axiosAuthInstance } from '@/apis/axiosInstance';
import { IDealsListReq, IPurchaseDetailRes, IPurchaseListRes, ISaleDetailRes, ISaleListRes } from '@/types/home';
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

  return data;
};

export const getSaleDetailReq = async (saleId: number): Promise<APIResponse<ISaleDetailRes>> => {
  const { data } = await axiosAuthInstance.get(`deals/sales/${saleId}`);

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

  return data;
};

export const getPurchaseDetailReq = async (purchaseId: number): Promise<APIResponse<IPurchaseDetailRes>> => {
  const { data } = await axiosAuthInstance.get(`deals/purchases/${purchaseId}`);

  return data;
};

// 경매 입찰하기
export const postSaleBid = async (saleId: number, bidPrice: string): Promise<APIResponse<string>> => {
  try {
    const { data } = await axiosAuthInstance.post(`deals/sales/${saleId}/bids`, {
      bidPrice: bidPrice,
    });

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

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postLiveReq = async (saleId: number): Promise<APIResponse<string>> => {
  try {
    const { data } = await axiosAuthInstance.post(`deals/sales/${saleId}/livereqs`);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 찜 추가
export const postDealWishAdd = async (dealId: number): Promise<APIResponse<string>> => {
  try {
    const { data } = await axiosAuthInstance.post(`deals/${dealId}/wishes`);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 찜 삭제
export const deleteDealWish = async (dealId: number): Promise<APIResponse<string>> => {
  try {
    const { data } = await axiosAuthInstance.delete(`deals/${dealId}/wishes`);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 역경매 참가 신청
export const postPurchasesApplyForm = async (info: FormData, purchaseId: number): Promise<APIResponse<string>> => {
  console.log(info);
  const { data } = await axiosAuthInstance.post(`deals/purchases/${purchaseId}/applyforms`, info, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

interface IRecordVideoRes {
  dealId: number;
  path: string;
  runTime: string;
  timeLine: string[];
}

// 비디오 보여주기
export const getRecordVideo = async (dealId: number): Promise<APIResponse<IRecordVideoRes[]>> => {
  try {
    const { data } = await axiosAuthInstance.get(`lives/recording/video/${dealId}`);
    console.log('video', data);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
