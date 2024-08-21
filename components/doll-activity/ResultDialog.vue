<template>
  <div id="fukui-dialog">
    <van-popup v-model:show="dialogVisible" @click-overlay="close">
      <div class="body">
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
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import debrisImg from '@/assets/images/doll-activity/debris-icon.webp'

const emits = defineEmits(['closeDialog'])
const dialogVisible = ref(false)
const retList = ref()
const setVisible = (bool) => {
  dialogVisible.value = bool
}
const openDialog = (list: any[]) => {
  retList.value = list
  dialogVisible.value = true
}

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
    height: 829px !important;
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
      height: 829px;
      background: url('@/assets/images/doll-activity/result-dialog.webp') center
        center / cover no-repeat transparent;
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
    }
  }
}
</style>
