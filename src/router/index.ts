import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useAppStore } from '@/stores/app'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Comprehensive',
    component: () => import('@/views/Comprehensive/Comprehensive.vue'),
  },
  // {
  //   path: '/Overview',
  //   name: 'Overview',
  //   component: () => import('@/views/Comprehensive/components/WasteGasWastewater/WasteGasWastewater.vue'),
  // },
  // {
  //   path: '/Security',
  //   name: 'Security',
  //   component: () => import('@/views/Comprehensive/components/HazardousWasteManagement/HazardousWasteManagement.vue'),
  // },
  // {
  //   path: '/EnvironmentalProtection',
  //   name: 'EnvironmentalProtection',
  //   component: () => import('@/views/EnvironmentalProtection/EnvironmentalProtection.vue'),
  // },
  // {
  //   path: '/Emergency',
  //   name: 'Emergency',
  //   component: () => import('@/views/Emergency/Emergency.vue'),
  // },
  // {
  //   path: '/Sealing',
  //   name: 'Sealing',
  //   component: () => import('@/views/Sealing/Sealing.vue'),
  // },
]
const router = createRouter({
  // history: createWebHistory(window.__MICRO_APP_ENVIRONMENT__ ? window.__MICRO_APP_BASE_ROUTE__ : process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const { changePath } = useAppStore()
  next()
})

export default router
