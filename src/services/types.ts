
export type APIResponse<T> = T & {
  status?: number
}

export type BaseResponse = {
  message: string
  error: null | {
    type: string,
    message: string,
    code: number
  }
}
