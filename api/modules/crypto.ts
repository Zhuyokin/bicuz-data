import type { Common } from '@/api/interface/index'
/**
 * crypto接口
 * @param params
 * @returns
 */

// 获取市场基础信息
export function getBaseInfo(params?: object) {
  return useHttp.get<Common.ResCommon>(`/market/dominance`, params)
}

// 获取市场新闻
export function getNews(params?: object) {
  return useHttp.get<Common.ResCommon>(`/market/news`, params)
}
