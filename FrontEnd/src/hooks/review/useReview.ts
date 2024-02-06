import { postReview } from "@/service/review/api";
import { ICreateReviewReq } from "@/types/review";
import { useMutation } from "@tanstack/react-query";

export const useReview = () => {
	const usePostReview = (info: ICreateReviewReq) => {
		return useMutation({
				mutationFn: () => postReview(info),
		});
	};

	return {usePostReview}
};
