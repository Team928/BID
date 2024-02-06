import { axiosAuthInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import { ISaleListRes, IUserProfile } from "@/types/profile";

// 내가 주최한 경매 조회
export const getSaleListHostReq = async (nickName: string): Promise<APIResponse<ISaleListRes>> => {
    const { data } = await axiosAuthInstance.get(`members/profiles/${nickName}/hauction`);
    console.log(data)
    return data
}

// 프로필 조회
export const getUserProfileReq =async (nickname: string): Promise<APIResponse<IUserProfile>> => {
    const { data } = await axiosAuthInstance.get(`members/profiles/${nickname}`);
    console.log(data)
    return data   
}