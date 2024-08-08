<template>
  <div v-if="dialogVisible" id="buy-confirm-dialog">
    <van-popup v-model:show="dialogVisible" :style="{ padding: '64px' }" @click-overlay="close()">
      <div class="body">
        <div class="close cursor-pointer" @click="close()" />
        <div class="title">
          {{ props.selectedTool.card_name }}
        </div>
        <div class="tool-img" :style="`background:url(${prependHttpIfMissing(props.selectedTool.icon)})  center center / cover no-repeat transparent`" />
        <!-- 道具描述 -->
        <div class="desc">
          {{ props.selectedTool.attr_remark }} <br>
          使用方式：  {{ props.selectedTool.usage_remark }}
        </div>
        <!-- 道具数量 -->
        <div v-if="dialogVisible" class="change-num-box">
          <div class="minus-btn cursor-pointer" @click="changeNum('minus')" />
          <van-field v-model="num" type="digit" label-align="center" maxlength="2" placeholder="输入数量" />
          <div class="add-btn cursor-pointer" @click="changeNum('add')" />
        </div>
        <!-- 确认按钮 -->
        <div class="confirm" @click="confirm" />
        <!-- 去充值 -->
        <div class="my-account">
          <span>我的米粒: </span>
          <span>{{ props.diamond }}</span>
          <span class="to-charge cursor-pointer" @click="props.toCharge">去充值</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { prependHttpIfMissing } from '@/utils/index'

const props = defineProps({
  diamond: {
    type: Number,
    default: 0,
  },
  toCharge: {
    type: Function,
    default: () => {},
  },
  selectedTool: {

  },
})
const emit = defineEmits(['buy'])
const dialogVisible = ref(false)
const num = ref<number>(1)
const setVisible = (bool) => {
  dialogVisible.value = bool
}
const openDialog = (tool) => {
  dialogVisible.value = true
}
const close = () => {
  setVisible(false)
  num.value = 1
}
const confirm = () => {
  emit('buy', num.value)
  close()
}

const changeNum = (type: string) => {
  if ([1, '1'].includes(num.value) && ['minus'].includes(type))
    return

  if ([99, '99'].includes(num.value) && ['add'].includes(type))
    return

  if (['add'].includes(type))
    num.value = Number(num.value) + 1

  if (['minus'].includes(type))
    num.value = Number(num.value) - 1
}

defineExpose<{ openDialog: (boolean) => void }>({ openDialog })
</script>

<style lang="scss" scoped>
#buy-confirm-dialog {
  :deep(.van-cell) {
    width: 238px;
    height: 78px;
    // line-height: 10px;
    font-weight: 500;
    margin: 0 20px;
    border-radius: 20px;
    background: #ffdc9f;
  }
  :deep(.van-field__value) input {
    color: #b64643;
    font-weight: bold;
    text-align: center;
    font-size: 40px;
  }
  :deep(.van-popup) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 !important;
    width: 686px;
    height: 855px;
    background: url('@/assets/images/pet-cat-farm/confirm-buy-bg.webp') center
      center / cover no-repeat transparent;
    overflow: visible !important;
    .body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 686px;
      height: 855px;
      padding: 181px 48px 50px;
      font-size: 28px;
      color: #b43a04;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .close {
        position: absolute;
        top: 90px;
        right: 26px;
        width: 68px;
        height: 63px;
        background: url('@/assets/images/pet-cat-farm/pet-store-close.webp')
          center center / cover no-repeat transparent;
      }
      .title {
        font-size: 36px;
        color: #b43a04;
        font-weight: bold;
      }
      .tool-img {
        width: 200px;
        height: 200px;
        margin-bottom: 15px;
      }
      .change-num-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 18px 40px;
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
      .desc {
        display: flex;
        align-items: center;
        width: 352px;
        height: 60px;
        font-size: 22px;
        color: #b43a04;
        margin: 20px 32px;
      }
      .confirm {
        margin-bottom: 24px;
        width: 404px;
        height: 96px;
        background: url('@/assets/images/pet-cat-farm/buy-btn-active.webp')
          center center / cover no-repeat transparent;
      }
      .my-account {
        display: flex;
        gap: 5px;
        justify-content: center;
        color: #b43a04;
        font-weight: 500;
        font-size: 28px;
        margin: 0 auto;
        .to-charge {
          padding-left: 10px;
          position: relative;
        }
        .to-charge:hover {
          cursor: pointer;
        }
        .to-charge:after {
          content: '';
          width: 12px;
          height: 12px;
          border: solid #b43a04;
          border-width: 0 2px 2px 0;
          transform: translate(-50%, -50%) rotate(-45deg);
          position: absolute;
          font-weight: bolder;
          right: -20%;
          top: 55%;
        }
      }
    }
  }
}
</style>
