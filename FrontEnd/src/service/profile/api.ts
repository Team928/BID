import { axiosAuthInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import { ISaleListRes } from "@/types/profile";

// 내가 주최한 경매 조회
export const getSaleListHostReq = async (nickName: string): Promise<APIResponse<ISaleListRes>> => {
    const { data } = await axiosAuthInstance.get(`members/profiles/${nickName}/hauction`);
    console.log(data)
    return data
}