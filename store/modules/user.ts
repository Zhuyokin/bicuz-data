import { loginApi } from '@/api'
import { defineStore } from 'pinia'
import type { UserState } from './types'

function storeSetup() {
  const userInfo = ref<UserState>({})
  const getUserInfo = computed(() => userInfo.value)
  const isLogin = computed(() => !!userInfo.value?.token || localStorage.getItem('token'))
  const getToken = computed(() => userInfo.value?.token || localStorage.getItem('token'))
  const getDeviceId = computed(() => userInfo.value?.device_id || localStorage.getItem('device_id'))
  const setToken = (token: string) => {
    userInfo.value.token = token
  }
  const setDeviceId = (deviceId: string) => {
    userInfo.value.device_id = deviceId
  }
  const setInfo = (info: any) => {
    userInfo.value = info
  }
  const login = async (params: any) => {
    const { data } = await loginApi.login(params)
    userInfo.value = data
    return data
  }
  const clearInfo = () => {
    userInfo.value = {}
    localStorage.setItem('token', '')
    localStorage.setItem('device_id', '')
  }
  // const logout = async () => {
  //   await login.logout()
  //   clearUserInfo()
  // }

  return { userInfo, login, getUserInfo, setToken, getToken, setDeviceId, getDeviceId, isLogin, clearInfo, setInfo }
}
export const useUserStore = defineStore('user', storeSetup, { persist: true })
