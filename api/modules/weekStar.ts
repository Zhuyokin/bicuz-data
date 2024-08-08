import type { WeekStar } from '@/api/interface/index'

/**
 * @name 周星活动模块
 */
// 获取周星活动信息
export function getWeekStarInfo(params: WeekStar.ReqWeekStar) {
  return useHttp.post<WeekStar.ResWeekStar>(`/v2/ActivityWeekStar/getInfo`, params)
}

// 获取周星榜期信息
export function getWeekStarActList(params: WeekStar.ReqWeekStar) {
  return useHttp.post<WeekStar.ResWeekStar>(`/v2/ActivityWeekStar/getList`, params)
}

// 获取周星排行信息
export function getWeekStarRank(params: WeekStar.ReqWeekStar) {
  return useHttp.post<WeekStar.ResWeekStar>(`/v2/ActivityWeekStar/getRanking`, params)
}

