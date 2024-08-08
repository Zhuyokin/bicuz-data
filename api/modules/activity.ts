import type { Activity } from '@/api/interface/index'
/**
 * @name 活动模块
 */
// 活动信息
export function getInfo() {
  return useHttp.post<Activity.ResActivityInfo>(`/v2/Activity/getInfo`)
}

// 排行榜
export function getRanking() {
  return useHttp.post<Activity.ResActivityRanking>(`/v2/Activity/getRanking`)
}
