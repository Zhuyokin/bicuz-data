<template>
  <div class="container-box">
    <!-- 返回按钮 -->
    <div class="back-wrap cursor-pointer" @click="handleBack">
      <img :src="backIcon" alt="">
    </div>
    <!-- 右侧按钮 -->
    <div class="right-btn">
      <div class="record-btn cursor-pointer" @click="showRecord" />
      <div class="rule-btn cursor-pointer" @click="openRule" />
    </div>
    <!-- top-box -->
    <div class="header-top-box">
      <div class="title-text">
        <div class="activity-title" />
        <div class="activity-time" />
      </div>

      <div
        class="top-zong"
        :style="`background:url(${currentTopZong})  center center / cover no-repeat transparent`"
      />
      <div id="wave" class="wave">
        <canvas ref="waveRef" />
      </div>

      <div class="tabBox">
        <div
          v-for="(item, index) in topZongConfig"
          :key="index"
          class="tab-item cursor-pointer"
          :class="[[1, 2].includes(index) ? 'mt30px' : '']"
          :style="`background:url(${item.tab})  center center / cover no-repeat transparent`"
          @click="changeTopTab(index)"
        >
          <div class="zongNum">
            {{ item.num }}
          </div>

          <div v-if="item.active" class="dragon-boat" />
        </div>
      </div>
    </div>
    <!-- 右侧按钮 -->
    <div class="rule-box">
      <div
        v-for="(item, index) in ruleConfig"
        :key="index"
        class="rule-item"
        :style="`background:url(${item.bg})  center center / cover no-repeat transparent`"
      >
        <!-- 去兑换 -->
        <div
          class="exchange-btn cursor-pointer"
          :style="`background:url(${checkBtn})  center center / cover no-repeat transparent`"
          @click="openExchange(index + 2)"
        />
      </div>
    </div>
    <!-- 顶部切换榜单 -->
    <div class="rank-top-box">
      <div
        v-for="(item, index) in rankTopConfig"
        :key="index"
        class="rank-top-item cursor-pointer"
        :style="`background:url(${tabNum == item.id ? item.bg_active : item.bg})  center center / cover no-repeat transparent`"
        @click="changeTab(item.id)"
      />
    </div>

    <div class="rank-list">
      <!-- top-box -->
      <div v-if="rankList.length > 0" class="top-box">
        <!-- 2th -->
        <div class="item-2th rank-top-item cursor-pointer" @click="navTo(rankList[1])">
          <div
            class="avatar-ring"
            :style="`background:url(${tabNum === 1 ? roomRingOther : avatarRingOther})  center center / cover no-repeat transparent`"
          >
            <div
              class="avatar fixCenter"
              :class="[tabNum === 1 ? 'br20' : 'br108']"
              :style="`background:url(${prependHttpIfMissing(tabNum === 1 ? rankList[1]?.room_cover : rankList[1]?.user_face)})  center center / cover no-repeat transparent`"
            />
            <!-- :style="`background:url(${tabNum === 1 ? roomAvatar23 : userAvatar23})  center center / cover no-repeat transparent`" -->
          </div>
          <div class="name-box">
            {{ tabNum == 1 ? rankList[1]?.room_title : rankList[1]?.user_nickname }}
          </div>
          <div v-if="tabNum == 1 && rankList[1]?.is_live == 1" class="open-status">
            狂欢中
          </div>
          <div class="info-box" style="transform: translateY(100px)">
            <div class="info-num">
              {{ rankList[1]?.value }}
            </div>
            <div class="info-unit">
              划行值
            </div>
          </div>
        </div>

        <!-- 1th -->
        <div class="item-1th rank-top-item cursor-pointer" @click="navTo(rankList[0])">
          <div
            class="avatar fixCenter"
            :class="[tabNum === 1 ? 'br20' : 'br164']"
            :style="`background:url(${prependHttpIfMissing(tabNum === 1 ? rankList[0]?.room_cover : rankList[0]?.user_face)})  center center / cover no-repeat transparent`"
          />
          <!-- :style="`background:url(${defaultAvatar1})  center center / cover no-repeat transparent`" -->
          <!-- :style="`background:url(${tabNum === 1 ? roomAvatar1 : userAvatar1})  center center / cover no-repeat transparent`" -->
          <div
            class="avatar-ring"
            :style="`background:url(${tabNum === 1 ? roomRingFirst : avatarRingFirst})  center center / cover no-repeat transparent`"
          />
          <div class="name-box">
            {{ tabNum == 1 ? rankList[0]?.room_title : rankList[0]?.user_nickname }}
          </div>
          <div v-if="tabNum == 1 && rankList[0]?.is_live == 1" class="open-status">
            狂欢中
          </div>
          <div class="info-box" style="transform: translateY(137px)">
            <div class="info-num">
              {{ rankList[0]?.value }}
            </div>
            <div class="info-unit">
              划行值
            </div>
          </div>
        </div>

        <!-- 3th -->
        <div class="item-3th rank-top-item cursor-pointer" @click="navTo(rankList[2])">
          <div
            class="avatar fixCenter"
            :class="[tabNum === 1 ? 'br20' : 'br108']"
            :style="`background:url(${prependHttpIfMissing(tabNum === 1 ? rankList[2]?.room_cover : rankList[2]?.user_face)})  center center / cover no-repeat transparent`"
          />
          <!-- :style="`background:url(${tabNum === 1 ? roomAvatar23 : userAvatar23})  center center / cover no-repeat transparent`" -->
          <div
            class="avatar-ring"
            :style="`background:url(${tabNum === 1 ? roomRingOther : avatarRingOther})  center center / cover no-repeat transparent`"
          />
          <div class="name-box">
            {{ tabNum == 1 ? rankList[2]?.room_title : rankList[2]?.user_nickname }}
          </div>
          <div v-if="tabNum == 1 && rankList[2]?.is_live == 1" class="open-status">
            狂欢中
          </div>
          <div class="info-box" style="transform: translateY(80px)">
            <div class="info-num">
              {{ rankList[2]?.value }}
            </div>
            <div class="info-unit">
              划行值
            </div>
          </div>
        </div>
      </div>
      <!-- list-box -->
      <div class="list-box">
        <div v-for="(item, index) in rankList.slice(3)" :key="index" class="list-box-item">
          <div class="rank-num">
            {{ item.ranking }}
          </div>

          <div
            class="rank-avatar cursor-pointer"
            :class="[tabNum === 1 ? 'br7' : 'br47']"
            :style="`background:url(${prependHttpIfMissing(tabNum === 1 ? item?.room_cover : item?.user_face)})  center center / cover no-repeat transparent`"
            @click="navTo(item)"
          >
            <div v-if="tabNum == 1 && item?.is_live == 1" class="open-status">
              狂欢中
            </div>
          </div>

          <div class="rank-info">
            {{ tabNum === 1 ? item?.room_title : item?.user_nickname }}
          </div>

          <div class="rank-detail">
            <div class="num">
              {{ item?.value }}
            </div>
            <div class="rank-unit">
              划行值
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="my-rank-box">
      <div class="rank-num">
        {{
          tabNum === 1
            ? myInfo?.ranking == '0'
              ? '-'
              : myInfo?.ranking
            : myInfo?.ranking == '0'
              ? '-'
              : myInfo?.ranking
        }}
      </div>

      <div
        class="avatar cursor-pointer"
        :class="[tabNum === 1 ? 'br16' : '']"
        :style="`background:url(${prependHttpIfMissing(tabNum === 1 ? myInfo?.room_cover : myInfo?.user_face)})  center center / cover no-repeat transparent`"
        @click="navTo(myInfo)"
      />

      <div class="right-box">
        <div class="title-info-box">
          <div class="title">
            {{ tabNum === 1 ? myInfo?.room_title : myInfo?.user_nickname }}
          </div>
          <div class="info">
            {{ myInfo?.desc }}
          </div>
        </div>
        <div class="detail">
          <div class="num">
            {{ myInfo?.value }}
          </div>
          <div class="unit">
            划行值
          </div>
        </div>
      </div>
    </div>

    <!-- 获取记录弹窗 -->
    <RecordDialog ref="recordRef" />
    <!-- 兑换弹窗 -->
    <ExchangeDialog ref="exchangeRef" @init-page="initPage" />
    <!-- 规则弹窗 -->
    <RuleDialog ref="ruleRef" />
  </div>
</template>

<script setup lang="ts">
// 导入图片
import { Parser, Player } from 'svga'
import lazyLoading from './lazyLoading'
import ruleBg1 from '@/assets/images/dragon-boat-festival/rule-bg-1.webp'
import ruleBg2 from '@/assets/images/dragon-boat-festival/rule-bg-2.webp'
import ruleBg3 from '@/assets/images/dragon-boat-festival/rule-bg-3.webp'
import rankTopBtn1 from '@/assets/images/dragon-boat-festival/rank-top-btn-1.webp'
import rankTopBtn1Act from '@/assets/images/dragon-boat-festival/rank-top-btn-1-active.webp'
import rankTopBtn2 from '@/assets/images/dragon-boat-festival/rank-top-btn-2.webp'
import rankTopBtn2Act from '@/assets/images/dragon-boat-festival/rank-top-btn-2-active.webp'
import rankTopBtn3 from '@/assets/images/dragon-boat-festival/rank-top-btn-3.webp'
import rankTopBtn3Act from '@/assets/images/dragon-boat-festival/rank-top-btn-3-active.webp'
import checkBtn from '@/assets/images/dragon-boat-festival/check-btn.webp'
import backIcon from '@/assets/images/dragon-boat-festival/back-icon.webp'
import { dragonBoatFestivalApi } from '@/api/index'
import { js_sync_app, prependHttpIfMissing } from '@/utils/index'
import RecordDialog from '@/components/dragon-boat-festival/RecordDialog.vue'
import ExchangeDialog from '@/components/dragon-boat-festival/ExchangeDialog.vue'
import avatarRingFirst from '@/assets/images/dragon-boat-festival/avatar-ring-first.webp'
import avatarRingOther from '@/assets/images/dragon-boat-festival/avatar-ring-other.webp'
import roomRingFirst from '@/assets/images/dragon-boat-festival/room-ring-first.webp'
import roomRingOther from '@/assets/images/dragon-boat-festival/room-ring-other.webp'
import richZongTop from '@/assets/images/dragon-boat-festival/richZongTop.webp'
import luckyZongTop from '@/assets/images/dragon-boat-festival/luckyZongTop.webp'
import eatZongTop from '@/assets/images/dragon-boat-festival/eatZongTop.webp'
import beautyZongTop from '@/assets/images/dragon-boat-festival/beautyZongTop.webp'
import bfzTab from '@/assets/images/dragon-boat-festival/bfz-tab.webp'
import gfzTab from '@/assets/images/dragon-boat-festival/gfz-tab.webp'
import hyzTab from '@/assets/images/dragon-boat-festival/hyz-tab.webp'
import mmzTab from '@/assets/images/dragon-boat-festival/mmz-tab.webp'

import roomAvatar1 from '@/assets/images/dragon-boat-festival/room-avatar-1.png'
import roomAvatar23 from '@/assets/images/dragon-boat-festival/room-avatar-23.png'
import userAvatar1 from '@/assets/images/dragon-boat-festival/user-avatar-1.png'
import userAvatar23 from '@/assets/images/dragon-boat-festival/user-avatar-23.png'
import defaultAvatar1 from '@/assets/images/dragon-boat-festival/default-avatar.jpg'

import RuleDialog from '@/components/dragon-boat-festival/RuleDialog.vue'
import waveSvga from '@/components/pet-cat-farm/RuleDialog.vue'

// import SVGA from 'svgaplayerweb';

const ruleConfig = ref([
  {
    id: 1,
    bg: ruleBg1,
  },
  {
    id: 2,
    bg: ruleBg2,
  },
  {
    id: 3,
    bg: ruleBg3,
  },
])
const rankTopConfig = ref([
  {
    id: 1,
    bg: rankTopBtn1,
    bg_active: rankTopBtn1Act,
  },
  {
    id: 2,
    bg: rankTopBtn2,
    bg_active: rankTopBtn2Act,
  },
  {
    id: 3,
    bg: rankTopBtn3,
    bg_active: rankTopBtn3Act,
  },
])
const topZongConfig = ref([
  {
    id: 1,
    bg: eatZongTop,
    tab: gfzTab,
    key: 'gfz',
    num: 0,
    active: false,
  },
  {
    id: 2,
    bg: beautyZongTop,
    tab: mmzTab,
    key: 'mmz',
    num: 0,
    active: true,
  },
  {
    id: 3,
    bg: luckyZongTop,
    tab: hyzTab,
    key: 'hyz',
    num: 0,
    active: false,
  },
  {
    id: 4,
    bg: richZongTop,
    tab: bfzTab,
    key: 'bfz',
    num: 0,
    active: false,
  },
])

const wavePlayer = reactive(null)
const waveParser = reactive(null)
const waveRef = ref(null)
const tabNum = ref(1)
const myInfo = ref()
const rankList = ref([])
const recordRef = ref<RecordDialog | null>(null)
const exchangeRef = ref<ExchangeDialog | null>(null)
const ruleRef = ref<RuleDialog | null>(null)
const currentTopZong = computed(() => {
  return topZongConfig.value.filter(i => i.active)[0].bg
})

// 开启规则弹窗
const openRule = () => {
  ruleRef?.value.setVisible(true)
}

// 加载入场云动画
const loadWave = async () => {
  // if (wavePlayer) {
  //   wavePlayer.clear();
  //   wavePlayer._videoItem = null;
  //   wavePlayer = null;
  // }
  // const SVGA = await lazyLoading()();
  // wavePlayer = new SVGA.Player('#wave');
  // waveParser = new SVGA.Parser('#wave');
  // // wavePlayer.loops = true;
  // nextTick(() => {
  //   waveParser.load('https://sky-itcast-yujin.oss-cn-beijing.aliyuncs.com/wave.svga', function (videoItem) {
  //     wavePlayer.setVideoItem(videoItem);
  //     wavePlayer.startAnimation();
  //   });
  // });
  const url = 'https://sky-itcast-yujin.oss-cn-beijing.aliyuncs.com/wave.svga'
  const waveParser = new Parser()
  const svga = await waveParser.load(url)
  const wavePlayer = new Player({
    container: waveRef?.value,
    loop: 0,
  })
  await wavePlayer.mount(svga)
  wavePlayer.start()
  nextTick(() => {
    const canvas = waveRef?.value
    const ctx = canvas.getContext('2d')
    // ctx.globalCompositeOperation = 'source-in';
    ctx.globalCompositeOperation = 'destination-over'
    console.log(canvas, ctx, 'canvas===================')
  })
  // cloudPlayer.onEnd = () => {
  // };
}

const changeTab = (id: number) => {
  if (tabNum.value === id)
    return
  tabNum.value = id
  getRank()
}

const changeTopTab = (idx: number) => {
  const currentIdx = topZongConfig.value.findIndex(i => i.active)
  if (currentIdx === idx)
    return
  topZongConfig.value = topZongConfig.value.map((i) => {
    return { ...i, active: false }
  })
  topZongConfig.value[idx].active = true
}

const getRank = async () => {
  let api
  if (tabNum.value == 1)
    api = dragonBoatFestivalApi.getRoomRanking

  if (tabNum.value == 2)
    api = dragonBoatFestivalApi.getReceiveRanking

  if (tabNum.value == 3)
    api = dragonBoatFestivalApi.getSendRanking

  const res = await api().catch((err) => {})
  if (!res)
    return
  console.log('[getRank >]', res)
  rankList.value = res.list
  myInfo.value = res.my
}

const getActInfo = async () => {
  const res = await dragonBoatFestivalApi.getDBFInfo().catch((err) => {})
  if (!res)
    return
  console.log('[getActInfo >]', res)
}

const toUserCenter = (user_id: number) => {
  const params = {
    user_id,
  }
  js_sync_app('js_sync_usermain', params, 'user_id')
}

const toRoom = (room_id: number) => {
  const params = {
    room_id,
  }
  js_sync_app('js_sync_room', params, 'room_id')
}

const navTo = (item: object) => {
  if (tabNum.value === 1) {
    if (item.is_live === 0) {
      showToast('当前房间未开播')
      return
    }
    toRoom(item.room_id)
    return
  }
  toUserCenter(item.user_id)
}

const handleBack = () => {
  js_sync_back()
}

const showRecord = () => {
  recordRef?.value.setVisible(true)
}

const openExchange = (num: number) => {
  exchangeRef?.value.setVisible(true, num)
}

const getData = async () => {
  const res = await dragonBoatFestivalApi.getDBFGiftRecord({ type: 0 }).catch((err) => {
    console.log('[getDBFGiftRecord >]', err)
  })
  if (!res)
    return
  console.log(res, 'getData >')
  const zongData = res.props
  topZongConfig.value = topZongConfig.value.map((item) => {
    return { ...item, ...zongData[item.key] }
  })
}

const initPage = () => {
  getRank()
  getActInfo()
  getData()
  loadWave()
}

// useHandleData(true, () => {
//   initPage()
// })
onMounted(() => {
  initPage()
})
</script>

<style lang="scss" scoped>
@keyframes boatMove {
  0% {
    transform: translateX(-40px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes topZongMove {
  0% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(10px);
  }
}

@font-face {
  font-family: 'numberFont';
  src: url('@/assets/file/dragon-boat-festival/numberFont.ttf')
    format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
.container-box {
  width: 100vw;
  min-height: 100vh;
  background: #bdfae3;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 300px;
  position: relative;
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
  .right-btn {
    position: absolute;
    right: 12px;
    top: 300px;
    z-index: 9;
    .record-btn {
      width: 100px;
      height: 100px;
      background: url('@/assets/images/dragon-boat-festival/record-btn.webp')
        center center / cover no-repeat transparent;
      margin-bottom: 16px;
    }
    .rule-btn {
      width: 100px;
      height: 100px;
      background: url('@/assets/images/dragon-boat-festival/rule-btn.webp')
        center center / cover no-repeat transparent;
    }
  }
  #wave {
    width: 750px !important;
    height: 920px !important;
    margin: 0 auto;
    left: 0;
    position: absolute;
    top: 0px;
  }
  #wave {
    canvas {
      z-index: -1;
      width: 750px !important;
      height: 920px !important;
    }
  }
  .header-top-box {
    width: 750px;
    height: 921px;
    background: url('@/assets/images/dragon-boat-festival/top-bg.webp') center
      center / cover no-repeat transparent;
    .title-text {
      margin: 180px auto 0;
      width: 603px;
      .activity-title {
        width: 603px;
        height: 64px;
        margin-bottom: 12px;
        background: url('@/assets/images/dragon-boat-festival/activity-title.webp')
          center center / cover no-repeat transparent;
      }
      .activity-time {
        width: 443px;
        height: 34px;
        margin: 0 auto;
        background: url('@/assets/images/dragon-boat-festival/activity-time.webp')
          center center / cover no-repeat transparent;
      }
    }
    .top-zong {
      width: 370px;
      height: 375px;
      margin: 105px auto 10px;
      animation-name: topZongMove;
      animation-duration: 1.5s;
      animation-direction: alternate;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      z-index: 9;
      position: relative;
    }

    .tabBox {
      width: 642px;
      margin: 0 auto;
      min-height: 108px;
      display: flex;
      justify-content: space-between;
      z-index: 9;
      position: relative;
      .mt30px {
        margin-top: 20px;
      }
      .tab-item {
        width: 148px;
        height: 78px;
        position: relative;
        .zongNum {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -10px;
          font-size: 20px;
          min-width: 32px;
          height: 32px;
          background: linear-gradient(180deg, #fff 0%, #d4f9f9 100%), #d9d9d9;
          color: #2a9ed5;
          border-radius: 40px;
          text-align: center;
          padding: 0 10px;
        }
        .dragon-boat {
          width: 108px;
          height: 47px;
          background: url('@/assets/images/dragon-boat-festival/dragon-boat.webp')
            center center / cover no-repeat transparent;
          position: absolute;
          top: 48px;
          right: -8px;
          animation-name: boatMove;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-iteration-count: 1;
        }
      }
    }
  }
  .rule-box {
    .rule-item {
      width: 686px;
      height: 133px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 27px;
      .exchange-btn {
        width: 102px;
        height: 102px;
      }
    }
  }
  .rank-top-box {
    display: flex;
    width: 686px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 192px;
    .rank-top-item {
      width: 216px;
      height: 106px;
    }
  }
  .rank-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    .open-status {
      position: absolute;
      right: 0;
      width: 85px;
      height: 25px;
      text-align: center;
      line-height: 25px;
      font-size: 16px;
      background: #ff645a;
      border-radius: 5px;
      color: #fff;
      bottom: 38px;
    }
    .top-box {
      width: 640px;
      height: 336px;
      background: url('@/assets/images/dragon-boat-festival/rank-list-top-bg.webp')
        center center / cover no-repeat transparent;
      display: flex;
      justify-content: space-around;
      .item-1th {
        width: 239px;
        height: 221px;
        margin-top: -168px;
        position: relative;
        display: flex;
        justify-content: center;
        // align-items: center;
        .avatar-ring {
          width: 239px;
          height: 221px;
          // background: url('@/assets/images/dragon-boat-festival/room-ring-first.webp') center center / cover no-repeat
          //   transparent;
          position: absolute;
          // background: pink;
          top: 0;
          left: 0;
        }
        .avatar {
          width: 165px;
          height: 165px;
          // background: skyblue;
          position: absolute;
        }
      }
      .item-2th {
        width: 167px;
        height: 154px;
        margin-top: -46px;
        // background: yellow;
        position: relative;
        .avatar-ring {
          // width: 167px;
          // height: 154px;
          width: 144px;
          height: 144px;
          // background: url('@/assets/images/dragon-boat-festival/room-ring-other.webp') center center / cover no-repeat
          //   transparent;
          position: absolute;
          background: pink;
          top: 0;
          left: 0;
        }
        .avatar {
          width: 108px;
          height: 108px;
          background: skyblue;
          position: absolute;
        }
      }
      .item-3th {
        // width: 167px;
        // height: 154px;
        width: 144px;
        height: 144px;
        // background: skyblue;
        position: relative;
        .avatar-ring {
          // width: 167px;
          // height: 154px;
          width: 144px;
          height: 144px;
          // background: url('@/assets/images/dragon-boat-festival/room-ring-other.webp') center center / cover no-repeat
          //   transparent;
          position: absolute;
          top: 0;
          left: 0;
        }
        .avatar {
          width: 108px;
          height: 108px;
          background: skyblue;
          position: absolute;
        }
      }
      .fixCenter {
        top: 48%;
        left: 52%;
        transform: translate(-50%, -50%);
      }
      // .avatar {
      //   width: 164px;
      //   height: 164px;
      //   border-radius: 20px;
      //   transform: translate(5px, -10px);
      // }
      .rank-top-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .name-box {
        padding: 0 10px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 190px;
        height: 39px;
        font-size: 28px;
        border-radius: 44px;
        background: #ffffff80;
        backdrop-filter: blur(2.4px);
        color: #242424;
        text-align: center;
        line-height: 39px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .info-box {
        text-align: center;
        .info-num {
          font-size: 28px;
          font-weight: bold;
        }
        .info-unit {
          font-size: 24px;
          font-weight: 500;
        }
      }
    }

    .list-box {
      margin-top: -70px;
      .list-box-item {
        width: 686px;
        height: 134px;
        background: url('@/assets/images/dragon-boat-festival/list-item-bg.webp')
          center center / cover no-repeat transparent;
        margin-bottom: 16px;
        font-size: 28px;
        color: #242424;
        font-weight: 500;
        display: flex;
        align-items: center;
        padding: 0 30px 0 35px;
        .rank-num {
          width: 21px;
          height: 36px;
          line-height: 36px;
          font-family: 'numberFont';
          color: #ff483d;
        }
        .rank-avatar {
          width: 90px;
          height: 90px;
          flex-shrink: 0;
          border: 5px solid #ffdd5a;
          margin: 0 22px 0 36px;
          position: relative;
          .open-status {
            bottom: 0;
            right: 50%;
            transform: translateX(50%);
          }
        }
        .br47 {
          border-radius: 47px;
        }
        .br7 {
          border-radius: 7px;
        }
        .rank-info {
          width: 351px;
        }
        .rank-detail {
          .num {
            font-weight: bolder;
          }
          .rank-unit {
            font-size: 24px;
          }
        }
      }
    }
  }

  .my-rank-box {
    width: 750px;
    height: 184px;
    padding: 0 32px;
    position: fixed;
    bottom: 0;
    left: 0;
    background: url('@/assets/images/dragon-boat-festival/my-rank-bg.webp')
      center center / cover no-repeat transparent;
    display: flex;
    align-items: center;
    color: #ff4747;
    .rank-num {
      font-family: 'numberFont';
      color: #ff483d;
      line-height: 36px;
      font-size: 32px;
    }
    .avatar {
      width: 88px;
      height: 88px;
      flex-shrink: 0;
      border-radius: 88px;
      border: 2px solid #ff728d;
      margin: 0 16px 0 28px;
    }
    .br16 {
      border-radius: 16px !important;
    }

    .right-box {
      display: flex;
      justify-content: space-between;
      font-weight: 600;
      width: 510px;
      .title-info-box {
        width: 380px;
        .title {
          width: 370px;
          font-size: 28px;
          margin-bottom: 5px;
        }
        .info {
          font-size: 22px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .detail {
        font-size: 28px;
        margin-left: 50px;
        .num {
          margin-bottom: 5px;
        }
        .unit {
          font-size: 24px;
        }
      }
    }
  }
}

.br20 {
  border-radius: 20px;
}
.br164 {
  border-radius: 164px;
}
.br108 {
  border-radius: 108px;
}

::v-deep(.rulePop) {
  position: fixed;
  top: 50%;
  width: 100vw;
  height: 100vh;
  overflow: initial;
  .van-dialog__content {
    width: 100vw;
    height: 100vh;
    .cancel {
      position: fixed;
      width: 60px;
      height: 60px;
      top: 74px;
      left: 28px;
      z-index: 6;
      background: url('@/assets/images/week-star/anniversary_back.png')
        no-repeat center;
      background-size: 100% 100%;
    }

    .content {
      width: 100vw;
      height: 100vh;
      margin: auto;
      overflow-y: scroll;
      img {
        display: block;
        width: 100vw;
        // height: 4520px;
      }
    }
  }
  // :deep(.van-popup--center){
  //   margin: 0!important
  // }
}
</style>
