<template>
  <div id="surprise-dialog">
    <van-popup v-model:show="dialogVisible" @click-overlay="close">
      <div class="body">
        <div class="close-btn" @click="close" />
        <div class="top-txt">
          玩家每抓取娃娃1次，即可增加相应奖池进度值1点:最后一位将惊喜值加满至100%的用户,必得专属奖励“浪漫摩天轮”，同时进度值清零
          注:每个奖池的惊喜娃娃进度独立计算.
        </div>
        <div class="gift-box">
          <div class="gift-pic" />
          <div class="gift-name">
            浪漫摩天轮
          </div>
          <div class="gift-price">
            10000钻石
          </div>
        </div>
        <div class="clown-l" />
        <div class="clown-r" />
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialogVisible = ref(false)
const setVisible = (bool) => {
  dialogVisible.value = bool
}
const openDialog = () => {
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
    height: 736px !important;
    overflow: visible !important;
    height: auto;
    background: transparent;

    .body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 678px;
      height: 736px;
      background: url('@/assets/images/doll-activity/surprise-doll-bg.webp')
        center center / cover no-repeat transparent;
      font-size: 28px;
      padding-top: 130px;
      color: #b04f00;
      font-weight: 600;
      position: relative;
      .close-btn {
        width: 68px;
        height: 63px;
        background: url('@/assets/images/doll-activity/close-icon.webp') center
          center / cover no-repeat transparent;
        position: absolute;
        right: 0;
        top: 0;
      }
      .top-txt {
        line-height: 44px;
        width: 565px;
        height: 220px;
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
      .clown-l {
        width: 170px;
        height: 170px;
        position: absolute;
        left: 0;
        bottom: 0;
        background: url('@/assets/images/doll-activity/surprise-doll-l.webp')
          center center / cover no-repeat transparent;
      }
      .clown-r {
        width: 170px;
        height: 170px;
        position: absolute;
        right: 0px;
        bottom: 0;
        background: url('@/assets/images/doll-activity/surprise-doll-r.webp')
          center center / cover no-repeat transparent;
      }
    }
  }
}
</style>
