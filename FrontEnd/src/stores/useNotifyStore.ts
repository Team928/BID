import { INotifyInfo } from '@/types/notify';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface INotifyStore {
  notifyList: INotifyInfo[];
  addNotification: (notify: INotifyInfo) => void;
  initList: () => void;
}

const useNotifyStore = create(
  persist<INotifyStore>(
    set => ({
      notifyList: JSON.parse(localStorage.getItem('notify-store') || '')?.state || [], // 데이터 기본값은 localStorage에 저장되어있는 객체

      // 기존 데이터 배열에 새 데이터 추가
      addNotification: (notify: INotifyInfo) => {
        set(state => {
          const updatedList = [...state.notifyList, notify];
          localStorage.setItem('notify-store', JSON.stringify({ notifyList: updatedList }));
          return { notifyList: updatedList };
        });
      },

      // 초기화
      initList: () => set({ notifyList: [] }),
    }),
    {
      name: 'notify-store',
    },
  ),
);

export default useNotifyStore;
