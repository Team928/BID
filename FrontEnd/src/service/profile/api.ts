import { axiosAuthInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { ISaleListRes, IUserPointHistoryRes, IUserProfile, IbuyListRes } from '@/types/profile';

// 내가 주최한 경매 조회
export const getSaleListHostReq = async (nickName: string): Promise<APIResponse<ISaleListRes>> => {
  const { data } = await axiosAuthInstance.get(`members/profiles/${nickName}/saleHost`);
  console.log(data);
  return data;
};

// 내가 주최한 역경매 조회
export const getBuyListHostReq = async (nickname: string): Promise<APIResponse<IbuyListRes>> => {
  const { data } = await axiosAuthInstance.get(`members/profiles/${nickname}/purchaseHost`);
  console.log(data);
  return data;
};

// 내가 참여한 경매
export const getSaleListParticiReq = async (): Promise<APIResponse<ISaleListRes>> => {
  const { data } = await axiosAuthInstance.get(`members/profiles/saleParticipant`);
  console.log(data);
  return data;
};

// 내가 참여한 역경매
export const getBuyListParticiReq = async (): Promise<APIResponse<IbuyListRes>> => {
  const { data } = await axiosAuthInstance.get(`members/profiles/purchaseSeller`);
  console.log(data);
  return data;
};

// 프로필 조회
export const getUserProfileReq = async (nickname: string): Promise<APIResponse<IUserProfile>> => {
  const { data } = await axiosAuthInstance.get(`members/profiles/${nickname}`);
  console.log(data);
  return data;
};

// 포인트 충전
export const postChargePoint = async (amount: number): Promise<APIResponse<string>> => {
  try {
    const { data } = await axiosAuthInstance.post(`members/points`, {
      amount: amount,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 프로필 수정
export const postchangeProfile = async (info: FormData): Promise<APIResponse<string>> => {
  console.log(info);
  const { data } = await axiosAuthInstance.patch(`members/profiles`, info, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(data);
  return data;
};

// 사용자 포인트 내역 조회
export const getUserPointHistory = async (): Promise<APIResponse<IUserPointHistoryRes>> => {
  const { data } = await axiosAuthInstance.get(`members/points`, {
    params: {
      page: 0,
      size: 20,
    },
  });
  console.log(data);
  return data;
};
