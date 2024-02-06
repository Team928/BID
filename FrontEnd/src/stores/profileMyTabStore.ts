import { create } from 'zustand';

interface IMyTab {
  tab: 'buy' | 'sale';
  setTab: (tab: 'buy' | 'sale') => void;
}

const useMyTabStore = create<IMyTab>(set => ({
  tab: 'sale',
  setTab: newTab => set({ tab: newTab }),
}));

export default useMyTabStore;

