<template>
  <div class="dialog">
    <div class="rule-box">
      <div class="close-btn cursor-pointer" @click="close" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['toggleRule'])
const close = () => {
  emits('toggleRule')
}
</script>

<style lang="scss" scoped>
.dialog {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2002;
  background: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .rule-box {
    position: relative;
    width: 686px;
    height: 618px;
    background: url('@/assets/images/recharge-activity/rule-bg.webp') center
      center / cover no-repeat transparent;
    .close-btn {
      width: 68px;
      height: 68px;
      background: url('@/assets/images/recharge-activity/close-btn.webp') center
        center / cover no-repeat transparent;
      position: absolute;
      right: 0;
      top: -48px;
    }
  }
}
</style>
