import type { CommonConfig } from './type'

export const commonConfig: CommonConfig = {
  isAllowRedirectLogin: false,
  requestTimeout: 60 * 1000,
  publicPath: process.env.BASE_URL,
}
