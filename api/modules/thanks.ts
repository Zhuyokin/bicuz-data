import type { Common } from '@/api/interface/index'

/**
 * @name 感恩活动
 */

// 活动信息
export function getActivityInfo(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`hdRomantic/getDollValue`, params)
}

// 个人记录
export function getMyRecord(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`hdRomantic/myLog`, params)
}

// 购买次数
export function buyTicket(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`hdRomantic/buyEnergy`, params)
}

// 开奖
export function lottery(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`hdRomantic/eggGo`, params)
}

// 榜单列表
export function getRanking(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`/v2/Activity/ActivityThanksgivingDay/getRanking`, params)
}

// 获取我的设置项
export function getMySetting(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`hdRomantic/mySetting`, params)
}

// 更新我的设置项
export function updateMySetting(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`hdRomantic/updateSetting`, params)
}
