<template>
  <div class="pet-anim-wrap">
    <!-- 有喂养后的宠物 -->
    <div
      v-if="data?.current_value"
      class="ani-pet-box cursor-pointer"
      @click="toastPet"
    >
      <!-- 聊天气泡 -->
      <div v-if="!popDialogVisible" class="position" :class="[petDialogText ? 'dialog-pop' : 'dialog-pop-disable']">
        {{ petDialogText }}
      </div>
      <div v-if="popDialogVisible" class="position" :class="[petText ? 'dialog-pop' : 'dialog-pop-disable']">
        {{ petText }}
      </div>
      <div class="ani-pet">
        <anim-player
          :conf="config"
          @ready="onReady"
        />
      </div>
    </div>
    <!-- 初始未喂养的状态 -->
    <div
      v-else-if="data?.current_value === 0"
      class="no-pet-box init-pet-box cursor-pointer"
      @click="toastPet"
    >
      <div v-if="popDialogVisible" class="no-pet-dialog dialog-pop">
        {{ data?.init_text[0] }}
      </div>
      <div class="ani-pet initPetCanvas" />
      <div class="pet-egg-shadow" />
    </div>
    <!-- 没宠物状态 -->
    <div v-else class="no-pet-box">
      <!-- 对话框 -->
      <div class="no-pet-dialog dialog-pop">
        还没有宠物哦，快去商店看看～
      </div>
      <div class="no-pet-img" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data?: any
}>()

// 宠物动效播放器
const petPlayer = null
// 轮询时间timer
let dialogTextTimer = null
let normalTextTimer = null
const expGrowthTimer = null
let switchNormalAndSleepTimer = null
let switchTimes = 0
// 宠物常规状态文案轮播
const dialogTextNormalIdx = ref(0)
// 睡觉
let dialogTextSleepIdx = 0
// 吃饭
let dialogTextEattingIdx = 0
// 饥饿
let dialogTextHungryIdx = 0
// 点击
let dialogTextClickIdx = 0

// 动画配置
const config = ref<any>({
  url: '',
  json: null,
  width: 200,
  height: 200,
  loop: true,
  useType: 2,
})
// 喂养文字
const petText = ref('')
const popDialogVisible = ref(false)
const animPlayerShow = ref(false)
// 服务端返回的时间
const ts = ref(0)
const statusUrlMap = {
  0: 'default_url',
  1: 'dine_url',
  2: 'sleep_url',
  3: 'hunger_url',
}
const statusJsonMap = {
  0: 'default_json',
  1: 'dine_json',
  2: 'sleep_json',
  3: 'hunger_json',
}
const statusTextMap = {
  0: 'default_text',
  1: 'dine_text',
  2: 'sleep_text',
  3: 'hunger_text',
}

// 是否为普通状态
const isStatusNormal = computed(() => {
  return [0].includes(props.data?.status)
})
// 是否为睡觉状态
const isStatusSleep = computed(() => {
  return [2].includes(props.data?.status)
})
// 是否为进食状态
const isStatusEating = computed(() => {
  return [1].includes(props.data?.status)
})
// 是否为饥饿状态
const isStatusHungry = computed(() => {
  return [3].includes(props.data?.status)
})

// 文案数组
const currentDialogArr = computed(() => {
  if (!props.data)
    return []
  return props.data[statusTextMap[props.data.status]]
})

// 点击数组
const clickTextArr = computed(() => {
  if (!props.data)
    return []
  return props.data?.click_text
})

// 宠物状态资源地址
const getPetUrl = () => {
  if (!props.data)
    return ''
  if (isStatusNormal.value && props.data.current_value === 0)
    return props.data.init_url

  return props.data[statusUrlMap[props.data.status]]
}

// 宠物状态资源配置
const getPetJson = () => {
  if (!props.data)
    return null
  if (isStatusNormal.value && props.data.current_value === 0)
    return props.data.init_json

  return props.data[statusJsonMap[props.data.status]]
}

// 初始化完成
const onReady = (player) => {
  player.player.play()
}

const clearNormalTxtTimer = () => {
  clearInterval(normalTextTimer)
  normalTextTimer = null
}

const clearNormalAndSleepTimer = () => {
  clearTimeout(switchNormalAndSleepTimer)
  switchNormalAndSleepTimer = null
}

const clearDialogTimer = () => {
  clearTimeout(dialogTextTimer)
  dialogTextTimer = null
}

// 宠物文案
const petDialogText = computed(() => {
  // 没宠物的状态
  if (!props.data)
    return '还没有宠物哦，快去商店看看吧～'

  // 初始状态
  if (props.data.current_value === 0)
    return props.data.init_text[0]

  // 常规状态下自动轮询气泡
  if (isStatusNormal.value)
    return currentDialogArr.value[dialogTextNormalIdx.value]
})

const getIndex = (idx, arr) => {
  if (idx < arr.length - 1)
    idx += 1
  else
    idx = 0

  return idx
}

// 获取宠物提示文字
const getPetText = () => {
  if (isStatusNormal.value) {
    // 点击状态/常规状态文案
    dialogTextClickIdx = getIndex(dialogTextClickIdx, currentDialogArr.value)
    return clickTextArr.value[dialogTextClickIdx]
  }
  if (isStatusEating.value) {
    dialogTextEattingIdx = getIndex(dialogTextEattingIdx, currentDialogArr.value)
    return currentDialogArr.value[dialogTextEattingIdx]
  }
  if (isStatusSleep.value) {
    dialogTextSleepIdx = getIndex(dialogTextSleepIdx, currentDialogArr.value)
    return currentDialogArr.value[dialogTextSleepIdx]
  }
  if (isStatusHungry.value) {
    dialogTextHungryIdx = getIndex(dialogTextHungryIdx, currentDialogArr.value)
    return currentDialogArr.value[dialogTextHungryIdx]
  }
  return ''
}

// 触碰宠物-切换资源和展示文案(轮播、倒计时),普通状态常驻
const toastPet = () => {
  petText.value = getPetText()
  console.log(petText.value)
  // 立即切换文本
  if (dialogTextTimer)
    clearDialogTimer()

  // 文案轮播
  popDialogVisible.value = true
  dialogTextTimer = setTimeout(() => {
    clearDialogTimer()
    popDialogVisible.value = false
  }, 10000)
  // 初始化状态,资源不变
  if (props.data?.current_value === 0)
    return

  // 普通状态下点击动作，切换资源
  if (isStatusNormal.value) {
    config.value = Object.assign(config.value, {
      url: prependHttpIfMissing(props.data?.click_url),
      json: prependHttpIfMissing(props.data?.click_json),
    })
  }
}

// 监听宠物数据改变
watch(() => props.data, (val) => {
  config.value = Object.assign(config.value, {
    url: getPetUrl(),
    json: getPetJson(),
  })
})

// 常规状态下，轮循获取文案
watchEffect(async () => {
  if (props.data?.status === 0) {
    normalTextTimer = setInterval(() => {
      clearNormalTxtTimer()
      dialogTextNormalIdx.value = getIndex(dialogTextNormalIdx.value, currentDialogArr.value)
    }, 10000)
  }
  else {
    clearNormalTxtTimer()
  }
})

// 常规和睡觉资源每10分钟切换 1000 10 60
const switchSleepAndNormal = () => {
  if (!isStatusNormal.value && !isStatusSleep.value)
    return

  switchNormalAndSleepTimer = setTimeout(() => {
    if (isStatusNormal.value && switchTimes % 2 == 0)
      props.data.status = 2
    else
      props.data.status = 0

    switchTimes += 1
    dialogTextNormalIdx.value = 0
    clearNormalAndSleepTimer()
    switchSleepAndNormal()
  }, 600000)
}

onMounted(() => {
  switchSleepAndNormal()
})
</script>

<style lang="scss" scoped>
@keyframes initAnimate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(8deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
@keyframes dialogMove {
  0% {
    transform: translate(-50%, -10px);
  }
  100% {
    transform: translateX(-50%, 10px);
  }
}
.ani-pet-box {
  width: 500px;
  height: 500px;
  margin: auto;
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  .dialog-pop {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .ani-pet {
    width: 500px;
    height: 500px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.no-pet-box {
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 255px;
  height: 278px;
  .no-pet-dialog {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -70px;
  }
  .no-pet-img {
    width: 255px;
    height: 278px;
    background: url('@/assets/images/pet-cat-farm/no-pet-status.webp') center
      center / cover no-repeat transparent;
  }
  .dialog-pop {
    width: 365px !important;
    max-width: 365px !important;
  }
}
.init-pet-box {
  transform: translateX(-50%);
}
.initPetCanvas {
  background: url('@/assets/images/pet-cat-farm/egg-pet-status.webp') center
    center / cover no-repeat transparent;
  width: 255px;
  height: 278px;
  animation: initAnimate 1.5s linear infinite;
}
.pet-egg-shadow {
  transform: translateY(-55px);
  background: url('@/assets/images/pet-cat-farm/egg-pet-shadow.webp') center
    center / cover no-repeat transparent;
  width: 255px;
  height: 77px;
}
.dialog-pop {
  max-width: 361px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  max-height: 242px;
  padding: 5px 10px;
  position: relative;
  border-radius: 35px;
  background: #ff9900;
  position: absolute;
  border-radius: 34px;
  top: 0;
  left: 0;
  font-size: 24px;
  // animation-name: scaleShape;
  animation-name: dialogMove;
  animation-duration: 2s;
  animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.dialog-pop-disable::before {
  content: '';
  border: 0;
}
.dialog-pop::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  /* 箭头靠下边 */
  left: 50%;
  bottom: -13px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 15px solid #ff9900;
}
.position {
  top: 70px;
}
</style>
