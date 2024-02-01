import { axiosAuthInstance } from '@/apis/axiosInstance';
import { ISalesListReq, ISaleListRes, ISaleDetailRes } from '@/types/home';
import { APIResponse } from '@/types/model';

export const getSaleListReq = async ({
  page,
  size,
  catg,
  area,
  order,
  status,
  keyword,
}: ISalesListReq): Promise<APIResponse<ISaleListRes>> => {
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
