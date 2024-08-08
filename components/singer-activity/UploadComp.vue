<template>
  <div v-if="mySongInfo?.is_allow === 1" class="uploadComp">
    <audio ref="audioRef" @timeupdate="updateProgress" @ended="handleEnded" @loadedmetadata="updateDuration">
      <source :src="audio" type="audio/mpeg">
    </audio>
    <div class="my-song-box">
      <div class="my-info-box">
        <div
          class="avatar cursor-pointer"
          :style="{ background: `url( ${prependHttpIfMissing(mySongInfo?.user_info?.face)}) center center / 100% 100% no-repeat` }"
          @click="toUserCenter(mySongInfo?.user_info?.id)"
        />
        <div class="info">
          <div class="name">
            {{ mySongInfo?.user_info?.nickname }}
          </div>
          <div class="id">
            ID:{{ mySongInfo?.user_info?.user_number }}
          </div>
        </div>
      </div>
      <div
        v-if="!isPass"
        :style="{ background: `url( ${isAudit ? auditBtn : isNotPass ? reUploadBtn : uploadBtn}) center center / 100% 100% no-repeat` }"
        class="upload-btn cursor-pointer" @click="uploadMusic"
      >
        <van-uploader
          v-model="audioList"
          :preview-image="true"
          :disabled="(!isNotUpLoad && !isNotPass) || !mySongInfo" reupload max-count="1" accept=".mp3"
          :max-size="10000 * 1024" :after-read="afterRead" :deletable="false" @oversize="onOversize"
        />
      </div>
      <div v-if="!isPass" class="tip">
        <span v-if="isNotPass">审核未通过{{ `:${mySongInfo?.my_song?.remark}` }}</span>
        <span v-else>仅支持上传10M以内的mp3文件</span>
      </div>
      <div v-if="isPass" class="rank-info">
        <div class="rank">
          <span v-if="props.activeIdx === 2">当前捧场值：{{ myRankInfo?.value }}</span>
          <span v-else>当前排名：{{ mySongInfo?.user_info?.ranking }}</span>
        </div>
        <div class="num">
          <span v-if="props.activeIdx === 2">{{ myRankInfo?.desc }}</span>
          <span v-else>点赞数：{{ mySongInfo?.user_info?.like_number }}</span>
        </div>
      </div>
      <div class="san">
        <div
          v-for="i in left" v-if="left > 0 && !isNotUpLoad" :key="i" class="line"
          :style="`transform:rotate(-${i + 1}deg)`"
        />
        <div class="play-box">
          <div
            v-if="!isNotUpLoad" class="play-btn cursor-pointer"
            :style="{ background: `url( ${isPlaying ? pauseIcon : playIcon}) center center / 100% 100% no-repeat` }"
            @click="togglePlay"
          />

          <div v-if="!isNotUpLoad" class="time">
            {{ formatTime(currentTime) }}/{{ formatTime(duration) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { uploadOSS } from '@/utils/oss.ts'
import playIcon from '@/assets/images/singer-activity/playIcon.webp'
import pauseIcon from '@/assets/images/singer-activity/pauseIcon.webp'
import uploadBtn from '@/assets/images/singer-activity/upload-btn.webp'
import reUploadBtn from '@/assets/images/singer-activity/reupload.webp'
import auditBtn from '@/assets/images/singer-activity/audit.webp'
import { prependHttpIfMissing } from '@/utils/index'
import { singActApi } from '@/api/index'

const props = defineProps<{ error?: () => void, configId?: number, curSongId?: number, activeIdx?: number, myRankInfo?: any }>()
const emit = defineEmits(['playSong', 'getRank'])
// 当前播放时间
const currentTime = ref(0)
// 音频总时长
const duration = ref(0)
// 引用音频元素
const audioRef = ref<HTMLAudioElement | null>(null)
// 音量大小
const volume = ref(1)
const isPlaying = ref(false)

const mySongInfo = ref(null)

const isNotUpLoad = computed(() => {
  return !mySongInfo.value?.my_song || mySongInfo.value?.my_song?.status === 3
})
const isAudit = computed(() => {
  return mySongInfo.value?.my_song?.status === 0
})
const isPass = computed(() => {
  return mySongInfo.value?.my_song?.status === 1
})
const isNotPass = computed(() => {
  return mySongInfo.value?.my_song?.status === 2
})
const isDelete = computed(() => {
  return mySongInfo.value?.my_song?.status === 3
})

const audio = computed(() => {
  return prependHttpIfMissing(mySongInfo.value?.my_song?.song_url)
})

const audioList = ref([])
const configId = ref(0)

const toUserCenter = (user_id: number) => {
  emit('playSong', 0)
  isPlaying.value = false
  audioRef.value && audioRef.value.pause()
  const params = {
    user_id,
  }
  js_sync_app('js_sync_usermain', params, 'user_id')
}

const getMySong = async (id?: number) => {
  const res = await singActApi.getMySong({ config_id: id || configId.value })
  if (id)
    configId.value = id

  console.log('getMySong res>', res)
  mySongInfo.value = res
  if (audioRef.value && res.my_song) {
    audioRef.value.src = prependHttpIfMissing(res.my_song.song_url)
    audioRef.value.load()
    currentTime.value = audioRef.value.currentTime
    duration.value = audioRef.value.duration
  }
}

const uploadMusic = () => {
  emit('playSong', 0)
  audioList.value = []
}

const afterRead = async (file: any) => {
  console.log('file >', file)
  const files = file.file
  file.status = 'uploading'
  file.message = '上传中...'
  if (files.type !== 'audio/mpeg') {
    showToast('请上传 mp3 格式歌曲')
    file.status = 'failed'
    file.message = '上传失败'
    audioList.value = []
    return false
  }

  const returnRelativePath = true
  try {
    const res = await uploadOSS(files, returnRelativePath)
    console.log('res.url >', res.url)
    audioList.value.push(res.url)
    const ret = await singActApi.uploadMySong({ config_id: configId.value, song_url: res.url }).catch((err) => {
      console.log('err >', err)
      file.status = 'failed'
      file.message = '上传失败'
      showToast(err.msg)
    })
    console.log('ret >', ret)
    if (!ret) {
      audioList.value = []
      return
    }
    file.status = 'success'
    file.message = '上传成功'
    getMySong()
    if (props.activeIdx === 2)
      emit('getRank')

    showToast('上传成功')
  }
  catch {
    file.status = 'failed'
    file.message = '上传失败'
  }
}

const onOversize = (file) => {
  console.log(file)
  showToast('文件大小不能超过10MB')
}

const left = computed(() => {
  return Math.floor(currentTime.value / duration.value * 360)
})

/**
 * 将秒数格式化为 mm:ss 格式
 * @param seconds - 秒数
 * @returns 格式化后的时间字符串
 */
const formatTime = (seconds: number): string => {
  if (Number.isNaN(seconds) || seconds === 0)
    return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
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
      emit('playSong', mySongInfo.value.my_song.id)
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

defineExpose<{ getMySong: (configId: number) => void }>({ getMySong })

// 组件挂载后设置初始音量
onMounted(() => {
  if (audioRef.value)
    audioRef.value.volume = volume.value
  nextTick(() => {
    if (!isNotUpLoad.value) {
      currentTime.value = audioRef.value.currentTime
      duration.value = audioRef.value.duration
    }
  })
})

watch(
  () => props.curSongId,
  (newId) => {
    console.log('newCurSongId val=== >', newId, mySongInfo.value.my_song.id)
    if (audioRef.value && newId !== mySongInfo.value.my_song.id && isPlaying.value) {
      isPlaying.value = false
      audioRef.value.pause()
    }
  },
)
</script>

<style lang="scss" scoped>
.my-song-box {
  width: 726px;
  height: 346px;
  background: url('@/assets/images/singer-activity/upload-bg.webp') center
    center / cover no-repeat transparent;
  margin: 0 auto 27px;
  padding: 60px 0 54px 71px;
  position: relative;

  .my-info-box {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 80px;
    min-width: 226px;
    margin-bottom: 17px;

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    .info {
      display: flex;
      justify-content: center;
      flex-direction: column;
      height: 80px;

      .name {
        font-size: 24px;
        font-weight: 600;
        line-height: 32px;
        color: #242424;
      }

      .id {
        font-size: 20px;
        font-weight: 400;
        line-height: 30px;
      }
    }
  }

  .upload-btn {
    margin-bottom: 17px;
    width: 226px;
    height: 84px;
    background: url('@/assets/images/singer-activity/upload-btn.webp') center
      center / cover no-repeat transparent;

    ::v-deep(.van-uploader) {
      width: 100%;
      height: 100%;

      .van-uploader__upload,
      .van-uploader__file {
        width: 226px;
        height: 84px;
        background-color: transparent;
      }

      .van-badge__wrapper,
      .van-uploader__file-name,
      .van-uploader__mask-message {
        background-color: transparent;
        display: none;
      }

      .van-uploader__mask {
        width: 226px;
        height: 84px;
        background: url('@/assets/images/singer-activity/uploading.webp') center
          center / cover no-repeat transparent;
      }
    }
  }

  .rank-info {
    position: absolute;
    bottom: 65px;
    color: #006bdc;

    .rank {
      font-size: 32px;
      font-weight: 600;
    }

    .num {
      font-size: 22px;
      font-weight: 600;
    }
  }

  .san {
    width: 268px;
    height: 270px;
    border-radius: 50%;
    background: #06ffd2;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 54px;
    top: 5px;
    overflow: visible;

    .line {
      position: absolute;
      top: 50.2%;
      left: 50%;
      width: 50%;
      height: 1px;
      z-index: 999;
      transform-origin: 0 0;
      background-color: #fff;
    }

    .play-box {
      transform: translateY(-3px);
      width: 258px;
      height: 262px;
      background: url('@/assets/images/singer-activity/play-comp.webp') center
        center / cover no-repeat transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 1001;

      .play-btn {
        width: 40px;
        height: 40px;
      }

      .time {
        color: #0164eb;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -45px;
        font-weight: 600;
        font-size: 22px;
        white-space: nowrap;
      }
    }
  }

  .tip {
    margin-bottom: 17px;
    color: #000000;
    font-size: 20px;
  }
}
</style>
