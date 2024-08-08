<template>
  <div class="feed-dialog">
    <van-popup v-model:show="feedVisible" :style="{ padding: '64px' }" @click-overlay="close">
      <div class="content">
        <div class="close cursor-pointer" @click="close" />
        <div class="food-img" />
        <!-- <div class="food-tips-text num-text">消耗{{ 1200 * num }}口粮</div> -->
        <div class="change-num-box">
          <div class="minus-btn cursor-pointer" @click="changeNum('minus')" />
          <van-field v-model="num" type="digit" label-align="center" maxlength="2" placeholder="请输入投喂数量" />
          <div class="add-btn cursor-pointer" @click="changeNum('add')" />
        </div>
        <div class="feed-btn cursor-pointer" @click="confirm" />
        <div class="my-food-num num-text">
          我的加速卡: {{ props.cardNum }}
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { feedPet, useToolCard } from '@/api/modules/pet'
import { throttle } from '@/utils/index'

const props = defineProps({
  cardNum: {
    type: Number,
    default: 0,
  },
  cardId: {
    type: Number,
    default: 1,
  },
  dineEndTime: {
    type: Number,
    default: 1,
  },
  hasPet: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['initPage', 'changeEndTime'])
const feedVisible = ref(false)
const petInfo = ref({})
const num = ref<number>(1)
const setVisible = (bool) => {
  feedVisible.value = bool
}
const setPetInfo = (info) => {
  petInfo.value = info
}
const close = () => {
  setVisible(false)
  num.value = 1
}

const feed = async () => {
  // 无宠物提示文案
  if (!props.hasPet) {
    showToast('TA还没有宠物哦，快去提醒TA购买吧~')
    return
  }
  // 衰退期投喂条件
  if (petInfo.value.status !== 1) {
    showToast('小宠物在进食状态才能加速哦')
    return
  }
  // 数量最大值
  if (num.value > props.cardNum) {
    showToast('加速卡数量不足')
    return
  }
  const ret = await useToolCard({ user_pet_id: petInfo.value?.id, props_num: num.value, props_id: props.cardId, isRaw: true }).catch((err) => {
    console.log('[err >]', err)
  })
  const res = ret.data
  if (!res)
    return
  showToast(`已使用${res.used}张加速卡`)
  close()
  emits('initPage', { ...res.pet_info, ts: ret.ts })
  // res.pet_list = [res.pet_info]
  // emits('changeEndTime', res)
}

const confirm = throttle(() => {
  feed()
}, 1000)

const changeNum = (type) => {
  if ([1, '1'].includes(num.value) && ['minus'].includes(type))
    return

  if ([99, '99'].includes(num.value) && ['add'].includes(type))
    return

  if (['add'].includes(type)) {
    // if(props.dineEndTime * 1000 - new Date().getTime()){
    //   return
    // }
    // const leftSec = Math.ceil((props.dineEndTime * 1000 - new Date().getTime()) / 1000)
    // if (leftSec < num.value * 1800)
    //   return

    num.value = Number(num.value) + 1
  }

  if (['minus'].includes(type))
    num.value = Number(num.value) - 1
}

defineExpose<{ setVisible: (boolean) => void, setPetInfo: (info) => void }>({ setVisible, setPetInfo })
</script>

<style lang="scss" scoped>
.feed-dialog {
  :deep(.van-cell) {
    width: 290px;
    height: 68px;
    line-height: 30px;
    font-weight: 500;
    // color: #B64643!important;
    margin: 0 20px;
    border-radius: 20px;
    background: #ffdc9f !important;
  }
  :deep(.van-field__value) input {
    color: #b64643;
    font-weight: bold;
    text-align: center;
    font-size: 30px;
  }
  :deep(.van-popup) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 !important;
    width: 686px;
    height: 785px;
    background: url('@/assets/images/pet-cat-farm/speed-dialog-bg.webp') center
      center / cover no-repeat transparent;
    .num-text {
      color: #fff;
      font-size: 30px !important;
      font-weight: bolder;
      // -webkit-text-stroke: 1px #b64643;
      // text-stroke: 1px #b64643;
      // letter-spacing: 1px;
      // word-spacing: 1px;
      font-family: 'PingFang SC';
      color: #b64643;
    }
    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 686px;
      height: 785px;
      padding: 176px 36px 50px;
      .close {
        position: absolute;
        top: 85px;
        right: 26px;
        width: 68px;
        height: 63px;
        background: url('@/assets/images/pet-cat-farm/pet-store-close.webp')
          center center / cover no-repeat transparent;
      }
      .food-img {
        width: 264px;
        height: 264px;
        background: url('@/assets/images/pet-cat-farm/speed-dialog-img.webp')
          center center / cover no-repeat transparent;
      }
      .food-tips-text {
        // font-size: 22px;
        // line-height: 36px;
        margin-bottom: 15px;
        color: #fff;
        font-size: 32px;
        font-weight: bolder;
        // -webkit-text-stroke: 1px #b64643;
        // text-stroke: 1px #b64643;
        color: #b64643;
        // letter-spacing: 1px;
        // word-spacing: 1px;
        font-family: 'PingFang SC';
      }
      .change-num-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40px;
        .minus-btn {
          width: 68px;
          height: 68px;
          background: url('@/assets/images/pet-cat-farm/feed-dialog-minus.webp')
            center center / cover no-repeat transparent;
        }
        .add-btn {
          width: 68px;
          height: 68px;
          background: url('@/assets/images/pet-cat-farm/feed-dialog-add.webp')
            center center / cover no-repeat transparent;
        }
      }
      .feed-btn {
        margin-bottom: 24px;
        width: 404px;
        height: 96px;
        background: url('@/assets/images/pet-cat-farm/use-speed-btn.webp')
          center center / cover no-repeat transparent;
      }
      .my-food-num {
        font-size: 32px !important;
        line-height: 36px;
      }
    }
  }
}
</style>
