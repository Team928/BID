import { create } from 'zustand';

interface IOtherTab {
    tab: 'review' | 'buy' | 'sale';
    setTab: (tab: 'review' | 'buy' | 'sale') => void;
  }

const useOtherTabStore = create<IOtherTab>(set => ({
    tab: 'sale',
    setTab: newTab => set({ tab: newTab }),
  }));

export default useOtherTabStore;