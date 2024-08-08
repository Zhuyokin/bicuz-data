<template>
  <div class="container-box" :style="`background:url(${posterBg})  center center / cover no-repeat transparent`">
    <!-- 返回按钮 -->
    <div class="back-wrap cursor-pointer" @click="handleBack">
      <img :src="backIcon" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
import posterBg from '@/assets/images/poster/singer-act-poster.png'
import backIcon from '@/assets/images/dragon-boat-festival/back-icon.webp'

const handleBack = () => {
  js_sync_back()
}
</script>

<style lang="scss" scoped>
.container-box {
  width: 100vw;
  height: 6185px;
  overflow: scroll;
}
.back-wrap {
  width: 64px;
  height: 64px;
  position: fixed;
  top: 83px;
  left: 37px;
  z-index: 9;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
