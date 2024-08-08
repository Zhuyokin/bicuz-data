import type { Pet } from '@/api/interface/index'

/**
 * @name 宠物模块
 */
// 宠物跟随
export function setPetFollow(params: Pet.ReqPet) {
  return useHttp.post<Pet.ResPet>(`/v2/Pet/setCarry`, params)
}

// 宠物庄园
export function setPetManor(params: Pet.ReqPet) {
  return useHttp.post<Pet.ResPet>(`/v2/Pet/petManor`, params)
}

// 宠物商城
export function petList(params: Pet.ReqPet) {
  return useHttp.post<Pet.ResPet>(`/v2/Pet/PetList`, params)
}

// 购买宠物
export function buyPet(params: Pet.ReqPet) {
  return useHttp.post<Pet.ResPet>(`/v2/Pet/buy`, params)
}

// 设置宠物名称
export function setName(params: Pet.ReqPet) {
  return useHttp.post<Pet.ResPet>(`/v2/Pet/setName`, params)
}

// 投喂宠物
export function feedPet(params: Pet.ReqPet) {
  return useHttp.post<Pet.ResPet>(`/v2/Pet/provideFodder`, params)
}

// 宠物榜单
export function petRanking(params: Pet.ReqPet) {
  return useHttp.post<Pet.ResPet>(`/v2/Pet/petRanking`, params)
}

// 用户宠物信息
export function userPetInfo(params: Pet.ReqPet) {
  return useHttp.post<Pet.ResPet>(`/v2/Pet/userPetInfo`, params)
}

// 萌宠庄园
export function petManor(params: Pet.ReqPet) {
  return useHttp.post<Pet.ResPet>(`/v2/Pet/petManor`, params)
}

// 宠物经验记录
export function petExpLog(params: Pet.ReqPet) {
  return useHttp.post<Pet.ResPet>(`/v2/Pet/petExpLog`, params)
}

// 宠物商城-钱包余额
export function petStoreWallet(params: Pet.ReqPet) {
  return useHttp.post<Pet.ResPet>(`v2/Activity/Wallet/index`, params)
}

// 搜索宠物排行榜
export function searchRank(params: Pet.ReqPet) {
  return useHttp.post<Pet.ResPet>(`v2/Pet/searchPetRanking`, params)
}

// 宠物商城-道具卡列表
export function getStoreToolsList(params: Pet.ReqPet) {
  return useHttp.post<Pet.ResPet>(`v2/Pet/propsCards`, params)
}

// 宠物商城-购买道具
export function buyTools(params: Pet.ReqPet) {
  return useHttp.post<Pet.ResPet>(`v2/Pet/buyPropsCards`, params)
}

// 使用加速卡
export function useToolCard(params: Pet.ReqPet) {
  return useHttp.post<Pet.ResPet>(`v2/Pet/usePropsCards`, params)
}

// 获取加速道具卡数量
export function getUserSpeedCard(params: Pet.ReqPet) {
  return useHttp.post<Pet.ResPet>(`v2/Pet/userPropsCards`, params)
}

// 赠送宠物
export function transferPet(params: Pet.ReqPet) {
  return useHttp.post<Pet.ResPet>(`v2/Pet/transfer`, params)
}

// 萌宠事件
export function getPetEventLogs(params: Pet.ReqPet) {
  return useHttp.post<Pet.ResPet>(`v2/Pet/petEventLog`, params)
}
