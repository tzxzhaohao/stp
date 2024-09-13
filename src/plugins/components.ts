import { App } from 'vue'
import BasePanel from '@/components/BasePanel/BasePanel.vue'
import BasePanelItem from '@/components/BasePanel/BasePanelItem.vue'

export default {
  install(Vue: App) {
    Vue.component('BasePanel', BasePanel)
    Vue.component('BasePanelItem', BasePanelItem)
  },
}
