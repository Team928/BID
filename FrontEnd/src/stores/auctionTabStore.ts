import { create } from 'zustand';

interface ITab {
  tab: 'purchase' | 'sale';
  setTab: (tab: 'purchase' | 'sale') => void;
}

const useTabStore = create<ITab>(set => ({
  tab: 'purchase',
  setTab: newTab => set({ tab: newTab }),
}));

export default useTabStore;
