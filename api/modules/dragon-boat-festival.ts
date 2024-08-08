
/**
 * 端午活动
 * @param params 
 * @returns 
 */

// 龙舟烽火榜
export function getRoomRanking(params?: object) {
  return useHttp.post(`/v2/Activity/ActivityDuanWu/getRoomRanking`, params)
}

// 烽火划手榜
export function getReceiveRanking(params?: object) {
  return useHttp.post(`/v2/Activity/ActivityDuanWu/getReceiveRanking`, params)
}

// 烽火鼓王榜
export function getSendRanking(params?: object) {
  return useHttp.post(`/v2/Activity/ActivityDuanWu/getSendRanking`, params)
}

// 端午活动信息
export function getDBFInfo(params?: object) {
  return useHttp.post(`/v2/Activity/ActivityDuanWu/getInfo`, params)
}

// 端午活动道具记录
export function getDBFGiftRecord(params?: object) {
  return useHttp.post(`/v2/Activity/ActivityDuanWu/getUserCard`, params)
}

// 道具兑换
export function getDBFLotteryGift(params?: object) {
  return useHttp.post(`/v2/Activity/ActivityDuanWu/getGoodsGift`, params)
}