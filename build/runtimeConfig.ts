import type { NuxtConfig } from '@nuxt/schema'
import { useEnv } from './env'

export function createRuntimeConfig(): NuxtConfig['runtimeConfig'] {
  const { viteEnv } = useEnv()
  console.log(viteEnv)
  return {
    public: {
      appTitle: viteEnv.VITE_APP_TITLE,
      appBaseUrl: viteEnv.VITE_APP_BASE_URL,
      appCdnUrl: viteEnv.VITE_CDN_URL,
    },
  }
}
