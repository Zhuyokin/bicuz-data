<template>
  <div v-if="feedVisible" class="feed-dialog">
    <van-popup v-model:show="feedVisible" :style="{ padding: '64px' }" @click-overlay="close">
      <div class="content">
        <div class="close cursor-pointer" @click="close" />
        <!-- <div class="food-img" /> -->
        <!-- 选择宠物 -->
        <SelectPetComp v-if="feedVisible" :pets="props.pets" @select="select" />
        <div class="food-tips-text num-text">
          消耗{{ 1200 * num }}口粮
        </div>
        <div class="change-num-box">
          <div class="minus-btn cursor-pointer" @click="changeFeedNum('minus')" />
          <van-field v-model="num" type="digit" label-align="center" maxlength="2" placeholder="请输入投喂数量" />
          <div class="add-btn cursor-pointer" @click="changeFeedNum('add')" />
        </div>
        <div class="feed-btn cursor-pointer" @click="confirmFeed" />
        <div class="my-food-num num-text">
          我的口粮: {{ props.foodNum }}
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, reactive, ref } from 'vue'
import SelectPetComp from './SelectPetComp.vue'
import { feedPet } from '@/api/modules/pet'
import { throttle } from '@/utils/index'
import type Pet from '~/pages/pet-cat-farm/pet'

const props = defineProps({
  foodNum: {
    type: Number,
    default: 0,
  },
  pets: {
    type: Array<Pet>,
    default: [],
  },
})
const emits = defineEmits(['initPage', 'feed'])
const pets = ref([])
const feedVisible = ref(false)
const petInfo = ref({})
const pet = ref({})
const num = ref<number>(1)
const setVisible = (bool) => {
  feedVisible.value = bool
}
const setPetInfo = (info) => {
  petInfo.value = info
}

const close = () => {
  setVisible(false)
  num.value = 1
}
const select = (select: Pet) => {
  console.log(select)
  pet.value = select
}
const feed = async () => {
  if (!pet.value) {
    showToast(`请选择宠物`)
    return
  }
  // 衰退期投喂条件
  if (pet.value.petInfo.status === 3 && num.value * 1200 < pet.value.petInfo.prevent_decrease_fodder) {
    showToast(`小宠物饿坏了，本次需要${pet.value.petInfo.prevent_decrease_fodder}口粮才可以进行投喂～`)
    return
  }
  const ret = await feedPet({ user_pet_id: pet.value.petInfo?.id, times: num.value, isRaw: true }).catch((err) => {
    console.log('[err >]', err)
  })
  const res = ret.data
  if (!res)
    return
  showToast('投喂成功')
  emits('initPage', { ...res.pet_info, ts: ret.ts, user_fodder: res.user_fodder, current_value: pet.value.petInfo.current_value })
  close()
  // res.pet_list = [res.pet_info];
}

const confirmFeed = throttle(() => {
  feed()
}, 1000)

const changeFeedNum = (type) => {
  if ([1, '1'].includes(num.value) && ['minus'].includes(type))
    return

  if ([99, '99'].includes(num.value) && ['add'].includes(type))
    return

  if (['add'].includes(type))
    num.value = Number(num.value) + 1

  if (['minus'].includes(type))
    num.value = Number(num.value) - 1
}

watch(() => feedVisible.value, () => {
  if (feedVisible.value) {
    pets.value = props.pets
    pet.value = props.pets[0]
  }
})

defineExpose<{ setVisible: (boolean) => void, setPetInfo: (info) => void }>({ setVisible, setPetInfo })
</script>

<style lang="scss" scoped>
.feed-dialog {
  :deep(.van-cell) {
    width: 290px;
    height: 68px;
    line-height: 30px;
    font-weight: 500;
    // color: #B64643!important;
    margin: 0 20px;
    border-radius: 20px;
    background: #ffdc9f !important;
  }
  :deep(.van-field__value) input {
    color: #b64643;
    font-weight: bold;
    text-align: center;
    font-size: 30px;
  }
  :deep(.van-popup) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 !important;
    width: 686px;
    height: 785px;
    background: url('@/assets/images/pet-cat-farm/feed-dialog-bg.webp') center
      center / cover no-repeat transparent;
    .num-text {
      color: #fff;
      font-size: 22px !important;
      font-weight: bolder;
      // -webkit-text-stroke: 1px #b64643;
      // text-stroke: 1px #b64643;
      // letter-spacing: 1px;
      // word-spacing: 1px;
      font-family: 'PingFang SC';
      color: #b64643;
    }
    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 686px;
      height: 785px;
      padding: 176px 36px 10px;
      .close {
        position: absolute;
        top: 85px;
        right: 26px;
        width: 68px;
        height: 63px;
        background: url('@/assets/images/pet-cat-farm/pet-store-close.webp')
          center center / cover no-repeat transparent;
      }
      .food-img {
        width: 264px;
        height: 264px;
        background: url('@/assets/images/pet-cat-farm/feed-dialog-food.webp')
          center center / cover no-repeat transparent;
      }
      .food-tips-text {
        // font-size: 22px;
        // line-height: 36px;
        margin: 15px auto;
        color: #fff;
        font-size: 32px;
        font-weight: bolder;
        // -webkit-text-stroke: 1px #b64643;
        // text-stroke: 1px #b64643;
        color: #b64643;
        // letter-spacing: 1px;
        // word-spacing: 1px;
        font-family: 'PingFang SC';
      }
      .change-num-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        .minus-btn {
          width: 68px;
          height: 68px;
          background: url('@/assets/images/pet-cat-farm/feed-dialog-minus.webp')
            center center / cover no-repeat transparent;
        }
        .add-btn {
          width: 68px;
          height: 68px;
          background: url('@/assets/images/pet-cat-farm/feed-dialog-add.webp')
            center center / cover no-repeat transparent;
        }
      }
      .feed-btn {
        margin-bottom: 14px;
        width: 404px;
        height: 96px;
        background: url('@/assets/images/pet-cat-farm/feed-dialog-btn.webp')
          center center / cover no-repeat transparent;
      }
      .my-food-num {
        font-size: 22px !important;
        line-height: 36px;
      }
    }
  }
}
</style>
