import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IAmount {
  amount: number;
  setAmount: (amount: number) => void;
}

const amountStore = create(
  persist<IAmount>(
    set => ({
      amount: 0,
      setAmount: (amount: number) => set({ amount }),
    }),
    {
      name: 'amount-store',
    },
  ),
);

export default amountStore;
