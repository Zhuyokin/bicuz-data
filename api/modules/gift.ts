import type { Gift } from '@/api/interface/index'

/**
 * @name 礼物模块
 */
// 礼盒详情
export function getGiftBoxDetail(params: Gift.ReqGiftBoxDetail) {
  return useHttp.post<Gift.ResGiftBoxDetail>(`/v2/GiftBox/detail`, params)
}
