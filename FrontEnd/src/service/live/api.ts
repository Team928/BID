import { axiosAuthInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { IMatchReq, IRecordReq, ISessionRes, ITimeStampReq } from './../../types/live';

// 세션 생성
export const getSession = async (dealId: string, userId: number): Promise<APIResponse<ISessionRes>> => {
  try {
    const { data } = await axiosAuthInstance.get(`lives/create/rooms?dealId=${dealId}&userId=${userId}`);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// 역경매 시 최종 매칭
export const matchLive = async ({ dealId, formId, offerPrice }: IMatchReq): Promise<APIResponse<string>> => {
  try {
    const { data } = await axiosAuthInstance.get(
      `/lives/purchase/results?dealId=${dealId}&applyFormId=${formId}&offerPrice=${offerPrice}`,
    );

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// 녹화 시작 함수
export const startRecording = async ({ userId, dealId }: IRecordReq): Promise<APIResponse<string>> => {
  try {
    const { data } = await axiosAuthInstance.get(`/lives/start/recording?userId=${userId}&dealId=${dealId}`);

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// 녹화 종료 함수
export const endRecording = async ({ userId, dealId }: IRecordReq): Promise<APIResponse<string>> => {
  try {
    const { data } = await axiosAuthInstance.get(`/lives/end/recording?userId=${userId}&dealId=${dealId}`);

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// 타임스탬프
export const checkTimeStamp = async ({ step, dealId }: ITimeStampReq): Promise<APIResponse<string>> => {
  try {
    const { data } = await axiosAuthInstance.get(`lives/check/recording?step=${step}&dealId=${dealId}`);

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// 역경매 종료 함수
export const endPurchaseLive = async (dealId: string): Promise<APIResponse<string>> => {
  try {
    const { data } = await axiosAuthInstance.get(`lives/end/purchase/${dealId}`);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
