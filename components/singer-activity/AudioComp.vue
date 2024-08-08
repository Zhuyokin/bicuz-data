<template>
  <div class="audioComp">
    <audio ref="audioRef" @timeupdate="updateProgress" @ended="handleEnded" @loadedmetadata="updateDuration">
      <source :src="audio" type="audio/mpeg">
    </audio>
    <div class="play-box" :style="`transform: scale(${isPeriod2 ? 0.65 : 1});margin-top: ${isPeriod2 ? -5 : 0}px`">
      <div
        class="play-btn cursor-pointer"
        :style="`background: url( ${isPlaying ? pauseIcon : playIcon}) center center / 100% 100% no-repeat;transform: scale(${isPeriod2 ? 0.85 : 1})`"
        @click.stop="togglePlay"
      />
      <div class="count-down">
        <!-- 当前时间和总时间 -->
        {{ formatTime(currentTime, duration) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import playIcon from '@/assets/images/singer-activity/playIcon.webp'
import pauseIcon from '@/assets/images/singer-activity/pauseIcon.webp'

const props = defineProps<{ id?: number, audio: string, error?: () => void, curSongId?: number, isPeriod2?: boolean }>()
const emit = defineEmits(['playSong'])
// 当前播放时间
const currentTime = ref(0)
// 音频总时长
const duration = ref(0)
// 引用音频元素
const audioRef = ref<HTMLAudioElement | null>(null)
// 音量大小
const volume = ref(1)
const isPlaying = ref(false)

/**
 * 将秒数格式化为 mm:ss 格式
 * @param seconds - 秒数
 * @returns 格式化后的时间字符串
 */
const formatTime = (s1: number, s2: number): string => {
  const seconds = s2 - s1
  if (Number.isNaN(seconds) || seconds === 0)
    return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
}

/**
 * 切换播放和暂停状态
 */
const togglePlay = () => {
  if (audioRef.value) {
    if (isPlaying.value) {
      audioRef.value.pause()
    }
    else {
      emit('playSong', props.id)
      audioRef.value?.play().catch((error) => {
        console.error('播放错误:', error)
      })
    }
    isPlaying.value = !isPlaying.value
  }
}

/**
 * 处理音频播放结束事件
 */
const handleEnded = () => {
  isPlaying.value = false
  currentTime.value = 0
  // 强制重新加载音频源
  // if (audioRef.value) {
  //   audioRef.value.src = props.audioSrc
  //   audioRef.value.load()
  // }
}

/**
 * 更新进度条和当前时间
 */
const updateProgress = () => {
  if (audioRef.value)
    currentTime.value = audioRef.value.currentTime
}

/**
 * 更新音频总时长
 */
const updateDuration = () => {
  nextTick(() => {
    setTimeout(() => {
      if (isIosFun()) {
        if (audioRef.value)
          duration.value = audioRef.value.duration
        // if (isNaN(duration.value) || duration.value === 0)
        //   retryUpdateDuration()
      }
      else {
        if (audioRef.value) {
          duration.value = audioRef.value.duration
          console.log('安卓音频总时长:', duration.value, audioRef.value)
        }
      }
    }, 200)
  })
}

// 组件挂载后设置初始音量
onMounted(() => {
  if (audioRef.value) {
    audioRef.value.volume = volume.value
    nextTick(() => {
      currentTime.value = audioRef.value.currentTime
      duration.value = audioRef.value.duration
    })
  }
})

watch(() => props.audio, (val) => {
  if (audioRef.value) {
    nextTick(() => {
      audioRef.value.src = val
      audioRef.value.load()
      currentTime.value = audioRef.value.currentTime
      duration.value = audioRef.value.duration
    })
  }
})

watch(
  () => props.curSongId,
  (newId) => {
    console.log('newCurSongId val >', newId)
    if (audioRef.value && newId !== props.id && isPlaying.value) {
      audioRef.value.pause()
      isPlaying.value = false
    }
  },
)
</script>

<style lang="scss" scoped>
.audioComp {
  display: flex;
  // background-color: yellow;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.play-box {
  width: 145px;
  height: 56px;
  // background: url('@/assets/images/singer-activity/play-box.webp') center center /
  //   cover no-repeat transparent;
  background-color: #3fa5f6;
  border-radius: 28px;

  display: flex;
  align-items: center;
  justify-content: center;
  .play-btn {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  .count-down {
    font-size: 24px;
    color: #ffffff;
    font-weight: 500;
  }
}
</style>
