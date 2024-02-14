import { create } from 'zustand';

type DealStore = {
  isConfirmed: Record<string, boolean>;
  setConfirmed: (dealId: string, value: boolean) => void;
};

const useDealStore = create<DealStore>(set => ({
  isConfirmed: {},
  setConfirmed: (dealId, value) => {
    set(state => ({
      isConfirmed: {
        ...state.isConfirmed,
        [dealId]: value,
      },
    }));
  },
}));

export default useDealStore;
