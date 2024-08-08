<template>
  <div class="rule-dialog">
    <van-dialog v-model:show="show" class="rulePop" :show-confirm-button="false" :show-cancel-button="false">
      <div class="content">
        <img src="@/assets/images/dragon-boat-festival/rule_bg.png">
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
}
</style>
