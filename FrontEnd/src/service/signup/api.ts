import { axiosAuthInstance, axiosCommonInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { ISignupReq, ISignupRes } from '@/types/signup';

export const getMemberNicknameCheck = async (nickname: string): Promise<APIResponse<boolean>> => {
  const { data } = await axiosCommonInstance.get(`member/${nickname}`);
  console.log(data);
  return data;
};

export const postSignup = async (info: ISignupReq): Promise<APIResponse<ISignupRes>> => {
  const { data } = await axiosAuthInstance.post(`member/signup`, info);
  console.log(data);
  return data;
};

export interface IDaumModalAddr {
  bname: string;
  bname1: string;
  sigungu: string;
  jibunAddress: string;
  address: string;
}

export interface IAddressModalProp {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setInputAddress: React.Dispatch<React.SetStateAction<string>>;
}
