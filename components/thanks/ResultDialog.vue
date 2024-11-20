<template>
  <div class="dialog">
    <van-popup v-model:show="dialogVisible">
      <div class="result-container">
        <div class="result-list">
          <div v-for="(item, index) in retList" :key="index" class="result-item">
            <div class="result-img">
              <div class="result-avatar" :style="`background:url(${prependHttpIfMissing(item?.icon)})  center center / cover no-repeat transparent`" />
              <div class="result-num">
                ×{{ item?.number }}
              </div>
            </div>
            <div class="result-name">
              {{ item?.gift_name }}
            </div>
            <div class="result-price">
              {{ item?.gift_diamond }}钻
            </div>
          </div>
        </div>
        <div class="again-btn scale-btn" @click="lottery">
          再来一次
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { thanksApi } from '~/api'

const emits = defineEmits(['initPage', 'openResult', 'handleSvga'])
const dialogVisible = ref(false)
const times = ref(0)
const retList = ref([{ giftId: 694, gift_diamond: 60, gift_name: 'ComeOn', icon: '/gift_photo/image/6521f1fc48e3b43425d50a20d088ba10.png', is_big: 0, number: 1, title: 'ComeOnX1' }, { giftId: 694, gift_diamond: 60, gift_name: 'ComeOn', icon: '/gift_photo/image/6521f1fc48e3b43425d50a20d088ba10.png', is_big: 0, number: 1, title: 'ComeOnX1' }])
const setVisible = (bool: boolean, list: any[], timesNum: number) => {
  dialogVisible.value = bool
  retList.value = list
  times.value = timesNum
}

const lotteryAgain = async () => {
  const res = await thanksApi.lottery({ number: times.value }).catch(err => console.log(err))
  if (!res)
    return
  console.log('startLottery >', res)
  setVisible(false, [], 0)
  emits('initPage')
  emits('openResult', res.items, times.value)
}

const lottery = () => {
  setVisible(false, [], 0)
  emits('handleSvga', times.value)
}

defineExpose<{ setVisible: (bool: boolean) => void }>({ setVisible })
</script>

<style lang="scss" scoped>
.dialog {
  :deep(.van-popup) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 !important;
    overflow: visible !important;
    width: 562px;
    height: 797px;
    background: url('@/assets/images/thanks/result-dialog.webp') center center /
      cover no-repeat transparent;
  }

  .result-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 160px;

    .result-list {
      margin-bottom: 30px;
      width: 472px;
      height: 473px;
      display: flex;
      flex-wrap: wrap;

      .result-item {
        width: 144px;
        height: 224px;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 24px;
        font-weight: 500;
        margin: 0 20px 24px 0;
        color: #77265e;
        .result-img {
          width: 144px;
          height: 144px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffe4f1;
          border-radius: 36px;
          .result-avatar {
            width: 108px;
            height: 108px;
            background: yellowgreen;
          }

          .result-num {
            min-width: 70px;
            text-align: center;
            padding: 0 15px;
            color: #fff;
            position: absolute;
            right: 0;
            top: 0;
            height: 36px;
            border-radius: 21px;
            background: #ff72d1;
          }
        }
        .result-name {
          width: 100%;
          margin: 15px auto 3px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }
      }
      .result-item:nth-child(3n + 3) {
        margin: 0 0 24px 0;
      }
    }

    .again-btn {
      width: 432px;
      height: 84px;
      border-radius: 126px;
      background: linear-gradient(270deg, #ff4bc6 0%, #ffa9cf 100%);
      text-align: center;
      line-height: 84px;
      font-size: 28px;
      color: #fff;
    }
  }
}
</style>
