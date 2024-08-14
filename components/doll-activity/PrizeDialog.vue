<template>
  <div id="fukui-dialog">
    <van-popup v-model:show="dialogVisible" @click-overlay="close">
      <div class="body" />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
    width: 684px !important;
    height: 683px !important;
    overflow: visible !important;
    height: auto;
    background: transparent;

    .body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 684px;
      height: 683px;
      background: url('@/assets/images/doll-activity/surprise-doll-bg.webp') center center /
        cover no-repeat transparent;
      font-size: 28px;
      padding-top: 260px;
    }
  }
}
</style>
