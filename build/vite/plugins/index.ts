import type { PluginOption } from 'vite'
import { ConfigCompressPlugin } from './compress'

export function createVitePlugins(viteEnv: ViteEnv) {
  const vitePlugins: (PluginOption | PluginOption[])[] = []
  if (process.env.NODE_ENV === 'production') {
    // 开启.gz压缩
    viteEnv.VITE_USE_COMPRESS && vitePlugins.push(ConfigCompressPlugin())
  }
  return vitePlugins
}
