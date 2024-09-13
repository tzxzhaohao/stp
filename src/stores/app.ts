import { defineStore } from 'pinia'
import { ref } from 'vue'
import { menu } from '@/stores/types'

export const useAppStore = defineStore('appState', () => {
  const microAppName = window.__MICRO_APP_NAME__ || ''

  // 当前页面路径
  const path = ref<string>('')

  /**
   * 更改当前页面路径
   * @param newPath 新的页面路径
   */
  function changePath(newPath: string): void {
    console.log('changePath', newPath)
    path.value = newPath
  }

  // 菜单列表
  const menusList = ref<menu[]>([])

  /**
   * 更改菜单列表
   * @param newList 新的菜单列表
   */
  function changeMenusList(newList: menu[]): void {
    console.log('changeMenusList', newList)
    menusList.value = newList
  }

  return {
    microAppName,
    path,
    changePath,
    menusList,
    changeMenusList,
  }
})
