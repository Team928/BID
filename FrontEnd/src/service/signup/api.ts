import { axiosAuthInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { ISignupReq, ISignupRes } from '@/types/signup';

export const getMemberNicknameCheck = async (nickname: string): Promise<APIResponse<boolean>> => {
  const { data } = await axiosAuthInstance.get(`members/${nickname}`);

  return data;
};

export const postSignup = async (info: ISignupReq): Promise<APIResponse<ISignupRes>> => {
  const { data } = await axiosAuthInstance.post(`members/signup`, info);

  return data;
};
