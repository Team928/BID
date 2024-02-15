import { create } from 'zustand';

type ReviewStore = {
  reviewPosted: Record<string, boolean>;
  setReviewPosted: (dealId: string, value: boolean) => void;
};

const useReviewStore = create<ReviewStore>((set) => {
  const storedReviewPosted = JSON.parse(localStorage.getItem('reviewPosted') || '{}');

  return {
    reviewPosted: storedReviewPosted,
    setReviewPosted: (dealId, value) => {
      set((state) => {
        const newReviewPosted = {
          ...state.reviewPosted,
          [dealId]: value,
        };
        localStorage.setItem('reviewPosted', JSON.stringify(newReviewPosted));
        return { reviewPosted: newReviewPosted };
      });
    },
  };
});

export default useReviewStore;
