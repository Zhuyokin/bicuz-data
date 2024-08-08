<template>
  <!-- <ClientOnly> -->
  <div ref="vapPlayerRef" />
  <!-- </ClientOnly> -->
</template>

<script setup lang="ts">
import { computed, reactive, ref, toRaw } from 'vue'
import Vap from 'video-animation-player'
// import {loadCachedMP4File} from "@/utils/cache";
import { debounce, prependHttpIfMissing, throttle } from '@/utils/index'

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  config: {
    type: String,
    default: '',
  },
  width: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
  loop: {
    type: Boolean,
    default: true,
  },
})
const vapPlayer = ref(null)
const vapPlayerRef = ref(null)
const vapConfig = ref({
  // fps: 50, // 帧数，json文件中有这个视频的帧数的，可以看一下，
  mute: false, // 静音
  // type: 1, // 组件基于type字段做了实例化缓存，不同的VAP实例应该使用不同的type值（如0、1、2等）
  loop: true, // 循环
  precache: false, // 预加载视频，下载完再播。小动画建议边下边播，大动画还是先下后播吧，因为太大了或者网络不好，会一卡一卡的。
  beginPoint: 0, // 起始播放时间点(单位秒),在一些浏览器中可能无效
  accurate: false, // 是否启用精准模式（使用requestVideoFrameCallback提升融合效果，浏览器不兼容时自动降级）
  width: 250,
  height: 250,
})
const isPlayOnce = ref(false)
const failTimes = ref(0)
const vapPlayEnd = () => {
  // 销毁vapPlayer
  if (vapPlayer.value) {
    console.log('vapPlayer.value >====', vapPlayer.value)
    vapPlayer.value.destroy()
    vapPlayer.value = null
  }
  // if (chrome.webview && chrome.webview.hostObjects && chrome.webview.hostObjects.dataObj) {
  //   const dataObj = chrome.webview.hostObjects.dataObj;
  //   dataObj.onComplete();
  // }
}

const setConfig = (config: object, fail_times?: number) => {
  // toRaw(vapPlayer.value).options.loop = config.loop
  console.log('config.loop >', config.loop)
  if (!failTimes.value)
    failTimes.value = 0
  else if (failTimes.value)
    failTimes.value = fail_times // 失败回调次数统计

  if (isPlayOnce.value && !config.loop)
    return
  if (!config.loop)
    isPlayOnce.value = true
  else
    isPlayOnce.value = false

  console.log('config >', config)
  // vapPlayer.value.clear()
  // vapPlayer.value.destory()
  vapPlayer.value
    .play({
      container: vapPlayerRef?.value,
      ...vapConfig.value,
      ...config,
    })
    .on('playing', () => {
      console.log('playing')
    })
    .on('error', () => {
      if (failTimes.value <= 4) {
        failTimes.value += 1
        setConfig(config, failTimes.value)
      }
      console.log('错误了', config)
    })
    .on('ended', () => {
      console.log('播放结束')
      isPlayOnce.value = false
      if (config?.vapPlayEnd) {
        // vapPlayer.value?.clear()
        config?.vapPlayEnd()
      }
      else {
        // vapPlayEnd();
      }
    })
}

const initVap = (config) => {
  // 清空资源
  // vapPlayEnd();
  // vapPlayer.value.clear();
  try {
    // let blob = loadCachedMP4File(props.config)
    // let blob2 =loadCachedMP4File(props.src)
    // console.log(blob,blob2);
    // vapPlayer.value.clear()
    vapPlayer.value = new Vap()
      .play({
        container: vapPlayerRef?.value,
        ...vapConfig,
        // width: props.width,
        // height: props.height,
        // src: props.src,
        // config: props.config,
        // loop: props.loop,
        ...config,
        onLoadError: (e) => {
          // initVap(config)
          console.log('加载失败！', e)
          // vapPlayEnd();
        },
        onDestroy: (e) => {
          console.log('销毁加载', e)
        },
      })
      .on('playing', () => {
        console.log('播放中')
      })
      .on('error', () => {
        // vapPlayEnd();
        // nextTick(()=>{
        //   initVap(config)
        // })
        console.log('错误了')
      })
      .on('ended', () => {
        console.log('播放结束')
        if (config?.vapPlayEnd) {
          config?.vapPlayEnd()
        }
        else {
          // vapPlayEnd();
        }
      })
  }
  catch (error) {
    console.log('[ erro > ]', error)
    // vapPlayEnd();
  }
}

// onUnmounted(()=>{
//   if(vapPlayer.value){
//     vapPlayEnd();
//   }
// })

defineExpose<{
  initVap: (config: Object) => void
  vapPlayEnd: () => void
  setConfig: (config: any) => void
  vapPlayer: any
}>({ initVap, vapPlayEnd, setConfig, vapPlayer })
</script>

<style lang="scss" scoped></style>
