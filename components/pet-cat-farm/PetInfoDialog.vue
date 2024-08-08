<template>
  <div v-if="petInfoVisible" class="pet_store">
    <van-popup v-model:show="petInfoVisible" position="bottom" round @click-overlay="close">
      <div class="content">
        <div class="close cursor-pointer" @click="close" />
        <div ref="infoPetRef" class="pet-content">
          <!-- 选择宠物 :class="[pets.filter(i => i)?.length >= 2 ? '' : 'j-center']" -->
          <div class="select-pet">
            <div
              v-for="(item, index) in pets.filter(i => i)" :key="index" class="pet-item"
              :class="[item?.selected ? 'selected' : '']" @click="select(index)"
            >
              <div
                class="avatar"
                :style="`background:url(${prependHttpIfMissing(item.petInfo.pet_icon)})  center center / cover no-repeat transparent`"
              />
              <div class="name">
                {{ item.petInfo.name ?? item.petInfo.pet_name }}
              </div>
            </div>
          </div>
          <div class="pet-resource-container">
            <!-- <div id="avatar-container" ref="avatarRef"></div> -->
            <anim-player v-if="curPet?.petInfo.current_value >= 1200" :conf="config" @ready="onReady" />
            <div v-else-if="curPet?.petInfo.current_value >= 0 && curPet.petInfo" class="init-pet" />
            <div v-else class="no-pet" />

            <div class="info">
              <!-- 忠诚度 -->
              <div class="loyalty-box">
                忠诚度: {{ curPet.petInfo.loyalty }}
              </div>
              <!-- 转让 -->
              <div v-if="!props.isVisitedOther" class="transfer" @click="openTransfer" />
            </div>
          </div>
          <div v-if="petInfo" class="pet-name pet-info-item">
            <span>{{ curPet?.petInfo.name.length > 0 ? curPet?.petInfo.name : curPet?.petInfo.pet_name }}</span>
            <div v-if="!props.isVisitedOther" class="edit-name-btn cursor-pointer" @click="changePetName" />
          </div>
          <div v-else class="pet-name pet-info-item">
            未知
          </div>
          <div class="pet-info-item pet-status">
            {{ statusText }}
          </div>
          <div class="pet-info-item pet-level">
            {{ curPet?.petInfo ? `Lv.${curPet?.petInfo.level}` : '未知' }}
          </div>
        </div>
      </div>
    </van-popup>

    <TransferDialog ref="transferRef" type="transfer" :pet-info="curPet" @transfer-success="transfer" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { prependHttpIfMissing } from '@/utils/index'
import TransferDialog from '@/components/pet-cat-farm/TransferDialog.vue'
import animPlayer from '@/components/anim-player/index.vue'

const props = defineProps<{
  pets?: any
  isVisitedOther?: boolean
}>()
const emits = defineEmits(['close', 'changeName', 'transferPet'])
const petInfoVisible = ref(false)
const isSelectPet = ref(false)
const petInfo = ref({})
const isShow = ref(false)
const transferRef = ref<TransferDialog | null>(null)
const infoPetRef = ref(null)
const statusMap = {
  0: '休闲中',
  1: '进食中',
  2: '睡眠中',
  3: '饥饿中',
  4: '未知',
}
const pets = ref([])
const curPet = ref({})
// 动画配置
const config = ref<any>({
  url: prependHttpIfMissing(curPet.value?.petResource),
  json: prependHttpIfMissing(curPet.value?.petResourceConfig),
  width: 160,
  height: 160,
  loop: true,
})
// 初始化完成
const onReady = (player) => {
  player.player.play()
}
const statusText = computed(() => {
  if (!curPet.value)
    return '未知'
  if (curPet.value?.petInfo.current_value === 0)
    return '未知'

  return statusMap[curPet.value?.petInfo.status]
})

const getPetInfo = async (info, resource, resourceConfig) => {
  petInfo.value = info
  petInfoVisible.value = true
  isShow.value = true
}

const transfer = () => {
  close()
  return
  let idx = 0
  pets.value.forEach((i, index) => {
    if (i.petInfo.id === curPet.value.petInfo.id) {
      i = null
      idx = index
    }
  })
  emits('transferPet', idx)
  console.log(pets.value)
}

defineExpose<{ getPetInfo: (info, resource, resourceConfig) => void }>({ getPetInfo })

const close = () => {
  if (pets.value.length) {
    pets.value.forEach(i => i.selected = false)
    pets.value[0].selected = true
  }

  petInfoVisible.value = false
  isSelectPet.value = false
  infoPetRef.value?.scrollTo({ top: 0, left: 0 })
}

const select = (index: number) => {
  pets.value.forEach((i, idx) => {
    i.selected = idx === index
    if (idx === index && i.selected) {
      curPet.value = i
      config.value = Object.assign(config.value, {
        url: prependHttpIfMissing(curPet.value?.petResource),
        json: prependHttpIfMissing(curPet.value?.petResourceConfig),
      })
    }
  })
}

const openTransfer = () => {
  transferRef.value.openDialog()
}

const changePetName = () => {
  close()
  emits('changeName', curPet.value.petInfo)
}

watch([() => petInfoVisible.value, () => props.pets], (val) => {
  if (val[0] && val[1].length > 0) {
    pets.value = val[1]
    curPet.value = pets.value[0]
    pets.value.forEach((i) => {
      i.selected = false
    })
    curPet.value.selected = true
    config.value = Object.assign(config.value, {
      url: prependHttpIfMissing(curPet.value?.petResource),
      json: prependHttpIfMissing(curPet.value?.petResourceConfig),
    })
  }
  else {
    close()
  }
})
</script>

<style lang="scss" scoped>
.pet_store {
  border-radius: 0;
  transform: none;
  left: 0;
  bottom: 0;
  top: unset;
  display: flex;

  :deep(.van-popup) {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff3de;
    overflow: hidden;
    height: 1084px !important;
    background: url('@/assets/images/pet-cat-farm/pet-info-bg.webp') center
      center / cover no-repeat transparent;

    .content {
      width: 100%;
      padding: 258px 42px 64px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .close {
        position: absolute;
        top: 107px;
        right: 24px;
        width: 68px;
        height: 63px;
        background: url('@/assets/images/pet-cat-farm/pet-store-close.webp')
          center center / cover no-repeat transparent;
      }

      .buy-btn {
        position: absolute;
        bottom: 59px;
        left: 50%;
        transform: translateX(-50%);
        width: 404px;
        height: 96px;
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
        width: 666px;
        // min-height: 800px;
        height: 863px;
        padding-bottom: 100px;
        display: flex;
        flex-wrap: wrap;
        overflow-y: scroll;

        .pet-item-selected {
          background: url('@/assets/images/pet-cat-farm/pet-item-bg-active.webp')
            center center / cover no-repeat transparent;
        }

        .pet-item-unselected {
          background: #ffdc9f;
        }

        .pet-item {
          width: 264px;
          height: 300px;
          border-radius: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          // margin-right: 20px;
          // margin-bottom: 50px;

          .pet-name {
            color: #b43a04;
            font-size: 28px;
            font-weight: 500;
            margin-bottom: 10px;
            position: relative;
          }

          .pet-img {
            width: 166px;
            height: 166px;
            background: url('@/assets/images/pet-cat-farm/pet-store-box.webp')
              center center / cover no-repeat transparent;
            margin-bottom: 10px;
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

            .price-icon {
              display: block;
              width: 40px;
              height: 40px;
            }
          }
        }

        .select-pet {
          max-width: 586px;
          min-width: 176px;
          height: 206px;
          display: flex;
          // justify-content: space-between;
          margin: 0 auto;
          gap: 30px;
          color: #b43a04;
          margin-bottom: 24px;

          .pet-item {
            width: 176px;
            height: 206px;
            border-radius: 40px;
            background: #ffdc9f;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-size: 28px;
            font-weight: 500;

            .avatar {
              width: 108px;
              height: 108px;
              border: 4px solid #ff7d48;
              border-radius: 50%;
              margin-bottom: 13px;
            }
          }

          .selected {
            border: 8px solid #df5819;
          }
        }

        .pet-resource-container {
          width: 666px;
          height: 390px;
          border-radius: 38px;
          background: #ffdc9f;
          margin-bottom: 45px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;

          .no-pet {
            width: 255px;
            height: 278px;
            background: url('@/assets/images/pet-cat-farm/no-pet-status-info.webp')
              center center / cover no-repeat transparent;
          }

          .init-pet {
            background: url('@/assets/images/pet-cat-farm/egg-pet-status.webp')
              center center / cover no-repeat transparent;
            width: 255px;
            height: 278px;
          }

          #avatar-container {
            width: 100%;
            height: 100%;
          }

          .info {
            position: absolute;
            left: 0;
            bottom: 26px;
            width: 100%;
            padding: 0 24px;
            display: flex;
            justify-content: space-between;

            .loyalty-box {
              min-width: 170px;
              height: 60px;
              border-radius: 63px;
              background: #ffe5b8;
              display: inline-flex;
              padding: 10px 12px;
              justify-content: center;
              align-items: center;
              font-size: 28px;
              color: #b64643;
            }

            .transfer {
              width: 122px;
              height: 64px;
              background: url('@/assets/images/pet-cat-farm/transfer-btn.webp')
                center center / cover no-repeat transparent;
            }
          }
        }

        .pet-info-item {
          width: 666px;
          height: 106px;
          margin-bottom: 23px;
          color: #b43a04;
          font-size: 36px;
          font-style: normal;
          padding-top: 20px;
          font-weight: 500;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .pet-name {
          background: url('@/assets/images/pet-cat-farm/pet-info-item-name.webp')
            center center / cover no-repeat transparent;
          position: relative;

          .edit-name-btn {
            top: 50%;
            right: 5%;
            transform: translateY(-30%);
            position: absolute;
            width: 48px;
            height: 48px;
            background: url('@/assets/images/pet-cat-farm/name-edit-icon.webp')
              center center / cover no-repeat transparent;
          }
        }

        .pet-status {
          background: url('@/assets/images/pet-cat-farm/pet-info-item-status.webp')
            center center / cover no-repeat transparent;
        }

        .pet-level {
          background: url('@/assets/images/pet-cat-farm/pet-info-item-level.webp')
            center center / cover no-repeat transparent;
        }
      }
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

.j-center {
  justify-content: center !important;
}
</style>
