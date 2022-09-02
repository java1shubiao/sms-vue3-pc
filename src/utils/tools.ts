import { AnyObject } from './types';
const isArray = Array.isArray;

const isObject = (target: any) => typeof target === 'object';

const isString = (target: any) => typeof target === 'string';

// * 下换线转驼峰
export function toHump(name: string) {
  return name.replace(/_(\w)/g, (_all, letter) => {
    return letter.toUpperCase();
  });
}
// * 驼峰转换下划线
export function toLine(name: string) {
  // * 大写字母开头不做转换
  if (/^[A-Z]/.test(name)) return name;
  return name.replace(/([A-Z])/g, '_$1').toLowerCase();
}

// * 转换请求参数
export const transferParams = (data: AnyObject, isToHump: boolean): any => {
  if (!data) {
    return {};
  }
  if (isArray(data)) {
    // * 处理数组
    return data.map((item) => {
      return isObject(item) ? transferParams(item, isToHump) : item;
    });
  }
  return Object.keys(data).reduce((accu, key) => {
    let curValue = (data as AnyObject)[key];
    // * 处理字符串数组
    if (
      isString(curValue) &&
      curValue.includes('[') &&
      curValue.includes(']')
    ) {
      // 说明返回的数组字符串, 需要解开处理, 在转回来
      curValue = JSON.stringify(transferParams(JSON.parse(curValue), isToHump));
    }
    return Object.assign(accu, {
      [`${!isToHump ? toLine(key) : toHump(key)}`]: isObject(curValue)
        ? transferParams(curValue, isToHump)
        : curValue
    });
  }, {});
};
