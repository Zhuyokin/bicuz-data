<template>
  <div id="surprise-dialog">
    <van-popup v-model:show="dialogVisible" @click-overlay="close">
      <div class="body" :class="[props.type === 1 ? 'surprise' : 'lucky']">
        <div class="close-btn" @click="close" />
        <div class="top-txt">
          <div>哇哦～</div>
          <div>你触发了{{ props.type === 1 ? '惊喜' : '幸运' }}娃娃事件，获得了奖励：</div>
        </div>
        <div class="gift-box">
          <div class="gift-pic" :style="`background:url(${prependHttpIfMissing(gift?.gift_photo)})  center center / cover no-repeat transparent`"/>
          <div class="gift-name">
            {{ gift?.gift_name }}
          </div>
          <div class="gift-price">
            {{ gift?.gift_diamond }}钻石
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ type: number }>()
const gift = ref()

const dialogVisible = ref(false)
const setVisible = (bool) => {
  dialogVisible.value = bool
}
const openDialog = (giftObj) => {
  gift.value = giftObj
  dialogVisible.value = true
}

const close = () => {
  setVisible(false)
}

defineExpose<{ openDialog: (boolean) => void }>({ openDialog })
</script>

<style lang="scss" scoped>
#surprise-dialog {
  :deep(.van-field__value) input {
    font-size: 28px;
    line-height: 28px;
    color: #c65bff !important;
    font-weight: bold;
    text-align: center;
  }

  :deep(.van-field__value) .van-field__word-limit {
    margin-top: -35px;
    color: #8f8f8f;
  }

  :deep(.van-popup) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 !important;
    width: 678px !important;
    height: 623px !important;
    overflow: visible !important;
    height: auto;
    background: transparent;

    .body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 678px;
      height: 623px;

      font-size: 28px;
      padding-top: 197px;
      color: #b04f00;
      font-weight: 600;
      position: relative;

      .close-btn {
        width: 68px;
        height: 63px;
        background: url('@/assets/images/doll-activity/close-icon.webp') center center / cover no-repeat transparent;
        position: absolute;
        right: 0;
        top: 0;
      }

      .top-txt {
        line-height: 44px;
        width: 565px;
        height: 88px;
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-bottom: 24px;
      }

      .gift-box {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .gift-pic {
        width: 168px;
        height: 168px;
        border-radius: 24px;
        border: 7px solid #ff7530;
        background: #ffd399;
        margin-bottom: 15px;
      }

      .gift-name {
        color: #b04f00;
        font-weight: 500;
        font-size: 28px;
        margin-bottom: 5px;
      }

      .gift-price {
        font-size: 20px;
        font-weight: 400;
        color: #b04f00;
      }
    }

    .body.surprise {
      background: url('@/assets/images/doll-activity/surprise-doll-dialog.webp') center center / cover no-repeat transparent;
    }

    .body.lucky {
      background: url('@/assets/images/doll-activity/lucky-doll-dialog.webp') center center / cover no-repeat transparent;
    }
  }
}
</style>
