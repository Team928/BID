import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface INotifyRead {
  isRead: boolean;
  setIsRead: () => void;
  setUnRead: () => void;
}

const notifyReadStore = create(
  persist<INotifyRead>(
    set => ({
      isRead: true,
      setIsRead: () => set({ isRead: true }),
      setUnRead: () => set({ isRead: false }),
    }),
    {
      name: 'notifyRead-store',
    },
  ),
);

export default notifyReadStore;
