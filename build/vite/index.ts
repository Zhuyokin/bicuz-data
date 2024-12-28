import type { NuxtConfig } from '@nuxt/schema'
import { useEnv } from '../env'
import { createVitePlugins } from './plugins'

export function createViteConfig(): NuxtConfig['vite'] {
  const { viteEnv } = useEnv()
  return {
    plugins: createVitePlugins(viteEnv),
    server: {
      proxy: {
        '/api/': {
          target: 'http://localhost:8080', // 目标 API 服务器
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''), // 可选：重写路径
        },
      },
    },
  }
}
