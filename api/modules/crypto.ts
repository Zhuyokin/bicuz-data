import type { Common } from '@/api/interface/index'
/**
 * crypto接口
 * @param params
 * @returns
 */

// 获取市场基础信息
export function getBaseInfo(params?: object) {
  return useHttp.get<Common.ResCommon>(`/admin/member/noAuth/page1`, params)
}
