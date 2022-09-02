/*
 * @Description: 用来修改运行时，前端静态资源cdn地址
 * @Author: mapengfei
 * @Date: 2022-06-15 09:35:16
 * @LastEditors: mapengfei
 * @LastEditTime: 2022-06-17 16:07:18
 */
/*
if (process.env.VUE_APP_BUILD_TAG !== 'localhost') {
    __webpack_public_path__ = `${publicCDN}/${bizModule}/${projectName}/${window.TAGNAME}/`;
}
*/

const {
  NODE_ENV,
  VUE_APP_PUBLIC_CDN,
  VUE_APP_BIZ_MODULE,
  VUE_APP_PROJECT_NAME
} = process.env;
if (NODE_ENV !== 'development') {
  // eslint-disable-next-line
  __webpack_public_path__ = `${VUE_APP_PUBLIC_CDN}/${VUE_APP_BIZ_MODULE}/${VUE_APP_PROJECT_NAME}/${window.TAGNAME}/`;
}
