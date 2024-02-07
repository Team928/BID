import { getBuyListHostReq, getBuyListParticiReq, getSaleListHostReq, getSaleListParticiReq, getUserProfileReq } from "@/service/profile/api"
import { useQuery } from "@tanstack/react-query"

export const useProfile = () => {
    const useSaleHost = (nickName: string) => {
        return useQuery({
            queryKey: ['sale', 'host', nickName],
            queryFn: () => getSaleListHostReq(nickName),
        })
    }

    const useSaleParticipant = () => {
        return useQuery({
            queryKey: ['saleParticipant'],
            queryFn: () => getSaleListParticiReq(),
        })
    }

    const useBuyHost = (nickname: string) => {
        return useQuery({
            queryKey: ['buy', 'host', nickname],
            queryFn: () => getBuyListHostReq(nickname),
        })
    }

    const useBuyParticipant = () => {
        return useQuery({
            queryKey: ['buyParticipant'],
            queryFn: () => getBuyListParticiReq(),
        })
    }

    const useUserProfile = (nickname: string) => {
        return useQuery({
            queryKey: ['profile', nickname],
            queryFn: () => getUserProfileReq(nickname),
        })
    }
    return { useSaleHost, useUserProfile, useBuyHost, useSaleParticipant, useBuyParticipant }
}
