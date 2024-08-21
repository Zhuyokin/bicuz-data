<template>
  <!-- 抓娃娃活动 -->
  <div class="container-box" ontouchstart="" onmouseover="">
    <!-- 返回按钮 -->
    <div class="back-wrap cursor-pointer" @click="handleBack">
      <img :src="backIcon" alt="">
    </div>
    <!-- 顶部背景 -->
    <div class="header-bg">
      <anim-player :conf="config" @ready="onReady" />
    </div>
    <!-- v-if="!playCatch" -->
    <div class="machine-box" :style="{ opacity: playCatch ? '0' : '1' }" />
    <!-- v-else -->
    <div class="catch-box" :style="{ opacity: playCatch ? '1' : '0' }">
      <anim-player :conf="mConfig" @ready="onMReady" />
    </div>
    <!-- 能量条  -->
    <div v-motion-pop-visible-once class="energy-box" @click="openDialog(4)">
      <div
        class="energy-icon"
        :style="`background:url(${activeBtn.dollImage})  center center / cover no-repeat transparent`"
      />
      <div class="energy-bar-box">
        <div class="complete" :style="`height: ${dollValObj?.surprise_value}%`" />
      </div>
    </div>
    <!-- 右侧按钮组 -->
    <div v-motion-pop-visible-once class="btn-group">
      <div
        v-for="(item, index) in rightBtns" :key="index" class="rule-btn item-btn scale-btn"
        :style="`background:url(${item.pic})  center center / cover no-repeat transparent`"
        @click="openDialog(index)"
      />
    </div>
    <div v-motion-pop-visible-once class="confirm-container">
      <!-- 上一个按钮 -->
      <div class="pre-btn" @click="changeBtn(1)" />
      <!-- 确认按钮  -->
      <div
        :style="`background:url(${activeBtn.btnImage})  center center / cover no-repeat transparent`"
        class="confirm-btn" :class="[!playCatch.value ? 'scale-btn' : '']" @click="confirmCatch"
      />
      <!-- 下一个按钮 -->
      <div class="next-btn" @click="changeBtn(2)" />
      <!-- 跳过动画 -->
      <div class="skip-btn" @click="skipActive = !skipActive">
        <div
          class="skip-icon"
          :style="`background:url(${skipActive ? skipConfirmBtn : skipCancelBtn})  center center / cover no-repeat transparent`"
        />
        <div class="skip-txt">
          跳过动画
        </div>
      </div>
    </div>
    <!-- 选择抓取次数 -->
    <div v-motion-pop-visible-once class="times-box">
      <div
        v-for="(item, index) in getTimesTab" :key="index" class="times-item"
        :style="`background:url(${item.active ? TimeBtnActive : TimeBtnInActive})  center center / cover no-repeat transparent`"
        @click="changeTab(index)"
      >
        <div class="times">
          抓{{ item.time }}次
        </div>
        <div class="price">
          {{ item.cost }}钻石
        </div>
      </div>
    </div>
    <!-- 我的账号 -->
    <div v-motion-pop-visible-once class="my-account">
      <div>我的钻石：</div>
      <div class="diamond-num">
        {{ diamond }}
      </div>
      <div class="recharge" @click="handleRecharge" />
    </div>
    <!-- 每日任务 -->
    <div v-motion-pop-visible-once class="task-box">
      <div class="task-sub-title">
        每抓取1次娃娃增加1点进度值，当进度值达标即可领取相应奖励
      </div>
      <div class="progress-box">
        <div class="complete-bar" :style="`width: ${taskWidth}%`">
          <div v-if="taskWidth < 100" class="left-dialog">
            <span>还差{{ leftTxt }}次</span>
            <div class="arrow" />
          </div>
        </div>

        <div v-for="i in 5" :key="i" class="progress-item" :class="[i === 1 ? 'first' : '']">
          <div v-if="i === 1 || taskList[i - 2]?.status" class="red-star" />
          <div v-else class="red-dot-box">
            <div class="red-dot" />
          </div>
          <div class="progress-num">
            {{ i === 1 ? '0' : taskList[i - 2]?.number }}
          </div>
        </div>
      </div>
      <div class="task-container">
        <div v-for="(item, index) in taskList" :key="index" class="task-item">
          <div
            class="task-img"
            :style="`background:url(${prependHttpIfMissing(item.icon)})  center center / cover no-repeat transparent`"
          />
          <div class="task-name">
            {{ item.remark }}
          </div>
          <div
            class="task-status"
            :class="[item.status === 0 ? 'task-status0' : item.status === 1 ? 'task-status1' : 'task-status2']"
            @click="getTaskReward(item.id)"
          />
        </div>
      </div>
    </div>
    <div v-motion-pop-visible-once class="act-rule-box" />
    <!-- 福馈弹窗 -->
    <ResultDialog ref="resultDialogRef" @close-dialog="openDollDialog" />
    <!-- 惊喜娃娃 -->
    <DollRuleDialog ref="dollRuleDialogRef" @success="initPage" />
    <!-- 奖品 -->
    <PrizeDialog ref="prizeDialogRef" @success="initPage" />
    <!-- 欧皇 -->
    <LuckyDialog ref="luckyDialogRef" @success="initPage" />
    <!-- 兑换商城 -->
    <ExchangeDialog ref="exchangeDialogRef" :debris="dollValObj?.debris_number" @success="getSurpriseVal" />
    <!-- 记录 -->
    <RecordDialog ref="recordDialogRef" @success="initPage" />
    <!-- 娃娃弹窗 -->
    <DollDialog ref="dollDialogRef" :type="1" />
  </div>
</template>

<script setup lang="ts">
import { dollActApi } from '@/api/index'
import ResultDialog from '@/components/doll-activity/ResultDialog.vue'
import ExchangeBtn from '@/assets/images/doll-activity/exchange-btn.webp'
import LuckyBtn from '@/assets/images/doll-activity/lucky-btn.webp'
import PrizeBtn from '@/assets/images/doll-activity/prize-btn.webp'
import RecBtn from '@/assets/images/doll-activity/rec-btn.webp'
import TimeBtnActive from '@/assets/images/doll-activity/time-btn-active.webp'
import TimeBtnInActive from '@/assets/images/doll-activity/time-btn-inactive.webp'
import skipConfirmBtn from '@/assets/images/doll-activity/skip-confirm.webp'
import skipCancelBtn from '@/assets/images/doll-activity/skip-cancel.webp'
import { isIosFun, js_sync_app, prependHttpIfMissing, throttle } from '@/utils/index'
import DollRuleDialog from '~/components/doll-activity/DollRuleDialog.vue'
import ExchangeDialog from '~/components/doll-activity/ExchangeDialog.vue'
import PrizeDialog from '~/components/doll-activity/PrizeDialog.vue'
import LuckyDialog from '~/components/doll-activity/LuckyDialog.vue'
import RecordDialog from '~/components/doll-activity/RecordDialog.vue'
import DollDialog from '~/components/doll-activity/DollDialog.vue'
import { getUserWallet, userMe } from '@/api/modules/common'
import animPlayer from '@/components/anim-player/index.vue'
import backgroundMp4 from '@/assets/images/doll-activity/background.mp4?url'
import backgroundJSON from '@/assets/images/doll-activity/background.json'
import successMp4 from '@/assets/images/doll-activity/success.mp4?url'
import successJSON from '@/assets/images/doll-activity/success.json'
import Doll1Btn from '@/assets/images/doll-activity/doll1-btn.webp'
import Doll2Btn from '@/assets/images/doll-activity/doll2-btn.webp'
import Doll3Btn from '@/assets/images/doll-activity/doll3-btn.webp'
import Doll4Btn from '@/assets/images/doll-activity/doll4-btn.webp'
import Doll1Image from '@/assets/images/doll-activity/doll1.webp'
import Doll2Image from '@/assets/images/doll-activity/doll2.webp'
import Doll3Image from '@/assets/images/doll-activity/doll3.webp'
import Doll4Image from '@/assets/images/doll-activity/doll4.webp'
import backIcon from '@/assets/images/common/back-icon.webp'

const rightBtns = ref([
  {
    id: 1,
    pic: PrizeBtn,
  },
  {
    id: 2,
    pic: LuckyBtn,
  },
  {
    id: 3,
    pic: ExchangeBtn,
  },
  {
    id: 4,
    pic: RecBtn,
  },
])

const taskList = ref([
  {
    id: 1,
    number: 1,
  },
])
const getTimesTab = ref([
  {
    id: 1,
    time: 1,
    cost: 600,
    active: true,
  },
  {
    id: 2,
    time: 10,
    cost: 6000,
    active: false,
  },
  {
    id: 3,
    time: 50,
    cost: 30000,
    active: false,
  },
])
const resultDialogRef = ref<HTMLElement | null>(null)
const dollRuleDialogRef = ref<HTMLElement | null>(null)
const exchangeDialogRef = ref<HTMLElement | null>(null)
const prizeDialogRef = ref<HTMLElement | null>(null)
const luckyDialogRef = ref<HTMLElement | null>(null)
const recordDialogRef = ref<HTMLElement | null>(null)
const dollDialogRef = ref<HTMLElement | null>(null)
const activeTabIdx = ref(1)
const skipActive = ref(false)
const taskNum = ref(0)
const user_id = ref(0)
const diamond = ref(0)
const dollValObj = ref({})
const taskWidth = ref(0)
const playCatch = ref(false)
const itemsRet = ref({})
const luckyRet = ref({})
const surpriseRet = ref<any>({})
const config = ref({
  width: 750,
  height: 1400,
  url: backgroundMp4,
  json: backgroundJSON,
  loop: true,
  useType: 2,
  accurate: false,
})

const mConfig = ref({
  width: 750,
  height: 1400,
  url: successMp4,
  json: successJSON,
  loop: false,
  useType: 2,
  accurate: false,
  onEnded: () => {
    if (playCatch.value) {
      openResult()
      playCatch.value = false
    }
  },
})

const btnGroup = ref([
  {
    id: 1,
    btnImage: Doll1Btn,
    dollImage: Doll1Image,
    active: true,
  },
  {
    id: 2,
    btnImage: Doll2Btn,
    dollImage: Doll2Image,
    active: false,
  },
  {
    id: 3,
    btnImage: Doll3Btn,
    dollImage: Doll3Image,
    active: false,
  },
  {
    id: 4,
    btnImage: Doll4Btn,
    dollImage: Doll4Image,
    active: false,
  },
])

const handleBack = () => {
  js_sync_back()
}

const activeBtn = computed(() => {
  return btnGroup.value.filter(i => i.active)[0]
})

const leftTxt = computed(() => {
  if (taskNum.value <= taskList.value[0].number)
    return (taskNum.value === taskList.value[0].number ? taskList.value[1].number - taskNum.value : taskList.value[0].number - taskNum.value)
  else if (taskNum.value <= taskList.value[1].number)
    return (taskNum.value === taskList.value[1].number ? taskList.value[2].number - taskNum.value : taskList.value[1].number - taskNum.value)
  else if (taskNum.value <= taskList.value[2].number)
    return (taskNum.value === taskList.value[2].number ? taskList.value[3].number - taskNum.value : taskList.value[2].number - taskNum.value)
  else if (taskNum.value <= taskList.value[3].number)
    return (taskNum.value === taskList.value[3].number ? 100 : taskList.value[3].number - taskNum.value)
})

const onReady = (player) => {
  player.player.play()
}

const onMReady = (player) => {
  setTimeout(() => {
    player.player.play()
  }, 100)
}

const roundToOneDecimal = (number: number) => {
  return Number(number.toFixed(1))
}

const setWidth = () => {
  let width = 0
  if (taskNum.value <= taskList.value[0].number)
    width = taskNum.value === taskList.value[0].number ? 25 : roundToOneDecimal(taskNum.value / taskList.value[0].number * 25)

  else if (taskNum.value <= taskList.value[1].number)
    width = taskNum.value === taskList.value[1].number ? 50 : roundToOneDecimal((taskNum.value - taskList.value[0].number) / (taskList.value[1].number - taskList.value[0].number) * 25) + 25

  else if (taskNum.value <= taskList.value[2].number)
    width = taskNum.value === taskList.value[2].number ? 75 : roundToOneDecimal((taskNum.value - taskList.value[1].number) / (taskList.value[2].number - taskList.value[1].number) * 25) + 25 * 2

  else if (taskNum.value <= taskList.value[3].number)
    width = taskNum.value === taskList.value[3].number ? 100 : roundToOneDecimal((taskNum.value - taskList.value[2].number) / (taskList.value[3].number - taskList.value[2].number) * 25) + 25 * 3
  else
    width = 100
  taskWidth.value = width
}

const getTasks = async () => {
  const res = await dollActApi.taskList({}).catch(err => console.log(err))
  if (!res)
    return
  console.log('getTasks >', res)
  taskList.value = res.list
  taskNum.value = res.my_number
  setWidth()
}

const changeTab = (idx: number) => {
  if (activeTabIdx.value === idx + 1)
    return
  getTimesTab.value.forEach((item, index) => {
    item.active = idx === index ? !item.active : false
    if (idx === index && item.active)
      activeTabIdx.value = idx + 1
  })
}

// 用户信息
const getUserInfo = async () => {
  const res = await userMe().catch((err) => {
    console.log(err)
  })
  console.log('[userInfo >]', res)
  user_id.value = res.user.user_id
}

// 账户信息
const getUserAccount = async () => {
  const res = await getUserWallet({}).catch((err) => {
    console.log(err)
  })
  diamond.value = res.diamond * 1 + res.gain * 1
  console.log('[userInfo >]', res)
}

const handleRecharge = () => {
  js_sync_app('js_sync_pay', { user_id: user_id.value }, 'user_id')
}

const getSurpriseVal = async () => {
  const res = await dollActApi.getDollValue({ type: activeBtn.value.id }).catch(err => console.log(err))
  if (!res)
    return
  console.log('getSurpriseVal >', res)
  dollValObj.value = res
}

const initPage = () => {
  getTasks()
  getUserInfo()
  getUserAccount()
  getSurpriseVal()
}

const catchDoll = async () => {
  // if (!skipActive.value) { // 跳过
  //   mConfig.value = Object.assign(mConfig.value, {any: Math.random()})
  //   setTimeout(() => {
  //     playCatch.value = true
  //   },200)
  // }
  // return
  const res = await dollActApi.getLotteryPrize({ type: activeBtn.value.id, number: getTimesTab.value[activeTabIdx.value - 1].time }).catch((err) => {
    console.log('err >', JSON.parse(err))
    if (JSON.parse(err)?.msg === '余额不足') {
      setTimeout(() => {
        handleRecharge()
      }, 500)
    }
  })
  if (!res)
    return
  initPage()
  itemsRet.value = res.items
  if (!Array.isArray(res.surprise))
    surpriseRet.value = res.surprise
  else
    surpriseRet.value = {}

  if (res.luck)
    luckyRet.value = res.luck
  else
    luckyRet.value = {}

  if (!skipActive.value) { // 跳过
    mConfig.value = Object.assign(mConfig.value, { any: Math.random(), beginPoint: 0.65 })
    setTimeout(() => {
      playCatch.value = true
    }, 200)
  }
  else {
    openResult()
  }
  console.log('confirmCatch >', res)
}

const confirmCatch = throttle(() => {
  if (!playCatch.value)
    catchDoll()
}, 1000)

const openResult = () => {
  resultDialogRef?.value?.openDialog(itemsRet.value)
}

const openSurprise = () => {
  dollRuleDialogRef?.value?.openDialog(surpriseRet.value)
}

const openPrize = () => {
  prizeDialogRef?.value?.openDialog()
}

const openLucky = () => {
  luckyDialogRef?.value?.openDialog()
}
const openExchangeDialog = () => {
  exchangeDialogRef?.value?.setVisible(true)
}

const openRecord = () => {
  recordDialogRef?.value?.openDialog()
}

const openDollDialog = () => {
  console.log('openDollDialog >============')
  if (Object.keys(surpriseRet.value).length)
    dollDialogRef?.value?.openDialog(surpriseRet.value)

  if (Object.keys(luckyRet.value).length)
    dollDialogRef?.value?.openDialog(luckyRet.value)
}

const openDialog = (index: number) => {
  if (index === 0)
    openPrize()
  if (index === 1)
    openLucky()
  if (index === 2)
    openExchangeDialog()
  if (index === 3)
    openRecord()
  if (index === 4)
    openSurprise()
}

const changeBtn = (type: number) => {
  // 1 - 上一个  2 - 下一个
  let idx = btnGroup.value.findIndex(i => i.active)
  if (type === 1) {
    if (idx <= 0)
      idx = 3
    else
      idx -= 1
  }
  if (type === 2) {
    if (idx >= 3)
      idx = 0
    else
      idx += 1
  }
  btnGroup.value.forEach((item, index) => {
    item.active = index === idx
  })
  getSurpriseVal()
}

const getTaskReward = async (id: number) => {
  const res = await dollActApi.getTaskPrize({ task_id: id }).catch((err) => { console.log(err) })
  if (!res)
    return
  showToast('领取成功！')
  getTasks()
  console.log(res)
}

// hook使用
// useHandleData(true, () => {
// })

onMounted(() => {
  initPage()
})
</script>

<style lang="scss" scoped>
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

@keyframes scale {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.9);
  }
}

.container-box {
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

  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
  background: linear-gradient(180deg, #fffacf00 -0.06%, #fffacf 7.2%);
  padding: 0;
  margin: 0;
  padding-bottom: 150px;
  box-sizing: border-box;
  position: relative;
  animation: scaleBg 0.75s linear 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  .energy-box {
    width: 73px;
    height: 382px;
    top: 175px;
    left: -5px;
    position: absolute;
    background: url('@/assets/images/doll-activity/left-energy-bg.webp') center
      center / cover no-repeat transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 4px solid rgba(255, 255, 255, 0.8);
    border-radius: 0 20px 20px 0;

    .energy-icon {
      width: 76px;
      height: 76px;
      margin-bottom: 20px;
    }

    .energy-bar-box {
      width: 17px;
      height: 251px;
      background: #ffffffcc;
      border-radius: 40px;
      border: 3px solid rgba(255, 255, 255, 0.5);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      box-sizing: border-box;

      .complete {
        width: 14px;
        border-radius: 20px;
        background: linear-gradient(180deg, #ff3516 0%, #ff918b 100%),
          rgba(255, 255, 255, 0.8);
        transform: translateX(-0.5px);
      }
    }
  }

  .btn-group {
    width: 140px;
    right: 0;
    top: 50px;
    position: absolute;
    z-index: 99;
    overflow: hidden;
    height: auto;

    .item-btn {
      width: 140px;
      height: 140px;
      border-radius: 14px 0 0 14px;
      background-color: #ffe1ad;
      margin-bottom: 25px;
    }
  }

  .confirm-container {
    position: relative;
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 1000px;
    margin-bottom: 25px;

    .pre-btn {
      width: 65px;
      height: 73px;
      background: url('@/assets/images/doll-activity/pre-btn.webp') center
        center / cover no-repeat transparent;
    }

    .next-btn {
      width: 65px;
      height: 73px;
      background: url('@/assets/images/doll-activity/next-btn.webp') center
        center / cover no-repeat transparent;
    }

    .pre-btn,
    .next-btn {
      animation: scale 1.5s linear 0s infinite;
    }

    .confirm-btn {
      width: 265px;
      height: 256px;
      border-radius: 50%;
      z-index: 99;
    }

    .skip-btn {
      position: absolute;
      bottom: 20px;
      right: -130px;
      width: 200px;
      background: transparent;
      height: 34px;
      font-weight: 500;
      color: #ff563f;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .skip-icon {
        width: 28px;
        height: 28px;
        margin-right: 6px;
        background: url('@/assets/images/doll-activity/skip-cancel.webp') center
          center / cover no-repeat transparent;
      }

      .skip-txt {
        font-size: 24px;
        line-height: 24px;
        transform: translateY(2px);
        font-weight: bold;
        white-space: nowrap;
      }
    }
  }

  .times-box {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 40px;
    z-index: 99;

    .times-item {
      width: 210px;
      height: 118px;
      border-radius: 88px;
      font-weight: 600;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .times {
        font-size: 32px;
      }

      .price {
        font-size: 26px;
      }
    }
  }

  .my-account {
    margin-bottom: 32px;
    font-size: 32px;
    font-weight: 500;
    display: flex;
    align-items: center;
    font-weight: 600;
    color: #fb6161;

    .diamond-num {
      margin-right: 20px;
      line-height: 32px;
    }

    .recharge {
      width: 169px;
      height: 61px;
      background: url('@/assets/images/doll-activity/recharge-btn.webp') center
        center / cover no-repeat transparent;
    }
  }

  .task-box {
    width: 676px;
    height: 593px;
    background: url('@/assets/images/doll-activity/daily-task-bg.webp') center
      center / cover no-repeat transparent;
    border-radius: 20px;
    margin-bottom: 27px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 90px;

    .task-sub-title {
      color: #666666;
      font-size: 22px;
      font-weight: 400;
      margin-bottom: 90px;
    }

    .progress-box {
      width: 628px;
      height: 8px;
      background-color: #d9d9d9;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 81px;
      position: relative;

      .complete-bar {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        height: 8px;
        border-radius: 41px;
        background: linear-gradient(180deg, #ff3516 0%, #ff918b 100%), #d9d9d9;
      }

      .left-dialog {
        width: 131px;
        height: 38px;
        background: #ff5f4b;
        border-radius: 11px;
        position: absolute;
        right: -65px;
        top: -55px;
        color: #fff;
        font-size: 22px;
        text-align: center;
        align-items: center;
        line-height: 38px;

        .arrow {
          width: 15px;
          height: 15px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -10px;
          background: url('@/assets/images/doll-activity/arrow-down.webp')
            center center / cover no-repeat transparent;
        }
      }

      .progress-item {
        height: 70px;
        width: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        transform: translateY(23px);

        .red-dot-box {
          width: 26px;
          height: 26px;
          display: flex;
          justify-content: center;
          align-items: center;

          .red-dot {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: #f97676;
          }
        }

        .red-star {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: url('@/assets/images/doll-activity/star-icon.webp') center
            center / cover no-repeat transparent;
        }

        .progress-num {
          color: #ff5640;
          font-weight: 600;
          font-size: 28px;
        }
      }
      .progress-item {
        transform: translate(0px, 23px);
      }

      .progress-item.first {
        align-items: flex-start;
        transform: translate(0px, 23px);
      }
      .progress-item:nth-child(5) {
        transform: translate(6px, 23px);
      }

      .progress-item:last-child {
        align-items: flex-end;
        transform: translate(0px, 23px);
      }
    }

    .task-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 13px;

      .task-item {
        display: flex;
        flex-direction: column;
        align-items: center;

        .task-img {
          width: 142px;
          height: 142px;
          border-radius: 24px;
          background-color: #d9d9d9 !important;
        }

        .task-name {
          font-size: 24px;
          color: #000000;
          font-weight: 400;
          margin: 13px auto;
        }

        .task-status {
          width: 138px;
          height: 67px;
          border-radius: 88px;
          color: #b04f00;
          font-weight: 500;
          font-size: 24px;
          text-align: center;
          line-height: 67px;
        }

        .task-status0 {
          background: url('@/assets/images/doll-activity/notFinishBtn.webp')
            center center / cover no-repeat transparent;
        }

        .task-status1 {
          background: url('@/assets/images/doll-activity/getRewardBtn.webp')
            center center / cover no-repeat transparent;
        }

        .task-status2 {
          background: url('@/assets/images/doll-activity/hasFinishedBtn.webp')
            center center / cover no-repeat transparent;
        }
      }
    }
  }

  .act-rule-box {
    width: 676px;
    height: 966px;
    border-radius: 20px;
    background: url('@/assets/images/doll-activity/act-rule-bg.webp') center
      center / cover no-repeat transparent;
  }

  .header-bg {
    position: absolute;
    top: 0;
    left: 0;
  }

  .machine-box,
  .catch-box {
    width: 100vw;
    height: 1400px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .machine-box {
    background: url('@/assets/images/doll-activity/machine.png') center center /
      cover no-repeat transparent;
  }

  :deep(canvas) {
    width: 100% !important;
    height: 1400px !important;
  }
}
</style>
