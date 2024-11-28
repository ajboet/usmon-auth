
import axios from 'axios'
import { useLoginStore } from '@/stores/login'
import { interceptErrors } from './error-handler'

const apiUrl = import.meta.env.VITE_API_URL + '/api/auth/v1'

/*
 * Global Axios Instance
 */
const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    //
  },
})

/*
 * Global Request Interceptor
 */
axiosInstance.interceptors.request.use(
  req => {
    const usr = useLoginStore().getTokenData
    if (usr?.value?.auth) {
      req.headers.Authorization = `Bearer ${usr.value.auth}`
    }

    return req
  },
  err => {
    console.error('Axios Request Error: ', err)
    return Promise.reject(err)
  }
)

/*
 * Global Response Interceptor
 */
axiosInstance.interceptors.response.use(
  res => res,
  async err => {
    await interceptErrors(err)
    return Promise.reject(err)
  }
)

export default axiosInstance
