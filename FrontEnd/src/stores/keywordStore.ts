import { create } from 'zustand';

interface IKeyword {
  keyword: string;
  setKeyword: (keyword: string) => void;
  init: () => void;
}

const useKeywordStore = create<IKeyword>(set => ({
  keyword: '',
  setKeyword: newKeyword => set({ keyword: newKeyword }),
  init: () => set({ keyword: '' }),
}));

export default useKeywordStore;
