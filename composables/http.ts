import type { FetchResponse, SearchParameters } from 'ofetch'
import { showFailToast, showToast } from 'vant'
import { useUserStore } from '@/store'

export interface ResOptions<T> {
  data: T
  code: number
  msg: string
}

function handleError<T>(response: FetchResponse<ResOptions<T>> & FetchResponse<ResponseType>) {
  const err = (text: string) => {
    showToast(response?._data?.msg ?? text)
  }
  if (!response._data) {
    err('请求超时，服务器无响应！')
    return
  }
  const userStore = useUserStore()
  const handleMap: { [key: number]: () => void } = {
    200: () => err(typeof (response._data) === 'string' ? JSON.parse(response._data).msg : response._data?.msg),
    404: () => err('服务器资源不存在'),
    500: () => err('服务器内部错误'),
    403: () => err('没有权限访问该资源'),
    401: () => {
      err('登录状态已过期，需要重新登录')
      userStore.clearInfo()
      // TODO 跳转实际登录页
      // navigateTo('/')
    },
  }
  console.log('response', response)

  handleMap[response.status] ? handleMap[response.status]() : err('未知错误！')
}

// get方法传递数组形式参数
function paramsSerializer(params?: SearchParameters) {
  if (!params)
    return

  const query = useCloneDeep(params)
  Object.entries(query).forEach(([key, val]) => {
    if (typeof val === 'object' && Array.isArray(val) && val !== null) {
      query[`${key}[]`] = toRaw(val).map((v: any) => JSON.stringify(v))
      delete query[key]
    }
  })
  return query
}

const fetch = $fetch.create({
  // 请求拦截器
  onRequest({ options }) {
    // get方法传递数组形式参数
    options.params = paramsSerializer(options.params)
    // 添加baseURL,nuxt3环境变量要从useRuntimeConfig里面取
    const { public: { appBaseUrl } } = useRuntimeConfig()
    options.baseURL = appBaseUrl
    // 请求参数
    let params: any = options.body ? options.body : options.params
    if (!params)
      params = {}

    // 添加请求头,没登录不携带token
    const userStore = useUserStore()
    // if (!userStore.isLogin) return
    // 添加token
    const token = userStore.getToken
    if (token)
      params.token = token

    // 添加设备id
    if (userStore.getDeviceId)
      params.device_id = userStore.getDeviceId

    // options.headers = new Headers(options.headers)
    // options.headers.set('Authorization', `Bearer ${userStore.getToken}`)
  },
  // 响应拦截
  onResponse({ options, response }) {
    if (response.headers.get('content-disposition') && response.status === 200)
      return response

    // 登录过期
    if (response._data.code === 2801)
      return Promise.reject(response._data)

    // 在这里判断错误
    if (response._data.code !== 2000) {
      handleError(response)
      return Promise.reject(response._data)
    }

    // 请求参数
    const params: any = options.body ? options.body : options.params
    // 是否返回全量数据
    if (!JSON.parse(params).isRaw)
      response._data = response._data.data

    return response._data
  },
  // 错误处理
  onResponseError({ response }) {
    handleError(response)
    return Promise.reject(response?._data ?? null)
  },
})

// 自动导出
export const useHttp = {
  get: <T>(url: string, params?: any) => {
    return fetch<T>(url, { method: 'get', params })
  },

  post: <T>(url: string, body?: any) => {
    // POST接口额外添加时间戳
    const data = Object.assign(body || {}, { timestamp: Date.now() })
    return fetch<T>(url, { method: 'post', body: data })
  },

  put: <T>(url: string, body?: any) => {
    return fetch<T>(url, { method: 'put', body })
  },

  delete: <T>(url: string, body?: any) => {
    return fetch<T>(url, { method: 'delete', body })
  },
}
