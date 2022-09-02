# vuecli-vue3_ts 工程模板

## 项目架构
```
├─.ci_temp
|  ├─dev_comm.yml                     //master同步开发环境稳定目录脚本容器化后不需要
├─  dist                             // 编译后静态资源文件目录
├─  public                        // 纯前端模板
|  ├─ index.html
├─.gitlab-ci.yml                          // ci配置文件
├─.gitignore
├─node_modules
├─ src                                    // 页面源码
├─ hooks                                  // vue3的hook文件目录
|  | ├─ index.ts                               // vue3的hook文件目录
|  ├─ api                                  // 接口文件目录
|  | ├─ a.js                              // xx模块请求
|  | ├─ b.js                              // 公共模块请求
|  ├─ constants                          // 常量目录
|  | ├─ a.js                            // xx模块常量
|  ├─ assets                            // 本地静态资源文件存放目录
|  | ├─ images                            // 本地存储的图片    
|  | ├─ fonts                            // 字体                                
|  | ├─ styles                            // 样式    
|  ├─ router             // 前端路由文件目录
|  | ├─ a.js                           // xx 路由
|  ├─ store                          // 状态管理文件
|  | ├─ a.js                           // xx 状态管理
|  ├─ utils                      // 公共层工具函数
|  ├─ views                          // 页面文件
|  | ├─ A-page                           // xx 页面
|  | | ├─ comonents                           // 页面专有业务组件
|  ├─ App.vue                          // 入口.vue
|  ├─ main.js                         // 入口.js
├─ .browserslistrc                // 指定浏览器编译配置
├─ .eslintrc.js                  // 新工程必须eslint配置
├─ .gitignore                  // 本地忽略提交文件
├─ babel.config.js             // babel相关配置
├─ package.json                // 工程版本说明文件
├─ package-lock.json         // 版本锁文件
├─ vue.config.js         // vue 编译配置文件

```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 状态管理放弃vuex, 使用pinia

比起Vuex，Pinia具备以下优点：

+ 完整的 TypeScript 支持：与在 Vuex 中添加 TypeScript 相比，添加 TypeScript 更容易
+ 极其轻巧(体积约 1KB)
+ store 的 action 被调度为常规的函数调用，而不是使用 dispatch 方法或 MapAction 辅助函数，这在 Vuex 中很常见
+ 支持多个Store
+ 支持 Vue devtools、SSR 和 webpack 代码拆分
