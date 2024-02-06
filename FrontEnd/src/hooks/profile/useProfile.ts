import { getSaleListHostReq, getUserProfileReq } from "@/service/profile/api"
import { useQuery } from "@tanstack/react-query"

export const useProfile = () => {
    const useSaleHost = (nickName: string) => {
        return useQuery({
            queryKey: ['sale', 'host', nickName],
            queryFn: () => getSaleListHostReq(nickName),
        })
    }

    const useUserProfile = (nickname: string) => {
        return useQuery({
            queryKey: ['profile', nickname],
            queryFn: () => getUserProfileReq(nickname),
        })
    }
    return { useSaleHost, useUserProfile }
}
