import { getSaleListHostReq } from "@/service/profile/api"
import { useQuery } from "@tanstack/react-query"

export const useProfile = () => {
    const useSaleHost = (nickName: string) => {
        return useQuery({
            queryKey: ['sale', 'host', nickName],
            queryFn: () => getSaleListHostReq(nickName),
        })
    }
    return { useSaleHost }
}