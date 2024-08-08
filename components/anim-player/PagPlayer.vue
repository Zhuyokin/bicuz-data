<template>
  <canvas ref="canvasRef" class="canvas"></canvas>
</template>

<script lang="ts" setup>
import { PAGInit } from 'libpag'
import pagWasm from 'libpag/lib/libpag.wasm?url'
import type { PAGPlayer } from 'libpag/types/pag-view'
import type { PagPlayerPropsType } from './types'

const props = defineProps<{
  conf: PagPlayerPropsType
}>()
const emit = defineEmits(['ready'])

const canvasRef = ref<HTMLCanvasElement | null>(null)

let pagPlayer: PAGPlayer | null = null

const lifeCycleEvent = (player: PAGPlayer, config: PagPlayerPropsType) => {
  player.addListener('onAnimationStart', () => {
    config.onStartPlay && config.onStartPlay(player)
    console.log('开始播放pag动画')
  })
  player.addListener('onAnimationCancel', () => {
    config.onEnded && config.onEnded(player)
    console.log('结束播放pag动画')
  })
  player.addListener('onAnimationUpdate', () => {
    // console.log('动画播放中')
    config.onPlaying && config.onPlaying(player)
  })
}

const init = async () => {
  const {
    url,
    useType,
    width,
    height,
    loop,
    onStartPlay,
    onEnded,
    onPlaying,
  } = props.conf

  const PAG  = await PAGInit({
    locateFile: () => pagWasm,
  })
  const blob = await fetch(url).then(response => response.blob())
  const file = new window.File([blob], url.replace(/(.*\/)*([^.]+)/, '$2'))
  const pagFile = await PAG.PAGFile.load(file)

  // 尺寸设置
  canvasRef.value.width = width || pagFile.width()
  canvasRef.value.height = height || pagFile.height()
  // 初始化
  pagPlayer = await PAG.PAGView.init(pagFile, canvasRef.value)
  pagPlayer.setRepeatCount(loop ? 0 : 1)
  // 播放控制
  if (useType === 2) {
    lifeCycleEvent(pagPlayer, props.conf)
    emit('ready', { player: pagPlayer })
  } else {
    await pagPlayer.play()
  }
}

// 监听数据变化
watch(props, (val) => {
  console.log('[ 动画数据变化 ] >', val.conf)
  pagPlayer?.destroy()
  init()
})

onMounted(() => {
  init()
})

onUnmounted(() => {
  pagPlayer?.destroy()
})
</script>
