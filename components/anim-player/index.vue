<template>
  <client-only>
    <component :is="playerComponent" ref="playerRef" :conf="conf" :error="props.error" @ready="onReady" />
  </client-only>
</template>

<script lang="ts" setup>
import type { playerCommonType } from './types'

const props = defineProps<{ conf: playerCommonType, error?: () => void }>()
const emit = defineEmits(['ready'])
const PagPlayer = defineAsyncComponent(() => import('./PagPlayer.vue'))
const SvgaPlayer = defineAsyncComponent(() => import('./SvgaPlayer.vue'))
const VapPlayer = defineAsyncComponent(() => import('./VapPlayer.vue'))
const LottiePlayer = defineAsyncComponent(() => import('./LottiePlayer.vue'))

const playerRef = ref<any>(null)

const mapArray: Array<Array<RegExp | string>> = [
  [/\.pag/i, PagPlayer],
  [/\.svga/i, SvgaPlayer],
  [/\.mp4/i, VapPlayer],
  [/\.json/i, LottiePlayer],
]

const playerComponent = computed(() => {
  const { url } = props.conf
  const obj = mapArray.find(item => (item[0] as RegExp).test(url))
  if (obj)
    return obj[1]
  return null
})

const onReady = (player: any) => {
  emit('ready', player)
}
</script>
