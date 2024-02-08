import { InternalAxiosRequestConfig } from 'axios';

const setAuthorization = (config: InternalAxiosRequestConfig) => {
  const accessToken = JSON.parse(localStorage.getItem('user-store') || '').state.accessToken;
  // const accessToken = import.meta.env.VITE_TOKEN;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

export default setAuthorization;
