<template>
  <div class="container" :class="[ruleVisible ? 'h100vh' : '']">
    <div class="container-box">
      <!-- 返回按钮 -->
      <div class="back-wrap cursor-pointer" @click="handleBack">
        <img :src="backIcon" alt="">
      </div>
      <!-- 说明按钮 -->
      <div v-if="hotTabIdx === 0" class="rule-btn cursor-pointer" @click="toggleRule" />
      <div class="header-bg" />

      <div class="hotTabBox">
        <div class="tabItem cursor-pointer" :style="`background:url(${hotTabIdx === 0 ? hotTab1Active : hotTab1InActive})  center center / cover no-repeat transparent`" @click="changeHotTabIdx(0)" />
        <div class="tabItem cursor-pointer" :style="`background:url(${hotTabIdx === 1 ? hotTab2Active : hotTab2InActive})  center center / cover no-repeat transparent`" @click="changeHotTabIdx(1)" />
      </div>
      <!-- 礼物冠名争夺战 -->
      <div v-if="hotTabIdx === 0" class="tab1Bg">
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

        <div class="rankList">
          <div class="top-box" :style="`background:url(${topRankBg})  center center / cover no-repeat transparent`">
            <div v-for="(item, index) in topList" :key="index" class="top-item cursor-pointer" @click="toUserCenter(item.user_id)">
              <div class="avatar-box" :style="{ opacity: item ? '1' : '0' }">
                <div class="avatar" :style="`background:url(${prependHttpIfMissing(item?.user_face)})  center center / cover no-repeat transparent`" />
                <div class="avatar-ring" />
                <div class="name">
                  {{ `${item?.user_nickname.slice(0, 5)}${item?.user_nickname.length > 5 ? '...' : ''}` }}
                </div>
              </div>
              <div class="num">
                {{ item?.value }}
              </div>
              <div v-if="item?.value" class="unit">
                财气值
              </div>
            </div>
          </div>
          <div class="rank-box">
            <div v-for="(item, index) in bottomList" :key="index" class="rank-item">
              <div class="rank-num">
                {{ item?.ranking }}
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
                  财气值
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="my-box">
          <div class="rank-num">
            {{ myInfo.ranking > 0 ? myInfo.ranking : "-" }}
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
              财气值
            </div>
          </div>
        </div>
      </div>
      <!-- 累计充值限定礼 -->
      <div v-if="hotTabIdx === 1" class="tab2Bg">
        <div class="rule-container">
          <div class="rule-title" />

          <div class="open-box">
            <div id="num-gift-box">
              <canvas id="canvas" />
            </div>
            <div class="tick-num cursor-pointer" @click="showRecord">
              礼券: {{ tickNums }}
            </div>
            <div class="open-btn-box">
              <div class="open-five open-button cursor-pointer" @click="openResult(5)" />
              <div class="open-one open-button cursor-pointer" @click="openResult(1)" />
            </div>
          </div>

          <div class="rule-tip">
            完成每日充值任务即可获得对应的礼券，礼券用于抽取甄选好礼
          </div>

          <div class="rule-1-bg" />

          <div class="has-charge-txt">
            今日已充值：{{ actInfo?.todayRecharge }}
          </div>

          <div class="charge-btn cursor-pointer" @click="toCharge" />

          <div class="yesterday-users">
            <div v-for="(item, index) in actInfo?.lucky_user" v-if="actInfo.lucky_user.length > 0" :key="index" class="yesterday-item">
              <div class="sender">
                <div class="gift-sender-img" :class="[index === 1 ? 'gift-sender-img-2' : '']" :style="`background:url(${item.pic})  center center / cover no-repeat transparent`" />
              </div>
              <div class="gift-box" />
              <div class="user cursor-pointer" @click="toUserCenter(item.user_id)">
                <div class="avatar" :style="`background:url(${prependHttpIfMissing(item.face)})  center center / cover no-repeat transparent`" />
                <div class="ring" />
              </div>
              <div class="user-name">
                {{ item.nickname }}
              </div>
            </div>
            <div v-else class="no-lucky" />
          </div>

          <div class="act-strategy" />
        </div>
      </div>

      <!-- 礼券获取记录弹窗 -->
      <RecordDialog ref="recordRef" />

      <!-- 开盒结果弹窗 -->
      <ResultDialog ref="resultRef" @init-page="getTickets" />

      <!-- 规则弹窗 -->
      <RuleDialog v-if="ruleVisible" @toggle-rule="toggleRule" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Parser, Player } from 'svga'
import hotTab1Active from '@/assets/images/recharge-activity/tab1Active.webp'
import hotTab1InActive from '@/assets/images/recharge-activity/tab1InActive.webp'
import hotTab2Active from '@/assets/images/recharge-activity/tab2Active.webp'
import hotTab2InActive from '@/assets/images/recharge-activity/tab2InActive.webp'
import topRankBg from '@/assets/images/recharge-activity/top-rank-bg.webp'
import luckGift1 from '@/assets/images/recharge-activity/luck-gift-1.webp'
import luckGift2 from '@/assets/images/recharge-activity/luck-gift-2.webp'
import backIcon from '@/assets/images/618/back-icon.webp'
import boxSvga from '@/assets/images/recharge-activity/box.svga?url'
import { rechargeActApi, soeApi } from '@/api/index'
import { prependHttpIfMissing } from '@/utils/index'
import RecordDialog from '@/components/recharge-activity/RecordDialog.vue'
import ResultDialog from '@/components/recharge-activity/ResultDialog.vue'
import RuleDialog from '@/components/recharge-activity/RuleDialog.vue'

const recordRef = ref<RecordDialog | null>(null)
const resultRef = ref<ResultDialog | null>(null)

const hotTabIdx = ref(0)
const ruleVisible = ref(false)
const actInfo = ref({})
const consumeList = ref([])
const popularList = ref([])
const myInfo = ref({})
const user_id = ref(0)
const topList = computed(() => {
  let list = hotTabIdx.value === 0 ? consumeList.value.slice(0, 3) : popularList.value.slice(0, 3)
  list = [list[1], list[0], list[2]]
  return list
})
const bottomList = computed(() => {
  const list = hotTabIdx.value === 0 ? consumeList.value.slice(3) : popularList.value.slice(3)
  return list
})
const popularPlayer = ref(null)
const popularParse = ref(null)
const tickNums = ref(0)

const handleBack = () => {
  js_sync_back()
}
// 开启规则弹窗
const showRecord = () => {
  recordRef?.value.setVisible(true)
}

const toggleRule = () => {
  ruleVisible.value = !ruleVisible.value
}

const loadSvga = async () => {
  if (popularPlayer.value && popularPlayer.value) {
    popularPlayer.value.clear()
    popularParse.value?.destroy()
    popularPlayer.value?.destroy()
  }
  popularParse.value = new Parser()
  const svga = await popularParse.value.load(boxSvga)

  popularPlayer.value = new Player({
    container: document.getElementById('canvas'),
    // loopStartFrame: 45,
  })
  await popularPlayer.value.mount(svga)
  popularPlayer.value.start()
}

const getRank = async () => {
  const res = await rechargeActApi.getActRanking().catch((err) => {})
  consumeList.value = res.list.map((i) => {
    return { ...i, value: i.value > 10000 ? `${(Number.parseInt((i.value / 10000) * 100) / 100).toFixed(2)}w` : i.value }
  })
  if (Number.parseInt(res.my.value) > 10000)
    res.my.value = `${(Number.parseInt((res.my.value / 10000) * 100) / 100).toFixed(2)}w`
  myInfo.value = res.my
  user_id.value = res.my.user_id
}

const changeHotTabIdx = (idx: number) => {
  if (idx === hotTabIdx.value)
    return
  hotTabIdx.value = idx
  if (idx === 0)
    getRank()

  if (idx === 1) {
    loadSvga()
    getActInfo()
    getTickets()
  }
}

const getActInfo = async () => {
  const res = await rechargeActApi.getActInfo().catch((err) => {})
  res.lucky_user = res.lucky_user.map((i, idx) => {
    return { ...i, pic: idx === 0 ? luckGift2 : luckGift1 }
  })
  actInfo.value = res
}

const toUserCenter = (user_id: number) => {
  const params = {
    user_id,
  }
  js_sync_app('js_sync_usermain', params, 'user_id')
}

const getTickets = async () => {
  const res = await rechargeActApi.getTicketNum().catch((err) => {})
  tickNums.value = res?.cards
}

// 开启规则弹窗
const openResult = (num: number) => {
  if (num > tickNums.value) {
    showToast('礼券数量不足')
    return
  }
  resultRef?.value.setVisible(true, num)
}

// 去充值
const toCharge = () => {
  console.log('[toCharge >]', user_id.value)
  changeHotTabIdx(0)
  js_sync_app('js_sync_pay', user_id.value)
}

// hook使用
// useHandleData(true, () => {
// })

onMounted(() => {
  getActInfo()
  getTickets()
  getRank()
})
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'numberFont';
  src: url('@/assets/file/recharge-activity/numberFont.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
.h100vh {
  height: 100vh !important;
  max-height: 100vh !important;
  overflow: hidden;
}
.container-box {
  width: 100vw;
  min-height: 100vh;
  background-image: url('@/assets/images/recharge-activity/container-bg.webp');
  background-repeat: repeat;
  // background-position: center;
  background-size: 750px 434px;
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
    width: 63px;
    height: 103px;
    position: absolute;
    top: 690px;
    right: 0;
    background: url('@/assets/images/recharge-activity/rule-btn.webp') center
      center / cover no-repeat transparent;
  }
  .header-bg {
    width: 100vw;
    height: 573px;
    background: url('@/assets/images/recharge-activity/header-bg.webp') center
      center / cover no-repeat transparent;
  }
  .hotTabBox {
    width: 710px;
    // padding: 0 85px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    .tabItem {
      width: 330px;
      height: 100px;
    }
  }
  .tab1Bg {
    margin-top: 175px;
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

    .rankList {
      display: flex;
      flex-direction: column;
      align-items: center;
      .top-box {
        width: 640px;
        height: 336px;
        margin-bottom: -40px;
        display: flex;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        .top-item {
          // width: 140px;
          // margin-top: 155px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .avatar-box {
            width: 170px;
            height: 170px;
            margin-bottom: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            .avatar {
              width: 124px;
              height: 124px;
            }
            .avatar-ring {
              width: 170px;
              height: 170px;
              position: absolute;
              top: 0;
              left: 0;
              background: url('@/assets/images/recharge-activity/avatar-ring.webp')
                center center / cover no-repeat transparent;
            }
            .name {
              width: 190px;
              height: 39px;
              background: #bde4faba;
              backdrop-filter: blur(2.4px);
              position: absolute;
              bottom: 10px;
              left: 50%;
              transform: translateX(-50%);
              border-radius: 44px;
              text-align: center;
              line-height: 39px;
              font-size: 28px;
              color: #242424;
            }
          }
          .num {
            color: #176bb7;
            font-weight: bolder;
            font-size: 28px;
          }
          .unit {
            font-size: 24px;
            color: #176bb7;
          }
        }
        .top-item:nth-child(2) {
          margin-top: -174px;
          .avatar-box {
            margin-bottom: 163px;
            width: 221px;
            height: 221px;
            .avatar-ring {
              width: 221px;
              height: 221px;
            }
            .avatar {
              width: 162px;
              height: 162px;
              background: yellow;
            }
          }
        }
        .top-item:nth-child(1) {
          margin-top: -64px;
          .avatar-box {
            margin-bottom: 104px;
          }
        }
        .top-item:nth-child(3) {
          margin-top: -28px;
          .avatar-box {
            margin-bottom: 68px;
          }
          transform: translateX(10px);
        }
      }
      .rank-box {
        .rank-item {
          display: flex;
          align-items: center;
          width: 686px;
          height: 134px;
          color: #176bb7;
          font-weight: 500;
          font-size: 28px;
          background: url('@/assets/images/recharge-activity/rank-item-bg.webp')
            center center / cover no-repeat transparent;
          padding: 0 30px 0 35px;
          margin-bottom: 24px;
          .rank-num {
            width: 17px;
            height: 36px;
            font-weight: bold;
            color: #176bb7;
            font-family: 'numberFont';
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
            color: #176bb7;
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
      height: 184px;
      background: url('@/assets/images/recharge-activity/my-box-bg.webp') center
        center / cover no-repeat transparent;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30px 32px;
      .rank-num {
        font-size: 32px;
        color: #176bb7;
        font-family: 'numberFont';
      }
      .avatar {
        width: 88px;
        height: 88px;
        border-radius: 88px;
        margin: 0 16px;
      }
      .myInfo {
        color: #176bb7;
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
        color: #176bb7;
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
    margin-top: 40px;
    .rule-container {
      width: 686px;
      height: 2687px;
      border-radius: 24px;
      background: #def5ff;
      padding-top: 21px;
      .rule-title {
        width: 432px;
        height: 41px;
        margin: 0 auto 16px;
        background: url('@/assets/images/recharge-activity/title-text.webp')
          center center / cover no-repeat transparent;
      }
      .open-box {
        width: 638px;
        height: 394px;
        border-radius: 24px;
        background: #63bfff;
        margin: 0 auto 34px;
        position: relative;
        .tick-num {
          position: absolute;
          top: 16px;
          right: 16px;
          min-width: 119px;
          height: 44px;
          padding: 0 16px;
          border-radius: 116px;
          background: #2aa8ff;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24px;
          line-height: 44px;
        }
        .open-btn-box {
          position: absolute;
          width: 100%;
          left: 0;
          display: flex;
          justify-content: space-between;
          padding: 0 47px;
          bottom: 30px;
          .open-five {
            background: url('@/assets/images/recharge-activity/open-five.webp')
              center center / cover no-repeat transparent;
          }
          .open-one {
            background: url('@/assets/images/recharge-activity/open-one.webp')
              center center / cover no-repeat transparent;
          }
          .open-button {
            width: 264px;
            height: 76px;
          }
        }
      }
      .rule-tip {
        font-size: 22px;
        color: #176bb7;
        width: 638px;
        margin: 0 auto 36px;
        text-align: center;
        font-weight: 600;
      }
      .rule-1-bg {
        width: 616px;
        height: 432px;
        margin: 0 auto 32px;
        background: url('@/assets/images/recharge-activity/rule-1-bg.webp')
          center center / cover no-repeat transparent;
      }
      .has-charge-txt {
        color: #176bb7;
        font-size: 28px;
        margin-bottom: 20px;
        text-align: center;
        font-weight: 600;
        margin-bottom: 20px;
      }
      .charge-btn {
        width: 486px;
        height: 88px;
        margin: 0 auto 33px;
        background: url('@/assets/images/recharge-activity/charge-btn.webp')
          center center / cover no-repeat transparent;
      }
      .yesterday-users {
        width: 638px;
        height: 456px;
        margin: 0 auto 48px;
        padding: 96px 36px 0;
        background: url('@/assets/images/recharge-activity/yesterday-users.webp')
          center center / cover no-repeat transparent;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .yesterday-item {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          .sender {
            width: 123px;
            height: 123px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: url('@/assets/images/recharge-activity/gift-bg-ring.webp')
              center center / cover no-repeat transparent;
            .gift-sender-img {
              width: 122px;
              height: 122px;
            }
            .gift-sender-img-2 {
              width: 78px;
              height: 78px;
            }
          }
          .gift-box {
            width: 70px;
            height: 70px;
            background: url('@/assets/images/recharge-activity/gift-box.webp')
              center center / cover no-repeat transparent;
            margin: 0 27px 0 21px;
          }
          .user {
            width: 157px;
            height: 157px;
            margin-right: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9;
            position: relative;
            .avatar {
              width: 123px;
              height: 123px;
              border-radius: 50%;
            }
            .ring {
              position: absolute;
              width: 157px;
              height: 157px;
              top: 0;
              left: 0;
              background: url('@/assets/images/recharge-activity/yesterday-ring.webp')
                center center / cover no-repeat transparent;
            }
          }
          .user-name {
            font-size: 28px;
            color: #ffffff;
            font-weight: bold;
          }
        }
        .no-lucky {
          width: 416px;
          height: 86px;
          background: url('@/assets/images/recharge-activity/no-luck-pic.webp')
            center center / cover no-repeat transparent;
        }
      }
      .act-strategy {
        width: 638px;
        height: 887px;
        margin: 0 auto 10px;
        background: url('@/assets/images/recharge-activity/act-strategy.webp')
          center center / cover no-repeat transparent;
      }
    }
    #num-gift-box {
      width: 622px;
      height: 368px;
      margin: 0 auto 0;
      border-radius: 37px;
      canvas {
        width: 100% !important;
        height: 100% !important;
      }
    }
  }
}
</style>
