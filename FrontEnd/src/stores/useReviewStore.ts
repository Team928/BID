import { create } from 'zustand';

type ReviewStore = {
  reviewPosted: Record<string, boolean>;
  setReviewPosted: (dealId: string, value: boolean) => void;
};

const useReviewStore = create<ReviewStore>(set => ({
  reviewPosted: {},
  setReviewPosted: (dealId, value) => {
    set(state => ({
      reviewPosted: {
        ...state.reviewPosted,
        [dealId]: value,
      },
    }));
  },
}));

export default useReviewStore;
