<template>
  <div class="tool-dialog">
    <van-popup v-model:show="dialogVisible" position="bottom" round @click-overlay="close(true)">
      <div class="dialog-box">
        <div class="dialog-content">
          <div class="close-btn cursor-pointer" @click="close(true)" />
          <div ref="cardListRef" class="card-list">
            <div
              v-for="(i, idx) in discountCards" :key="idx" class="card-item"
              :style="`background:url(${getCardPic(i)})  center center / cover no-repeat transparent`"
            >
              <div>{{ i.user_discount_id === 0 ? '0' : '1' }}张</div>
            </div>
          </div>
          <div class="tab-box">
            <div
              class="tab1 cursor-pointer"
              :style="`background:url(${tabIdx === 0 ? tab1Active : tab1InActive})  center center / cover no-repeat transparent`"
              @click="changeTab(0)"
            />
            <div
              class="tab2 cursor-pointer"
              :style="`background:url(${tabIdx === 1 ? tab2Active : tab2InActive})  center center / cover no-repeat transparent`"
              @click="changeTab(1)"
            />
          </div>
          <div ref="goodListRef" class="goods-list">
            <div v-if="tabIdx === 0" class="dress-box">
              <div
                v-for="(item, index) in dressList" :key="index" class="dress-item cursor-pointer"
                :style="`background: ${item.selected ? '#FFF4D4' : ''}`" @click="select(1, item, index)"
              >
                <div class="avatar-bg">
                  <div
                    class="avatar-img"
                    :style="`background:url(${prependHttpIfMissing(item.goods_image)})  center center / contain no-repeat transparent`"
                  />
                </div>
                <div class="name">
                  {{ item.goods_name }}
                </div>
                <div class="position">
                  {{ avaratMap[item.goods_type] }}
                </div>
              </div>
            </div>
            <div v-if="tabIdx === 1" class="num-box">
              <div
                class="pagination cursor-pointer"
                :style="`background:url(${changeNumBtn})  center center / cover no-repeat transparent`"
                @click="getStore"
              />
              <div
                v-for="(item, index) in numList" :key="index" class="num-item cursor-pointer"
                :style="`background:url(${item.selected ? numSelected : numUnselected})  center center / cover no-repeat transparent;color: ${item.selected ? '#FFFFFF' : '#4d1a07'}`"
                @click="select(2, item, index)"
              >
                {{ item.number }}
              </div>
            </div>
          </div>
          <div v-if="selectedItem" class="price-select-box">
            <div
              v-for="(item, index) in selectedItem?.price" :key="index" class="price-item cursor-pointer"
              :style="`background: ${item.selected ? 'linear-gradient(90deg, #F86F18 0%, #F99B2D 100%)' : '#ffffff80'};color: ${item.selected ? '#fff' : ''}`"
              @click="selectPrice(selectedItem?.price, index)"
            >
              <div class="day">
                {{ item?.day }}天
              </div>
              <div v-if="item.discountPrice" class="new-price">
                {{ item?.discountPrice }}<span>米粒</span>
              </div>
              <div :class="[item?.discountPrice ? 'old-price' : 'new-price']">
                {{ item?.price }}<span>米粒</span>
              </div>
            </div>
          </div>
          <div class="shop-btn cursor-pointer" @click="buy" />
          <div class="tips">
            系统将自动使用拥有的最低折扣卡购买
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 道具使用弹窗 -->
  </div>
</template>

<script setup lang="ts">
import { Toast } from 'vant'
import { petApi, rechargeDiscountApi } from '@/api/index'
import { prependHttpIfMissing } from '@/utils/index'
import tab1Active from '@/assets/images/recharge-discount/tab1-active.webp'
import tab1InActive from '@/assets/images/recharge-discount/tab1-inactive.webp'
import tab2Active from '@/assets/images/recharge-discount/tab2-active.webp'
import tab2InActive from '@/assets/images/recharge-discount/tab2-inactive.webp'
import avatarBg from '@/assets/images/recharge-discount/avatar-bg.webp'
import numSelected from '@/assets/images/recharge-discount/num-selected.webp'
import numUnselected from '@/assets/images/recharge-discount/num-un-select.webp'
import discount5DressCard from '@/assets/images/recharge-discount/discount5DressCard.webp'
import discount5NumCard from '@/assets/images/recharge-discount/discount5NumCard.webp'
import discount6DressCard from '@/assets/images/recharge-discount/discount6DressCard.webp'
import discount6NumCard from '@/assets/images/recharge-discount/discount6NumCard.webp'
import discount7DressCard from '@/assets/images/recharge-discount/discount7DressCard.webp'
import discount7NumCard from '@/assets/images/recharge-discount/discount7NumCard.webp'
import changeNumBtn from '@/assets/images/recharge-discount/change-num-btn.webp'
import { useUserStore } from '@/store'

const props = defineProps<{ userId?: number }>()
const emits = defineEmits(['init'])
const dialogVisible = ref(false)
const isSelectTool = ref(false)
const contentRef = ref(null)
const tabIdx = ref(0)
const cardListRef = ref(null)
const goodListRef = ref(null)
const maxDisountDressCard = ref(null)
const maxDisountNumCard = ref(null)

const dressList = ref([])
const numList = ref([])
const page = ref(0)
const discountCards = ref([])
const selectedItem = ref(null)
const selectedGood = computed(() => {
  return dressList.value.some(item => item.selected) || numList.value.some(item => item.selected)
})
const selectedPrice = computed(() => {
  return selectedItem.value.price.some(i => i.selected)
})
const avaratMap = ['', '头像框', '入场横幅', '聊天气泡', '入场座驾', '麦上光圈']

// 去充值
const toCharge = () => {
  js_sync_app('js_sync_pay', props.userId)
}

const getCardPic = (item) => {
  const type = item?.type // 2-靓号 1-装扮
  const rate = String(item.rate).split('')[0]
  if (type === 1) {
    if (rate === '5')
      return discount5DressCard

    if (rate === '6')
      return discount6DressCard

    if (rate === '7')
      return discount7DressCard
  }
  else {
    if (rate === '5')
      return discount5NumCard

    if (rate === '6')
      return discount6NumCard

    if (rate === '7')
      return discount7NumCard
  }
}

const getStore = async () => {
  if (tabIdx.value === 0) {
    const res = await rechargeDiscountApi.getDressStore().catch(err => console.log(err))
    dressList.value = res.discount_goods
    discountCards.value = res.discount_card.sort((a, b) => b.user_discount_id - a.user_discount_id)
  }
  if (tabIdx.value === 1) {
    page.value += 1
    const res = await rechargeDiscountApi.getNumStore({ page: page.value, pagesize: 10, is_activity: 1 }).catch(err => console.log(err))
    numList.value = res.list
    if (res.list.length === 0) {
      page.value = 0
      getStore()
    }
  }
}

const changeTab = (idx: number) => {
  if (idx === tabIdx.value)
    return
  tabIdx.value = idx
  selectedItem.value = null
  page.value = 0
  getStore()
}

const close = (initPage: boolean) => {
  isSelectTool.value = false
  selectedItem.value = null
  tabIdx.value = 0
  page.value = 0
  cardListRef.value?.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
  if (initPage) {
    dialogVisible.value = false
    emits('init')
  }

  // contentRef.value?.scrollTo({ top: -20, left: 0 })
}

const open = () => {
  setTimeout(() => {
    cardListRef.value?.scrollTo({ left: 0, top: 0 })
    goodListRef.value?.scrollTo({ left: 0, top: 0 })
  }, 500)
  dialogVisible.value = true
  getStore()
}

const setDiscountPrice = (item, type) => {
  const cards = discountCards.value.filter(i => i.user_discount_id !== 0 && i.type === type).sort((a, b) => a.rate - b.rate)
  // 靓号
  if (tabIdx.value === 1) {
    if (cards.length > 0) {
      item.price.forEach((i) => {
        i.discountPrice = i.price * cards[0].rate / 100
      })
      maxDisountNumCard.value = cards[0]
      console.log('maxDisountNumCard >', maxDisountNumCard.value)
    }
    else {
      item.price[0].discountPrice = null
      maxDisountNumCard.value = null
    }
  }
  // 装扮
  if (tabIdx.value === 0) {
    if (cards.length > 0) {
      item.time_limit.forEach((i) => {
        i.discountPrice = i.money * cards[0].rate / 100
      })
      maxDisountDressCard.value = cards[0]
      console.log('maxDisountDressCard >', maxDisountDressCard.value)
    }
    else {
      item.time_limit[0].discountPrice = null
      maxDisountDressCard.value = null
    }
    item.time_limit = item.time_limit.map((i) => {
      return { ...i, price: i.money }
    })
    item.price = item.time_limit
  }
}

const select = (type, item, index) => {
  // 靓号
  if (type === 2) {
    numList.value.forEach((item, idx) => {
      if (idx === index) {
        item.selected = !item.selected
        if (item.selected) {
          selectedItem.value = item
          setDiscountPrice(item, 2)
        }
        else {
          selectedItem.value = null
        }
      }
      else { item.selected = false }
    })
  }
  // 装扮
  if (type === 1) {
    dressList.value.forEach((item, idx) => {
      if (idx === index) {
        item.selected = !item.selected
        if (item.selected) {
          selectedItem.value = item
          setDiscountPrice(item, 1)
        }
        else {
          selectedItem.value = null
        }
      }
      else { item.selected = false }
    })
  }
}

const selectPrice = (priceArr, index) => {
  priceArr.forEach((i, idx) => {
    if (index === idx)
      i.selected = !i.selected
    else
      i.selected = false
  })
}

const buy = async () => {
  if (!selectedGood.value) {
    showToast('请选择需要购买的商品')
    return
  }
  if (!selectedPrice.value) {
    showToast('请选择需要购买的商品的期限')
    return
  }
  let res
  const param = {}
  const priceObj = selectedItem.value.price.filter(i => i.selected)[0]
  if (tabIdx.value === 0) { // 购买装扮
    const userStore = useUserStore()
    const token = userStore.getToken
    if (maxDisountDressCard.value)
      param.user_discount_card_id = maxDisountDressCard.value.user_discount_id

    res = await rechargeDiscountApi.buyDress(
      { token, goods_id: selectedItem.value.goods_id, day: priceObj.day, ...param },
    )
      .catch((err) => {
        // 余额不足
        if (JSON.parse(err).code === 3999) {
          setTimeout(() => {
            toCharge()
          }, 500)
        }
      })
  }
  else { // 购买靓号
    if (maxDisountNumCard.value)
      param.user_discount_card_id = maxDisountNumCard.value.user_discount_id

    res = await rechargeDiscountApi.buyNum({ id: selectedItem.value.id, day: priceObj.day, ...param })
      .catch((err) => {
        // 余额不足
        if (err.code === 3333) {
          setTimeout(() => {
            toCharge()
          }, 500)
        }
      })
  }
  if (!res)
    return
  showToast('购买成功')
  close()
  getStore()
}

defineExpose<{ open: () => void }>({ open })
</script>

<style lang="scss" scoped>
@keyframes scale {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.95);
  }
}

@font-face {
  font-family: 'numberFont';
  src: url('@/assets/file/recharge-discount/numberFont.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.tool-dialog {
  :deep(.van-popup) {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    background: transparent;
    .dialog-box {
      max-height: 95vh;
      overflow: hidden;
      overflow-y: scroll;
      .dialog-content {
        padding-top: 109px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 750px;
        height: 1340px;
        background: url('@/assets/images/recharge-discount/discount-store-bg.webp')
          center center / cover no-repeat transparent;
        overflow: hidden;
        position: relative;

        .close-btn {
          width: 42px;
          height: 42px;
          background: url('@/assets/images/recharge-discount/close.webp') center
            center / cover no-repeat transparent;
          position: absolute;
          right: 30px;
          top: 65px;
        }

        .card-list {
          width: 718px;
          display: flex;
          overflow: hidden;
          overflow-x: scroll;
          gap: 16px;
          margin-bottom: 47px;

          .card-item {
            flex: 0 0 auto;
            /* 不伸缩，固定宽度 */
            width: 160px;
            height: 203px;
            display: flex;
            justify-content: center;
            font-size: 20px;
            color: #eb5241;

            div {
              margin-top: 10px;
            }
          }
        }

        .tab-box {
          width: 535px;
          height: 101px;
          background: url('@/assets/images/recharge-discount/tab-bg.webp')
            center center / cover no-repeat transparent;
          position: relative;
          margin-bottom: 22px;

          .tab1 {
            width: 271px;
            height: 81px;
            position: absolute;
            top: 10px;
            left: 10px;
          }

          .tab2 {
            width: 264px;
            height: 81px;
            position: absolute;
            top: 10px;
            right: 10px;
          }
        }

        .goods-list {
          width: 686px;
          height: 531px;
          border-radius: 40px;
          background: #fff;
          margin-bottom: 27px;
          overflow: hidden;
          overflow-y: scroll;

          .dress-box {
            padding: 30px 55px;
            flex-wrap: wrap;
            display: flex;

            .dress-item {
              width: 120px;
              height: 196px;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
              margin: 0 108px 24px 0;
              border-radius: 10px;

              .avatar-bg {
                width: 120px;
                height: 120px;
                background: url('@/assets/images/recharge-discount/avatar-bg.webp')
                  center center / cover no-repeat transparent;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 5px;

                .avatar-img {
                  width: 108px;
                  height: 108px;
                }
              }

              .name {
                font-size: 24px;
                font-weight: 500;
                color: #242424;
                line-height: 36px;
                white-space: nowrap;
              }

              .position {
                color: #666666;
                line-height: 36px;
                font-size: 24px;
                white-space: nowrap;
              }
            }

            .dress-item:nth-child(3n + 3) {
              margin-right: 0;
            }
          }

          .num-box {
            display: flex;
            flex-wrap: wrap;
            padding: 98px 20px 34px;
            position: relative;

            .pagination {
              position: absolute;
              top: 24px;
              right: 32px;
              width: 140px;
              height: 50px;
              border-radius: 62px;
            }

            .num-item {
              width: 305px;
              height: 62px;
              margin: 0 0px 24px 0;
              padding-left: 100px;
              line-height: 62px;
              font-size: 38px;
              font-family: 'numberFont';
            }

            .num-item:nth-child(2n) {
              margin-right: 20px;
            }
          }
        }

        .price-select-box {
          width: 646px;
          height: 129px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;

          .price-item {
            color: #ff4242;
            border: 3px solid #f86f18;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 194px;
            height: 129px;
            border-radius: 20px;

            .day {
              font-size: 24px;
            }

            .new-price {
              font-size: 32px;
              font-weight: bold;
            }

            .old-price {
              text-decoration: line-through;
              color: #666666;
              font-size: 26px;
            }
            span {
              font-size: 26px;
            }
          }

          .price-item:nth-child(2) {
            margin: 0 32px;
          }
        }

        .shop-btn {
          width: 372px;
          height: 86px;
          background: url('@/assets/images/recharge-discount/shop-btn-dialog.webp')
            center center / cover no-repeat transparent;
          margin-bottom: 22px;
          animation: scale 1.1s linear infinite;
        }

        .tips {
          font-size: 24px;
          font-weight: 500;
          color: #8f8f8f;
        }
      }
    }
  }
}
</style>
