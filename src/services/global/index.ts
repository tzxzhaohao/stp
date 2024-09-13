import request from '@/utils/request'
/**
 * 请求菜单项
 */
export const getSystemMenus = (data: GLOBAL_API.GetSystemMenusParams) => {
  return request<GLOBAL_API.GetSystemMenusResponse>({
    url: '/bsp-permission-server/api/v1/permissions/systemMenus',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data,
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request<GLOBAL_API.GetUserInfo>({
    url: '/simple-user-center-server/api/v1.0/user/login-user',
  })
}
