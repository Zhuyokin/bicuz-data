import type { Recharge } from '@/api/interface/index'

/**
 * @name 充值活动模块
 */
// 获取充值活动信息-是否首充/充值数量
export function getRechargeActInfo(params: Recharge.ReqRecharge) {
  return useHttp.post<Recharge.ResRecharge>(`/v2/ActivityRechargeGift/getInfo`, params)
}

// 获取用户活动礼券数量
export function getRechargeUserCard(params: Recharge.ReqRecharge) {
  return useHttp.post<Recharge.ResRecharge>(`/v2/ActivityRechargeGift/getUserCard`, params)
}

// 充值抽奖
export function getLotteryRet(params: Recharge.ReqRecharge) {
  return useHttp.post<Recharge.ResRecharge>(`/v2/ActivityRechargeGift/getGoodsGift`, params)
}


// 充值抽奖
export function userMe(params: Recharge.ReqRecharge) {
  return useHttp.post<Recharge.ResRecharge>(`/User/me`, params)
}