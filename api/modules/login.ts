import type { Login } from '@/api/interface/index'

/**
 * @name 登录模块
 */
// 用户登录
export function login(params: Login.ReqLoginForm) {
  return useHttp.post<Login.ResLogin>(`/Login/login`, params)
}

// 用户信息
export function userMe(params?: object) {
  return useHttp.post(`/User/me`, params)
}

// H5用户登录
export function h5GuildUserLogin(params?: object) {
  return useHttp.post(`/Login/h5GuildUserLogin`, params)
}

// 获取腾讯COS临时token
export function getCOSToken(params?: object) {
  return useHttp.post(`/cos/token`, params)
}