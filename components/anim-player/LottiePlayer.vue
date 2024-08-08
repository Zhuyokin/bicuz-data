<template>
  <div ref="lottieRef"></div>
</template>

<script lang="ts" setup>
import lottie, { type AnimationItem } from 'lottie-web'
import type { lottiePlayerType } from './types'

const props = defineProps<{
  conf: lottiePlayerType
}>()
const emit = defineEmits(['ready'])

const lottieRef = ref<HTMLDivElement | null>(null)

let animPlayer: AnimationItem | null = null

const lifeCycleEvent = (player: AnimationItem, config: lottiePlayerType) => {
  player.addEventListener('loopComplete', () => {
    config.onEnded && config.onEnded(player)
  })
  player.addEventListener('DOMLoaded', () => {
    config.onStartPlay && config.onStartPlay(player)
  })
  player.addEventListener('drawnFrame', () => {
    config.onPlaying && config.onPlaying(player)
  })
}

const init = () => {
  const {
    url: path,
    width,
    height,
    useType,
    loop,
    renderer = 'svg',
    autoplay,
    onStartPlay,
    onEnded,
    onPlaying,
  } = props.conf

  // 尺寸设置
  lottieRef.value.style.width = `${width}px`
  lottieRef.value.style.height = `${height}px`
  // 初始化
  animPlayer = lottie.loadAnimation({
    container: lottieRef.value,
    path,
    renderer,
    loop,
    autoplay,
    rendererSettings: {
      clearCanvas: true,
    }
  })
  // 播放控制
  if (useType === 2) {
    lifeCycleEvent(animPlayer, props.conf)
    emit('ready', { player: lottie })
  } else {
    lottie.play()
  }
}

// 监听数据变化
watch(props, (val) => {
  console.log('[ 动画数据变化 ] >', val.conf)
  animPlayer?.destroy();
  init()
})


onMounted(() => {
  init();
})

onUnmounted(() => {
  animPlayer?.destroy();
  lottie.destroy()
})
</script>
