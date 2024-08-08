<template>
  <div class="loading-container" v-if="loadingVisible">
    <div class="pet-animation"></div>
    <div class="progress-bar">
      <div class="loaded-bar" :style="{ width: `${loadedRatio}%` }"></div>
    </div>
    <div>正在进入庄园...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, reactive, onMounted } from 'vue';
const loadedRatio = ref(0);
const loadingVisible = ref(true);
const emits = defineEmits(['endLoading']);



onMounted(() => {
  // emits("endLoading",true)
  let timer = setInterval(() => {
    if(loadedRatio.value <= 100){
      loadedRatio.value += 1;
    }else {
      loadingVisible.value= false;
      clearInterval(timer)
      emits("endLoading",false)
    }
  }, 10);
});
</script>

<style lang="scss" scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  overflow: hidden;
  background: #3be4f8;
  display: flex;
  color: #fff;
  font-size: 28px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .pet-animation {
    width: 172px;
    height: 228px;
    background: pink;
    margin-bottom: 30px;
  }
  .progress-bar {
    width: 450px;
    height: 16px;
    flex-shrink: 0;
    border-radius: 29px;
    background: #fff;
    margin-bottom: 30px;
    position: relative;
  }
  .loaded-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 16px;
    border-radius: 29px;
    background: #ffe573;
    transition: all .1s;
  }
}
</style>
