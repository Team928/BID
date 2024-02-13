import create from 'zustand';

type DealStore = {
  isConfirmed: boolean;
  setConfirmed: (value: boolean) => void;
};

const useDealStore = create<DealStore>((set) => ({
  isConfirmed: localStorage.getItem('isConfirmed') === 'true' || false,
  setConfirmed: (value) => {
    set({ isConfirmed: value });
    localStorage.setItem('isConfirmed', value.toString());
  },
}));

export default useDealStore;
