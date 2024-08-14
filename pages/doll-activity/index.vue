<template>
  <!-- 抓娃娃活动 -->
  <div class="container-box" ontouchstart="" onmouseover="">
    <!-- 顶部背景 -->
    <div class="header-bg">
      <anim-player
        :conf="config"
        @ready="onReady"
      />
    </div>
    <div v-if="!playCatch" class="machine-box" />
    <div v-else class="catch-box">
      <anim-player
        :conf="mConfig"
        @ready="onMReady"
      />
    </div>
    <!-- 能量条 -->
    <div v-motion-pop-visible-once class="energy-box" @click="openDialog(4)">
      <div class="energy-icon" />
      <div class="energy-bar-box">
        <div class="complete" :style="`height: ${dollValObj?.surprise_value}%`" />
      </div>
    </div>
    <!-- 右侧按钮组 -->
    <div v-motion-pop-visible-once class="btn-group">
      <div
        v-for="(item, index) in rightBtns"
        :key="index" class="rule-btn item-btn scale-btn"
        :style="`background:url(${item.pic})  center center / cover no-repeat transparent`"
        @click="openDialog(index)"
      />
    </div>
    <div v-motion-pop-visible-once class="confirm-container">
      <!-- 确认按钮 -->
      <div v-motion-pop-visible-once class="confirm-btn" @click="confirmCatch()" />
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
    <FukuiDialog ref="fukuiDialogRef" @success="initPage" />
    <!-- 惊喜娃娃 -->
    <SurpriseDialog ref="surpriseDialogRef" @success="initPage" />
    <!-- 奖品 -->
    <PrizeDialog ref="prizeDialogRef" @success="initPage" />
    <!-- 欧皇 -->
    <LuckyDialog ref="luckyDialogRef" @success="initPage" />
    <!-- 兑换商城 -->
    <ExchangeDialog ref="exchangeDialogRef" @success="initPage" />
    <!-- 记录 -->
    <RecordDialog ref="recordDialogRef" @success="initPage" />
    <!-- 娃娃弹窗 -->
    <DollDialog ref="dollDialogRef" :type="1" @success="initPage" />
  </div>
</template>

<script setup lang="ts">
import { dollActApi } from '@/api/index'
import FukuiDialog from '@/components/doll-activity/FukuiDialog.vue'
import ExchangeBtn from '@/assets/images/doll-activity/exchange-btn.webp'
import LuckyBtn from '@/assets/images/doll-activity/lucky-btn.webp'
import PrizeBtn from '@/assets/images/doll-activity/prize-btn.webp'
import RecBtn from '@/assets/images/doll-activity/rec-btn.webp'
import TimeBtnActive from '@/assets/images/doll-activity/time-btn-active.webp'
import TimeBtnInActive from '@/assets/images/doll-activity/time-btn-inactive.webp'
import skipConfirmBtn from '@/assets/images/doll-activity/skip-confirm.webp'
import skipCancelBtn from '@/assets/images/doll-activity/skip-cancel.webp'
import { isIosFun, js_sync_app, prependHttpIfMissing } from '@/utils/index'
import SurpriseDialog from '~/components/doll-activity/SurpriseDialog.vue'
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
const fukuiDialogRef = ref<HTMLElement | null>(null)
const surpriseDialogRef = ref<HTMLElement | null>(null)
const exchangeDialogRef = ref<HTMLElement | null>(null)
const prizeDialogRef = ref<HTMLElement | null>(null)
const luckyDialogRef = ref<HTMLElement | null>(null)
const recordDialogRef = ref<HTMLElement | null>(null)
const dollDialogRef = ref<HTMLElement | null>(null)
const activeTabIdx = ref(0)
const skipActive = ref(false)
const taskNum = ref(0)
const user_id = ref(0)
const diamond = ref(0)
const dollIdx = ref(1)
const dollValObj = ref({})
const taskWidth = ref(0)
const playCatch = ref(false)
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
    playCatch.value = false
  },
})

const leftTxt = computed(() => {
  if (taskNum.value <= taskList.value[0].number)
    return (taskList.value[0].number - taskNum.value)
  else if (taskNum.value <= taskList.value[1].number)
    return (taskList.value[1].number - taskNum.value)
  else if (taskNum.value <= taskList.value[2].number)
    return (taskList.value[2].number - taskNum.value)
  else if (taskNum.value <= taskList.value[3].number)
    return (taskList.value[3].number - taskNum.value)
})

const onReady = (player) => {
  player.player.play()
}
const onMReady = (player) => {
  player.player.play()
}
const setWidth = () => {
  let width = 0
  if (taskNum.value <= taskList.value[0].number)
    width = (taskNum.value - 0) / (taskList.value[0].number - 0) * 100

  else if (taskNum.value <= taskList.value[1].number)
    width = (taskNum.value - taskList.value[0].number) / (taskList.value[1].number - taskList.value[0].number) * 25 + 25

  else if (taskNum.value <= taskList.value[2].number)
    width = (taskNum.value - taskList.value[1].number) / (taskList.value[2].number - taskList.value[1].number) * 25 + 25 * 2

  else if (taskNum.value <= taskList.value[3].number)
    width = (taskNum.value - taskList.value[2].number) / (taskList.value[3].number - taskList.value[2].number) * 25 + 25 * 3
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
  js_sync_app('js_sync_pay', user_id.value)
}

const getSurpriseVal = async () => {
  const res = await dollActApi.getDollValue({ type: dollIdx.value }).catch(err => console.log(err))
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

const confirmCatch = async () => {
  const res = await dollActApi.getLotteryPrize({ type: dollIdx.value, number: getTimesTab.value[activeTabIdx.value - 1].time }).catch(err => console.log(err))
  if (!res)
    return
  initPage()
  if (!skipActive.value) { // 跳过
    playCatch.value = true
  }
  console.log('confirmCatch >', res)
}

const openFukui = () => {
  fukuiDialogRef?.value?.openDialog()
}

const openSurprise = () => {
  surpriseDialogRef?.value?.openDialog()
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
  dollDialogRef?.value?.openDialog()
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
  // openDollDialog()
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

.container-box {
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
      background: url('@/assets/images/doll-activity/wawa-icon.webp') center
        center / cover no-repeat transparent;
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

      .complete {
        width: 17px;
        border-radius: 40px;
        background: linear-gradient(180deg, #ff3516 0%, #ff918b 100%),
          rgba(255, 255, 255, 0.8);
      }
    }
  }

  .btn-group {
    width: 140px;
    right: 0;
    top: 50px;
    position: absolute;
    z-index: 999;
    // background-color: pink;
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
    .confirm-btn {
      margin-top: 1350px;
      width: 265px;
      height: 256px;
      margin-bottom: 38px;
      border-radius: 50%;
      background: url('@/assets/images/doll-activity/play-btn.webp') center
        center / cover no-repeat transparent;
    }

    .skip-btn {
      position: absolute;
      bottom: 20px;
      right: -180px;
      width: 130px;
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
        transform: translateY(20px);

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

      .progress-item.first {
        align-items: flex-start;
      }

      .progress-item:last-child {
        align-items: flex-end;
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
    height: 883px;
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
