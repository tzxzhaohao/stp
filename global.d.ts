export {}
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module 'element-plus/dist/locale/zh-cn.mjs'

declare global {
  interface Window {
    ENV?: any
    __MICRO_APP_NAME__?: any
    __MICRO_APP_BASE_ROUTE__?: any
    __MICRO_APP_ENVIRONMENT__?: any
    __MICRO_APP_PUBLIC_PATH__?: any
    microApp?: any
    rawWindow?: any
    Cesium?: any
    unmount?: any
    echarts?: any
    Highcharts?: any
  }
}
