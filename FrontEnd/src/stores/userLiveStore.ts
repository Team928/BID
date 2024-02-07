import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type tType = 'sale' | 'purchase' | '';
type pType = 'buyer' | 'seller' | '';

interface ILive {
  onCamera: boolean;
  onMike: boolean;
  tType: tType;
  pType: pType;
  setOnCamera: (value: boolean) => void;
  setOnMike: (value: boolean) => void;
  setTType: (value: tType) => void;
  setPType: (value: pType) => void;
}

const useLiveStore = create(
  persist<ILive>(
    set => ({
      onCamera: false,
      onMike: false,
      tType: '',
      pType: '',
      setOnCamera: (onCamera: boolean) => set({ onCamera }),
      setOnMike: (onMike: boolean) => set({ onMike }),
      setTType: (tType: tType) => set({ tType }),
      setPType: (pType: pType) => set({ pType }),
    }),
    {
      name: 'live-setting',
    },
  ),
);
export default useLiveStore;
