<template>
  <div class="pet_store">
    <van-popup v-model:show="shopVisible" position="bottom" round @click-overlay="close">
      <div class="content">
        <div class="close cursor-pointer" @click="close" />
        <van-tabs @click-tab="changeTab">
          <van-tab v-if="!props.isVisitedOther" title="萌宠" name="a">
            <div class="pet-content">
              <div class="pet-list">
                <div
                  v-for="(item, index) in storeList.slice(0, 4)"
                  :key="index"
                  class="pet-item cursor-pointer" :class="[item.active ? 'pet-item-selected' : 'pet-item-unselected']"
                  @click="selectPet(index)"
                >
                  <div class="pet-name">
                    {{ item.pet_name }}
                  </div>
                  <div
                    class="pet-img"
                    :style="`background:url(${prependHttpIfMissing(item.pet_icon)})  center center / cover no-repeat transparent`"
                  />
                  <div v-if="index === 0" class="pet-price">
                    <!-- <img class="price-icon" src="@/assets/images/pet-cat-farm/price-icon.webp" alt="" /> -->
                    <span>{{ item.price }}</span>
                    <span>米粒</span>
                  </div>
                </div>
              </div>
              <div class="my-account">
                <span>我的米粒: </span>
                <span>{{ diamond }}</span>
                <span class="to-charge cursor-pointer" @click="toCharge">去充值</span>
              </div>
              <!-- 购买和赠送 -->
              <div class="buyAndSend">
                <div
                  class="store-send-btn cursor-pointer"
                  @click="send"
                />
                <div class="store-buy-btn cursor-pointer" @click="buy()" />
              </div>
            </div>
          </van-tab>
          <van-tab title="道具" name="b" class="tab2">
            <!-- <div class="tool-bg"></div> -->
            <div class="pet-content">
              <div ref="contentRef" class="pet-list tool-list" @click.prevent.self="closeGuideOutter">
                <div
                  v-for="(item, index) in toolList"
                  :key="index"
                  class="pet-item tool-item cursor-pointer" :class="[item.active ? 'pet-item-selected' : 'pet-item-unselected']"
                  @click="selectTool(index)"
                >
                  <div class="tool-guide" @click.stop="closeGuideOutter(index)" />
                  <div v-if="item.guideVisible" class="guide-pop">
                    <div>{{ `${item.usage_remark},${item.attr_remark}` }}</div>
                  </div>
                  <div class="pet-name">
                    {{ item.card_name }}
                  </div>
                  <div
                    class="pet-img tool-img"
                    :style="`background:url(${prependHttpIfMissing(item.icon)})  center center / cover no-repeat transparent`"
                  />
                  <!-- <div class="desc">
                    {{ item.attr_remark }}
                  </div> -->
                  <div class="pet-price">
                    <!-- <img class="price-icon" src="@/assets/images/pet-cat-farm/price-icon.webp" alt="" /> -->
                    <span>{{ item.price * num }}</span>
                    <span>米粒</span>
                  </div>
                </div>
              </div>
              <div class="my-account">
                <span>我的米粒: </span>
                <span>{{ diamond }}</span>
                <span class="to-charge cursor-pointer" @click="toCharge">去充值</span>
              </div>
              <div
                class="buy-btn cursor-pointer" :class="[isSelectedTool ? 'buy-active' : 'buy-inactive']"
                @click="openBuyConfirm"
              />
            </div>
          </van-tab>
        </van-tabs>
        <!-- {{ storeList.value[1].active }} -->
      </div>
    </van-popup>
    <!-- 选择道具数量弹窗 -->
    <BuyConfirmDialog ref="buyConfirmRef" :diamond="diamond" :selected-tool="selectedTool" :to-charge="toCharge" @buy="buyTool" />
    <!-- 购买赠送宠物 -->
    <TransferDialog ref="transferRef" :pet-info="selectedPet" type="buy" @transfer-success="transfer" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { buyPet, buyTools, getStoreToolsList, petList, petStoreWallet } from '@/api/modules/pet'
import { userMe } from '@/api/modules/common'
import { js_sync_app, prependHttpIfMissing } from '@/utils/index'
import { useUserStore } from '@/store'
// 导入图片
import petDogImg from '@/assets/images/pet-cat-farm/pet-box-dog.webp'
import petHorseImg from '@/assets/images/pet-cat-farm/pet-box-horse.webp'
import petOtherImg from '@/assets/images/pet-cat-farm/pet-store-box.webp'
import speedCardPic from '@/assets/images/pet-cat-farm/speed-card-pic.webp'
import BuyConfirmDialog from '@/components/pet-cat-farm/BuyConfirmDialog.vue'
import TransferDialog from '@/components/pet-cat-farm/TransferDialog.vue'
// import speedCard from '@/assets/images/pet-cat-farm/speed-card-pic.webp'

const props = defineProps<{
  isVisitedOther: boolean
}>()
const emits = defineEmits(['close', 'initPage', 'getSpeedCard'])
const shopVisible = ref(false)
const storeList = ref([])
const toolList = ref([
])
const isSelectPet = ref(false)
const isSelectTool = ref(false)
const diamond = ref(0)
const user_id = ref(0)
const userStore = useUserStore()
const selectedPet = ref(null)
const selectedTool = ref(null)
const num = ref(1)
const buyConfirmRef = ref<BuyConfirmDialog | null>(null)
const transferRef = ref<TransferDialog | null>(null)
const contentRef = ref(null)

const petIInfoMap = [
  {
    pet_name: '小狗狗',
    pet_icon: petDogImg,
  },
  {
    pet_name: '小马驹',
    pet_icon: petHorseImg,
  },
  {
    pet_name: '敬请期待',
    pet_icon: petOtherImg,
  },
]

const isSelected = computed(() => {
  if (storeList.value.length > 0)
    return storeList.value.some(item => item.active)
  else
    return false
})

const isSelectedTool = computed(() => {
  if (toolList.value.length > 0)
    return toolList.value.some(item => item.active)
  else
    return false
})

const getWallet = async () => {
  const res = await petStoreWallet().catch((err) => {
    console.log(err)
  })
  console.log('wallet >', res)
  diamond.value = res.diamond * 1 + res.gain * 1
}

const getUserInfo = async () => {
  const res = await userMe().catch((err) => {
    console.log(err)
  })
  console.log('[userInfo >]', res)

  user_id.value = res.user.user_id
}

const getTools = async () => {
  const res = await getStoreToolsList().catch(err => console.log(err))
  toolList.value = res.list.map((i) => {
    return { ...i, active: false }
  })
  console.log(res, 'getTools======================')
}

const getPets = async () => {
  getWallet()
  getUserInfo()
  getTools()
  const res = await petList()
  if (!res)
    return

  storeList.value = res.list.map((i) => {
    return { ...i, active: false }
  })
  const obj = {
    id: null,
    pet_gender: null,
    pet_icon: null,
    pet_name: null,
    price: null,
    active: false,
  }
  let arr = Array.from({ length: 3 })
  arr.fill(obj, 0, 3)
  arr = arr.map((i, idx) => {
    return { ...i, pet_name: petIInfoMap[idx].pet_name, pet_icon: petIInfoMap[idx].pet_icon }
  })
  storeList.value = [...storeList.value, ...arr]
  shopVisible.value = true
}

const changeTab = () => {
  nextTick(() => {
    contentRef.value?.scrollTo({ top: 5, left: 0 })
  })
  closeGuideOutter()
}

const confirm = (res) => {
  console.log(res)
}

defineExpose<{ getPets: () => void }>({ getPets })

const close = () => {
  shopVisible.value = false
  isSelectPet.value = false
  isSelectTool.value = false
  num.value = 1
  contentRef.value?.scrollTo({ top: 0, left: 0 })
  // emits('close', false);
}

const selectPet = (idx) => {
  if (idx >= 1) {
    showToast('敬请期待')
    return
  }
  isSelectPet.value = false
  storeList.value.forEach((item, index) => {
    item.active = idx == index ? !item.active : false
    if (idx == index && item.active) {
      selectedPet.value = item
      isSelectPet.value = true
    }
  })
}

// 确认购买
const buy = async () => {
  const idx = storeList.value.findIndex(i => i.active === true)
  if (idx < 0) {
    showToast('请选择宠物')
    return
  }
  const res = await buyPet({ pet_id: selectedPet.value.id }).catch((err) => {
    console.log('err >', err)
    console.log(user_id.value)
    // 余额不足
    if (err.code == 3333) {
      setTimeout(() => {
        toCharge()
      }, 500)
    }
  })
  console.log('[ res ] >', res)
  if (!res)
    return

  showToast('购买成功')
  close()
  emits('initPage')
}

const transfer = () => {
  getWallet()
  showToast('赠送成功')
}

const openTransfer = () => {
  transferRef.value.openDialog()
}

// 赠送
const send = () => {
  if (!isSelectPet.value) {
    showToast('请选择宠物')
    return
  }

  openTransfer()
}

// 选择数量
const openBuyConfirm = () => {
  if (!isSelectTool.value || !isSelectedTool.value) {
    showToast('请选择商品')
    return
  }
  buyConfirmRef.value?.openDialog(true)
}

// 购买道具
const buyTool = async (props_num) => {
  const idx = toolList.value.findIndex(i => i.active === true)
  if (idx < 0) {
    showToast('请选择道具')
    return
  }
  const res = await buyTools({ props_id: selectedTool.value.id, props_num }).catch((err) => {
    console.log('err >', err)
    // 余额不足
    if (err.code == 3333) {
      setTimeout(() => {
        toCharge()
      }, 500)
    }
  })
  console.log('[ res ] >', res)
  if (!res)
    return

  showToast('购买成功')
  close()
  emits('getSpeedCard')
}

// 去充值
const toCharge = () => {
  console.log('[toCharge >]', user_id.value)
  js_sync_app('js_sync_pay', user_id.value)
}

const closeGuideOutter = (idx: number) => {
  toolList.value.forEach((i) => {
    i.guideVisible = false
  })
  if (idx >= 0)
    toolList.value[idx].guideVisible = !toolList.value[idx].guideVisible
}

const selectTool = (idx) => {
  closeGuideOutter()
  isSelectTool.value = false
  toolList.value.forEach((item, index) => {
    item.active = idx == index ? !item.active : false
    if (idx == index && item.active) {
      selectedTool.value = item
      isSelectTool.value = true
    }
  })
}
</script>

<style lang="scss" scoped>
.pet_store {
  // :deep(.van-tab:nth-child(2)) {
  //   transform: translateX(-10px) !important;
  // }
  // :deep(.van-tab:nth-child(2)) ~ .van-tabs__line {
  //   margin-left: -10px !important;
  // }
  // :deep(.van-cell) {
  //   width: 112px;
  //   height: 44px;
  //   line-height: 44px;
  //   font-weight: 500;
  //   // color: #B64643!important;
  //   margin: 0 8px;
  //   border-radius: 12px;
  //   background: #ffbd88 !important;
  //   // padding: 0;
  //   text-align: center;
  //   color: #b64643 !important;
  //   .van-field__body {
  //     transform: translateY(-20px);
  //     text-align: center;
  //     .van-field__control {
  //       text-align: center;
  //       color: #b64643 !important;
  //     }
  //   }
  // }
  border-radius: 0;
  transform: none;
  left: 0;
  bottom: 0;
  top: unset;
  display: flex;
  :deep(.van-tabs__wrap) {
    margin-bottom: 14px;
  }
  :deep(.van-tabs__nav) {
    background: transparent;
    // padding: 0 38px;
    padding-left: 58px;
    padding-right: 58px;
    .van-tabs__line {
      background: #ff4d4d;
    }
    .van-tab__text {
      font-size: 36px;
    }
    .van-tab--active {
      color: #ff4d4d !important;
    }
  }
  :deep(.van-popup) {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff3de;
    // background: transparent;
    overflow-y: scroll;
    background: url('@/assets/images/pet-cat-farm/pet-store-bg.webp') center
      center / cover no-repeat transparent;
    .content {
      .close {
        position: absolute;
        top: 107px;
        right: 24px;
        width: 68px;
        height: 63px;
        background: url('@/assets/images/pet-cat-farm/pet-store-close.webp')
          center center / cover no-repeat transparent;
      }
      height: 1198px !important;
      // overflow-y: scroll;
      overflow: hidden;
      width: 100%;
      padding: 210px 0 0px;
      position: relative;
      .my-account {
        display: flex;
        gap: 5px;
        justify-content: center;
        color: #b43a04;
        font-weight: 500;
        font-size: 28px;
        margin: 0 auto;
        .to-charge {
          padding-left: 10px;
          position: relative;
        }
        .to-charge:hover {
          cursor: pointer;
        }
        .to-charge:after {
          content: '';
          width: 12px;
          height: 12px;
          border: solid #b43a04;
          border-width: 0 2px 2px 0;
          transform: translate(-50%, -50%) rotate(-45deg);
          position: absolute;
          font-weight: bolder;
          right: -20%;
          top: 55%;
        }
      }
      .buyAndSend {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        .store-send-btn {
          width: 274px;
          height: 96px;
          background: url('@/assets/images/pet-cat-farm/pet-store-send.webp')
            center center / cover no-repeat transparent;
        }
        .store-buy-btn {
          width: 274px;
          height: 96px;
          background: url('@/assets/images/pet-cat-farm/pet-store-buy.webp')
            center center / cover no-repeat transparent;
        }
      }
      .buy-btn {
        // position: absolute;
        // bottom: -120px;
        // left: 50%;
        // transform: translateX(-50%);
        width: 404px;
        height: 96px;
        margin: 20px auto;
        z-index: 2;
      }
      .buy-active {
        background: url('@/assets/images/pet-cat-farm/buy-btn-active.webp')
          center center / cover no-repeat transparent;
      }
      .buy-inactive {
        background: url('@/assets/images/pet-cat-farm/buy-btn-inactive.webp')
          center center / cover no-repeat transparent;
      }
      .pet-content {
        width: 100%;
        height: 800px;
        padding: 0 89px;
        overflow: visible;
        .pet-item-selected {
          background: url('@/assets/images/pet-cat-farm/pet-item-bg-active.webp')
            center center / cover no-repeat transparent;
        }
        .pet-item-unselected {
          background: #ffdc9f;
        }
        .pet-list {
          display: flex;
          flex-wrap: wrap;
          overflow: visible;
          overflow-y: scroll;
          height: 640px;
          .pet-item {
            width: 264px;
            height: 300px;
            flex-shrink: 0;
            border-radius: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-right: 40px;
            margin-bottom: 20px;
            position: relative;
            .tool-guide {
              position: absolute;
              right: 24px;
              top: 20px;
              width: 32px;
              height: 32px;
              background: url('@/assets/images/pet-cat-farm/speed-card-guide-icon.webp')
                center center / cover no-repeat transparent;
            }
            .guide-pop {
              width: 310px;
              min-height: 70px;
              line-height: 28px !important;
              display: flex;
              align-items: center;
              // justify-content: center;
              text-align: left;
              flex-wrap: wrap;
              padding: 5px;
              border-radius: 20px;
              background: #00000080;
              position: absolute;
              right: 0px;
              top: 61px;
              z-index: 9999;
              line-height: 24px;
              font-size: 24px;
              color: #fff;
              div {
                text-align: center;
                direction: ltr;
              }
            }
            .guide-pop::before {
              z-index: 9999;
              content: '';
              position: absolute;
              width: 0;
              height: 0;
              border-left: 10px solid transparent;
              border-right: 10px solid transparent;
              border-bottom: 15px solid #00000080;
            }
            .pet-name {
              color: #b43a04;
              font-size: 28px;
              font-weight: 500;
              margin-bottom: 10px;
            }
            .pet-img {
              width: 166px;
              height: 166px;
              background: url('@/assets/images/pet-cat-farm/pet-store-box.webp')
                center center / cover no-repeat transparent;
              margin-bottom: 20px;
            }
            .pet-price {
              display: flex;
              align-items: center;
              font-size: 28px;
              color: #b43a04;
              height: 40px;
              min-width: 50px;
              line-height: 40px;
              gap: 5px;
              // .price-icon {
              //   display: block;
              //   width: 40px;
              //   height: 40px;
              // }
            }
          }
          .pet-item:nth-child(2n + 2) {
            margin-right: 0 !important;
          }
          .tool-item {
            .tool-img {
              width: 146px;
              height: 146px;
            }
            .desc {
              display: flex;
              align-items: center;
              width: 137px;
              height: 60px;
              font-size: 22px;
              color: #b43a04;
            }
          }
          .tool-item:nth-child(2n + 1) {
            .guide-pop {
              right: -60px;
            }
            .guide-pop::before {
              right: 90px;
              top: -14px;
            }
          }
          .tool-item:nth-child(2n + 2) {
            .guide-pop {
              right: 10px;
            }
            .guide-pop::before {
              right: 20px;
              top: -14px;
            }
          }
        }
        .tool-list {
          overflow-y: auto;
          overflow-x: visible;
          max-height: 674px;
          height: 640px;
          margin-bottom: 10px;
        }
      }
      // .tool-bg {
      //   width: 750px;
      //   height: 750px;
      //   background: url('@/assets/images/pet-cat-farm/pet-store-tool-bg.webp') center center / cover no-repeat
      //     transparent;
      // }
    }
  }
}

.pet-content::-webkit-scrollbar {
  display: none;
}
.buy-btn:active {
  transform: scale(0.9);
  transition: transform 0.1s linear;
}
</style>
