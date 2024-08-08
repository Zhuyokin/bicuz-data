<template>
  <div class="rule-dialog">
    <van-dialog class="rulePop" v-model:show="show" :showConfirmButton="false" :showCancelButton="false">
      <div class="content">
        <img src="@/assets/images/week-star/webp/rule_img_4.webp" />
      </div>
      <div class="cancel" @click="setVisible(false)"></div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let show = ref(false);
const setVisible = (bool: boolean) => {
  show.value = bool;
};

defineExpose<{ setVisible: (bool: boolean) => void }>({ setVisible });
</script>

<style lang="scss" scoped>
.rule-dialog {
  // padding-bottom: calc(30px + constant(safe-area-inset-bottom));
  // padding-bottom: calc(30px + env(safe-area-inset-bottom));
  // padding-bottom: calc(160px + constant(safe-area-inset-bottom));
  // padding-bottom: calc(160px + env(safe-area-inset-bottom));
  :deep(.van-popup--center) {
    margin: 0 !important;
  }
}

</style>
