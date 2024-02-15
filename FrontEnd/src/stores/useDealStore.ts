import { create } from 'zustand';

type DealStore = {
  isConfirmed: Record<string, boolean>;
  setConfirmed: (dealId: string, value: boolean) => void;
};

const useDealStore = create<DealStore>((set) => {
  const storedIsConfirmed = JSON.parse(localStorage.getItem('isConfirmed') || '{}');

  return {
    isConfirmed: storedIsConfirmed,
    setConfirmed: (dealId, value) => {
      set((state) => {
        const newIsConfirmed = {
          ...state.isConfirmed,
          [dealId]: value,
        };
        localStorage.setItem('isConfirmed', JSON.stringify(newIsConfirmed));
        return { isConfirmed: newIsConfirmed };
      });
    },
  };
});

export default useDealStore;
