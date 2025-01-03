import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/src/message.scss'
import { allConfig } from '@/config'

const isDevelopment = process.env.NODE_ENV === 'development'

const isMicApp = window.__MICRO_APP_ENVIRONMENT__

/**
 * 获取css变量值
 * @param key | getCssValue('--font-family-text')
 * @returns {string} | 'Microsoft YaHei'
 */
export const getCssValue = (key: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(key)
}

/**
 * 获取css变量中的font-family
 * 掐头去尾得到最终fontFamily
 * @param key
 * @return {*} ' "shzhjt"' ==> shzhjt
 */
export const getFontFamily = (key: string) => {
  return getCssValue(key).replace(/(^\s"|"$)/g, '')
}

/**
 * 设置全局css
 * @param url | setGlobalCss('/global.css')
 */
export function setGlobalCss(url: string) {
  loadStyle(setBasePath(url.replace(/^\//, '')))
}

export function loadStyle(url: string) {
  const link = isMicApp ? window.microApp.pureCreateElement('link') : document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

/**
 * 设置绝对路径
 * @param path | setBasePath('logo.png') ==> http://localhost:4001/ipes-one-map-child-web/logo.png
 * @returns {string} | http://localhost:4001/ipes-one-map-child-web/logo.png
 */
export function setBasePath(path: string) {
  if (window.__MICRO_APP_ENVIRONMENT__) {
    return `${window.__MICRO_APP_PUBLIC_PATH__}${path}`
  } else {
    return `${process.env.BASE_URL}${path}`
  }
}

/**
 * 消息提示
 */
export const messageBox = (msg: string, type?: 'success' | 'warning' | 'error' | 'info') => {
  ElMessage({
    message: msg,
    type: type || 'warning',
    duration: 2000,
  })
}

/**
 * @description 重定向到登录页面
 */

export function redirectLogin() {
  if (allConfig.isAllowRedirectLogin) {
    const url = window.location.href.split('#')[0]
    if (redirectLogin.redirect) {
      return
    }
    if (isDevelopment) {
      window.open(`${allConfig.loginUrl}?redirectUrl=${encodeURIComponent(url)}`, '_blank')
    } else {
      if (window.top !== window.self) {
        // 如果当前窗口不是顶层窗口，则重新加载顶层窗口
        window.top?.location.reload()
        return
      }
      window.location.href = `${allConfig.loginUrl}?redirectUrl=${encodeURIComponent(url)}`
    }
    redirectLogin.redirect = true
  }
}
redirectLogin.redirect = false

export const getFormattedDate = date => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // getMonth 返回的是从0开始，所以需要加1
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
