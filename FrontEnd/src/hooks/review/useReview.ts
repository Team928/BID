import { getReviewListReq, postReview } from "@/service/review/api";
import { ICreateReviewReq } from "@/types/review";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useReview = () => {
	const usePostReview = (info: ICreateReviewReq) => {
		return useMutation({
				mutationFn: () => postReview(info),
		});
	};

	const useGetReviewList = () => {
		return useQuery({
			queryKey: ['review'],
			queryFn: () => getReviewListReq(),
		})
	}

	return { usePostReview, useGetReviewList }
};
