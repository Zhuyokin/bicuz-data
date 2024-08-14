import type { Common } from '@/api/interface/index'

/**
 * @name 幸运娃娃活动模块
 */

// 抽奖
export function getLotteryPrize(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`/HdTwelve/eggGo`, params)
}

// 个人记录
export function getMyLog(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`/HdTwelve/myLog`, params)
}

// 惊喜娃娃值
export function getDollValue(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`/HdTwelve/getDollValue`, params)
}

// 欧皇榜
export function getLuckyList(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`HdTwelve/luckyList`, params)
}

// 兑换商城
export function getDollMallList(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`HdTwelve/mall`, params)
}

// 兑换
export function exchangeDoll(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`HdTwelve/exchange`, params)
}

// 我的兑换记录
export function myExchangeLog(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`HdTwelve/myExchangeLog`, params)
}

// 任务列表
export function taskList(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`HdTwelve/taskList`, params)
}

// 任务奖励
export function getTaskPrize(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`HdTwelve/receive`, params)
}
