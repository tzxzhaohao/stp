import './public-path.js'
import type { GlobalEvent } from './type'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { allConfig } from './config'
import globalComponents from '@/plugins/components'
import './styles/scrollbar.scss'
import { useGlobalStore } from '@/stores/global'
import { useAppStore } from '@/stores/app'

console.log(allConfig)

// 与基座进行数据交互
function handleMicroData() {
  const { changeMenusList, changePath } = useAppStore()
  // const {} = useGlobalStore()
  console.log('window.microApp', window.microApp)
  // 是否是微前端环境
  if (window.__MICRO_APP_ENVIRONMENT__) {
    const appData = window.microApp.getData() // 返回基座数据
    changeMenusList(appData.menusList())
    changePath(appData.path())

    window.microApp.addGlobalDataListener(handleGlobalDataChange)
  }
}

/**
 * 全局数据变化回调函数
 * @param type 数据类型
 * @param data 数据
 */
function handleGlobalDataChange({ type, data }: { type: string; data: any }): void {
  const { changePath } = useAppStore()
  // const {} = useGlobalStore()

  // 根据type值进行不同的操作
  const globalEvent: GlobalEvent = {
    path: () => changePath(data),
  }
  globalEvent[type] && globalEvent[type]()
}
const app = createApp(App)
app.use(createPinia())
app.use(router)
handleMicroData()
app.use(globalComponents)
app.mount('#micrApp')

// 监听卸载操作
window.addEventListener('unmount', function () {
  app.unmount()
  window.microApp.removeGlobalDataListener(handleGlobalDataChange) // 移除全局数据监听
  console.log('微应用child-vue3卸载了')
})
