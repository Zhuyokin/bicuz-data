/**
 * 618活动
 * @param params
 * @returns
 */

// 获取618活动信息
export function get618ActivityInfo(params?: object) {
  return useHttp.post(`/v2/Activity/Activity618/get618ActivityInfo`, params)
}

// 获取最强消费榜
export function get618ConsumeRanking(params?: object) {
  return useHttp.post(`/v2/Activity/Activity618/getConsumeRanking`, params)
}

// 获取人气消费榜
export function get618PopularityRanking(params?: object) {
  return useHttp.post(`/v2/Activity/Activity618/getPopularityRanking`, params)
}
