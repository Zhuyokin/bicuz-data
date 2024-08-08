<template>
  <div ref="vapRef" />
</template>

<script lang="ts" setup>
import Vap from 'video-animation-player'
import type { VpaPlayerPropsType } from './types'

const props = defineProps<{
  conf: VpaPlayerPropsType
  error?: () => void
}>()
const emit = defineEmits(['ready'])
const errTimes = ref(0)

const vapRef = ref<HTMLElement | null>(null)
let player: Vap | null = null

const lifeCycleEvent = (player: any, config: VpaPlayerPropsType) => {
  player.on('canplay', () => {})
  player.on('playing', () => {
    config.onStartPlay && config.onStartPlay(player)
  })
  player.on('ended', () => {
    config.onEnded && config.onEnded(player)
  })
  player.on('frame', () => {
    config.onPlaying && config.onPlaying(player)
  })
  player.on('error', () => {
    errTimes.value += 1
    if (errTimes.value === 1)
      props?.error()

    if (errTimes.value <= 8) {
      setTimeout(() => {
        init()
      }, 1000)
    }
  })
  player.onLoadError = () => {
    config.onLoadError && config.onLoadError(player)
  }
}

const init = () => {
  const {
    url: src,
    json: config,
    useType = 1,
    width = 400,
    height = 400,
    fps,
    loop = true,
    mute = true,
    beginPoint = 0,
    accurate = true,
    type = 0,
    precache = false,
  } = props.conf

  const params = {
    container: vapRef.value,
    // 素材视频链接
    src,
    // 素材配置json对象
    config,
    width,
    height,
    // 同素材生成工具中配置的保持一致
    fps,
    // 是否循环
    loop,
    // 是否对视频静音
    mute,
    // 起始播放时间点(单位秒),在一些浏览器中可能无效
    beginPoint,
    // 是否启用精准模式（使用requestVideoFrameCallback提升融合效果，浏览器不兼容时自动降级）
    accurate,
    // 是否预加载视频资源（默认关闭，即边下边播）
    precache,
    // 组件基于type字段做了实例化缓存，不同的VAP实例应该使用不同的type值（如0、1、2等）
    type,
  }
  if (player) {
    player.play(params)
  }
  else {
    // 初始化
    player = new Vap(params)
  }

  // 播放控制
  if (useType === 2) {
    lifeCycleEvent(player, props.conf)
    emit('ready', { player })
  }
  else {
    player.play()
  }
}

// 监听数据变化
watch(props, (val) => {
  console.log('[ 动画数据变化 ] >', val.conf)
  init()
})

onMounted(() => {
  console.log('[ 初始化动画 ] >', props.conf)
  init()
})

onUnmounted(() => {
  player?.destroy()
})
</script>
