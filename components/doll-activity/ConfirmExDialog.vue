<template>
  <div id="fukui-dialog">
    <van-popup v-model:show="dialogVisible" @click-overlay="close">
      <div class="body">
        <div class="close-btn" @click="close" />
        <div>是否消耗{{ props.debrisNum }}碎片进行兑换?</div>
        <div class="btn-groups">
          <div class="cancel-btn" @click="close" />
          <div class="confirm-btn" @click="confirmExchange" />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ debrisNum: number, error?: () => void }>()
const emits = defineEmits(['confirm'])
const dialogVisible = ref(false)
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

const confirmExchange = () => {
  emits('confirm')
  close()
}

defineExpose<{ openDialog: (boolean) => void }>({ openDialog })
</script>

<style lang="scss" scoped>
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
    height: 425px !important;
    overflow: visible !important;
    height: auto;
    background: transparent;

    .body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 678px;
      height: 425px;
      background: url('@/assets/images/doll-activity/confirm-exchange-bg.webp')
        center center / cover no-repeat transparent;
      font-size: 28px;
      padding-top: 157px;
      font-weight: 500;
      color: #b04f00;
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
      .btn-groups {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-top: 45px;
        .cancel-btn {
          width: 263px;
          height: 111px;
          background: url('@/assets/images/doll-activity/cancelBtn.webp') center
            center / cover no-repeat transparent;
        }
        .confirm-btn {
          width: 263px;
          height: 111px;
          background: url('@/assets/images/doll-activity/confirmBtn.webp')
            center center / cover no-repeat transparent;
        }
      }
    }
  }
}
</style>
