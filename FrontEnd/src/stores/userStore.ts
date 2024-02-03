import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUserState {
  isLogin: boolean;
  userId: string;
  nickname: string;
  area: string[];
  accessToken: string;
  refreshToken: string;
  loginUser: ({
    userId,
    nickname,
    area,
    accessToken,
    refreshToken,
  }: {
    userId: string;
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
      userId: '',
      nickname: '',
      area: [],
      accessToken: '',
      refreshToken: '',
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
          userId: '',
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
