import { create } from 'zustand';

interface IAmount {
  amount: number;
  setAmount: (amount: number) => void;
}

const amountStore = create<IAmount>(set => ({
  amount: 0,
  setAmount: newAmount => set({ amount: newAmount }),
}));

export default amountStore;
