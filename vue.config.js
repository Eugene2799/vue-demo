const path = require('path');

module.exports = {
  publicPath: './',
  outputDir: './dist',
  lintOnSave: false,
  chainWebpack: config => {
    config.module
      .rule('images')
        .use('url-loader')
          .loader('url-loader')
          .tap(options => Object.assign(options, { limit: 10240 }))
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.mode = 'production';
    } else {
      config.mode = 'development';
    }
    Object.assign(config, {
      resolve: {
        alias: {
          '@p': path.resolve(__dirname, './public'),
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components')
        }
      }
    });
  },
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8046,
    hot: true,
    disableHostCheck: true,
    https: false,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api-path': {
        target: 'http://target-ip/',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/api-path': '/api-path' }
      }
    }
  },
  productionSourceMap: false,
  css: {
    sourceMap: false,
    loaderOptions: {
      postcss: {
        plugins: [require('postcss-pxtorem')({
          rootValue: 37.5,
          propList: ['*'],
        })]
      }
    },
    requireModuleExtension: true
  },
  parallel: require('os').cpus().length > 1,
  pwa: {}
};
