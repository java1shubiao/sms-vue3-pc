const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
// const { NODE_ENV, bizModule, publicCDN, projectName } = process.env;
const { NODE_ENV } = process.env;
const BUILD_ARGVS = process.env.BUILD_ARGVS || 'develop';
const resolve = (dir) => path.join(__dirname, dir);
const webpack = require('webpack');

const analyzer = (process.env.BUNDLE_ANALYZER || '').trim(); // 开启包分析
const speedMeasure = (process.env.SPEED_MEASURE || '').trim();

const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const vConsolePlugin = require('vconsole-webpack-plugin');
// const WebpackBundlePublicPathPlugin = require('webpack-bundle-public-path-plugin');
// const publicPath = `${publicCDN}/${bizModule}/${projectName}/${window.TAGNAME}/`;

const stringifyObject = (obj) => {
  Object.keys(obj).map((key) => (obj[key] = JSON.stringify(obj[key])));
  return obj;
};

dotenv.config({ path: resolve('.env') });
const envConfig = dotenv.parse(fs.readFileSync(`.env.${BUILD_ARGVS}`));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

//页面模块名称
const PAGE_NAME = 'fahuo'; //发货
// 代理访问店铺
let target = 'https://appaklwlitn7978.h5.xiaoeknow.com/';
const ko_token = '147b336c4601e5201f8c43d24e2d675b';
target = target.endsWith('/') ? target.substring(0, target.length - 1) : target;
const isDev = NODE_ENV === 'development';
// const BASE_URL = isDev ? '' : `${process.env.publicCDN}`;

module.exports = defineConfig({
  outputDir: 'dist',
  filenameHashing: false,
  // publicPath: isDev ? '/' : `${BASE_URL}/`,
  productionSourceMap: !isDev ? false : true,
  lintOnSave: false,
  assetsDir: './fahuo',
  indexPath: 'index.html',
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.ts',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/styles/global.scss";`
      }
    }
  },
  devServer: {
    // 路由代理的规则 以课程详情/v1/路由为例
    proxy: {
      '(?!/v1/?)^.*$': {
        target,
        changeOrigin: true,
        ws: false,
        bypass: function (req) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          }
        },
        onProxyReq(proxyReq, req) {
          // 本地调试登录字段，由业务层定义
          proxyReq.setHeader('cookie', `ko_token=${ko_token}`);
          proxyReq.setHeader(
            'x-forwarded-host',
            target.includes('https://')
              ? target.substr('https://'.length)
              : target.substr('http://'.length)
          );
          proxyReq.setHeader(
            'x-forwarded-port',
            target.includes('https://') ? '443' : '80'
          );
          proxyReq.setHeader('user-agent', req.headers['user-agent']);
        }
      }
    },
    historyApiFallback: true
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('@apis', resolve('./src/apis'))
      .set('@components', resolve('./src/components'));

    // 查看打包加速
    if (speedMeasure) {
      const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
      config
        .plugins('speed-measure-webpack-plugin')
        .use(SpeedMeasurePlugin)
        .end();
    }
  },
  // 打包分析
  configureWebpack: (config) => {
    if (analyzer) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          // 生成静态文件
          analyzerMode: 'static'
        })
      );
    }

    // 由于vue-cli的限制，导致mode为development时的打包设置动态publicPath无效（即__webpack_public_path__无效）；所以这里将配置文件通过变量的方式来设置
    config.plugins.push(
      new webpack.DefinePlugin({
        ...stringifyObject(envConfig)
      })
    );

    // 处理打包文件，将同步文件提取到外层
    if (!isDev) {
      // 重新修改同步js文件路径
      config.output.filename = `${PAGE_NAME}/[name].js`;
      // 将异步chunk放入/js文件夹下
      config.output.chunkFilename = `${PAGE_NAME}/js/[name].js`;

      config.optimization.splitChunks = {
        cacheGroups: {
          xiaoe: {
            // 将node_modules抽离的公共chunk同样放到外层
            name: './chunk-vendors',
            test(module) {
              let resName = module.resource;
              return (
                /[\\/]node_modules[\\/]/.test(resName) &&
                resName.includes('@xiaoe')
              );
            },
            priority: -10,
            chunks: 'initial'
          },
          vendors: {
            // 将@xiaoe/node_modules抽离的公共chunk同样放到外层
            name: './chunk-vendors',
            test(module) {
              let resName = module.resource;
              return (
                /[\\/]node_modules[\\/]/.test(resName) &&
                !resName.includes('@xiaoe')
              );
            },
            priority: -10,
            chunks: 'initial'
          },
          common: {
            name: './chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      };

      config.plugins.push(
        new MiniCssExtractPlugin({
          // 修改同步css文件路径
          filename: `${PAGE_NAME}/[name].css`,
          // 将异步css chunk放到/css文件夹下
          chunkFilename: `${PAGE_NAME}/css/[name].css`
        })
      );

      if (BUILD_ARGVS === 'develop') {
        config.plugins.push(
          new vConsolePlugin({
            enable: true
          })
        );
      }
    }
    // return {
    //   plugins: [
    //     new WebpackBundlePublicPathPlugin({
    //       dynamicPublicPath: `'${publicPath}'`
    //     })
    //   ]
    // };
  }
});
