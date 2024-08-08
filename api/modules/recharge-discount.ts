/**
 * 充值折扣活动
 * @param params
 * @returns
 */

// 排行榜信息
export function getActInfo(params?: object) {
  return useHttp.post(`/v2/Activity/ActivityFirstRecharge/firstRecharge`, params)
}

// 超值购
export function valueBuy(params?: object) {
  return useHttp.post(`Activity/valueBuy?token=${params.token}`, params)
}

// 领取游戏卡
export function getCard(params?: object) {
  return useHttp.post(`/v2/Activity/ActivityFirstRecharge/getDiscountCard`, params)
}

// 装扮商城
export function getDressStore(params?: object) {
  return useHttp.post(`/v2/Activity/ActivityFirstRecharge/discountMall`, params)
}

// 装扮商城
export function getNumStore(params?: object) {
  return useHttp.post(`/v2/Activity/ActivityFirstRecharge/prettyNumberList`, params)
}

// 购买装扮
export function buyDress(params?: object) {
  return useHttp.post(`/Activity/buyGoods?token=${params.token}`, params)
}

// 购买靓号
export function buyNum(params?: object) {
  return useHttp.post(`/v2/Activity/ActivityFirstRecharge/buyPrettyNumber`, params)
}
