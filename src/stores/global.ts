import { getUserInfo } from '@/services/global'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

/**
 * 这种写法上有很多的自由性, 会可能在未来难以维护🤔
 * 这里不建议使用ref生成值, 直接导出ref的值会被解构
 * 在使用时，需要使用 storeToRefs 包裹 如下
 * const globalStore = useGlobalStore()
 * const { userInfo } = storeToRefs(globalStore)
 */

export const useGlobalStore = defineStore('globalState', () => {
  /**
   * 用户信息相关
   */
  const userInfo = reactive({ name: 'test1' })
  const getAsyncUserInfo = async () => {
    const data = await getUserInfo()
    Object.assign(userInfo, data)
  }

  /**
   * 是否隐藏菜单
   */
  const hideMenus = ref(false)
  const resetHideMenus = (bool: boolean) => {
    hideMenus.value = bool
  }

  /**
   * 当前所选模块 -- 全部code参考 http://confluence.fpi-inc.site/pages/viewpage.action?pageId=20579847
   */
  const currentModule = ref('')
  const changeModule = (str: string) => {
    currentModule.value = str
  }

  /**
   * 当前所选模块的子项
   */
  const currentModuleChild = ref('')
  function changeCurrentModuleChild(str: string) {
    currentModuleChild.value = str
  }

  /**
   * 当前所在页面--应急
   */
  const currentPage = ref('home')
  function changeCurrentPage(str = 'home') {
    currentPage.value = str
  }

  /**
   * 是否展示任务提醒铃声及铃铛动画---当接收到新任务时触发--由父应用下发
   */
  const comeNewMission = ref(false)
  const changeComeNewMission = (bool: boolean) => {
    comeNewMission.value = bool
  }

  return {
    userInfo,
    hideMenus,
  }
})
