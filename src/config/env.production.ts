import type { DevOrProdEnvConfig } from './type'

/**
 * 生产环境
 */
export const prodConfig: DevOrProdEnvConfig = {
  DOMAIN: '', // 本地api请求地址
  SYSTEM_CODE: 'ONE_MAP', // 系统编码 用于bsp-permission-server/api/v1.0/permissions/systemMenus接口
  BSP_FlAG: true, // 登录权限开关控制
  MENU_FlAG: true, // 菜单权限开关控制
  loginUrl: `${window.location.origin}/cas/login?service=${window.location.origin}/simple-user-center-server/userCenter/auth/authUser`,
  WEATHER_SERVER: 'https://restapi.amap.com/v3/weather/weatherInfo?city=330100&key=d8427abeaceca951b42ce0eb75db5a8d&extensions=base', // 天气api-高德
}
