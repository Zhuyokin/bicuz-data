<template>
  <div class="record-dialog">
    <van-popup v-model:show="recordVisible" :show-cancel-button="false" :showConfirmButton="false" finished-text="没有更多了" >
      <div class="mainBox">
        <div class="markhead">
          <div class="markheadItem" v-for="(item,index) in markHead" :key="index">{{ item.name }}</div>
        </div>
        <div class="divider"></div>
        <div>
          <div class="itemBox" v-for="(item,index) in recordList" :key="index">
            <div class="item">{{ timeFormat(item.provide_time * 1000, (format = 'MM-DD')) }}</div>
            <div class="item">{{ item.num }}</div>
          </div>
          <div style="margin: 0 auto;text-align: center;">没有更多了</div>
        </div>
        <div id="close" @click="handleClose"></div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { prependHttpIfMissing } from '@/utils/index';
import { getRechargeUserCard } from '@/api/modules/recharge';
import { timeFormat } from '@/utils/index';
let recordVisible = ref(false);
let markHead = ref([
  {
    id: 1,
    name: '时间',
  },
  {
    id: 2,
    name: '数量',
  },
]);
let recordList = ref([]);
let getRecord = async () => {
  const res = await getRechargeUserCard({
    type: 2,
    page: 1,
    pagesize: 50,
  });
  console.log(res)
  if (!res) {
    return;
  }
  recordList.value = res;
  recordVisible.value = true;
};

const handleClose = () => {
  recordVisible.value = false;
};

defineExpose<{ getRecord: () => void }>({ getRecord });
</script>

<style lang="scss" scoped>
.record-dialog::-webkit-scrollbar {
  display: none !important;
}
.record-dialog {
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
  background: url('@/assets/images/recharge-get-gifts/record_bg.png') no-repeat center;
  background-size: 100% 100%;
  padding-top: 98px;
  border-radius: 12px;
  position: relative;
  .markhead {
    width: 638px;
    height: 42px;
    // background: #ffbb8d!important;
    border-radius: 21px;
    margin: auto;
    margin-top: 20px;
    font-size: 24px;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .markheadItem {
      font-size: 32px;
      width: 190px;
      text-align: center;
    }
  }
  .divider {
    width: 90%;
    height: 2px;
    margin: 20px auto;
    background-color: #eeeeee;
  }
  .itemBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    margin-bottom: 10px;
    color: #000;
    .item {
      height: 50px;
      line-height: 50px;
      width: 190px;
      font-size: 32px;
      color: #000;
      text-align: center;
    }
    .item:nth-child(2) {
      width: 200px;
    }

    .item:last-child {
      margin-right: 0;
      border: none;
    }
  }
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
</style>
