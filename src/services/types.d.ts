declare namespace SERVICE {
  type ApiResponse<T> = {
    code: number
    data: T
    message: string
  }

  type ApiPageResponse<T> = SERVICE.ApiResponse<{
    total: number
    lists: T[]
  }>
}
