declare namespace GLOBAL_API {
  /**
   * 菜单项相关接口
   */
  type GetSystemMenusParams = { systemCode: string }
  type SystemMenus = {
    childType: null
    childTypeCode: null
    childTypeName: null
    code: string
    hidden: false
    id: string
    key: string
    label: string
    leaf: null
    lvl: null
    name: null
    operableSign: number
    operableTypes: []
    parentId: string
    pos: number
    positionCode: string
    readableSign: number
    selectedPictureId: string
    subs: []
    type: number
    typeName: string
    unselectedPictureId: string
    url: string
  }
  type GetSystemMenusResponse = SERVICE.ApiResponse<{
    entries: SystemMenus[]
  }>
  /**
   * 用户信息
   */
  type GetUserInfo = {
    account: string
    address: string
    comment: string
    email: string
    idcardNo: string
    inHangzhou: number
    mobilePhone: string
    name: string
    orgId: number
    orgName: string
    phone: string
    status: string
    telephone: string
    updatePasswordTime: number
    userId: number
    userIdStr: string
    userUuid: string
  }
}
