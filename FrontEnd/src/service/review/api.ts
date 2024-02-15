import { axiosAuthInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { ICreateReviewReq, IReviewListReq } from '@/types/review';

export const postReview = async (info: ICreateReviewReq): Promise<APIResponse<string>> => {
  const { data } = await axiosAuthInstance.post(`members/reviews`, info);
  return data;
};

// 내가 작성한 리뷰 조회
export const getWorteReviewListReq = async (): Promise<APIResponse<IReviewListReq>> => {
  const { data } = await axiosAuthInstance.get(`members/reviews`);
  return data;
};

// 받은 리뷰 조회
export const getGetReviewListReq = async (nickname: string): Promise<APIResponse<IReviewListReq>> => {
  const { data } = await axiosAuthInstance.get(`members/${nickname}/reviews`);
  return data;
};
