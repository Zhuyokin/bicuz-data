import { useUserStore } from '@/store';
import { js_sync_loadEnd } from '@/utils';

export default defineNuxtPlugin(() => {
    // 调用原生方法 - 获取用户信息
    window.js_sync_info = (token: string, id?: string) => {
      console.log('获取客户端token:', token)
      const userStore = useUserStore()
      userStore.setToken(token)
      if (id) userStore.setDeviceId(id)
    }

    js_sync_loadEnd();
})
