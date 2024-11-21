<template>
  <div class="container-box" ontouchstart="" onmouseover="">
    <!-- 返回按钮 -->
    <div class="back-wrap cursor-pointer" @click="handleBack">
      <img :src="backIcon" alt="">
    </div>
    <div v-motion-pop-visible-once class="rule-btn scale-btn cursor-pointer" @click="openRule" />
    <div class="header-box">
      <div class="gift-box">
        <div class="gift-list">
          <div v-for="(item, index) in giftList" :key="item.id" class="gift-item">
            <div class="gift-pic" :style="`background:url(${item.img})  center center / cover no-repeat transparent`" />
            <div class="gift-name">
              {{ item.name }}
            </div>
            <div class="gift-price">
              {{ item.price }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- tab -->
    <div class="gift-rank-box">
      <div
        v-motion-pop-visible-once class="tab-box scale-btn"
        :class="[activeTab === 0 ? 'tab1-active' : 'tab2-active']" @click="changeTab"
      />
      <div v-if="activeTab === 0" class="blind-box">
        <div v-motion-pop-visible-once class="btn-box">
          <div
            v-for="(item, index) in btnList" :key="index" class="btn-item scale-btn"
            :style="`background:url(${item.img})  center center / cover no-repeat transparent`"
            @click="btnClick(index)"
          />
        </div>
        <div class="blind-container">
          <anim-player :conf="svgConfig" @ready="playSvg" />
          <div class="buy-box">
            <div class="left">
              剩余次数: {{ num }}
            </div>
            <div class="recharge-btn scale-btn" @click="openRecharge" />
          </div>
          <div class="skip-box" @click="toggleSkip">
            <div class="skip-icon" :class="[skipCheck ? 'check' : '']" />
            <div class="skip-text">
              跳过动画
            </div>
          </div>
        </div>
        <div v-motion-pop-visible-once class="open-box">
          <div
            v-for="(item, index) in openBtnList" :key="index" class="open-btn-item scale-btn"
            :style="`background:url(${item.img})  center center / cover no-repeat transparent`"
            @click="handleLottery(item.time)"
          />
        </div>
      </div>
      <div v-if="activeTab === 1" class="rank-box">
        <div class="rank-tab-box" :class="[activeRankTab === 0 ? 'tab1Active' : 'tab2Active']" @click="changeRankTab" />
        <div class="top-3-box">
          <div :class="[rankList[1] ? '' : 'opacity0']" class="second top-item">
            <div class="avatar" :style="`background:url(${prependHttpIfMissing(rankList[1]?.face)})  center center / cover no-repeat transparent`" @click="toUserCenter(rankList[1]?.user_id)">
              <div class="prize-icon" />
            </div>
            <div class="name">
              {{ rankList[1]?.nickname }}
            </div>
            <div class="num">
              {{ rankList[1]?.value }}
            </div>
            <div class="unit">
              {{ unit }}
            </div>
          </div>
          <div :class="[rankList[0] ? '' : 'opacity0']" class="first top-item">
            <div class="avatar" :style="`background:url(${prependHttpIfMissing(rankList[0]?.face)})  center center / cover no-repeat transparent`" @click="toUserCenter(rankList[0]?.user_id)">
              <div class="prize-icon" />
            </div>
            <div class="name">
              {{ rankList[0]?.nickname }}
            </div>
            <div class="num">
              {{ rankList[0]?.value }}
            </div>
            <div class="unit">
              {{ unit }}
            </div>
          </div>
          <div :class="[rankList[2] ? '' : 'opacity0']" class="third top-item">
            <div class="avatar" :style="`background:url(${prependHttpIfMissing(rankList[2]?.face)})  center center / cover no-repeat transparent`" @click="toUserCenter(rankList[2]?.user_id)">
              <div class="prize-icon" />
            </div>
            <div class="name">
              {{ rankList[2]?.nickname }}
            </div>
            <div class="num">
              {{ rankList[2]?.value }}
            </div>
            <div class="unit">
              {{ unit }}
            </div>
          </div>
        </div>
        <div class="rank-list">
          <div v-for="(item, index) in rankList" :key="index" class="rank-item">
            <div class="rank-l">
              <div class="rank-num">
                {{ item?.ranking }}
              </div>
              <div class="rank-avatar" :style="`background:url(${prependHttpIfMissing(item?.face)})  center center / cover no-repeat transparent`" @click="toUserCenter(item?.user_id)" />
              <div class="rank-nick-name">
                {{ item?.nickname }}
              </div>
            </div>
            <div class="rank-r">
              <div class="rank-num">
                {{ item?.value }}
              </div>
              <div class="rank-unit">
                {{ unit }}
              </div>
            </div>
          </div>
        </div>
        <div class="my-rank-box">
          <div class="my-rank-l">
            <div class="my-rank-num">
              {{ myRankInfo?.ranking ? myRankInfo?.ranking : '-' }}
            </div>
            <div
              class="my-avatar" :style="`background:url(${prependHttpIfMissing(myRankInfo?.face)})  center center / cover no-repeat transparent`"
              @click="toUserCenter(myRankInfo?.user_id)"
            />
            <div class="my-info">
              <div class="my-nickname">
                {{ myRankInfo?.nickname }}
              </div>
              <div class="my-desc">
                {{ myRankInfo?.desc }}
              </div>
            </div>
          </div>
          <div class="my-rank-r">
            <div class="my-num">
              {{ myRankInfo?.value }}
            </div>
            <div class="my-avatar">
              {{ unit }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 规则弹窗 -->
    <RuleDialog ref="ruleRef" />
    <!-- 说明弹窗 -->
    <GuideDialog ref="guideRef" />
    <!-- 奖品弹窗 -->
    <PrizeDialog ref="prizeRef" />
    <!-- 记录弹窗 -->
    <RecordDialog ref="recordRef" />
    <!-- 购买弹窗 -->
    <BuyDialog ref="buyRef" @init-page="initPage" @handle-svga="handleSvga" @open-result="openResult" @handle-lottery-affirm="handleLotteryAffirm" />
    <!-- 充值弹窗 -->
    <RechargeDialog ref="rechargeRef" :user-id="userId" @init-page="initPage" />
    <!-- 抽奖结果弹窗 -->
    <ResultDialog ref="resultRef" @init-page="initPage" @open-result="openResult" @handle-svga="handleSvga" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import moment from 'moment'
import backIcon from '@/assets/images/common/back-icon.webp'
import RuleDialog from '@/components/thanks/RuleDialog.vue'
import GuideDialog from '@/components/thanks/GuideDialog.vue'
import PrizeDialog from '@/components/thanks/PrizeDialog.vue'
import RecordDialog from '@/components/thanks/RecordDialog.vue'
import RechargeDialog from '@/components/thanks/RechargeDialog.vue'
import BuyDialog from '@/components/thanks/BuyDialog.vue'
import ResultDialog from '@/components/thanks/ResultDialog.vue'
import gift1 from '@/assets/images/thanks/gift1.png'
import gift2 from '@/assets/images/thanks/gift2.png'
import gift3 from '@/assets/images/thanks/gift3.png'
import guide from '@/assets/images/thanks/rule.png'
import record from '@/assets/images/thanks/record.png'
import prize from '@/assets/images/thanks/prize.png'
import open1 from '@/assets/images/thanks/open1.png'
import open10 from '@/assets/images/thanks/open10.png'
import open100 from '@/assets/images/thanks/open100.png'
import { thanksApi } from '@/api'
import { userMe } from '@/api/modules/common'
import animPlayer from '@/components/anim-player/index.vue'

const giftList = ref([
  {
    id: 1,
    name: '青梅足马',
    price: '990钻',
    img: gift1,
  },
  {
    id: 2,
    name: '优乐美奶茶',
    price: '2880钻',
    img: gift2,
  },
  {
    id: 3,
    name: '星河之约',
    price: '5200钻',
    img: gift3,
  },
])
const btnList = ref([
  {
    id: 1,
    img: guide,
  },
  {
    id: 2,
    img: prize,
  },
  {
    id: 3,
    img: record,
  },
])
const openBtnList = ref([
  {
    id: 1,
    img: open1,
    time: 1,
  },
  {
    id: 2,
    img: open10,
    time: 10,
  },
  {
    id: 3,
    img: open100,
    time: 100,
  },
])
const ruleRef = ref<any>()
const guideRef = ref<any>()
const prizeRef = ref<any>()
const recordRef = ref<any>()
const buyRef = ref<any>()
const rechargeRef = ref<any>()
const resultRef = ref<any>()
const activeTab = ref(0)
const skipCheck = ref(false)
const activeRankTab = ref(0)
const userId = ref(0)
const num = ref(0)
const rankList = ref<any[]>([
  {
    id: 1,
    name: '111',
    num: '111',
  },
  {
    id: 1,
    name: '111',
    num: '111',
  },
  {
    id: 1,
    name: '111',
    num: '111',
  },
  {
    id: 1,
    name: '111',
    num: '111',
  },
  {
    id: 1,
    name: '111',
    num: '111',
  },
  {
    id: 1,
    name: '111',
    num: '111',
  },
])
const myRankInfo = ref()
const handleBack = () => {
  js_sync_back()
}
const isCheck = ref(false)
const svgConfig = ref<any>({
  // url: '/svga/thanks/cake-normal.svga',
  url: '/svga/thanks/three1.svga',
  loop: true,
  useType: 2,
})
// 初始化完成
const playSvg = (player) => {
  console.log('player >', player)
  player.player.start()
}
const unit = computed(() => {
  return activeRankTab.value === 0 ? '陪伴值' : '感恩值'
})
const getRanking = async () => {
  const res: any = await thanksApi.getRanking({ type: activeRankTab.value === 0 ? 1 : 2 }).catch(err => console.log(err))
  if (!res)
    return
  console.log('[ getRanking res ] >', res)
  rankList.value = res.list
  myRankInfo.value = res.my
}

const changeTab = () => {
  activeTab.value = activeTab.value === 0 ? 1 : 0
  activeRankTab.value = 0
  if (activeTab.value === 1)
    getRanking()
}

const changeRankTab = () => {
  activeRankTab.value = activeRankTab.value === 0 ? 1 : 0
  getRanking()
}

const openRule = () => {
  ruleRef.value.setVisible(true)
}

const btnClick = (idx: number) => {
  if (idx === 0)
    guideRef.value.setVisible(true)
  if (idx === 1)
    prizeRef.value.setVisible(true)
  if (idx === 2)
    recordRef.value.setVisible(true)
}

const openBuy = (time: number) => {
  buyRef.value.setVisible(true, time)
}

const openRecharge = () => {
  rechargeRef.value.setVisible(true)
}

const openResult = (list: any[], times: number) => {
  resultRef.value.setVisible(true, list, times)
}
// 用户信息
const getUserInfo = async () => {
  const res = await userMe().catch((err) => {
    console.log(err)
  })
  console.log('[userInfo >]', res)
  userId.value = res.user.user_id
}

const getActInfo = async () => {
  const res = await thanksApi.getActivityInfo({}).catch((err) => { console.log(err) })
  if (!res)
    return
  console.log('getActInfo >', res)
  num.value = res.energy_number
}

const toUserCenter = (user_id: number) => {
  if (!user_id)
    return
  const params = {
    user_id,
  }
  js_sync_app('js_sync_usermain', params, 'user_id')
}

const handleSvga = (time: number) => {
  if (num.value < time) {
    showToast('剩余次数不足')
    return
  }

  if (skipCheck.value) {
    buyRef.value.startLottery(time)
    return
  }
  svgConfig.value = Object.assign(svgConfig.value, {
    // url: '/svga/thanks/cake-active.svga',
    url: '/svga/thanks/three1_active.svga',
    loop: false,
    onEnded: () => {
      buyRef.value.startLottery(time)
      svgConfig.value = Object.assign(svgConfig.value, {
        // url: '/svga/thanks/cake-normal.svga',
        url: '/svga/thanks/three1.svga',
        loop: true,
      })
    },
  })
}

const handleLottery = useDebounce((time: number) => {
  // 今日不再出现此提示
  const isCheck = localStorage.getItem('isCheck') ? JSON.parse(localStorage.getItem('isCheck') as string) : false
  if (isCheck) {
    if (skipCheck.value)
      buyRef.value.startLottery(time)

    else // 播放
      handleSvga(time)
  }
  else { openBuy(time) }
}, 500)

function handleLotteryAffirm(row: any) {
  switch (row.type) {
    case 'isCheck':
      isCheck.value = JSON.parse(row.isCheck)
      // eslint-disable-next-line no-case-declarations
      const tomorrowTemp = moment(`${moment().add(1, 'days').format().substring(0, 10)} 00:00:00`).unix() * 1000
      localStorage.setItem('isCheck', `${isCheck.value}`)
      if (isCheck.value === false)
        localStorage.setItem('tomorrowTemp', '0')

      else
        localStorage.setItem('tomorrowTemp', `${tomorrowTemp}`)

      break
    default:
      break
  }
}

const getSetting = async () => {
  const res = await thanksApi.getMySetting({}).catch(err => console.log(err))
  if (!res)
    return
  console.log('getSetting >', res)
  skipCheck.value = res.play_switch === 0 // 0=不播放，1=播放
}

const toggleSkip = async () => {
  const res = await thanksApi.updateMySetting({ play_switch: skipCheck.value ? 1 : 0, show_switch: 1 }).catch(err => console.log(err))

  if (!res)
    return
  getSetting()
}

const initPage = () => {
  getActInfo()
  getUserInfo()
  getSetting()
}
// hook使用
// useHandleData(true, () => {
// })
onMounted(() => {
  initPage()
  const currentTime = new Date().getTime()
  const tomorrowTemp = localStorage.getItem('tomorrowTemp') ? JSON.parse(localStorage.getItem('tomorrowTemp') as string) : 0
  // 如果当前时间大于存储的时间, 初始化
  const intervalTime = tomorrowTemp - currentTime
  if (intervalTime < 1) {
    localStorage.setItem('isCheck', 'false')
    localStorage.setItem('tomorrowTemp', '0')
  }
})

// onBeforeMount(() => {
//   svgConfig.value.url = null
// })
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'numberFont';
  src: url('@/assets/file/common/numberFont.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@keyframes scaleBg {
  0% {
    transform: scale(1.25);
  }

  50% {
    transform: scale(1.23);
  }

  100% {
    transform: scale(1);
  }
}

.container-box {
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
  background: #bedeff;
  padding: 0;
  margin: 0;
  padding-bottom: 150px;
  box-sizing: border-box;
  position: relative;
  animation: scaleBg 0.75s linear 1;
  display: flex;
  flex-direction: column;
  align-items: center;

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
    width: 114px;
    height: 60px;
    right: 0;
    top: 420px;
    position: absolute;
    background: url('@/assets/images/thanks/rule-btn.webp') center center /
      cover no-repeat transparent;
    z-index: 999;
  }

  .header-box {
    width: 100vw;
    height: 1200px;
    background: url('@/assets/images/thanks/header-box.webp') center center /
      cover no-repeat transparent;
    position: relative;
    margin-bottom: 320px;

    .gift-box {
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -255px;
      height: 484px;
      background: url('@/assets/images/thanks/gift-box.webp') center center /
        cover no-repeat transparent;
      display: flex;
      justify-content: center;

      .gift-list {
        width: 506px;
        height: 384px;
        display: flex;
        justify-content: space-between;
        margin-top: 114px;

        .gift-item {
          color: #77265e;
          font-size: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 113px;

          .gift-pic {
            width: 113px;
            height: 113px;
            margin-bottom: 10px;
          }

          .gift-name {
            font-weight: 500;
            white-space: nowrap;
          }

          .gift-price {
            font-weight: 400;
          }
        }
      }
    }
  }

  .gift-rank-box {
    position: relative;

    .tab-box {
      position: absolute;
      top: -56px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      width: 630px;
      height: 90px;
      z-index: 9;
    }

    .tab1-active {
      background: url('@/assets/images/thanks/tab1-active.webp') center center /
        cover no-repeat transparent;
    }

    .tab2-active {
      background: url('@/assets/images/thanks/tab2-active.webp') center center /
        cover no-repeat transparent;
    }

    .blind-box {
      width: 702px;
      height: 720px;
      background: url('@/assets/images/thanks/main-box-bg.webp') center center /
        cover no-repeat transparent;
      position: relative;
      padding-top: 60px;

      .btn-box {
        width: 80px;
        position: absolute;
        top: 106px;
        right: 25px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        z-index: 10;

        .btn-item {
          width: 80px;
          height: 80px;
          margin-bottom: 40px;
        }
      }

      .blind-container {
        width: 686px;
        height: 458.5px;
        margin: 0px auto 56px;
        position: relative;

        .buy-box {
          min-width: 280px;
          height: 60px;
          border-radius: 30px;
          background: #b28aa8;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          padding: 0 10px;

          .left {
            font-size: 24px;
            color: #fff;
            white-space: nowrap;
          }

          .recharge-btn {
            width: 96px;
            height: 48px;
            background: url('@/assets/images/thanks/buy.png') center center /
              cover no-repeat transparent;
          }
        }
      }

      .open-box {
        display: flex;
        gap: 8px;
        margin: 0 auto;
        justify-content: center;

        .open-btn-item {
          width: 204px;
          height: 84px;
        }
      }

      .skip-box {
        width: 128px;
        font-size: 24px;
        display: flex;
        align-items: center;
        gap: 8px;
        position: absolute;
        right: 22px;
        bottom: -30px;

        .skip-icon {
          width: 24px;
          height: 24px;
          background: url('@/assets/images/thanks/none.png') center center /
            cover no-repeat transparent;
        }

        .check {
          background: url('@/assets/images/thanks/skip.png') center center /
            cover no-repeat transparent;
        }

        .skip-text {
          color: #b58aa7;
          white-space: nowrap;
        }
      }
    }

    .rank-box {
      width: 686px;
      border-radius: 50px;
      border: 8px solid #ffffff99;
      background: linear-gradient(180deg, #fff9fe 0.12%, #ffe5f7 73.04%);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 64px 0 60px;

      .rank-tab-box {
        width: 400px;
        height: 64px;
      }

      .rank-tab-box.tab1Active {
        background: url('@/assets/images/thanks/rank-tab1-active.webp') center
          center / cover no-repeat transparent;
      }

      .rank-tab-box.tab2Active {
        background: url('@/assets/images/thanks/rank-tab2-active.webp') center
          center / cover no-repeat transparent;
      }

      .top-3-box {
        width: 686px;
        height: 385px;
        background: url('@/assets/images/thanks/top3-bg.webp') center center /
          cover no-repeat transparent;
        padding: 0 58px;
        display: flex;
        justify-content: space-between;

        .first {
          padding-top: 78px;

          .avatar {
            width: 160px;
            height: 160px;
            margin-bottom: 26px;
          }

          .prize-icon {
            background: url('@/assets/images/thanks/first.webp') center center /
              cover no-repeat transparent;
          }
        }

        .second {
          .prize-icon {
            background: url('@/assets/images/thanks/second.webp') center center /
              cover no-repeat transparent;
          }
        }

        .third {
          .prize-icon {
            background: url('@/assets/images/thanks/third.webp') center center /
              cover no-repeat transparent;
          }
        }

        .second,
        .third {
          padding-top: 122px;

          .avatar {
            width: 132px;
            height: 132px;
          }
        }

        .top-item {
          font-size: 28px;
          color: #77265e;
          display: flex;
          flex-direction: column;
          align-items: center;

          .name {
            width: 132px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
            color: #ff4bc6;
          }

          .num {
            font-weight: bolder;
          }

          .unit {
            font-size: 24px;
          }

          .avatar {
            position: relative;
            margin-bottom: 20px;
            border-radius: 80px;
            border: 8px solid #fff;

            .prize-icon {
              position: absolute;
              left: 0;
              top: 0;
              width: 44px;
              height: 44px;
            }
          }
        }
      }

      .rank-list {
        .rank-item {
          font-size: 28px;
          font-weight: 500;
          width: 638px;
          height: 138px;
          border-radius: 32px;
          background: #fff4fc;
          display: flex;
          justify-content: space-between;
          padding: 0 56px 0 40px;
          align-items: center;
          margin-bottom: 16px;

          .rank-l {
            display: flex;
            align-items: center;
            gap: 25px;

            .rank-num {
              font-family: 'numberFont';
              color: #fa4fbb;
            }

            .rank-avatar {
              width: 90px;
              height: 90px;
              border-radius: 50%;
            }

            .rank-nick-name {
            }
          }

          .rank-r {
            .rank-num {
              font-weight: bold;
            }

            .rank-unit {
            }
          }
        }
      }

      .my-rank-box {
        width: 100vw;
        height: 184px;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        border: 2px solid #ffaedf;
        background: linear-gradient(180deg, #fc64c4 0%, #ff98d6 95.02%);
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 24px;
        font-weight: bolder;
        color: #fff;
        border-radius: 32px 32px 0 0;
        padding: 0 30px;
        z-index: 12;

        .my-rank-l {
          display: flex;
          align-items: center;
          gap: 25px;

          .my-rank-num {
            font-family: 'numberFont';
            color: #fa4fbb;
            font-size: 32px;
          }

          .my-avatar {
            width: 88px;
            height: 88px;
            border-radius: 88px;
            border: 2px solid #fff;
          }

          .my-info {
            .my-nickname {
              font-size: 28px;
            }

            .my-desc {
              font-size: 22px;
            }
          }
        }

        .my-rank-r {
        }
      }
    }
  }

  :deep(canvas) {
    width: 100% !important;
    height: 632px !important;
  }
}
</style>
