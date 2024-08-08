<template>
  <div class="page-wrap">
    <img class="header" src="@/assets/images/520/top.png" alt="">
    <!-- 返回按钮 -->
    <div class="back-wrap" @click="handleBack">
      <img src="@/assets/images/520/btn_back.png" alt="">
    </div>
    <!-- 规则内容 -->
    <div class="rule-wrap">
      <img class="rule" src="@/assets/images/520/rule_text.png" alt="">
    </div>
  </div>
  </template>
<script setup lang="ts">

// 返回上一页
const handleBack = () => {
  const router = useRouter()
  router.back();
}

</script>
<style lang="scss" scoped>
@import './index.scss';
.page-wrap {
  padding-bottom: calc(30px + constant(safe-area-inset-bottom));
  padding-bottom: calc(30px + env(safe-area-inset-bottom));
  background: url('@/assets/images/520/bg_meta.png') center top / 100% 441px repeat, linear-gradient(180deg, #FFC1CE 0%, #FF404C 100%);
}
// 规则内容
.rule-wrap {
  padding: 40px 32px;
  .rule {
    width: 100%;
  }
}
</style>