import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IAmount {
  amount: string;
  setAmount: (amount: string) => void;
}

const amountStore = create(
  persist<IAmount>(
    set => ({
      amount: '',
      setAmount: (amount: string) => set({ amount }),
    }),
    {
      name: 'amount-store',
    },
  ),
);

export default amountStore;
