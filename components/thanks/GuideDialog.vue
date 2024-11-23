<template>
  <div class="dialog">
    <van-popup v-model:show="dialogVisible">
      <!-- <div class="close cursor-pointer" @click="setVisible(false)" /> -->
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits(['initPage'])
const dialogVisible = ref(false)
const setVisible = (bool: boolean) => {
  dialogVisible.value = bool
}

defineExpose<{ setVisible: (bool: boolean) => void }>({ setVisible })
</script>

<style lang="scss" scoped>
.dialog {
  :deep(.van-popup) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 !important;
    overflow: visible !important;
    width: 578px;
    height: 696px;
    background: url('@/assets/images/thanks/guide-dialog.webp') center center /
      cover no-repeat transparent;
    border-radius: 40px;
    // .close {
    //   position: absolute;
    //   top: 12px;
    //   right: 16px;
    //   width: 35px;
    //   height: 35px;
    //   background: url('@/assets/images/common/close-btn.png') center center /
    //     cover no-repeat transparent;
    //   z-index: 999;
    // }
  }
}
</style>
