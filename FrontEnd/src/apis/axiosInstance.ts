import axios from 'axios';

const axiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
};

export const axiosCommonInstance = axios.create(axiosRequestConfig);

export const axiosAuthInstance = axios.create(axiosRequestConfig);

axiosAuthInstance.interceptors.request.use();
