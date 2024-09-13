import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { messageBox, redirectLogin } from '@/utils/tools'
import { allConfig } from '@/config/index'

/**
 * 请求失败状态码错误统一处理
 * @param {Number} status 请求失败的状态码
 * @param {String} message 提示信息
 */
const errorStatusHandler = (status: number, message: string) => {
  switch (status) {
    case 201:
      messageBox(`${message}`, 'error')
      break
    // 400: 缺少认证的token，未授权的内部用户
    case 400:
      messageBox(`${message}`, 'error')
      redirectLogin()
      break
    // 401: 未登录状态，跳转登录页
    case 401:
      messageBox(`${message}`, 'error')
      redirectLogin()
      break
    // 403 token过期 清除token并跳转登录页
    case 403:
      messageBox('登录过期，请重新登录即将跳转登录页...')
      redirectLogin()
      break
    // 服务器拥堵 Bad Gateway
    case 502:
      messageBox('网络拥堵...', 'error')
      break
    // 404请求不存在
    case 404:
      messageBox('请求的资源不存在', 'error')
      break
    // 500服务器端错误
    case 500:
      messageBox('服务器端错误', 'error')
      break
  }
}
/**
 *
 * @param code 后端自定义的code码
 * @param message 提示消息
 * @returns void
 */
const errorCodeHandler = (code: string, message: string) => {
  switch (code) {
    // 400: 缺少认证的token，未授权的内部用户
    case '400':
      messageBox(`${message}`, 'error')
      redirectLogin()
      break
    // 401: 未登录状态，跳转登录页
    case '401':
      messageBox(`${message}`)
      redirectLogin()
      break
    // 403 token过期 清除token并跳转登录页
    case '403':
      messageBox('登录过期，请重新登录即将跳转登录页...')
      break
  }
}

/**
 * 实例化请求配置
 */
const instance: AxiosInstance = axios.create({
  baseURL: allConfig.DOMAIN,
  timeout: allConfig.requestTimeout,
})

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  config => {
    config && config.headers && (config.headers['Cache-Control'] = 'no-cache, no-store') // 清除缓存
    config && config.headers && (config.headers.Pragma = 'no-cache') // 清除缓存
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  // 请求成功
  (response: AxiosResponse<any>) => {
    if (response.status === 200 && response.data) {
      if (response.data.code && String(response.data.code) !== '200') {
        errorCodeHandler(String(response.data.code), response.data.message)
      } else {
        return response.data
      }
    }
    return Promise.reject(response)
  },
  // 请求失败
  error => {
    if (error && error.status && error.status !== 200) {
      errorStatusHandler(error.status, error.data?.message || '未知错误')
    }
    return Promise.reject(error)
  },
)

/**
 * 最终对外暴露的请求实例
 */
const request = <R>(config: AxiosRequestConfig) => {
  return instance.request<any, R>(config)
}

export default request
