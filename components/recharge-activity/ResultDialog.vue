<template>
  <div class="dialog">
    <van-popup v-model:show="dialogVisible" @click-overlay="setVisible(false)">
      <div class="content">
        <div class="close cursor-pointer" @click="setVisible(false)" />
        <div class="list">
          <div v-for="(item, index) in giftList" :key="index" class="ret-item">
            <div class="gift-num">
              {{ item.day === 0 ? item.num : `${item.day * item.num}天` }}
            </div>
            <div class="gift-pic" :style="`background:url(${prependHttpIfMissing(item.img)})  center center / contain no-repeat transparent`" />
            <!-- <div class="gift-pic" :style="`background:url(${Gift1})  center center / contain no-repeat transparent`" /> -->
            <div class="gift-name">
              {{ `${item.name.slice(0, 5)}${item.name.length > 5 ? '...' : ''}` }}
            </div>
            <div class="gift-position">
              {{ item.type }}
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { rechargeActApi } from '@/api/index'
import Gift1 from '@/assets/images/recharge-activity/1-gift.png'
import Gift2 from '@/assets/images/recharge-activity/2-gift.png'
import Gift3 from '@/assets/images/recharge-activity/3-gift.png'

const emits = defineEmits(['initPage'])
const giftList = ref([])
const dialogVisible = ref(false)
const setVisible = (bool: boolean, type?: number) => {
  dialogVisible.value = bool
  if (bool)
    getRecord(type)
  else
    emits('initPage')
}

const getRecord = async (type?: number) => {
  const res = await rechargeActApi.openBox({ type }).catch((err) => {
    console.log('[getDBFGiftRecord >]', err)
  })
  if (!res)
    return
  console.log(res)
  giftList.value = res.data
}

defineExpose<{ setVisible: (bool: boolean) => void }>({ setVisible })
</script>

<style lang="scss" scoped>
.dialog {
  :deep(.van-cell) {
    width: 100%;
    margin: 0 20px;
    border-radius: 20px;
    background: #ffffff !important;
  }
  :deep(.van-popup) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 !important;
    overflow: visible;
    width: 686px;
    height: 564px;

    height: 801px;
    background: url('@/assets/images/recharge-activity/one-ret-bg.webp') center
      center / cover no-repeat transparent;
    background: url('@/assets/images/recharge-activity/five-ret-bg.webp') center
      center / cover no-repeat transparent;
    border-radius: 40px;
    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 686px;
      height: 564px;

      height: 801px;
      padding: 226px 89px 0px;
      color: #b43a04;
      display: flex;
      flex-direction: column;
      align-items: center;
      .list {
        min-height: 376px;
        width: 100%;
        font-size: 24px;
        overflow-y: scroll;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 74px;
        flex-wrap: wrap;
        .ret-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #242424;
          position: relative;
          width: 120px;
          height: 206px;
          .gift-num {
            position: absolute;
            right: 0;
            top: 0;
            border-radius: 61px;
            background: #6869ee;
            min-width: 36px;
            height: 38px;
            line-height: 38px;
            padding: 0 11px;
            color: #fff;
          }
          .gift-pic {
            // border: 3px solid #63bfff;
            width: 124px;
            height: 124px;
            margin-bottom: 16px;
            color: #242424;
            font-size: 28px;
          }
          .gift-name {
            margin-bottom: 10px;
            font-weight: 600;
            white-space: nowrap;
          }
          .gift-position {
            font-weight: 600;
          }
        }
      }
      .close {
        position: absolute;
        top: 81px;
        right: 24px;
        width: 35px;
        height: 35px;
        background: url('@/assets/images/recharge-activity/close-icon.webp')
          center center / cover no-repeat transparent;
      }
    }
  }
}
</style>
