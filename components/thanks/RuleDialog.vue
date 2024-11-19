<template>
  <div class="rule-dialog">
    <van-dialog v-model:show="show" class="rulePop" :show-confirm-button="false" :show-cancel-button="false">
      <div class="content">
        <img src="@/assets/images/thanks/rule-bg.png">
      </div>
      <div class="cancel cursor-pointer" @click="setVisible(false)" />
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const setVisible = (bool: boolean) => {
  show.value = bool
}

defineExpose<{ setVisible: (bool: boolean) => void }>({ setVisible })
</script>

<style lang="scss" scoped>
.rule-dialog {
  :deep(.van-popup--center) {
    margin: 0 !important;
  }
  :deep(.van-dialog) {
    background: transparent !important;
  }
  ::v-deep(.rulePop) {
    position: fixed;
    top: 50%;
    width: 100vw !important;
    height: 100vh;
    overflow: initial;

    .van-dialog__content {
      width: 100vw;
      height: 100vh;

      .cancel {
        position: fixed;
        width: 60px;
        height: 60px;
        top: 74px;
        left: 28px;
        z-index: 6;
        background: url('@/assets/images/common/back-icon.webp') no-repeat
          center;
        background-size: 100% 100%;
      }

      .content {
        width: 100vw;
        height: 100vh;
        margin: auto;
        overflow-y: scroll;

        img {
          display: block;
          width: 100vw;
          // height: 4520px;
        }
      }
    }
  }
}
</style>
