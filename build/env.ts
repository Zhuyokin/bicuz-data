import process from 'node:process'
import { loadEnv } from 'vite'
import { wrapperEnv } from './utils'

interface EnvConfig {
  viteEnv: ViteEnv
  mode: 'production' | 'development'
}

const envName = process.env.npm_lifecycle_script?.match(/--mode\s(.*)/)?.[1]
const envData = loadEnv(envName ?? 'production', process.cwd()) // 获取.env文件中的配置
const viteEnv = wrapperEnv(envData)
Object.assign(process.env, envData) // 将环境配置信息，添加到process.env

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production'
export function useEnv(): EnvConfig {
  return {
    viteEnv,
    mode,
  }
}
