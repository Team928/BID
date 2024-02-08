import { axiosAuthInstance } from "@/apis/axiosInstance";
import { APIResponse } from "@/types/model";
import { ISaleListRes, IUserProfile, IbuyListRes } from "@/types/profile";

// 내가 주최한 경매 조회
export const getSaleListHostReq = async (nickName: string): Promise<APIResponse<ISaleListRes>> => {
    const { data } = await axiosAuthInstance.get(`members/profiles/${nickName}/saleHost`);
    console.log(data)
    return data
}

// 내가 주최한 역경매 조회
export const getBuyListHostReq = async (nickname: string): Promise<APIResponse<IbuyListRes>> => {
    const { data } = await axiosAuthInstance.get(`members/profiles/${nickname}/purchaseHost`)
    console.log(data)
    return data
}

// 내가 참여한 경매
export const getSaleListParticiReq = async (): Promise<APIResponse<ISaleListRes>> => {
    const { data } = await axiosAuthInstance.get(`members/profiles/saleParticipant`)
    console.log(data)
    return data
}

// 내가 참여한 역경매
export const getBuyListParticiReq = async (): Promise<APIResponse<IbuyListRes>> => {
    const { data } = await axiosAuthInstance.get(`members/profiles/purchaseSeller`)
    console.log(data)
    return data
}

// 프로필 조회
export const getUserProfileReq =async (nickname: string): Promise<APIResponse<IUserProfile>> => {
    const { data } = await axiosAuthInstance.get(`members/profiles/${nickname}`);
    console.log(data)
    return data   
}