import { axiosAuthInstance } from '@/apis/axiosInstance';
import Toast from '@/components/@common/Toast';
import { APIResponse } from '@/types/model';

export const postSaleWrite = async (info: FormData): Promise<APIResponse<string>> => {
  try {
    const { data } = await axiosAuthInstance.post(`deals/sales`, info, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(data);
    Toast.success('경매글 등록을 성공했습니다.');
    return data;
  } catch (err) {
    Toast.error('경매글 등록을 실패했습니다.');
    throw err;
  }
};

export const postBuyWrite = async (info: FormData): Promise<APIResponse<string>> => {
  try {
    const { data } = await axiosAuthInstance.post(`deals/purchases`, info, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(data);
    Toast.success('역경매글 등록을 성공했습니다.');
    return data;
  } catch (err) {
    Toast.error('역경매글 등록을 실패했습니다.');
    throw err;
  }
};
