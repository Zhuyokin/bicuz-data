import type { NuxtConfig } from '@nuxt/schema';
import { useEnv } from '../env';
import { createVitePlugins } from './plugins';

export function createViteConfig(): NuxtConfig['vite'] {
  const { viteEnv } = useEnv()
  return {
    plugins: createVitePlugins(viteEnv),
  }
}
