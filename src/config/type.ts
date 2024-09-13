/**
 * 对外暴露的windwo.env中的配置
 */
export type WindowEnvConifg = {
  // 地图中心点位设置
  DOMAIN: string
  SYSTEM_CODE: string
  BSP_FlAG: boolean
  MENU_FlAG: boolean
}

/**
 * 与本地环境还是生产环境相关的配置
 */
export type DevOrProdEnvConfig = {
  DOMAIN: string
  SYSTEM_CODE: string
  BSP_FlAG: boolean
  MENU_FlAG: boolean
  loginUrl: string
  WEATHER_SERVER: string
}

/**
 * 普通的配置
 */
export type CommonConfig = {
  // 是否允许自动重定向到登录地址
  isAllowRedirectLogin: boolean
  // 接口请求时间长短
  requestTimeout: number
  // 指向public文件夹的访问路径
  publicPath: string
}

/**
 * 集中配置项
 */
export type AllConfig = DevOrProdEnvConfig & CommonConfig & WindowEnvConifg
