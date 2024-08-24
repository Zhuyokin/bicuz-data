<template>
  <div id="fukui-dialog">
    <van-popup v-model:show="dialogVisible" @click-overlay="close">
      <div class="body" :class="[BgTypeNum === 1 ? 'one' : BgTypeNum === 2 ? 'two' : 'three']">
        <div class="close-btn" @click="close" />
        <div class="ret-box">
          <div v-for="(item, index) in retList" :key="index" class="ret-item" :class="[retList.length === 1 ? 'one' : '']">
            <div class="gift-pic">
              <div class="prize" :style="`background:url(${item.giftId ? prependHttpIfMissing(item?.icon) : debrisImg})  center center / cover no-repeat transparent`" />
            </div>
            <div v-if="item.giftId" class="gift-name">
              {{ item.title }}
            </div>
            <div v-else class="gift-name">
              {{ item.title }}
            </div>
            <div v-if="item.gift_diamond" class="gift-price">
              价值{{ item.gift_diamond }}钻
            </div>
          </div>
        </div>
        <div class="catch-again-btn" @click="catchAgain" />
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import debrisImg from '@/assets/images/doll-activity/debris-icon.webp'

const emits = defineEmits(['closeDialog', 'confirmCatch'])
const dialogVisible = ref(false)
const retList = ref()
const setVisible = (bool) => {
  dialogVisible.value = bool
}
const openDialog = (list: any[]) => {
  retList.value = list
  dialogVisible.value = true
}

const catchAgain = () => {
  setVisible(false)
  emits('confirmCatch')
}

const BgTypeNum = computed(() => {
  if (retList.value.length <= 3)
    return 1
  else if (retList.value.length <= 6)
    return 2
  else return 3
})

const close = () => {
  setVisible(false)
  console.log('close >')
  emits('closeDialog')
}

defineExpose<{ openDialog: (boolean) => void }>({ openDialog })
</script>

<style lang="scss" scoped>
#fukui-dialog {
  :deep(.van-field__value) input {
    font-size: 28px;
    line-height: 28px;
    color: #c65bff !important;
    font-weight: bold;
    text-align: center;
  }

  :deep(.van-field__value) .van-field__word-limit {
    margin-top: -35px;
    color: #8f8f8f;
  }

  :deep(.van-popup) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 !important;
    width: 678px !important;
    // height: 829px !important;
    overflow: visible !important;
    height: auto;
    background: transparent;

    .body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 678px;
      box-sizing: border-box;

      font-size: 28px;
      padding-top: 160px;
      position: relative;
      .close-btn {
        width: 68px;
        height: 63px;
        background: url('@/assets/images/doll-activity/close-icon.webp') center
          center / cover no-repeat transparent;
        position: absolute;
        right: 0;
        top: 20px;
      }
      .ret-box {
        max-width: 560px;
        min-height: 207px;
        max-height: 600px;
        margin-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
        overflow-y: scroll;
        .ret-item {
          color: #b04f00;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-weight: 500;
          margin-right: 28px;
          margin-bottom: 15px;
          .gift-pic {
            width: 168px;
            height: 131px;
            background-color: #ffd399;
            border-radius: 24px;
            margin-bottom: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            .prize {
              width: 108px;
              height: 108px;
            }
          }
          .gift-name {
            font-size: 22px;
          }
          .gift-price {
            font-size: 20px;
          }
        }
        .ret-item:nth-child(3n + 3) {
          margin-right: 0;
        }
        .ret-item.one {
          margin-right: 0 !important;
        }
      }
      .catch-again-btn {
        width: 451px;
        height: 111px;
        margin: 0 auto;
        background: url('@/assets/images/doll-activity/catch-again-btn.webp')
          center center / cover no-repeat transparent;
      }
    }
    .body.one {
      height: 567px;
      background: url('@/assets/images/doll-activity/result-dialog1.webp')
        center center / cover no-repeat transparent;
    }
    .body.two {
      height: 809px;
      background: url('@/assets/images/doll-activity/result-dialog2.webp')
        center center / cover no-repeat transparent;
    }
    .body.three {
      height: 1036px;
      background: url('@/assets/images/doll-activity/result-dialog3.webp')
        center center / cover no-repeat transparent;
    }
  }
}
</style>
