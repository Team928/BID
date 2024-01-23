import { create } from 'zustand';

interface ITab {
  tab: 'buy' | 'sale';
  setTab: (tab: 'buy' | 'sale') => void;
}

const useTabStore = create<ITab>(set => ({
  tab: 'buy',
  setTab: newTab => set({ tab: newTab }),
}));

export default useTabStore;
