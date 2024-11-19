<template>
  <div class="dialog">
    <van-popup v-model:show="dialogVisible">
      <div class="dialog-container">
        <div class="diamond-left">
          <div>剩余钻石:</div>
          <div class="diamond" />
          <div>0</div>
        </div>
        <div class="price-list">
          <div v-for="(item, index) in priceList" :key="index" class="price-item">
            <div class="sugar-img" />
            <div class="sugar-num">
              ×{{ item.num }}
            </div>
            <div class="sugar-price">
              <div class="diamond" />
              <div class="diamond-num">
                {{ item.price }}
              </div>
            </div>
          </div>
        </div>
        <div class="num-box">
          <div class="num-text">
            自定义数量
          </div>
          <div class="change-num-box">
            <div class="minus num-icon" @click="changeNum('minus')" />
            <div class="input-num">
              <van-field v-model="num" min="1" maxlength="2" :max="props.maxNum" type="digit" input-align="center" @input="inputVal" />
            </div>
            <div class="plus num-icon" @click="changeNum('add')" />
          </div>
        </div>
        <div class="btn-box">
          <div class="cancel btnClass scale-btn" @click="setVisible(false)">
            取消
          </div>
          <div class="confirm btnClass scale-btn">
            确认
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ userId?: number, maxNum?: number }>()
const dialogVisible = ref(false)
const priceList = ref([
  {
    id: 1,
    num: 1,
    price: 200,
  },
  {
    id: 2,
    num: 10,
    price: 2000,
  },
  {
    id: 3,
    num: 100,
    price: 20000,
  },
])
const num = ref(0)
const setVisible = (bool: boolean) => {
  dialogVisible.value = bool
}
const inputVal = (e: any) => {
  const val = Number(e.target.value)

  if (val >= props.maxNum)
    num.value = props.maxNum
}

const changeNum = (type: string) => {
  if (type === 'add' && num.value >= props.maxNum)
    return
  if (type === 'add' && num.value <= 9)
    num.value = Number(num.value) + 1

  if (type === 'minus' && num.value >= 2)
    num.value = Number(num.value) - 1
}

defineExpose<{ setVisible: (bool: boolean) => void }>({ setVisible })
</script>

<style lang="scss" scoped>
.dialog {
  ::v-deep(.van-field) {
    background-color: #ffc6f1 !important;
    font-weight: bolder;
    font-size: 28px;
    width: 126px;
    height: 58px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    .van-field__control {
      background-color: transparent !important;
      color: #ff4bc6 !important;
    }

    .van-field__control::placeholder {
      background-color: transparent;
      color: #ff4bc6 !important;
    }
  }
  :deep(.van-popup) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 !important;
    overflow: visible !important;
    width: 578px;
    height: 634px;
    background: url('@/assets/images/thanks/recharge-dialog.webp') center center /
      cover no-repeat transparent;
    .dialog-container {
      font-size: 24px;
      color: #ff4bc6;
      padding: 90px 40px 30px;
      .diamond-left {
        display: flex;
        align-items: center;
        justify-content: center;
        .diamond {
          width: 32px;
          height: 32px;
          margin: 0 10px;
          background: url('@/assets/images/common/diamond.webp') center center /
            cover no-repeat transparent;
        }
      }
      .price-list {
        display: flex;
        align-items: center;
        gap: 20px;
        margin: 25px auto 40px;
        .price-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 150px;
          height: 202px;
          background: url('@/assets/images/thanks/buy_item.webp') center center /
            cover no-repeat transparent;
          .sugar-img {
            width: 120px;
            height: 120px;
            background: url('@/assets/images/thanks/sugar.webp') center center /
              cover no-repeat transparent;
          }
          .sugar-num {
            display: flex;
            margin-bottom: 10px;
          }
          .sugar-price {
            display: flex;
            align-items: center;
            .diamond {
              width: 32px;
              height: 32px;
              margin: 0 10px;
              background: url('@/assets/images/common/diamond.webp') center
                center / cover no-repeat transparent;
            }
            .diamond-num {
              color: #fff;
              font-weight: 600;
            }
          }
        }
      }
      .num-box {
        width: 100%;
        height: 64px;
        border-radius: 32px;
        background: #ffddf7;
        margin-bottom: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 50px;
        .num-text {
          font-size: 28px;
          color: #ff4bc6;
        }
        .change-num-box {
          display: flex;
          align-items: center;
          gap: 8px;
          .num-icon {
            width: 36px;
            height: 36px;
          }
          .plus {
            background: url('@/assets/images/thanks/plus.webp') center center /
              cover no-repeat transparent;
          }
          .minus {
            background: url('@/assets/images/thanks/minus.webp') center center /
              cover no-repeat transparent;
          }
        }
      }
      .btn-box {
        margin-bottom: 32px;
        display: flex;
        justify-content: space-between;
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
    }
  }
}
</style>
