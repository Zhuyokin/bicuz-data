<template>
  <div class="lottery-dialog">
    <van-popup v-model:show="lotteryVisible" :show-cancel-button="false" :showConfirmButton="false">
      <div class="mainBox">
        <div class="result-container">
          <div class="gift-item" v-for="(item, index) in giftList" :key="index">
            <div class="gift-item-top">
              <div class="gift-num">×{{ item.num }}</div>
              <!-- :style="{ background:'url( ' + prependHttpIfMissing(item.img) + ') center center / 100% 100% no-repeat' }" -->
              <div class="gift-item-img">
                <img style="width: 45px" :src="prependHttpIfMissing(item.img)" alt="" />
              </div>
            </div>
            <div class="gift-item-bottom">
              <div class="gift-name">
                {{ item.name }}
              </div>
              <div class="gift-type">
                {{ item.type }}
              </div>
            </div>
          </div>
        </div>
        <div id="close" @click="handleClose"></div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { prependHttpIfMissing } from '@/utils/index';
import { getLotteryRet } from '@/api/modules/recharge';
let lotteryVisible = ref(false);
let giftList = ref([]);
const emits = defineEmits(['init'])

let getLotteryGift = async (num) => {
  const res = await getLotteryRet({
    type: num,
  });
  if (!res) {
    return;
  }
  console.log("[ res > ] ",res)
  emits('init');
  giftList.value = res.data;
  lotteryVisible.value = true;
};

const handleClose = () => {
  lotteryVisible.value = false;
};

defineExpose<{ getLotteryGift: (num: Number) => void }>({ getLotteryGift });
</script>

<style lang="scss" scoped>
.lottery-dialog::-webkit-scrollbar {
  display: none !important;
}
.lottery-dialog {
  :deep(.van-popup) {
    border-radius: 16px;
  }
  :deep(.van-popup)::-webkit-scrollbar {
    display: none !important;
  }
  :deep(.van-popup) {
    overflow: visible !important;
    width: auto !important;
    background: transparent;
  }
}
.mainBox {
  width: 686px;
  height: 523px;
  background: url('@/assets/images/recharge-get-gifts/has-get-dialog.png') no-repeat center;
  background-size: 100% 100%;
  padding-top: 148px;
  border-radius: 12px;
  position: relative;
  #close {
    position: absolute;
    bottom: -68px;
    left: 0;
    right: 0;
    margin: auto;
    width: 56px;
    height: 56px;
    background: url('@/assets/images/recharge-get-gifts/close.png') no-repeat center;
    background-size: 100% 100%;
  }
}

.result-container {
  padding: 0 50px;
  display: flex;
  justify-content: center;
  .gift-item {
    width: 124px;
    height: 144px;
    // background: linear-gradient( 180deg, #FFE6C8 0%, #FFFFFF 100%);
    border-radius: 6px;
    margin-right: 15px;
    .gift-item-top {
      width: 124px;
      height: 144px;
      background: url('@/assets/images/recharge-get-gifts/gift_bg.png') no-repeat center top / cover;
      position: relative;
      overflow: hidden;
      .gift-num {
        width: 35px;
        height: 33px;
        position: absolute;
        border-radius: 0px 6px 0px 6px;
        right: 0px;
        top: 0;
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
        line-height: 33px;
        font-size: 18px;
      }
      .gift-item-img {
        width: 90px;
        height: 99px;
        margin: 5px auto 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .gift-item-bottom {
      color: #ff480a;
      margin: 26px auto 5px;
      text-align: center;
      .gift-name {
        font-size: 28px;
        font-weight: 500;
        color: #ff480a;
      }
      .gift-type {
        font-size: 22px;
        font-weight: 500;
        color: #ff480a;
      }
    }
  }
}
</style>
