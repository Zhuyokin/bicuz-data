import type { Common } from '@/api/interface/index'

/**
 * @name 充值活动模块
 */
// 获取用户信息
export function userMe(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`/v2/Activity/User/userInfo`, params)
}

// 宠物商城-钱包余额
export function getUserWallet(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`v2/Activity/Wallet/index`, params)
}
