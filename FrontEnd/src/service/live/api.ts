import { axiosAuthInstance, axiosOpenviduInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';

export interface ISessionRes {
  roomName: string;
  roomNum: number;
  token: string;
}

export const getSession = async (dealId: string, userId: number): Promise<APIResponse<ISessionRes>> => {
  try {
    const { data } = await axiosOpenviduInstance.get(`lives/create/rooms?dealId=${dealId}&userId=${userId}`);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export interface IMatchReq {
  dealId: string;
  applyFormId: number;
  offerPrice: number;
}

// 역경매 시 최종 매칭
export const matchLive = async ({ dealId, applyFormId, offerPrice }: IMatchReq): Promise<APIResponse<string>> => {
  try {
    const { data } = await axiosAuthInstance.get(
      `/lives/purchase/results?dealId=${dealId}&applyFormId=${applyFormId}&offerPrice=${offerPrice}`,
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
