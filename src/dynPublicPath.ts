// * 动态publicPath

const {
  NODE_ENV,
  VUE_APP_PUBLIC_CDN,
  VUE_APP_BIZ_MODULE,
  VUE_APP_PROJECT_NAME
} = process.env;
if (NODE_ENV !== 'development') {
  console.info(process.env);
  __webpack_public_path__ = `${VUE_APP_PUBLIC_CDN}/${VUE_APP_BIZ_MODULE}/${VUE_APP_PROJECT_NAME}/${
    (window as any).TAGNAME
  }/`;
}
