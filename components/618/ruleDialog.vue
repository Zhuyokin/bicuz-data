<template>
  <div class="dialog">
    <div class="rule-box">
      <div class="close-btn cursor-pointer" @click="close" />
      <div class="content">
        <img class="rule-img" :src="ruleDetailBg" alt="">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ruleDetailBg from '@/assets/images/618/rule-detail-bg.webp'

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
    height: 824px;
    background: url('@/assets/images/618/rule-bg.webp') center center / cover
      no-repeat transparent;
    .close-btn {
      width: 68px;
      height: 68px;
      background: url('@/assets/images/618/close-btn.webp') center center /
        cover no-repeat transparent;
      position: absolute;
      right: 0;
      top: -48px;
    }
    .content {
      height: 650px;
      margin: 120px auto 0;
      width: 638px;
      overflow: hidden;
      overflow-y: scroll;
      .rule-img {
        display: block;
        width: 638px;
        // height: 2213px;
        background: url('@/assets/images/618/rule-detail-bg.webp') center center /
          cover;
      }
    }
  }
}
</style>
