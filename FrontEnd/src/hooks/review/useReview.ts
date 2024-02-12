import { getGetReviewListReq, getWorteReviewListReq, postReview } from "@/service/review/api";
import { ICreateReviewReq } from "@/types/review";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useReview = () => {
	const usePostReview = (info: ICreateReviewReq) => {
		return useMutation({
				mutationFn: () => postReview(info),
		});
	};

	const useWorteReviewList = () => {
		return useQuery({
			queryKey: ['wrote','review'],
			queryFn: () => getWorteReviewListReq(),
		})
	}

	const useGetReviewList = (nickname: string) => {
		return useQuery({
			queryKey: ['get', 'review'],
			queryFn: () => getGetReviewListReq(nickname)
		})
	}

	return { usePostReview, useWorteReviewList, useGetReviewList }
};
