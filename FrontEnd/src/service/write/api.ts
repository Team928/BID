import { axiosAuthInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';

export const postSaleWrite = async (info: FormData): Promise<APIResponse<string>> => {
  console.log(info);
  const { data } = await axiosAuthInstance.post(`deals/sales`, info, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(data);
  return data;
};

export const postBuyWrite = async (info: FormData): Promise<APIResponse<string>> => {
  console.log(info);
  const { data } = await axiosAuthInstance.post(`deals/purchases`, info, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(data);
  return data;
};
