import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUserState {
  isLogin: boolean;
  userId: string;
  accessToken: string;
  refreshToken: string;
  loginUser: ({
    userId,
    accessToken,
    refreshToken,
  }: {
    userId: string;
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
      accessToken: '',
      refreshToken: '',
      loginUser: ({ userId, accessToken, refreshToken }) =>
        set({
          userId,
          accessToken,
          refreshToken,
          isLogin: true,
        }),

      logoutUser: () =>
        set({
          userId: '',
          accessToken: '',
          refreshToken: '',
          isLogin: false,
        }),
    }),
    {
      name: 'user-store',
    },
  ),
);

export default userStore;
