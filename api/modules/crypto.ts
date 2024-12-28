/**
 * 618活动
 * @param params
 * @returns
 */

// 获取618活动信息
export function getBaseInfo(params?: object) {
  return useHttp.get(`/admin/member/noAuth/page1`, params)
}
