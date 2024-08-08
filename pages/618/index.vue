<template>
  <div class="container" :class="[ruleVisible ? 'h100vh' : '']">
    <div class="container-box">
      <!-- 返回按钮 -->
      <div class="back-wrap cursor-pointer" @click="handleBack">
        <img :src="backIcon" alt="">
      </div>
      <!-- 说明按钮 -->
      <div class="rule-btn cursor-pointer" @click="toggleRule" />
      <div class="header-bg" />

      <div class="tab-box">
        <div class="tabItem cursor-pointer" :style="`background:url(${topTabIdx === 0 ? tab1Active : tab1InActive})  center center / cover no-repeat transparent`" @click="changeTopTabIdx(0)" />
        <div class="tabItem cursor-pointer" :style="`background:url(${topTabIdx === 1 ? tab2Active : tab2InActive})  center center / cover no-repeat transparent`" @click="changeTopTabIdx(1)" />
        <div class="tabItem cursor-pointer" :style="`background:url(${topTabIdx === 2 ? tab3Active : tab3InActive})  center center / cover no-repeat transparent`" @click="changeTopTabIdx(2)" />
      </div>

      <div v-if="topTabIdx === 0" class="tab1Bg">
        <div class="gift-box">
          <div v-for="(item, index) in actInfo?.gift_list" :key="index" class="gift-item">
            <div class="gift">
              <div class="gift-img" :style="`background:url(${prependHttpIfMissing(item.gift_photo)})  center center / cover no-repeat transparent`" />
            </div>
            <div class="gift-name">
              {{ item.gift_name }}
            </div>
            <div class="gift-price">
              {{ item.gift_diamond }}米粒
            </div>
          </div>
        </div>

        <div class="top-rule-bg" />

        <div class="hotTabBox">
          <div class="tabItem cursor-pointer" :style="`background:url(${hotTabIdx === 0 ? hotTab1Active : hotTab1InActive})  center center / cover no-repeat transparent`" @click="changeHotTabIdx(0)" />
          <div class="tabItem cursor-pointer" :style="`background:url(${hotTabIdx === 1 ? hotTab2Active : hotTab2InActive})  center center / cover no-repeat transparent`" @click="changeHotTabIdx(1)" />
        </div>

        <div class="rankList">
          <div class="top-box" :style="`background:url(${topBoxBg})  center center / cover no-repeat transparent`">
            <div v-for="(item, index) in topList" :key="index" class="top-item cursor-pointer" @click="toUserCenter(item.user_id)">
              <div class="avatar-box" :style="`background:url(${prependHttpIfMissing(item?.user_face)})  center center / cover no-repeat transparent`" />
              <div class="name">
                {{ item?.user_nickname }}
              </div>
              <div class="num">
                {{ item?.value }}
              </div>
              <div v-if="item?.value" class="unit">
                {{ hotTabIdx === 0 ? '热销值' : '实力值' }}
              </div>
            </div>
          </div>
          <div class="rank-box">
            <div v-for="(item, index) in bottomList" :key="index" class="rank-item">
              <div class="rank-num">
                {{ item?.user_ranking }}
              </div>
              <div class="rank-avatar cursor-pointer" :style="`background:url(${prependHttpIfMissing(item?.user_face)})  center center / cover no-repeat transparent`" @click="toUserCenter(item.user_id)" />
              <div class="rank-name">
                {{ item?.user_nickname }}
              </div>
              <div class="rank-data">
                <div class="data">
                  {{ item?.value }}
                </div>
                <div class="unit">
                  {{ hotTabIdx === 0 ? '热销值' : '实力值' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="my-box">
          <div class="rank-num">
            {{ myInfo.user_ranking > 0 ? myInfo.user_ranking : "-" }}
          </div>
          <div class="avatar cursor-pointer" :style="`background:url(${prependHttpIfMissing(myInfo.user_face)})  center center / cover no-repeat transparent`" @click="toUserCenter(myInfo.user_id)" />
          <div class="myInfo">
            <div class="name">
              {{ myInfo.user_nickname }}
            </div>
            <div class="desc">
              {{ myInfo.desc }}
            </div>
          </div>
          <div class="data">
            <div class="num">
              {{ myInfo.value }}
            </div>
            <div class="unit">
              {{ hotTabIdx === 0 ? "热销值" : "实力值" }}
            </div>
          </div>
        </div>
      </div>
      <!-- 靓号背景 -->
      <div v-if="topTabIdx === 1" class="tab2Bg">
        <div id="num-gift-box">
          <canvas id="canvas1" />
        </div>
        <div class="beauty-num-btn see-btn cursor-pointer" @click="toBeautyNumStore" />
      </div>
      <!-- 装扮背景 -->
      <div v-if="topTabIdx === 2" class="tab3Bg">
        <div id="popular-gift-box">
          <canvas id="canvas2" />
        </div>
        <div class="dress-btn see-btn cursor-pointer" @click="toDressStore" />
      </div>

      <!-- 规则弹窗 -->
      <ruleDialog v-if="ruleVisible" @toggle-rule="toggleRule" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Parser, Player } from 'svga'
import tab1Active from '@/assets/images/618/tab1-active.webp'
import tab1InActive from '@/assets/images/618/tab1-in-active.webp'
import tab2Active from '@/assets/images/618/tab2-active.webp'
import tab2InActive from '@/assets/images/618/tab2-in-active.webp'
import tab3Active from '@/assets/images/618/tab3-active.webp'
import tab3InActive from '@/assets/images/618/tab3-in-active.webp'
import hotTab1Active from '@/assets/images/618/hot-tab1-active.webp'
import hotTab1InActive from '@/assets/images/618/hot-tab1-in-active.webp'
import hotTab2Active from '@/assets/images/618/hot-tab2-active.webp'
import hotTab2InActive from '@/assets/images/618/hot-tab2-in-active.webp'
import topBoxBg from '@/assets/images/618/top-box-bg.webp'
import backIcon from '@/assets/images/618/back-icon.webp'
import dressBg from '@/assets/images/618/dress-bg.webp'
import beautyNumBg from '@/assets/images/618/beauty-num-bg.webp'
import beautyNumSvga from '@/assets/images/618/beauty-num.svga?url'
import popularSvga from '@/assets/images/618/dress-store.svga?url'
import ruleDialog from '@/components/618/ruleDialog.vue'
import { soeApi } from '@/api/index'
import { prependHttpIfMissing } from '@/utils/index'

const topTabIdx = ref(0)
const hotTabIdx = ref(0)
const ruleVisible = ref(false)
const actInfo = ref({})
const consumeList = ref([])
const popularList = ref([])
const myInfo = ref({})
const topList = computed(() => {
  let list = hotTabIdx.value === 0 ? consumeList.value.slice(0, 3) : popularList.value.slice(0, 3)
  list = [list[1], list[0], list[2]]
  return list
})
const bottomList = computed(() => {
  const list = hotTabIdx.value === 0 ? consumeList.value.slice(3) : popularList.value.slice(3)
  return list
})
const numPlayer = ref(null)
const numParse = ref(null)
const popularPlayer = ref(null)
const popularParse = ref(null)

const handleBack = () => {
  js_sync_back()
}

const toBeautyNumStore = () => {
  js_sync_app('js_sync_beauty_num_store', { type: 'beauty_num_store' }, 'type')
}

const toDressStore = () => {
  js_sync_app('js_sync_dress_store', { type: 'dress_store' }, 'type')
}

const loadNumSvg = async () => {
  if (numPlayer.value && numPlayer.value) {
    numPlayer.value.clear()
    numParse.value?.destroy()
    numPlayer.value?.destroy()
  }
  numParse.value = new Parser()
  const svga = await numParse.value.load(beautyNumSvga)
  // const svga = await numParse.value.load("@/assets/images/618/beauty-num.svga")

  numPlayer.value = new Player({
    container: document.getElementById('canvas1'),
    loopStartFrame: 31,
  })
  await numPlayer.value.mount(svga)
  numPlayer.value.start()
}

const loadPopularSvg = async () => {
  if (popularPlayer.value && popularPlayer.value) {
    popularPlayer.value.clear()
    popularParse.value?.destroy()
    popularPlayer.value?.destroy()
  }
  popularParse.value = new Parser()
  const svga = await popularParse.value.load(popularSvga)

  popularPlayer.value = new Player({
    container: document.getElementById('canvas2'),
    loopStartFrame: 31,
  })
  await popularPlayer.value.mount(svga)
  popularPlayer.value.start()
}

const changeTopTabIdx = (idx: number) => {
  if (idx === topTabIdx.value)
    return
  topTabIdx.value = idx
  if (idx === 1)
    loadNumSvg()
  if (idx === 2)
    loadPopularSvg()
}

const getConsumeRank = async () => {
  const res = await soeApi.get618PopularityRanking().catch((err) => {})
  console.log(res)
  consumeList.value = res.list.map((i) => {
    return { ...i, value: i.value > 10000 ? `${(Number.parseInt((i.value / 10000) * 100) / 100).toFixed(2)}w` : i.value }
  })
  if (res.my > 10000)
    res.my.value = `${(Number.parseInt((res.my.value / 10000) * 100) / 100).toFixed(2)}w`
  myInfo.value = res.my
}

const getPopularRank = async () => {
  const res = await soeApi.get618ConsumeRanking().catch((err) => {})
  popularList.value = res.list.map((i) => {
    return { ...i, value: i.value > 10000 ? `${(Number.parseInt((i.value / 10000) * 100) / 100).toFixed(2)}w` : i.value }
  })
  if (res.my > 10000)
    res.my.value = `${(Number.parseInt((res.my.value / 10000) * 100) / 100).toFixed(2)}w`
  myInfo.value = res.my
}

const changeHotTabIdx = (idx: number) => {
  if (idx === hotTabIdx.value)
    return
  hotTabIdx.value = idx
  if (idx === 0)
    getConsumeRank()

  if (idx === 1)
    getPopularRank()
}

const toggleRule = () => {
  ruleVisible.value = !ruleVisible.value
  console.log(ruleVisible.value)
}

const getActInfo = async () => {
  const res = await soeApi.get618ActivityInfo().catch((err) => {})
  actInfo.value = res
}

const toUserCenter = (user_id: number) => {
  const params = {
    user_id,
  }
  js_sync_app('js_sync_usermain', params, 'user_id')
}

onMounted(() => {
  getActInfo()
  getConsumeRank()
})
</script>

<style lang="scss" scoped>
.h100vh {
  height: 100vh !important;
  max-height: 100vh !important;
  overflow: hidden;
}
.container-box {
  width: 100vw;
  min-height: 100vh;
  background: #ffeee4;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 200px;
  position: relative;
  .back-wrap {
    width: 64px;
    height: 64px;
    position: absolute;
    top: 103px;
    left: 37px;
    z-index: 9;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .rule-btn {
    width: 110px;
    height: 64px;
    position: absolute;
    top: 103px;
    right: 24px;
    background: url('@/assets/images/618/rule-btn.webp') center center / cover
      no-repeat transparent;
  }
  .header-bg {
    width: 100vw;
    height: 750px;
    background: url('@/assets/images/618/header-bg.webp') center center / cover
      no-repeat transparent;
  }
  .tab-box {
    width: 100vw;
    padding: 0 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 34px;
    .tabItem {
      width: 208px;
      height: 76px;
      background: url('@/assets/images/618/header-bg.webp') center center /
        cover no-repeat transparent;
    }
  }
  .tab1Bg {
    .gift-box {
      width: 100vw;
      padding: 0 82px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 38px;
      .gift-item {
        color: #9a5313;
        font-size: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 14px;
        .gift {
          width: 156px;
          height: 181px;
          background: url('@/assets/images/618/gift-item-bg.webp') center center /
            cover no-repeat transparent;
          padding: 12px 0;
          margin-bottom: 19px;
          .gift-img {
            width: 154px;
            height: 154px;
          }
        }
        .gift-name {
          margin-bottom: 11px;
          font-weight: 600;
        }
        .gift-price {
          font-weight: 600;
        }
      }
    }
    .top-rule-bg {
      width: 686px;
      height: 347px;
      background: url('@/assets/images/618/top-rule-bg.webp') center center /
        cover no-repeat transparent;
      margin: 0 auto 30px;
    }
    .hotTabBox {
      width: 100vw;
      padding: 0 85px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 27px;
      .tabItem {
        width: 278px;
        height: 102px;
      }
    }
    .rankList {
      display: flex;
      flex-direction: column;
      align-items: center;
      .top-box {
        width: 626px;
        height: 449px;
        margin-bottom: 52px;
        display: flex;
        padding: 0 43px;
        display: flex;
        justify-content: space-between;
        .top-item {
          width: 140px;
          margin-top: 155px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .avatar-box {
            width: 124px;
            height: 124px;
            border-radius: 124px;
            margin-bottom: 16px;
          }
          .name {
            margin-bottom: 32px;
            width: 124px;
            font-size: 28px;
            color: #9a5313;
            font-weight: 600;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
          }
          .num {
            color: #242424;
            font-weight: bolder;
            font-size: 36px;
          }
          .unit {
            font-size: 24px;
            color: #242424;
          }
        }
        .top-item:nth-child(2) {
          margin: 72px 0 0;
        }
        .top-item:nth-child(1) {
          margin-left: -0px;
        }
        .top-item:nth-child(3) {
          transform: translateX(10px);
        }
      }
      .rank-box {
        .rank-item {
          display: flex;
          align-items: center;
          width: 626px;
          height: 135px;
          color: #9a5313;
          font-weight: 500;
          font-size: 28px;
          border-bottom: 1px solid rgba(154, 83, 19, 0.3);
          .rank-num {
            width: 17px;
            height: 36px;
            font-weight: bold;
          }
          .rank-avatar {
            width: 87px;
            height: 87px;
            border-radius: 87px;
            margin: 0 26px 0 63px;
          }
          .rank-name {
            font-weight: bold;
            width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .rank-data {
            color: #242424;
            .data {
              font-size: 36px;
              font-weight: bolder;
            }
            .unit {
              font-size: 24px;
            }
          }
        }
      }
    }
    .my-box {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100vw;
      height: 160px;
      background: url('@/assets/images/618/my-box-bg.webp') center center /
        cover no-repeat transparent;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30px 32px;
      .rank-num {
        font-size: 32px;
        color: #9a5313;
      }
      .avatar {
        width: 88px;
        height: 88px;
        border-radius: 88px;
        margin: 0 16px;
      }
      .myInfo {
        color: #9a5313;
        width: 390px;
        font-weight: 600;
        .name {
          font-size: 28px;
          margin-bottom: 12px;
        }
        .desc {
          font-size: 22px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .data {
        font-weight: 600;
        color: #242424;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .num {
          font-size: 36px;
        }
        .unit {
          font-size: 24px;
        }
      }
    }
  }
  .tab2Bg {
    width: 686px;
    height: 1713px;
    background: url('@/assets/images/618/beauty-num-bg.webp') center center /
      cover no-repeat transparent;
    .beauty-num-btn {
      background: url('@/assets/images/618/to-see-btn.webp') center center /
        cover no-repeat transparent;
    }
    #num-gift-box {
      width: 622px;
      height: 368px;
      margin: 200px auto 0;
      border-radius: 37px;
      background: url('@/assets/images/618/canvas-box.png') center center /
        cover no-repeat transparent;
      canvas {
        width: 100% !important;
        height: 100% !important;
      }
    }
  }
  .tab3Bg {
    width: 686px;
    height: 1581px;
    background: url('@/assets/images/618/dress-bg.webp') center center / cover
      no-repeat transparent;
    .dress-btn {
      background: url('@/assets/images/618/to-see-btn.webp') center center /
        cover no-repeat transparent;
    }
    #popular-gift-box {
      width: 622px;
      height: 368px;
      margin: 200px auto 0;
      border-radius: 37px;
      background: url('@/assets/images/618/canvas-box.png') center center /
        cover no-repeat transparent;
      canvas {
        width: 100% !important;
        height: 100% !important;
      }
    }
  }
}

.see-btn {
  width: 136px;
  height: 64px;
  bottom: 250px;
  position: fixed;
  right: 31px;
}
</style>
