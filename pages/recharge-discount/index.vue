<template>
  <div class="container-box" :class="[packageVisible ? 'h100vhClass' : '']">
    <!-- 返回按钮 -->
    <div class="back-wrap cursor-pointer" @click="handleBack">
      <img :src="backIcon" alt="">
    </div>
    <div class="header-bg" />
    <!-- 折扣商城 -->
    <div class="discount-btn cursor-pointer" @click="openStore" />
    <!-- 首充和超值购 -->
    <div class="top-box">
      <div class="left-box">
        <div class="recharge-btn" @click="toCharge" />
      </div>
      <div class="right-box">
        <div
          class="shop-btn cursor-pointer" :class="[actInfo?.valueBuy?.can_buy ? '' : 'shop-btn-has-buy']"
          @click="changePackageVisible"
        />
      </div>
    </div>
    <div class="rule-box">
      <div class="rule-title-1" />
      <div class="tips-1">
        活跃任务：每日累计逛10个房间（单个房间需停留1分钟以上）
      </div>
      <div class="progress-box">
        <div class="progress-text">
          当前累积完成任务：{{ actInfo?.activeDiscountCard?.done_times }}天
        </div>
      </div>

      <div class="card-box">
        <div
          v-for="(item, index) in actInfo?.activeDiscountCard?.list" :key="index" class="card-item cursor-pointer"
          @click="getCard(item?.user_card_info?.user_discount_card_id, 1, item?.user_card_info)"
        >
          <div class="card-img" :style="`background:url(${item.pic})  center center / cover no-repeat transparent`">
            <div
              v-if="item.showStatus" class="get-status"
              :style="`color: ${item?.user_card_info?.is_get === 1 ? '#666666' : '#EB5241'}`"
            >
              {{ item?.user_card_info?.is_get === 1 ? '已领取' : '未领取' }}
            </div>
          </div>
          <div class="text-rule">
            <div>累积完成任务</div>
            <div>
              {{ index + 4 }}天领取
            </div>
          </div>
        </div>
      </div>

      <div class="task-box">
        <div class="task-title" />
        <div class="task-item">
          <div class="task-name">
            任务1:每日关注3个好友
          </div>
          <div class="task-detail">
            并且发送3条私聊信息
          </div>
          <div class="task-img">
            <div class="task-text-box">
              <div class="card-name">
                装扮商城7折卡
              </div>
              <div class="task-progress">
                累积完成任务3天领取（{{ actInfo?.firstRechargeDiscountCard?.list[0].done_days }}/3）
              </div>
            </div>

            <div
              class="get-btn cursor-pointer"
              :style="`background:url(${[0].includes(actInfo?.firstRechargeDiscountCard?.list[0]?.button_type) ? getBtnAble : getBtnDisaAble})  center center / cover no-repeat transparent`"
              @click="getCard(actInfo?.firstRechargeDiscountCard?.list[0]?.user_card_info?.user_discount_card_id, 2, actInfo?.firstRechargeDiscountCard?.list[0])"
            />
          </div>
        </div>

        <div class="task-item">
          <div class="task-name">
            任务2:每日累计逛10个房间
          </div>
          <div class="task-detail">
            单个房间需停留1分钟及以上
          </div>
          <div class="task-img">
            <div class="task-text-box">
              <div class="card-name">
                靓号商城7折卡
              </div>
              <div class="task-progress">
                累积完成任务3天领取（{{ actInfo?.firstRechargeDiscountCard?.list[1]?.done_days }}/3）
              </div>
            </div>

            <div
              class="get-btn cursor-pointer"
              :style="`background:url(${[0].includes(actInfo?.firstRechargeDiscountCard?.list[1].button_type) ? getBtnAble : getBtnDisaAble})  center center / cover no-repeat transparent`"
              @click="getCard(actInfo?.firstRechargeDiscountCard?.list[1]?.user_card_info?.user_discount_card_id, 2, actInfo?.firstRechargeDiscountCard?.list[1])"
            />
          </div>
        </div>

        <div class="tips">
          <div>注：活动期间获取的折扣卡，仅用户折扣商城购买，仅购买时享</div>
          <div>有优惠，续费续按照原价支付。</div>
        </div>
      </div>
    </div>
    <!-- 礼包弹窗 -->
    <PackageDialog v-if="packageVisible" :user-id="user_id" @init="changePackageVisible" />
    <!-- 折扣商城弹窗 -->
    <StoreDialog ref="storeRef" :user-id="user_id" @init="changeStoreVisible" />
  </div>
</template>

<script setup lang="ts">
import PackageDialog from '@/components/recharge-discount/PackageDialog.vue'
import StoreDialog from '@/components/recharge-discount/StoreDialog.vue'
import getBtnDisaAble from '@/assets/images/recharge-discount/get-btn-disable.webp'
import getBtnAble from '@/assets/images/recharge-discount/get-btn.webp'
import discard6DressInactive from '@/assets/images/recharge-discount/discountCard6-dress-inactive.webp'
import discard6DressActive from '@/assets/images/recharge-discount/discountCard6-dress-active.webp'
import discard5DressInactive from '@/assets/images/recharge-discount/discountCard5-dress-inactive.webp'
import discard5DressActive from '@/assets/images/recharge-discount/discountCard5-dress-active.webp'
import discard6NumActive from '@/assets/images/recharge-discount/discountCard6-num-active.webp'
import discard6NumInactive from '@/assets/images/recharge-discount/discountCard6-num-inactive.webp'
import discard5NumInActive from '@/assets/images/recharge-discount/discountCard5-num-inactive.webp'
import discard5NumActive from '@/assets/images/recharge-discount/discount5NumCard.webp'
import backIcon from '@/assets/images/common/back-icon.webp'
import { rechargeDiscountApi } from '@/api/index'
import { userMe } from '@/api/modules/common'

const packageVisible = ref(false)
const storeRef = ref<StoreDialog | null>(null)
const actInfo = ref({})
const user_id = ref(0)

const handleBack = () => {
  js_sync_back()
}

// 去充值
const toCharge = () => {
  js_sync_app('js_sync_pay', user_id.value)
}

// 道具背包
const openStore = () => {
  storeRef.value?.open()
}

// 用户信息
const getUserInfo = async () => {
  const res = await userMe().catch((err) => {
    console.log(err)
  })
  console.log('[userInfo >]', res)
  user_id.value = res.user.user_id
}

const getActInfo = async () => {
  const res = await rechargeDiscountApi.getActInfo().catch(err => console.log(err))
  actInfo.value = res
  const done_day = res?.activeDiscountCard?.done_times
  actInfo.value.activeDiscountCard.list = actInfo.value.activeDiscountCard.list.map((item, index) => {
    if (index <= 1) {
      if (item?.user_card_info?.length === 0)
        item.pic = index === 0 ? discard6DressInactive : discard6NumInactive

      else
        item.pic = index === 0 ? discard6DressActive : discard6NumActive
    }
    else {
      if (item?.user_card_info?.length === 0)
        item.pic = index === 2 ? discard5DressInactive : discard5NumInActive

      else
        item.pic = index === 2 ? discard5DressActive : discard5NumActive
    }
    item.showStatus = done_day >= index + 4
    return { ...item }
  })
  console.log('actInfo.value', actInfo.value)
}

const initPage = () => {
  getUserInfo()
  getActInfo()
}

const getCard = async (id, type, user_card_info) => {
  if (type === 1) {
    if (user_card_info.length === 0) {
      showToast('任务未完成无法领取!')
      return
    }
    if (user_card_info?.is_get) {
      showToast('已领取，去折扣商城看看吧!')
      return
    }
  }
  else {
    const item = user_card_info
    const button_type = item.button_type
    if (button_type === 1) {
      showToast('活动期间仅首次充值用户参与!')
      return
    }
    if (button_type === 2) {
      showToast('首次充值后开启任务!')
      return
    }
    if (button_type === 3) {
      showToast('任务已过期!')
      return
    }
    if (button_type === 4) {
      showToast('任务未完成无法领取!')
      return
    }
    if (button_type === 5) {
      showToast('已领取，去折扣商城看看吧!')
      return
    }
  }
  const res = await rechargeDiscountApi.getCard({ user_discount_card_id: id }).catch(err => console.log(err))
  if (!res)
    return
  showToast('领取成功去折扣商城看看吧!')
  initPage()
}

// useHandleData(true, () => {
// })

const changePackageVisible = () => {
  if (!actInfo.value?.valueBuy?.can_buy)
    return
  packageVisible.value = !packageVisible.value
  if (!packageVisible.value)
    initPage()
}

const changeStoreVisible = () => {
  initPage()
}

onMounted(() => {
  initPage()
})
</script>

<style lang="scss" scoped>
@keyframes scale {
  0%,
  100% {
    transform: translateX(-50%) scale(1);
  }

  50% {
    transform: translateX(-50%) scale(0.95);
  }
}

@keyframes noScale {
  0%,
  100% {
    transform: scale(1) translateX(-50%);
  }

  50% {
    transform: scale(1) translateX(-50%);
  }
}

.h100vhClass {
  height: 100vh !important;
  max-height: 100vh !important;
  overflow: hidden;
}

.container-box {
  background: linear-gradient(
      173deg,
      #b0fe0033 1.28%,
      #ffe71433 14.85%,
      #ffffff00 98.06%
    ),
    linear-gradient(180deg, #f1fcfd 0%, #f9fcf8 100%);
  padding-bottom: 300px;
  min-height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .header-bg {
    width: 100vw;
    height: 519px;
    background: url('@/assets/images/recharge-discount/header-bg.webp') center
      center / cover no-repeat transparent;
  }
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

  .discount-btn {
    position: absolute;
    right: 34px;
    top: 1300px;
    z-index: 999;
    width: 157px;
    height: 52px;
    background: url('@/assets/images/recharge-discount/discount-btn.webp')
      center center / cover no-repeat transparent;
  }

  .top-box {
    display: flex;
    justify-content: space-between;
    margin: 0 auto 54px;
    width: 687px;

    .left-box {
      width: 329px;
      height: 741px;
      background: url('@/assets/images/recharge-discount/first-package.webp')
        center center / cover no-repeat transparent;
      position: relative;
      .recharge-btn {
        left: 50%;
        transform: translateX(-50%);
        background: url('@/assets/images/recharge-discount/go-recharge.webp')
          center center / cover no-repeat transparent;
        position: absolute;
        bottom: 35px;
        width: 273px;
        height: 62px;
        animation: scale 1.1s linear infinite;
      }
    }

    .right-box {
      width: 329px;
      height: 741px;
      background: url('@/assets/images/recharge-discount/discount-buy.webp')
        center center / cover no-repeat transparent;
      position: relative;

      .shop-btn {
        position: absolute;
        width: 273px;
        height: 62px;
        bottom: 35px;
        left: 50%;
        background: url('@/assets/images/recharge-discount/shop-btn.webp')
          center center / cover no-repeat transparent;
        transform: scale(1) translateX(-50%);
        animation: scale 1.1s linear infinite;
      }

      .shop-btn-has-buy {
        background: url('@/assets/images/recharge-discount/shop-btn-inactive.webp')
          center center / cover no-repeat transparent;
        animation: noScale 2s linear infinite;
      }
    }
  }

  .rule-box {
    width: 686px;
    margin: 0 auto;

    .rule-title-1 {
      width: 416px;
      height: 38px;
      margin-bottom: 12px;
      background: url('@/assets/images/recharge-discount/rule-title-1.webp')
        center center / cover no-repeat transparent;
    }

    .tips-1 {
      color: #666666;
      font-size: 24px;
      font-weight: 500;
      font-family: 'PingFang SC';
      margin-bottom: 20px;
    }

    .progress-box {
      width: 367px;
      // background: linear-gradient(90deg, #eb5241 0%, #ec7771 100%);
      height: 42px;
      font-family: 'PingFang SC';
      font-size: 28px;
      font-style: normal;
      font-weight: 600;
      line-height: 42px;
      padding-left: 24px;
      color: #fff;
      border-top: 42px solid #eb5241;
      border-right: 42px solid transparent;
      border-bottom: 42px solid transparent;
      border-top-left-radius: 9px;
      border-top-right-radius: 9px;
      border-bottom-left-radius: 9px;
      position: relative;

      .progress-text {
        position: absolute;
        top: -40px;
        left: 10px;
      }
    }

    .card-box {
      display: flex;
      gap: 16px;
      .card-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 160px;

        .card-img {
          width: 160px;
          height: 203px;
          margin-bottom: 14px;

          .get-status {
            text-align: center;
            font-size: 20px;
            padding-top: 5px;
          }
        }

        .text-rule {
          width: 120px;
          height: 56px;
          font-size: 20px;
          color: #666666;
          text-align: center;
          div {
            font-size: 20px;
            white-space: nowrap;
          }
        }
      }
    }

    .task-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 40px;
      .task-title {
        width: 686px;
        height: 85px;
        margin: 0 auto 24px;
        background: url('@/assets/images/recharge-discount/task-title.webp')
          center center / cover no-repeat transparent;
      }
      .task-item {
        color: #666666;
        font-size: 24px;
        margin-bottom: 31px;

        .task-name {
          margin-bottom: 8px;
          font-weight: bolder;
        }

        .task-detail {
          font-weight: 400;
          margin-bottom: 16px;
        }

        .task-img {
          width: 686px;
          height: 138px;
          background: url('@/assets/images/recharge-discount/task-img.webp')
            center center / cover no-repeat transparent;
          display: flex;
          padding: 30px 24px 30px 138px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .task-text-box {
            .card-name {
              margin-bottom: 6px;
              font-size: 28px;
              font-weight: 600;
              color: #eb5241;
            }

            .task-progress {
              font-size: 22px;
              color: #666666;
              font-weight: 600;
            }
          }

          .get-btn {
            width: 185px;
            height: 62px;
          }
        }
      }

      .tips {
        font-size: 24px;
        color: #666666;
        font-weight: 600;
      }
    }
  }
}
</style>
