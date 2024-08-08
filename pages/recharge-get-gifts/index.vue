<template>
  <div class="rechargeGift-page">
      <div class="rechargeGift-main">
        <div class="rechargeGift-back" @click="handleBack"></div>
  
        <div class="rechargeGift-head">
          <div class="toRecharge" @click="handleRecharge"></div>
        </div>
  
        <div
          :class="['recharge-gift-first-container', hasGetFirstPrize ? 'has-get-gift' : '']"
          :style="`background:url(${hasGetFirstPrize ? hasFirstCharge : noFirstCharge})  center center / cover no-repeat transparent`"
        ></div>
  
        <div class="recharge-gift-twice-container">
          <div class="ticket-num-box" @click="getTicketRecord">礼券: {{ ticket_num }}</div>
          <div class="gift-box"></div>
  
          <div class="open-box-btn">
            <div class="left-btn" @click="getLottery(5)"></div>
  
            <div class="right-btn" @click="getLottery(1)"></div>
          </div>
  
          <div class="tips">完成每日充值任务即可获得对应的礼券，礼券用于抽取甄选好礼</div>
  
          <div class="gift-rule-table"></div>
  
          <div class="charge-today">
            今日已充值：<span class="charge-num-today">{{ recharge_amount || 0 }}元</span>
          </div>
        </div>
  
        <div class="recharge-strategy-container"></div>
      </div>
      <LotteryDialog ref="lotteryRef" @init="init" />
      <TickRecDialog ref="recordRef" />
  </div>
</template>

<script setup lang="ts">
import hasFirstCharge from "@/assets/images/recharge-get-gifts/recharge-gift-first-bg-true.png";
import noFirstCharge from "@/assets/images/recharge-get-gifts/recharge-gift-first-bg-false.png";
import LotteryDialog from "@/components/recharge-get-gifts/LotteryDialog.vue";
import TickRecDialog from "@/components/recharge-get-gifts/TickRecDialog.vue";
import { getRechargeUserCard,getRechargeActInfo,userMe } from "@/api/modules/recharge";
import { useUserStore } from '@/store';
import { js_sync_app , isIosFun } from '@/utils/index';
const recharge_amount = ref(0);
const ticket_num = ref(0);
const hasGetFirstPrize = ref(false);
const userStore = useUserStore();
const lotteryRef = ref<LotteryDialog | null>(null);
const recordRef = ref<TickRecDialog | null>(null);
let user_id = ref(0);

const getCards = async () => {
  const res = await getRechargeUserCard();
  console.log('[ res > ]',res);
  if(!res){
    return
  }
  ticket_num.value = res.cards;
}

const getActInfo = async () => {
  const res = await getRechargeActInfo();
  recharge_amount.value = (Math.floor(res.todayRecharge / 100));
  hasGetFirstPrize.value = res.package_status;
}

const getLottery = (num: number) => {
  lotteryRef?.value.getLotteryGift(num);
}


const getTicketRecord = () => {
  recordRef?.value.getRecord();
}

const init = () => {
  getCards();
  getActInfo();
  getUserMe();
}

// useHandleData(true,() => {
//   // await getPetManorInfo();
//   // await preLoadSvg();
//   init();
// });

onMounted(() => {
  init();
})

const handleBack = ()=>{
  const params = {
    // params用于给安卓指令用的 - 不携带参数 - 安卓接收不到指令
    type: 'back',
  };
  const backText = isIosFun() === true ? 'js_sync_back' : 'js_app_back';
  js_sync_app(backText, params, 'type');
}

const getUserMe = async ()=>{
  let res = await userMe();
  user_id.value = res.user_id;
  console.log(res,"res======")
}


const handleRecharge = ()=>{
  console.log(user_id.value,"user_id.value====")
  js_sync_app('js_sync_pay', user_id.value);
}


</script>

<style lang="scss" scoped>
.has-get-gift {
  height: 623px!important
}
@keyframes scale1 {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.9);
  }
}
.rechargeGift-main {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  background: linear-gradient(90deg, #feeccf 0%, #fcf3e3 57%, #feefeb 100%);
  box-sizing: content-box;
  padding-bottom: 100px;
  .rechargeGift-back {
      width: 60px;
      height: 60px;
      position: fixed;
      top: 74px;
      left: 28px;
      z-index: 6;
      background: url('@/assets/images/recharge-get-gifts/back_icon.png') no-repeat center;
      background-size: 100% 100%;
    }

    .rechargeGift-back:active {
      transform: scale(0.95);
    }
    .rechargeGift-head {
      width: 100%;
      height: 778px;
      background: url('@/assets/images/recharge-get-gifts/head-bg.png') no-repeat center top / cover;
      .toRecharge {
        width: 253px;
        height: 88px;
        background: url('@/assets/images/recharge-get-gifts/toRecharge.png') no-repeat center top / cover;
        position: fixed;
        right: -15px;
        top: 30%;
        z-index: 999;
        animation: scale1 1.5s linear 0s infinite;
      }
    }
    .recharge-gift-first-container {
      width: 686px;
      height: 534px;
      margin: 0 auto;
      transform: translateY(-110px);
      background: url('@/assets/images/recharge-get-gifts/recharge-gift-first-bg-false.png') no-repeat center top / cover;
    }
    .recharge-gift-twice-container {
      width: 686px;
      height: 1280px;
      margin: 42px auto 0;
      transform: translateY(-110px);
      background: url('@/assets/images/recharge-get-gifts/recharge-gift-twice-bg.png') no-repeat center top / cover;
      padding-top: 200px;
      position: relative;
      .ticket-num-box {
        text-align: center;
        position: absolute;
        right: 40px;
        top: 133px;
        min-width: 166px;
        height: 53px;
        line-height: 53px;
        font-size: 28px;
        background: #ff9d38;
        padding: 0px 18px;
        border-radius: 6px;
        color: #fff;
      }
      .gift-box {
        width: 386px;
        height: 276px;
        margin: 0 auto;
        background: url('@/assets/images/recharge-get-gifts/gift-box.png') no-repeat center top / cover;
      }
      .open-box-btn {
        height: 110px;
        margin: 33px auto 0;
        padding: 0 30px;
        display: flex;
        align-items:center;
        justify-content: space-between;
        .left-btn {
          width: 296px;
          height: 100px;
          background: url('@/assets/images/recharge-get-gifts/open-five-btn.png') no-repeat center top / cover;
          animation: scale1 1.5s linear 0s infinite;
        }
        .right-btn {
          width: 296px;
          height: 100px;
          background: url('@/assets/images/recharge-get-gifts/open-one-btn.png') no-repeat center top / cover;
          animation: scale1 1.5s linear 0s infinite;
        }
      }
      .tips {
        margin: 25px auto 0;
        color: #000000;
        font-family: 'PingFang SC';
        font-size: 28px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        width: 590px;
      }
      .gift-rule-table {
        width: 622px;
        height: 351px;
        margin: 48px auto 0;
        background: url('@/assets/images/recharge-get-gifts/gift-rule-table.png') no-repeat center top / cover;
      }
      .charge-today {
        margin: 46px auto 0;
        font-size: 32px;
        width: 70%;
        color: #000000;
        font-family: 'PingFang SC';
        text-align: center;
        font-weight: 500;
        line-height: 32px;
        .charge-num-today {
          font-size: 32px;
          color: #ff7a00;
          padding-left: 5px;
          font-weight: 500;
          line-height: 32px;
        }
      }
      .open-ticket-btn {
        width: 392px;
        height: 110px;
        margin: 46px auto 0;
        background: url('@/assets/images/recharge-get-gifts/open-ticket-btn.png') no-repeat center top / cover;
        animation: scale1 1.5s linear 0s infinite;
      }
    }
    .recharge-strategy-container {
      transform: translateY(-110px);
      width: 686px;
      height: 1152px;
      margin: 57px auto 0;
      background: url('@/assets/images/recharge-get-gifts/recharge-strategy-bg.png') no-repeat center top / cover;
    }
}
</style>
