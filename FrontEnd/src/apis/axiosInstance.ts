import axios from 'axios';
import setAuthorization from './interceptors';

const axiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
};

const axiosViduConfig = {
  baseURL: import.meta.env.VITE_OPENVIDU_URL,
};

export const axiosCommonInstance = axios.create(axiosRequestConfig);

export const axiosAuthInstance = axios.create(axiosRequestConfig);

export const axiosOpenviduInstance = axios.create(axiosViduConfig);

axiosAuthInstance.interceptors.request.use(setAuthorization);
