<template>
  <div v-if="hasPet" class="feed-container">
    <div
      v-if="countText"
      class="timer-box"
    >
      <div class="timer-icon" />
      <div class="timer-count">
        {{ countText }}
      </div>
    </div>
    <div
      class="food-img"
      :style="`background:url(${countText ? halfPetFood : emptyPetFood})  center center / cover no-repeat transparent`"
    />
    <!-- <div class="food-progress-box">
          <div class="food-progress-text">50%</div>
          <div class="food-progress-bar"></div>
        </div> -->
  </div>
</template>

<script setup lang="ts">
// 导入图片
import { computed, getCurrentInstance, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'
import moment from 'moment'
import halfPetFood from '@/assets/images/pet-cat-farm/food-half.webp'
import emptyPetFood from '@/assets/images/pet-cat-farm/food-empty.webp'

const props = defineProps({
  pet: {
    type: Object,
    default: null,
  },
  ts: {
    type: Number,
    default: null,
  },
  hasPet: {
    type: Boolean,
    default: false,
  },
})

const countText = computed(() => {
  const left = Math.floor((props.pet.petInfo.dine_end_time * 1000 - props.ts) / 1000)
  const d = moment.duration(left, 'seconds')
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

watch(() => props.ts, (val) => {
  console.log('PetBowl===========[props.ts]', props.ts)
})
</script>

<style lang="scss" scoped>
  .feed-container {
  position: absolute;
  top: 270px;
  right: -75px;
  // transform: translateX(250%);
  transform: scale(0.75);
  min-height: 46px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 270px;
  .timer-box {
    height: 46px;
    flex-shrink: 0;
    border-radius: 58px;
    background: #00000080;
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    padding: 0px 8px;
    .timer-icon {
      width: 34px;
      height: 34px;
      background: url('@/assets/images/pet-cat-farm/timer-icon.webp') center
        center / cover no-repeat transparent;
      margin-right: 7px;
    }
    .timer-count {
      // :deep(.van-count-down) {
      white-space: nowrap;
      width: auto;
      font-size: 24px;
      font-weight: 500;
      color: #fff;
      display: flex;
      // }
    }
  }
  .food-img {
    width: 120px;
    height: 120px;
    // background: url('@/assets/images/pet-cat-farm/food-empty.webp') center center / cover no-repeat transparent;
  }
  .food-progress-box {
    width: 160px;
    height: 30px;
    border-radius: 38px;
    background: #fff;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 3px;
    .food-progress-text {
      font-size: 23px;
      position: absolute;
      color: #242424;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .food-progress-bar {
      height: 80%;
      width: 50%;
      border-radius: 38px;
      background: linear-gradient(180deg, #ff8d51 0%, #f00 100%),
        linear-gradient(180deg, #ff6060 0%, #993939 100%);
    }
  }
}
</style>
