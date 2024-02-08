import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUserState {
  isLogin: boolean;
  userId: number;
  nickname: string;
  area: string[];
  accessToken: string;
  refreshToken: string;
  addArea: (address: string) => void;
  loginUser: ({
    userId,
    nickname,
    area,
    accessToken,
    refreshToken,
  }: {
    userId: number;
    nickname: string;
    area: string;
    accessToken: string;
    refreshToken: string;
  }) => void;
  logoutUser: () => void;
}

const userStore = create(
  persist<IUserState>(
    set => ({
      isLogin: false,
      userId: 0,
      nickname: '',
      area: [],
      accessToken: '',
      refreshToken: '',
      addArea: (address: string) => set(state => ({ area: [...state.area, address] })),
      loginUser: ({ userId, nickname, area, accessToken, refreshToken }) =>
        set({
          userId,
          accessToken,
          refreshToken,
          nickname,
          area: [area],
          isLogin: true,
        }),

      logoutUser: () =>
        set({
          userId: 0,
          accessToken: '',
          refreshToken: '',
          nickname: '',
          area: [],
          isLogin: false,
        }),
    }),
    {
      name: 'user-store',
    },
  ),
);

export default userStore;
