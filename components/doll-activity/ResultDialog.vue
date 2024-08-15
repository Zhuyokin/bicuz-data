<template>
  <div id="fukui-dialog">
    <van-popup v-model:show="dialogVisible" @click-overlay="close">
      <div class="body">
        <div class="close-btn" @click="close" />
        <div class="ret-box">
          <div class="ret-item" v-for="i in 9" :key="i">
            <div class="gift-pic"></div>
            <div class="gift-name">礼物名字x1天</div>
            <div class="gift-price">价值600钻</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialogVisible = ref(true)
const setVisible = (bool) => {
  dialogVisible.value = bool
}
const openDialog = (tool) => {
  console.log(tool)
  dialogVisible.value = true
}

const close = () => {
  setVisible(false)
}

defineExpose<{ openDialog: (boolean) => void }>({ openDialog })
</script>

<style lang="scss" scoped>
@keyframes scale {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.9);
  }
}
// animation: scale1 1.5s linear 0s infinite;
#fukui-dialog {
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
    height: 829px !important;
    overflow: visible !important;
    height: auto;
    background: transparent;

    .body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 678px;
      height: 829px;
      background: url('@/assets/images/doll-activity/result-dialog.webp') center center /
        cover no-repeat transparent;
      font-size: 28px;
      padding-top: 110px;
      position: relative;
      .close-btn {
        width: 68px;
        height: 63px;
        background: url('@/assets/images/doll-activity/close-icon.webp') center
          center / cover no-repeat transparent;
        position: absolute;
        right: 0;
        top: 20px;
      }
      .ret-box {
        width: 560px;
        min-height: 207px;
        background-color: pink;
        display: flex;
        flex-wrap: wrap;
        .ret-item {
          color: #B04F00;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-weight: 500;
          margin-right: 28px;
          margin-bottom: 15px;
          .gift-pic {
            width: 168px;
            height: 131px;
            background-color: #FFD399;
            border-radius: 24px;
            margin-bottom: 5px;
          }
          .gift-name {
            font-size: 22px;
            margin-bottom: 5px;
          }
          .gift-price {
            font-size: 20px;
          }
        }
        .ret-item:nth-child(3n+3) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
