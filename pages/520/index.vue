<template>
  <div class="page-wrap">
    <img class="header" src="@/assets/images/520/top.png" alt="">
    <!-- 返回按钮 -->
    <div class="back-wrap" @click="handleBack">
      <img src="@/assets/images/520/btn_back.png" alt="">
    </div>
    <!-- 规则按钮 -->
    <div class="rule-button-wrap">
      <img class="rule" src="@/assets/images/520/btn_explain.png" alt="" @click="handleRule">
    </div>
    <!-- 活动时间 -->
    <div class="time-wrap">
      活动时间：2024.5.17 15:00 - 2024.5.23 23:59:59
    </div>
    <!-- 礼物列表 -->
    <div class="gift-list">
      <div class="gift-item" v-for="item in giftList" :key="item.id">
        <div class="gift-img">
          <img :src="prependHttpIfMissing(item.gift_photo)" alt="">
        </div>
        <div class="gift-name">{{ item.gift_name }}</div>
        <div class="gift-price">{{ item.gift_diamond }}米粒</div>
      </div>
    </div>
    <!-- 排行榜 -->
    <div v-if="rankingList.length" class="rank-list">
      <div class="rank-item" :class="{ 'top-rank-wrap': item.ranking === 1 }" v-for="(item, index) in rankingList" :key="item.id">
        <template v-if="item.ranking === 1">
          <!-- 第一名 -->
          <div class="avatar-group">
            <div class="avatar-wrap" @click="handleUser(item.user_id)">
              <img class="avatar-img" :src="prependHttpIfMissing(item.user_face)" alt="">
              <img class="avatar-border" src="@/assets/images/520/border_top1.png" alt="">
            </div>
            <div class="avatar-wrap" @click="handleUser(item.live_user_id)">
              <img class="avatar-img" :src="prependHttpIfMissing(item.live_user_face)" alt="">
              <img class="avatar-border" src="@/assets/images/520/border_top1.png" alt="">
            </div>
            <img class="avatar-mid" src="@/assets/images/520/loving.png" alt="">
          </div>
          <div class="rank-footer-wrap">
            <div class="rank-nickname van-ellipsis">{{ item.user_nickname }}</div>
            <div class="rank-score-wrap">
              <div class="score-unit">甜蜜值</div>
              <div class="rank-score">{{ item.value }}</div>
            </div>
            <div class="rank-nickname van-ellipsis">{{ item.live_user_nickname }}</div>
          </div>
        </template>
        <template v-else>
          <div class="rank-num">
            <img v-if="item.ranking === 2" src="@/assets/images/520/index_top2.png" alt="">
            <img v-else-if="item.ranking === 3" src="@/assets/images/520/index_top3.png" alt="">
            <template v-else>
              {{ item.ranking }}
            </template>
          </div>
          <div class="avatar-group">
            <div class="avatar-wrap mr-10px" :class="{ 'avatar-larger': [2,3].includes(item.ranking) }" @click="handleUser(item.user_id)">
              <img class="avatar-img" :src="prependHttpIfMissing(item.user_face)" alt="">
              <img v-if="item.ranking === 2" class="avatar-border" src="@/assets/images/520/border_top2.png" alt="">
              <img v-else-if="item.ranking === 3" class="avatar-border" src="@/assets/images/520/border_top3.png" alt="">
              <img v-else class="avatar-border" src="@/assets/images/520/border_common.png" alt="">
            </div>
            <div class="avatar-wrap" :class="{ 'avatar-larger': [2,3].includes(item.ranking) }" @click="handleUser(item.live_user_id)">
              <img class="avatar-img" :src="prependHttpIfMissing(item.live_user_face)" alt="">
              <img v-if="item.ranking === 2" class="avatar-border" src="@/assets/images/520/border_top2.png" alt="">
              <img v-else-if="item.ranking === 3" class="avatar-border" src="@/assets/images/520/border_top3.png" alt="">
              <img v-else class="avatar-border" src="@/assets/images/520/border_common.png" alt="">
            </div>
            <img class="avatar-mid" src="@/assets/images/520/loving.png" alt="">
          </div>
          <div class="rank-info-wrap">
            <div class="van-ellipsis">{{ item.user_nickname }}</div>
            <div class="van-ellipsis">{{ item.live_user_nickname }}</div>
          </div>
          <div class="rank-score-wrap">
            <div class="rank-score">{{ item.value }}</div>
            <div class="score-unit">甜蜜值</div>
          </div>
        </template>
      </div>
    </div>
    <div v-else class="empty-tips">暂时还没人参加活动～</div>
    <!-- 我的排名 -->
    <div class="my-rank-wrap">
      <div class="rank-item van-safe-area-bottom">
        <div class="rank-num">{{ info.ranking || '-' }}</div>
          <div class="avatar-group">
            <div class="avatar-wrap mr-10px" @click="handleUser(info.user_id)">
              <img class="avatar-img" :src="prependHttpIfMissing(info.user_face)" alt="">
              <img class="avatar-border" src="@/assets/images/520/border_common.png" alt="">
            </div>
            <div v-if="info.ranking" class="avatar-wrap" @click="handleUser(info.live_user_id)">
              <img class="avatar-img" :src="prependHttpIfMissing(info.live_user_face)" alt="">
              <img class="avatar-border" src="@/assets/images/520/border_common.png" alt="">
            </div>
            <img v-if="info.ranking" class="avatar-mid" src="@/assets/images/520/loving.png" alt="">
          </div>
          <div class="rank-info-wrap">
            <div class="van-ellipsis">{{ info.user_nickname }}</div>
            <div class="van-ellipsis">{{ info.ranking > 1 ? info.live_user_nickname : info.desc }}</div>
          </div>
          <div class="rank-score-wrap">
            <div class="rank-score">{{ info.value || '--' }}</div>
            <div class="score-unit">{{ info.ranking > 1 ? info.desc : '甜蜜值' }}</div>
          </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { activityApi } from '@/api'
import type { Activity } from '@/api/interface/index'
import { useUserStore } from '@/store'

const giftList = ref<Activity.GiftItem[]>([]);
const rankingList = ref<Activity.RankingItem[]>([]);
const info = ref<Activity.RankingItem>({});
const userStore = useUserStore()
// 接口请求次数
const count = ref(10);
const isFirstInfo = ref(true);
const isFirstRanking = ref(true);

const handleBack = () => {
  js_sync_back();
}

// 获取活动信息
const getInfo = async () => {
  const res = await activityApi.getInfo().catch((err) => {
    console.log('[ err ] >', err)
    if(err.code === 2801 && isFirstInfo.value) {
      isFirstInfo.value = false;
      setTimeout(() => getInfo(), 1000)
    }
  })
  console.log('[ res ] >', res)
  if (!res) return
  giftList.value = res.gift_list
}

// 获取活动排行榜
const getRanking = async () => {
  const res = await activityApi.getRanking().catch((err) => {
    console.log('[ err ] >', err)
    if(err.code === 2801 && isFirstRanking.value) {
      isFirstRanking.value = false;
      setTimeout(() => getRanking(), 1000)
    }
  })
  console.log('[ res ] >', res)
  if (!res) return
  rankingList.value = res.list;
  info.value = res.my;
}

// 显示规则弹窗
const handleRule = () => {
  const router = useRouter()
  router.push({ path: '/520/rule', query: { isHead: 0 } })
}

// 跳转用户主页
const handleUser = (id: number) => {
  js_sync_app("js_sync_usermain", { user_id: id }, "user_id");
}

// 初始化数据
const initData = () => {
  getInfo();
  getRanking();
}

onMounted(() => {
  console.log('[ 页面挂载 ] >')
  initData();
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
