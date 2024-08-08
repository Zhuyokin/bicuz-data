import type { Common } from '@/api/interface/index'

/**
 * @name 唱歌活动模块
 */

// 获取赛程
export function getActInfo(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`/v2/Activity/ActivitySongking/getConfig`, params)
}

// 上传歌曲
export function uploadMySong(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`/v2/Activity/ActivitySongking/addSong`, params)
}

// 我的歌曲
export function getMySong(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`/v2/Activity/ActivitySongking/mySong`, params)
}

// 获取排行榜
export function getRanking(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`/v2/Activity/ActivitySongking/getRanking`, params)
}

// 免费点赞
export function freeVote(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`/v2/Activity/ActivitySongking/freeLike`, params)
}

// 付费点赞
export function payVote(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`/v2/Activity/ActivitySongking/paidLike`, params)
}

// 获取点赞记录
export function getVoteLog(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`/v2/Activity/ActivitySongking/getLikeLog`, params)
}

// 获取PK排行榜
export function getPkRank(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`/v2/Activity/ActivitySongking/getPkList`, params)
}

// 获取3阶段房间信息
export function getFinalRoomInfo(params: Common.ReqCommon) {
  return useHttp.post<Common.ResCommon>(`/v2/Activity/ActivitySongking/getRoomInfo`, params)
}
