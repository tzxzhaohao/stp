const { defineConfig } = require('@vue/cli-service')
const { name } = require('./package.json')
// const { ModuleFederationPlugin } = require('webpack').container
const path = require('path')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  publicPath: `/${name}/`,
  lintOnSave: true,
  // 开启生产环境SourceMap，设为false打包时不生成.map文件
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    config.plugin('html').tap(args => {
      args[0].title = '园区一张图'
      args[0].buildHash = new Date().getTime()
      return args
    })
  },
  configureWebpack: {
    plugins: [
      require('unplugin-auto-import/webpack').default({
        resolvers: [ElementPlusResolver()],
        imports: ['vue-router', 'vue'],
        eslintrc: {
          enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
          filepath: './.eslintrc-auto-import.json', // 生成json文件
          globalsPropValue: true,
        },
        // 声明文件生成位置和文件名称
        dts: './src/auto-import.d.ts',
      }),
      require('unplugin-vue-components/webpack').default({
        resolvers: [ElementPlusResolver()],
      }),
      // new ModuleFederationPlugin({
      //   // 应用名，全局唯一，不可冲突。Remote（提供者模块）
      //   // name: "home",
      //   // 暴露的文件名称
      //   // filename: "remoteEntry.js",
      //   // library: { type: "module" },
      //   remotes: {
      //     // visual: "http://127.0.0.1:5000/data-visual/assets/remoteEntry.js",
      //     'data-visual': `promise import("https://ued.fpi-inc.site/data-visual/assets/remoteEntry.js")`,
      //   },
      //   // remoteType:'module',
      //   // shared: ['vue', 'axios'],
      //   shared: {
      //     vue: {
      //       singleton: true, // 如果为 true，则依赖项将被视为单一实例，并且仅在所有联合应用之间共享其单个实例。
      //       eager: true, // 如果为 true，则在主机应用程序启动后，将立即加载依赖项并提供给其他联合应用。如果为 false，则在联合应用首次请求依赖项时，将延迟加载依赖项。
      //       // requiredVersion: "^3.0.0", // 指定依赖项的所需版本。如果联合应用尝试加载依赖项的不兼容版本，则将加载两个副本。如果单例选项设置为 true，则会在控制台中打印警告。
      //     },
      //     axios: {},
      //   },
      // }),
    ],
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: 'pug-plain-loader',
        },
      ],
    },
  },
  devServer: {
    client: {
      overlay: false,
    },
    hot: true, //当在主应用内调试时，可改为false,此时修改子应用文件，主应用会自动刷新页面
    port: 4001,
    proxy: {
      '/apis': {
        target: 'http://122.191.102.250:32080',
        changeOrigin: true,
        pathRewrite: {
          '^/apis': '/',
        },
      },
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
