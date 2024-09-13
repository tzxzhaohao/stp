/**
 * 集成3块的配置项
 * 配置1 window.ENV 来源 public/env.js
 * 配置2 devAndProdConfig 与开发还是生产相关的配置
 * 配置3 commonConfig
 */

import type { WindowEnvConifg, AllConfig } from './type'
import { devConfig } from './env.development'
import { prodConfig } from './env.production'
import { commonConfig } from './commonConfig'

const isDevelopment = process.env.NODE_ENV === 'development'

// public/env.js的配置
const windowEnvConfig = window.ENV as WindowEnvConifg

// 与生产还是开发环境相关的配置
const envConfig = isDevelopment ? devConfig : prodConfig

// 整合所有的配置, 具名导出
export const allConfig: AllConfig = Object.assign({}, envConfig, commonConfig, windowEnvConfig)

if (isDevelopment) {
  console.groupCollapsed('项目配置config')
  console.log(allConfig)
  console.groupEnd()
}
if (isDevelopment) {
  console.groupCollapsed('自带配置env')
  console.log(process.env)
  console.groupEnd()
}
if (isDevelopment) {
  console.groupCollapsed('public文件夹下文件在项目中如何访问')
  console.log('1、使用public下的env.js: `${process.env.BASE_URL}logo.png` ====>', `${process.env.BASE_URL}logo.png`)
  console.log('1、使用public下的env.js: `${allConfig.publicPath}logo.png` ====>', `${allConfig.publicPath}logo.pngs`)
  console.groupEnd()
}
