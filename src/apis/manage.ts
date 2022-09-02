import axios from '@/utils/http';
import { Method, AxiosResponse } from 'axios';
import { AnyObject } from '@/utils/types';

// post
export const postAction = <T extends AnyObject>(
  url: string,
  parameter?: T
): Promise<AxiosResponse> => {
  return axios({
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: parameter
  });
};

// post method= {post | get}
export const httpAction = <T extends AnyObject>(
  method: Method,
  url: string,
  parameter?: T
): Promise<AxiosResponse> => {
  return axios({
    url: url,
    method: method,
    data: parameter
  });
};

export const reAction = (config: any): Promise<AxiosResponse> => {
  return axios(config);
};

// get
export const getAction = <T extends AnyObject>(
  url: string,
  parameter?: T
): Promise<AxiosResponse> => {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  });
};
