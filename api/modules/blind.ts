/**
 * @name 小管家模块
 */


// 报名
export function apply(params?: object) {
  return useHttp.post(`/v2/InviteRegister/apply`, params)
}


// 查用户
export function getUserStatus(params?: object) {
  return useHttp.post(`/v2/InviteRegister/getUserStatus`, params)
}


// 上报拉新用户
export function report(params?: object) {
  return useHttp.post(`/v2/InviteRegister/report`, params)
}


// 获取绑定状态
export function getRealTimeStatus(params?: object) {
  return useHttp.post(`/v2/InviteRegister/getRealTimeStatus`, params)
}
