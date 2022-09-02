import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { SUCCESS_CODE, X_ACCESS_TOKEN } from '@/constants';
import { handleResponseErr } from './tools';
import { transferParams } from '../tools';

const BASE_URL = '/dy_admin';

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 100000 // 请求超时时间
});

// 请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = window.localStorage.getItem(X_ACCESS_TOKEN);
    if (token) {
      config.headers[X_ACCESS_TOKEN] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    // 处理非post请求
    if (config.params && typeof config.params === 'object') {
      config.params = { ...transferParams(config.params, false) };
    }
    // 处理post请求
    if (config.data && typeof config.data === 'object') {
      config.data = { ...transferParams(config.data, false) };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use((response: AxiosResponse<any>) => {
  return new Promise((resolve, reject) => {
    if (response && response.data) {
      const { code } = response.data;
      const data = transferParams(response.data, true);
      if (code === SUCCESS_CODE) {
        return resolve(data);
      } else {
        return reject(response.data); //有异常在业务侧请求catch捕获，有特殊情况需要再调整
      }
    }
  });
}, handleResponseErr);

export default service;
