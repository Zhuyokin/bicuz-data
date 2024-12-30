<template>
  <div class="home container-box py-5">
    <div>
      <header>
        <a id="site-logo" href="#">Bicuz币库网</a>
      </header>
    </div>
    <van-watermark
      content="bicuz.com"
      z-index="1"
      opacity="0.4"
    />
    <Market v-if="active === 'market'" />
    <News v-if="active === 'news'" />
    <!-- 返回顶部 -->
    <van-back-top right="10vw" bottom="10vh" />
    <van-tabbar v-model="active">
      <van-tabbar-item name="market" icon="chart-trending-o">
        行情
      </van-tabbar-item>
      <van-tabbar-item name="news" icon="newspaper-o">
        7*24快讯
      </van-tabbar-item>
      <!-- <van-tabbar-item name="friends" icon="friends-o">
        标签
      </van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o">
        我的
      </van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import Market from '~/components/home/Market.vue'
import News from '~/components/home/News.vue'

const active = ref('market')
</script>

<style lang="scss" scoped>
@import './home.scss';
.home {
  background: #edeff8;
  width: 100vw;
  // height: 100vh;
}

header #site-logo {
  font-weight: 600;
  font-size: 52px;
  padding: 16px;
  background: var(
    --18-promo-gradient-02,
    linear-gradient(90deg, #00bce5 0%, #2962ff 100%)
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
</style>
