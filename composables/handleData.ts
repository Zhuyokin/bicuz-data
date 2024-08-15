import { loginApi } from '@/api'
import { useUserStore } from '@/store'
import { isIosFun } from '@/utils/index'

export function useHandleData(isAnalog = false, callback?: () => void) {
  const userStore = useUserStore()

  /**
   * @description 调试模拟数据
   */
  const LoginFun = async () => {
    try {
      const params = {
        // phone: '18559105555',
        // phone: '13411990428',
        // phone: '18374884215',
        // phone: '18374884214',
        // phone: '16675555505',
        // phone: '13411990420',
        phone: '13411990428',
        // email: '598346@qq.com',
        // phone: '16675555505',
        // phone: '16675555504',
        // phone: '13424237548',
        // phone: '15225800010',
        // phone: '16675555505',
        // phone: '13411990427',
        // phone: '13411990428',
        // phone: '13424240017',
        code: '000000',
        version: '1.0.0',
        agent: 'ipone14',
        device_id: 'A-ADECFE62-612F-40C9-AE7C-8EE2CBC7BC4A',
      }
      const res = await loginApi.login(params)
      console.log(res)
      // userStore.setToken(res.token);
      userStore.setInfo(res)
    }
    catch (e) {
      console.error('Login failed:', e)
    }
  }

  /**
   * @description 获取用户信息
   */
  // const fetchAndSetUserInfo = async () => {
  //   try {
  //     const res = await userMe({});
  //     userStore.setInfo(res);
  //   } catch (error) {
  //     console.error(`获取用户信息错误: ${error}`);
  //     throw error;
  //   }
  // };

  /**
   * @description 调用客户端方法
   */
  const setWindowJsSyncInfo = () => {
    window.js_sync_info = (token: string, id?: string) => {
      console.log('获取客户端token:', token)
      userStore.setToken(token)
      if (id)
        userStore.setDeviceId(id)

      // fetchAndSetUserInfo();
      callback && callback()
    }
  }

  onBeforeMount(() => {
    // 是否调试模拟数据
    const token = userStore.getToken
    console.log(token)
    if (isAnalog && !token)
      LoginFun()

    setWindowJsSyncInfo()

    // ios中的callback需要单独回调一次，js_sync_info中的callback方法无法执行
    if (isIosFun() && callback)
      callback()
  })
}
