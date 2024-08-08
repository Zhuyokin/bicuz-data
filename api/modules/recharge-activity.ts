/**
 * 充值有礼活动
 * @param params
 * @returns
 */

// 排行榜信息
export function getActRanking(params?: object) {
  return useHttp.post(`/v2/Activity/ActivityRechargeGift/getRanking`, params)
}

// 活动信息
export function getActInfo(params?: object) {
  return useHttp.post(`/v2/Activity/activityRechargeGift/getInfo`, params)
}

// 开启好礼
export function openBox(params?: object) {
  return useHttp.post(`/v2/Activity/ActivityRechargeGift/getGoodsGift`, params)
}

// 获取礼品券数量
export function getTicketNum(params?: object) {
  return useHttp.post(`/v2/Activity/ActivityRechargeGift/getUserCard`, params)
}
