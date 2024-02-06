import { axiosAuthInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { ICreateReviewReq, IReviewListReq } from '@/types/review';

export const postReview = async (info: ICreateReviewReq): Promise<APIResponse<string>> => {
    const { data } = await axiosAuthInstance.post(`members/review`, info)
    console.log(data)
    return data
}


export const getReviewListReq = async (): Promise<APIResponse<IReviewListReq>> => {
    const { data } = await axiosAuthInstance.get(`members/review`)
    console.log(data)
    return data
} 