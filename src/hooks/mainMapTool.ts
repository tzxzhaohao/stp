import { onBeforeUnmount } from 'vue'

let microAppData: any = null
// 是否是微前端环境
if (window.__MICRO_APP_ENVIRONMENT__) {
  microAppData = window.microApp.getData()
}

/**
 * 获取微应用数据，方法
 */
export function useMicroAppData() {
  function viewSecurityScene(code: string) {
    microAppData && microAppData.viewSecurityScene(code)
  }

  function viewEnvironmentScene(code: string, hasPanel = true) {
    microAppData && microAppData.viewEnvironmentScene(code, hasPanel)
  }

  // function startEmergency() {
  //   microAppData && microAppData.startEmergency()
  // }

  // function openAlarm() {
  //   microAppData && microAppData.openAlarm()
  // }

  // function openWeatherDialog() {
  //   microAppData && microAppData.openWeatherDialog()
  // }

  return {
    viewSecurityScene,
    viewEnvironmentScene,
  }
}

/**
 * 记录当前场景，判断是否在指定场景，如果是在离开时清空
 */
export function useRecordScene(arr: string[], callback: () => void) {
  //当前页面选中场景编码
  const currentPageSceneCode = ref('')
  onBeforeUnmount(() => {
    if (arr.includes(currentPageSceneCode.value)) {
      callback()
    }
  })
  return {
    currentPageSceneCode,
  }
}
