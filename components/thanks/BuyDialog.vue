<template>
  <div class="dialog">
    <van-popup v-model:show="dialogVisible">
      <div class="dialog-container">
        <div class="sugar-box">
          <div class="sugar-img" />
          <div class="sugar-num">
            ×{{ timeNum }}
          </div>
        </div>
        <div class="sugar-text">
          确定消耗{{ timeNum }}个糖果开启盲盒吗？
        </div>
        <div class="btn-box">
          <div class="cancel btnClass scale-btn" @click="setVisible(false)">
            取消
          </div>
          <div class="confirm btnClass scale-btn" @click="lottery">
            确认
          </div>
        </div>
        <div class="setting-box">
          <div class="check-icon" :class="[check ? 'check' : '']" @click="toggleCheck" />
          <div class="check-text">
            今日不再出现此提示
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { thanksApi } from '~/api'

const emits = defineEmits(['initPage', 'openResult', 'handleLotteryAffirm', 'handleSvga'])
const dialogVisible = ref(false)
const check = ref(false)
const timeNum = ref(0)
const setVisible = (bool: boolean, time?: number) => {
  dialogVisible.value = bool
  if (time)
    timeNum.value = time
}
const startLottery = async (time?: number) => {
  const res = await thanksApi.lottery({ number: time && time > 0 ? time : timeNum.value }).catch(err => console.log(err))
  if (!res)
    return
  console.log('startLottery >', res)
  setVisible(false)
  emits('initPage')
  emits('openResult', res.items, timeNum.value)
}
const toggleCheck = () => {
  check.value = !check.value
  const params = {
    type: 'isCheck',
    isCheck: check.value,
  }
  emits('handleLotteryAffirm', params)
}

const lottery = () => {
  setVisible(false)
  emits('handleSvga', timeNum.value)
}

defineExpose<{ setVisible: (bool: boolean) => void, startLottery: (time?: number) => Promise<void> }>({ setVisible, startLottery })
</script>

<style lang="scss" scoped>
.dialog {
  :deep(.van-popup) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 !important;
    overflow: visible !important;
    width: 578px;
    height: 620px;
    background: url('@/assets/images/thanks/buy-dialog.webp') center center /
      cover no-repeat transparent;
    .dialog-container {
      width: 100%;
      padding: 94px 65px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 28px;
      color: #ff4bc6;
      .sugar-box {
        width: 208px;
        height: 208px;
        border-radius: 36px;
        background: #ffe4f1;
        display: flex;
        flex-direction: column;
        align-items: center;
        .sugar-img {
          width: 160px;
          height: 146px;
          margin-bottom: 10px;
          background: url('@/assets/images/thanks/sugar.webp') center center /
            cover no-repeat transparent;
        }
      }
      .sugar-text {
        margin: 32px auto;
      }
      .btn-box {
        margin-bottom: 32px;
        display: flex;
        gap: 38px;
        .btnClass {
          width: 200px;
          height: 84.5px;
          border-radius: 126px;
          text-align: center;
          line-height: 84.5px;
        }
        .cancel {
          background: #fff;
          border: 2px solid #ff4bc6;
        }
        .confirm {
          color: #fff;
          background: linear-gradient(270deg, #ff4bc6 0%, #ffa9cf 100%);
        }
      }
      .setting-box {
        display: flex;
        align-items: center;
        .check-icon {
          width: 24px;
          height: 24px;
          background: url('@/assets/images/thanks/none.png') center center /
            cover no-repeat transparent;
          margin-right: 8px;
        }
        .check {
          background: url('@/assets/images/thanks/skip.png') center center /
            cover no-repeat transparent;
        }
        .check-text {
          color: #b58aa7;
        }
      }
    }
  }
}
</style>
