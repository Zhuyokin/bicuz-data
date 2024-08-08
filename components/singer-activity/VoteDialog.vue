<template>
  <div class="dialog">
    <van-popup v-model:show="dialogVisible" :style="{ padding: '64px' }">
      <div class="content">
        <div class="input-box">
          <div class="minus cursor-pointer" @click="changeNum('minus')" />
          <div class="input-num">
            <van-field v-model="num" min="1" maxlength="2" :max="props.maxVote" type="digit" input-align="center" @input="inputVal" />
          </div>
          <div class="add cursor-pointer" @click="changeNum('add')" />

          <div class="cal-num-box">
            <div class="rice-icon" />
            <div>{{ num * 100 }}</div>
          </div>
        </div>

        <div class="my-account-box">
          <div>我的米粒:</div>
          <div class="rice" />
          <div>{{ diamond }}</div>
        </div>

        <div class="confirm-btn cursor-pointer" @click="confirmPay" />

        <div class="tips">
          每天拥有10次付费捧场机会
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { js_sync_app } from '@/utils/index'
import { singActApi } from '@/api/index'
import { getUserWallet } from '@/api/modules/common'

const props = defineProps<{ userId?: number, maxVote?: number }>()
const emits = defineEmits(['init'])
const num = ref(1)
const diamond = ref(0)
const songId = ref<any>(null)
const dialogVisible = ref(false)

const inputVal = (e: any) => {
  const val = Number(e.target.value)

  if (val >= props.maxVote)
    num.value = props.maxVote
}

// 用户信息
const getUserInfo = async () => {
  const res = await getUserWallet({}).catch((err) => {
    console.log(err)
  })
  diamond.value = res.diamond * 1 + res.gain * 1
  console.log('[userInfo >]', res)
}

const changeNum = (type: string) => {
  if (type === 'add' && num.value >= props.maxVote)
    return
  if (type === 'add' && num.value <= 9)
    num.value = Number(num.value) + 1

  if (type === 'minus' && num.value >= 2)
    num.value = Number(num.value) - 1
}

const setVisible = (bool: boolean, song_id?: number) => {
  dialogVisible.value = bool
  songId.value = song_id
  getUserInfo()
}

const close = () => {
  dialogVisible.value = false
  num.value = 1
}

// 去充值
const toCharge = () => {
  js_sync_app('js_sync_pay', props.userId)
}

const confirmPay = async () => {
  if (num.value > 10) {
    showToast('每天拥有10次付费捧场机会')
    return
  }
  const res = await singActApi.payVote({ song_id: songId.value, number: num.value }).catch((err) => {
    if (err.code === 0) {
      console.log('err1 >', err)
      showToast(err.msg)
      return
    }

    // 余额不足
    if (err.code === 3999) {
      setTimeout(() => {
        toCharge()
      }, 500)
    }
  })
  console.log('res >', res)
  if (!res)
    return
  close()
  emits('init', songId.value)
  showToast(`投票成功`)
}

defineExpose<{ setVisible: (bool: boolean) => void }>({ setVisible })
</script>

<style lang="scss" scoped>
.dialog {
  ::v-deep(.van-field) {
    background-color: transparent !important;
    font-weight: bolder;
    font-size: 64px;

    .van-field__control {
      background-color: transparent !important;
      color: #ffe050 !important;
    }

    .van-field__control::placeholder {
      background-color: transparent;
      color: #ffe050 !important;
    }
  }

  :deep(.van-popup) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 !important;
    overflow: visible;
    width: 678px;
    height: 736px;
    background: url('@/assets/images/singer-activity/vote-dialog-bg.webp')
      center center / cover no-repeat transparent;
    border-radius: 40px;

    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 678px;
      height: 736px;
      padding: 189px 24px 0px;
      color: #b43a04;
      display: flex;
      flex-direction: column;
      align-items: center;

      .input-box {
        display: flex;
        align-items: center;
        gap: 24px;
        margin-bottom: 40px;
        position: relative;

        .minus {
          width: 42px;
          height: 42px;
          background: url('@/assets/images/singer-activity/minus.webp') center
            center / cover no-repeat transparent;
        }

        .input-num {
          width: 196px;
          height: 198px;
          display: flex;
          align-items: center;
          background: url('@/assets/images/singer-activity/vote-input-bg.webp')
            center center / cover no-repeat transparent;
        }

        .add {
          width: 42px;
          height: 42px;
          background: url('@/assets/images/singer-activity/add.webp') center
            center / cover no-repeat transparent;
        }
        .cal-num-box {
          position: absolute;
          bottom: 2%;
          left: 50%;
          transform: translateX(-52%);
          color: rgba(36, 36, 36, 0.75);
          display: flex;
          align-items: center;
          font-size: 32px;
          font-weight: 600;
          .rice-icon {
            width: 40px;
            height: 40px;
            margin: 0 5px;
            background: url('@/assets/images/singer-activity/rice.png') center
              center / cover no-repeat transparent;
          }
        }
      }

      .my-account-box {
        margin-bottom: 28px;
        color: rgba(255, 255, 255, 0.9);
        font-size: 32px;
        line-height: 40px;
        display: flex;
        align-items: center;

        .rice {
          width: 40px;
          height: 40px;
          margin: 0 5px;
          background: url('@/assets/images/singer-activity/rice.png') center
            center / cover no-repeat transparent;
        }
      }

      .confirm-btn {
        width: 226px;
        height: 84px;
        margin-bottom: 28px;
        background: url('@/assets/images/singer-activity/confirm.webp') center
          center / cover no-repeat transparent;
      }

      .tips {
        font-size: 24px;
        color: #242424;
      }
    }
  }
}
</style>
