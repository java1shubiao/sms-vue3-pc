import { AnyObject } from '@/utils/types';
// * 拦截相应错误
export const handleResponseErr = (error: AnyObject) => {
  if (error.response) {
    // 抛错处理
  } else if (error.message) {
    // 处理错误信息
  }
  return Promise.reject(error);
};
