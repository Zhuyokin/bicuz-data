<template>
  <canvas ref="canvasRef" />
</template>

<script lang="ts" setup>
import { Parser, Player } from 'svga'
import type { SvgaPlayerPropsType } from './types'

const props = defineProps<{
  conf: SvgaPlayerPropsType
}>()
const emit = defineEmits(['ready'])

const canvasRef = ref<HTMLCanvasElement | null>(null)
let parser: Parser | null = null
let player: Player | null = null

const lifeCycleEvent = (player: Player, config: SvgaPlayerPropsType) => {
  player.onStart = () => {
    console.log('onStart')
    config.onStartPlay && config.onStartPlay(player)
  }
  player.onResume = () => {
    console.log('onResume')
  }
  player.onPause = () => {
    console.log('onPause')
  }
  player.onStop = () => {
    console.log('onStop')
  }
  player.onProcess = () => {
    config.onPlaying && config.onPlaying(player)
    // console.log('onProcess', player)
  }
  player.onEnd = () => {
    console.log('onEnd')
    config.onEnded && config.onEnded(player)
  }
}

const loadSvga = async () => {
  const {
    url,
    width = 400,
    height = 400,
    useType,
    loop,
    fillMode = 'forwards',
    playMode = 'forwards',
    onStartPlay,
    onEnded,
    onPlaying,
  } = props.conf

  // 尺寸设置
  canvasRef.value.width = width
  canvasRef.value.height = height

  // 解析器初始化
  if (!parser)
    parser = new Parser()

  const svga = await parser.load(url)

  // 播放器初始化
  const params = {
    container: canvasRef.value,
    loop: loop ? 0 : 1,
    fillMode,
    playMode,
  }
  if (!player)
    player = new Player(params)
  else
    player.setConfig(params)

  await player.mount(svga)
  // 播放控制
  if (useType === 2) {
    console.log(props.conf, 'props.conf:>')
    lifeCycleEvent(player, props.conf)
    emit('ready', { player })
  }
  else {
    player.start()
  }
}

// 监听数据变化
watch(props, (val) => {
  console.log('[ 动画数据变化 ] >', val.conf)
  loadSvga()
})

onMounted(() => {
  loadSvga()
})

onUnmounted(() => {
  parser?.destroy()
  player?.destroy()
})
</script>
