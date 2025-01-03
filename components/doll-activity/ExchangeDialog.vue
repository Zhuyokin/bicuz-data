<template>
  <div id="exchange-dialog">
    <div class="fullPageDialog">
      <van-dialog v-model:show="show" class="fullPagePop" :show-confirm-button="false" :show-cancel-button="false">
        <div class="content">
          <div class="title-txt" :class="[isIosFun() ? '' : '']">
            兑换商城
          </div>
          <div class="debris-box">
            <div class="debris-icon" />
            <div class="debris-num">
              {{ props.debris }}碎片
            </div>
          </div>
          <div class="gift-prize-box">
            <div class="main">
              <div v-for="(item, index) in giftList" :key="index" class="prize-item">
                <!-- 碎片 -->
                <div class="parts-item">
                  <img src="@/assets/images/doll-activity/part-icon.webp" alt="">
                  <span class="txt">{{ item?.debris_number }}碎片</span>
                </div>
                <!-- 图片 -->
                <div
                  class="prize-pic"
                >
                  <div
                    class="prize-img"
                    :style="`background:url(${prependHttpIfMissing(item?.image)})  center center / cover no-repeat transparent`"
                  />
                </div>

                <div class="gift-name">
                  {{ item?.name }}x1
                </div>
                <div class="gift-price">
                  价值{{ item?.zs }}钻
                </div>
                <div class="receive-btn" @click="openReceive(item)" />
              </div>
            </div>
          </div>

          <div class="dress-prize-box">
            <div class="main">
              <div v-for="(item, index) in dressList" :key="index" class="prize-item">
                <!-- 碎片 -->
                <div class="parts-item">
                  <img src="@/assets/images/doll-activity/part-icon.webp" alt="">
                  <span class="txt">{{ item?.debris_number }}碎片</span>
                </div>
                <!-- 图片 -->
                <div
                  v-if="item?.config"
                  class="prize-pic"
                >
                  <anim-player v-if="item.config" :conf="item.config" @ready="(player) => player.player.start()" />
                </div>
                <div
                  v-else
                  class="prize-pic"
                >
                  <div
                    class="prize-img"
                    :style="`background:url(${prependHttpIfMissing(item?.image)})  center center / contain no-repeat transparent`"
                  />
                </div>
                <div class="gift-name">
                  {{ item?.name }} <span v-if="item?.day">x{{ item?.day }}天</span>
                </div>
                <div class="gift-price" :style="`opacity: ${item?.zs ? '1' : '0'}`">
                  价值{{ item?.zs }}钻
                </div>
                <div class="receive-btn" @click="openReceive(item)" />
              </div>
            </div>
          </div>

          <div class="rule" />
        </div>
        <div class="cancel cursor-pointer" @click="setVisible(false)" />
      </van-dialog>
    </div>
    <ConfirmExDialog ref="confirmExDialogRef" :debris-num="selectedItem?.debris_number" @confirm="confirmExchange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { dollActApi } from '~/api'
import ConfirmExDialog from '~/components/doll-activity/ConfirmExDialog.vue'
import testSVGA from '@/assets/images/doll-activity/test.svga?url'
import animPlayer from '@/components/anim-player/index.vue'

const props = defineProps<{
  debris: number
}>()
const emits = defineEmits(['success'])
const show = ref(false)
const giftList = ref([])
const dressList = ref([])
const selectedItem = ref({})
const confirmExDialogRef = ref<HTMLElement | null>(null)
const confirmExchange = async () => {
  const res = await dollActApi.exchangeDoll({ type: selectedItem.value.type, id: selectedItem.value.id }).catch(err => console.log(err))
  if (!res)
    return
  showToast('兑换成功')
  emits('success')
}

const openReceive = async (item: any) => {
  selectedItem.value = item
  confirmExDialogRef?.value?.openDialog()
}

const getMall = async (type: number) => {
  const res = await dollActApi.getDollMallList({ type }).catch(err => console.log(err))
  if (!res)
    return
  if (type === 1)
    giftList.value = res.list
  if (type === 2) {
    dressList.value = res.list.map((i) => {
      if (i.image.includes('.svga')) {
        return {
          ...i,
          config: {
            url: prependHttpIfMissing(i.image),
            loop: true,
            useType: 2,
          },
        }
      }
      else {
        return { ...i }
      }
    })
  }
}

const setVisible = (bool: boolean) => {
  show.value = bool
  if (bool)
    getMall(1)
  getMall(2)
}

defineExpose<{ setVisible: (bool: boolean) => void }>({ setVisible })
</script>

<style lang="scss" scoped>
.fullPageDialog {
  :deep(.van-popup--center) {
    margin: 0 !important;
  }

  :deep(.van-dialog) {
    background: transparent !important;
  }

  :deep(.van-overlay) {
    background: #7391ff;
  }
}

::v-deep(.fullPagePop) {
  position: fixed;
  top: 50%;
  width: 100vw;
  height: 100vh;
  overflow: initial;

  .van-dialog__content {
    width: 100vw;
    height: 100vh;

    .cancel {
      position: fixed;
      width: 50px;
      height: 50px;
      top: 120px;
      left: 28px;
      z-index: 6;
      background: url('@/assets/images/common/back-icon.webp') no-repeat center;
      background-size: 100% 100%;
    }

    .content {
      width: 100vw;
      height: 100vh;
      margin: auto;
      overflow-y: scroll;

      .title-txt {
        width: 100vw;
        height: 88px;
        text-align: center;
        line-height: 88px;
        font-size: 32px;
        color: #fff;
        font-weight: bold;
        margin-top: 100px;
      }

      .gift-prize-box,
      .dress-prize-box {
        width: 678px;
        margin: 0 auto 50px;
        padding: 136px 62px 94px;
      }

      .gift-prize-box {
        height: 1223px;
        background: url('@/assets/images/doll-activity/gift-prize-bg.webp')
          center center / cover no-repeat transparent;
      }

      .dress-prize-box {
        height: 866px;
        background: url('@/assets/images/doll-activity/dress-prize-bg.webp')
          center center / cover no-repeat transparent;
      }

      .debris-box {
        width: 271px;
        height: 79px;
        background: url('@/assets/images/doll-activity/debris-box.webp') center
          center / cover no-repeat transparent;
        margin: 28px auto 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 17px;

        .debris-icon {
          width: 50px;
          height: 50px;
          background: url('@/assets/images/doll-activity/debris-icon.webp')
            center center / cover no-repeat transparent;
        }

        .debris-num {
          color: #b04f00;
          font-size: 32px;
          font-weight: 500;
          line-height: 79px;
        }
      }

      .main {
        height: 1000px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        overflow: hidden;
        // overflow-y: scroll;

        .prize-item {
          width: 168px;
          height: 315px;
          background-color: #fff3ca;
          color: #b04f00;
          font-weight: 500;
          font-size: 22px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 25px 25px 0;

          .parts-item {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 13px;
            background: rgba(255, 211, 153, 0.4);
            font-size: 22px;
            color: #b04f00;
            margin-bottom: 12px;
            .txt {
              white-space: nowrap;
            }

            img {
              display: block;
              width: 28px;
              height: 28px;
              margin-right: 8px;
            }

            width: 160px;
            height: 42px;
            border-radius: 24px;
          }

          .gift-name {
            font-size: 22px;
            margin-bottom: 3px;
          }

          .gift-price {
            font-size: 20px;
            margin-bottom: 3px;
          }

          .receive-btn {
            width: 138px;
            height: 50px;
            background: url('@/assets/images/doll-activity/receive-btn.webp')
              center center / cover no-repeat transparent;
          }
        }

        .prize-pic {
          width: 168px;
          height: 131px;
          border-radius: 24px;
          background: #ffd399;
          margin-bottom: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          display: flex;
          justify-content: center;
          align-items: center;
          .prize-img {
            width: 108px;
            height: 107px;
            border-radius: 24px;
          }
        }

        .prize-item:nth-child(3n + 3) {
          margin-right: 0;
        }
      }

      .rule {
        width: 676px;
        height: 278px;
        background: url('@/assets/images/doll-activity/exchange-rule.webp')
          center center / cover no-repeat transparent;
        margin: 0 auto 50px;
      }
    }
  }
}
#exchange-dialog {
  :deep(canvas) {
    width: 70% !important;
    height: 90% !important;
  }
}
</style>
