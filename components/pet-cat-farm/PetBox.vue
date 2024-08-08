<template>
  <div v-if="props.pet || props.petId === 1" class="pet-box-container" :class="[hasPet && props.pet.petIdx && isCaughtPull ? `catch-pet${props.pet.petIdx}-animation` : '']">
    <!-- 1.有宠物,Exp >= 0 -->
    <div v-if="props.pet && !isErr" class="has-pet-box">
      <div v-if="props.pet.dialogTxtVisible" class="dialog">
        {{ props.pet?.clickTxt ? props.pet?.clickTxt : props.pet?.getPetDialogText() }}
      </div>
      <!-- <div style="font-size: 32px;color: red;">
        {{ isInitEattingEnd }}
      </div> -->
      <!-- && props.pet.petInfo.dine_end_time + 1000 > props.pet.ts -->
      <div v-if="props.pet.petInfo.current_value >= 1200" id="petCanvas" @click="petClick">
        <anim-player
          :conf="config"
          :error="error"
          @ready="onReady"
        />
      </div>
      <div v-else class="init-pet-box" @click="petClick">
        <div class="ani-pet initPetCanvas" />
        <div class="pet-egg-shadow" />
      </div>
    </div>
    <!-- 2.没宠物 -->
    <div v-else class="no-pet-box">
      <div class="dialog no-pet-dialog">
        还没有宠物哦，快去商店看看～
      </div>
      <div class="no-pet-img" />
    </div>
    <!-- 保护卡动效 诱捕成功/失败 保护卡 暴击卡 -->
    <div v-if="showCardAnim && hasPet && !isErr" class="cardAnim" @click="petClick">
      <anim-player
        :conf="cardAniConfig"
        @ready="onReady2"
      />
      <!-- 保护罩倒计时 -->
      <div v-if="protectCountDown > 0 && !props.isVisitedOther" class="card-count-down">
        {{ countText }}
      </div>
    </div>
    <!-- 饭碗 -->
    <!-- <div style="color:red;font-size: 30px;">
      {{ props?.pet?.ts }}
    </div> -->
    <PetBowl v-if="hasPet && !isCaught" :pet="props.pet" :ts="props.pet.ts" :has-pet="hasPet" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import moment from 'moment'
import { prependHttpIfMissing } from '@/utils/index'
import PetBowl from '@/components/pet-cat-farm/PetBowl.vue'
import animPlayer from '@/components/anim-player/index.vue'
import catchSuccessMp4 from '@/assets/images/pet-cat-farm/vap/catchSuccess.mp4?url'
import catchSuccessJson from '@/assets/images/pet-cat-farm/vap/catchSuccess.json'
import catchFailMp4 from '@/assets/images/pet-cat-farm/vap/catchFail.mp4?url'
import catchFailJson from '@/assets/images/pet-cat-farm/vap/catchFail.json'
import protectMp4 from '@/assets/images/pet-cat-farm/vap/protect.mp4?url'
import protectJson from '@/assets/images/pet-cat-farm/vap/protect.json'

const props = defineProps<{
  pet?: any
  isVisitedOther?: boolean
  petId: number
}>()
const hasPet = computed(() => {
  return props.pet !== null
})
const isCaught = ref(false)
const isCaughtPull = ref(false)
const showCardAnim = ref(false)
const caughtTimer = ref(null)
const protectTimer = ref(null)
const petResource = ref('')
const petResourceConfig = ref('')
const getPetManorInfo = inject('getPetManorInfo')
const protectCountDown = ref(0)
const pet = ref(null)

const countText = computed(() => {
  const d = moment.duration(protectCountDown.value, 'seconds')
  const days = d.days()
  const hours = d.hours()
  const minutes = d.minutes()
  const seconds = d.seconds()
  let formattedTime = ''
  if (days > 0)
    formattedTime += `${days}天 `
  if (hours > 0)
    formattedTime += `${hours}小时 `

  if (minutes > 0)
    formattedTime += `${minutes}分钟 `

  if (seconds > 0)
    formattedTime += `${seconds}秒`

  return formattedTime
})

const cardConfig = computed(() => {
  let config
  if (props.pet?.isPetProtected > 0) {
    config = {
      url: protectMp4,
      json: protectJson,
      loop: true,
    }
  }
  if (['success'].includes(props.pet?.catchStatus)) {
    config = {
      url: catchSuccessMp4,
      json: catchSuccessJson,
      loop: false,
      useType: 2,
      onEnded: () => {
        isCaughtPull.value = true
        isCaught.value = true
        showCardAnim.value = true
        props.pet.caught()
        caughtTimer.value = setTimeout(() => {
          showCardAnim.value = false
          getPetManorInfo()
          props.pet?.setCatchStatus('')
          clearCaughtTimer()
        }, 3000)
      },
    }
  }
  if (['fail'].includes(props.pet?.catchStatus)) {
    config = {
      url: catchFailMp4,
      json: catchFailJson,
      loop: false,
      useType: 2,
      onEnded: () => {
        props.pet?.setCatchStatus('')
      },
    }
  }
  return config
})

// 动画配置
const config = ref<any>({
  url: petResource.value,
  json: petResourceConfig.value,
  loop: true,
  useType: 2,
})

// 前置动画
const cardAniConfig = ref({
  url: null,
  json: null,
  width: 750,
  height: 1400,
  useType: 2,
})

// 初始化完成
const onReady = (player) => {
  player.player.play()
}
const isErr = ref(false)
const error = () => {
  isErr.value = true
}
// 初始化完成
const onReady2 = (player) => {
  player.player.play()
}

const clearCaughtTimer = () => {
  clearTimeout(caughtTimer.value)
  caughtTimer.value = null
}

const clearProtectTimer = () => {
  clearInterval(protectTimer.value)
  protectTimer.value = null
}

// 是否在进食
// const isInitEattingEnd = computed(() => {
//   return false
//   return Math.ceil((props.pet.petInfo.dine_end_time * 1000 - props.pet.ts) / 1000) < 0 && props.pet.petInfo.level === 1
// })

watchEffect(() => {
  cardAniConfig.value = Object.assign(cardAniConfig.value, {
    ...cardConfig.value,
  })
})

const isFirst = ref(false)
// 监听宠物数据改变
watch(() => props.pet, (val) => {
  console.log('监听宠物数据改变==========watch-props.pet', val, props.pet?.expGrowTimer)
  if (!val)
    isFirst.value = true
  // 刷新页面无法侦听
  if (props.pet?.expGrowTimer && isFirst.value) {
    isFirst.value = false
    props.pet.eatting()
  }

  showCardAnim.value = val?.catchStatus.length > 0 || (val?.isPetProtected > 0 && !props.isVisitedOther)
  // if (val?.petInfo.current_value >= 1200) {
  config.value = Object.assign(config.value, {
    ...val?.vapConfig,
  })
  // }
  // if (val?.petInfo.guard > 0) {
  //   protectCountDown.value = val.petInfo.guard
  //   if (!protectTimer.value) {
  //     clearProtectTimer()
  //     protectTimer.value = setInterval(() => {
  //       if (protectCountDown.value === 1)
  //         clearProtectTimer()
  //       protectCountDown.value -= 1
  //     }, 1000)
  //   }
  // }
  // else { clearProtectTimer() }
}, { deep: true, immediate: true })

watch(() => props.pet?.petInfo.guard, (val) => {
  if (val > 0) {
    protectCountDown.value = val
    if (!protectTimer.value) {
      clearProtectTimer()
      protectTimer.value = setInterval(() => {
        if (protectCountDown.value === 1)
          clearProtectTimer()
        protectCountDown.value -= 1
      }, 1000)
    }
  }
  else { clearProtectTimer() }
})

const petClick = () => {
  if (!hasPet.value)
    return
  props.pet.toasted()
}

// watch(() => isErr.value, () => {

//   petClick()
// })
</script>

<style lang="scss" scoped>
@keyframes dialogMove {
  0% {
    transform: translate(-50%, -10px);
  }
  100% {
    transform: translate(-50%, 10px);
  }
}
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
@keyframes cageMove {
  0% {
    transform: translate(-50%, -65%);
  }
  100% {
    transform: translate(-50%, -100vh);
  }
}
#pet1 {
  @keyframes petCatch1 {
    0% {
      transform: translate(-50%, 0);
    }
    100% {
      transform: translate(-50%, -100vh);
    }
  }
}
#pet2 {
  @keyframes petCatch2 {
    0% {
      transform: translate(0, 0) scale(0.6);
    }
    100% {
      transform: translate(0, -100vh) scale(0.6);
    }
  }
}
#pet3 {
  @keyframes petCatch3 {
    0% {
      transform: translate(0, 0) scale(0.6);
    }
    100% {
      transform: translate(0, -100vh) scale(0.6);
    }
  }
}

.pet-box-container {
  width: 500px;
  height: 500px;
  position: absolute;
  // bottom: 15%;
  // left: 50%;
  // transform: translateX(-50%);
  // animation-name: petCatch;
  // animation-duration: 5s;
  // animation-direction: alternate;
  // animation-timing-function: linear;
  // animation-iteration-count: infinite;
  .dialog {
    max-width: 361px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60px;
    max-height: 242px;
    padding: 5px 10px;
    border-radius: 35px;
    background: #ff9900;
    position: absolute;
    margin: 0 auto;
    border-radius: 34px;
    top: 0;
    left: 0;
    font-size: 24px;
    animation-name: dialogMove;
    animation-duration: 2s;
    animation-direction: alternate;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  .dialog::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    bottom: -13px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 15px solid #ff9900;
  }
  .has-pet-box {
    width: 500px;
    height: 500px;
    margin: auto;
    position: absolute;
    bottom: 0%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    .dialog {
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
    bottom: 0%;
    left: 50%;
    transform: translateX(-50%);
    width: 255px;
    height: 278px;
    .no-pet-dialog {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -70px;
      width: 365px !important;
      max-width: 365px !important;
      color: #fff;
    }
    .no-pet-img {
      width: 255px;
      height: 278px;
      background: url('@/assets/images/pet-cat-farm/no-pet-status.webp') center
        center / cover no-repeat transparent;
    }
  }
  .initPetCanvas {
    background: url('@/assets/images/pet-cat-farm/egg-pet-status.webp') center
      center / cover no-repeat transparent;
    width: 255px !important;
    height: 278px !important;
    animation: initAnimate 1.5s linear infinite;
  }
  .init-pet-box {
    width: 255px !important;
    height: 278px !important;
  }
  .pet-egg-shadow {
    transform: translateY(-55px);
    background: url('@/assets/images/pet-cat-farm/egg-pet-shadow.webp') center
      center / cover no-repeat transparent;
    width: 255px;
    height: 77px;
  }
  .cardAnim {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    // height: 85vh;
    height: 100% !important;
    bottom: 0;
    z-index: 9999;
    :deep(canvas) {
      transform: translateY(-600px) scale(1.5) !important;
      width: 100% !important;
      height: 100% !important;
    }
    .card-count-down {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -10px;
      min-width: 200px;
      height: 31px;
      border-radius: 36px;
      background: #a1ffc6;
      color: #019d3f;
      font-size: 18px;
      font-weight: 500;
      line-height: 31px;
    }
  }
}
.catch-pet1-animation {
  animation-name: petCatch1;
  animation-duration: 3s;
  // animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: 1;
}

.catch-pet2-animation {
  animation-name: petCatch2;
  animation-duration: 3s;
  // animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: 1;
}
.catch-pet3-animation {
  animation-name: petCatch3;
  animation-duration: 3s;
  // animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: 1;
}
#petCanvas {
  :deep(canvas) {
    transform: scale(0.5) !important;
  }
}
</style>
