<template>
  <div class="dialog">
    <van-popup v-model:show="dialogVisible" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
    width: 577px;
    height: 546px;
    background: url('@/assets/images/thanks/prize-dialog.webp') center center /
      cover no-repeat transparent;
  }
}
</style>
