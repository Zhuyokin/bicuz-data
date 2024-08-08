<template>
  <div v-if="feedVisible" class="feed-dialog">
    <van-popup v-model:show="feedVisible" :style="{ padding: '64px' }" @click-overlay="close">
      <div class="content">
        <div class="close cursor-pointer" @click="close" />
        <!-- <div class="food-img" /> -->
        <!-- 选择宠物 -->
        <SelectPetComp v-if="feedVisible" :pets="props.pets" type="follow" @select="select" />
        <div class="food-tips-text num-text">
          选择喜欢的宠物跟随你出去玩吧~
        </div>

        <div class="btn-group">
          <div class="cancel-btn cursor-pointer" @click="confirmFollow(0)" />
          <div class="confirm-btn cursor-pointer" @click="confirmFollow(1)" />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, reactive, ref } from 'vue'
import SelectPetComp from './SelectPetComp.vue'
import { setPetFollow } from '@/api/modules/pet'
import { throttle } from '@/utils/index'
import type Pet from '~/pages/pet-cat-farm/pet'

const props = defineProps({
  pets: {
    type: Array<Pet>,
    default: [],
  },
})
const emits = defineEmits(['feed'])
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
  pet.value = select
}
const getPetManorInfo = inject('getPetManorInfo')
// 宠物跟随/取消跟随
const setFollow = async (status) => {
  if (status === 1 && !pet.value.selected) {
    showToast(`请选择要跟随的宠物`)
    return
  }
  const user_pet_id = pet.value.petInfo.id
  const is_carry = pet.value.petInfo.is_carry
  const res = await setPetFollow({
    user_pet_id,
    is_carry: status,
  })
  if (!res)
    return

  showToast(`${status === 1 ? '开启' : '关闭'}宠物跟随`)
  getPetManorInfo()
  close()
}

// 设置投喂的默认选中
/**
 *
 *  1.默认选中已跟随
    2.默认选中等级最高
    3.等级相同选中第一个
 */
const setSelect = (pets) => {
  pets.forEach(i => i.selected = false)
  const idx = pets.findIndex(i => i.petInfo.is_carry)
  const maxLvItem = pets.reduce((accVal, curVal, curIdx, arr) => {
    if (curVal?.petInfo.level > accVal?.petInfo.level)
      return curVal
    else
      return accVal
  }, pets[0])
  const maxLvId = maxLvItem.petInfo.id
  const maxIdx = pets.findIndex(i => i.petInfo.id === maxLvId)
  console.log(maxLvId)
  if (idx >= 0) {
    pets[idx].selected = true
    pet.value = pets[idx]
    console.log('carry_-________________________', pets)
  }
  else {
    pets[maxIdx].selected = true
    pet.value = pets[maxIdx]
  }
}

const confirmFollow = throttle((status: number) => {
  setFollow(status)
}, 1000)

watch(() => feedVisible.value, () => {
  if (feedVisible.value) {
    pets.value = props.pets
    setSelect(pets.value)
  // pet.value = props.pets[0]
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
    height: 561px;
    background: url('@/assets/images/pet-cat-farm/follow-dialog-bg.webp') center
      center / cover no-repeat transparent;
    .num-text {
      color: #fff;
      font-weight: bolder;
      font-family: 'PingFang SC';
      color: #b64643;
    }
    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 686px;
      height: 561px;
      padding: 60px 36px 10px;
      overflow: visible;
      .close {
        position: absolute;
        top: 0px;
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
        margin: 28px 0;
        color: #fff;
        font-size: 28px;
        font-weight: bolder;
        // -webkit-text-stroke: 1px #b64643;
        // text-stroke: 1px #b64643;
        color: #b64643;
        // letter-spacing: 1px;
        // word-spacing: 1px;
        font-family: 'PingFang SC';
      }
      .btn-group {
        display: flex;
        justify-content: space-between;
        margin-bottom: 14px;
        .cancel-btn {
          width: 305px;
          height: 106px;
          background: url('@/assets/images/pet-cat-farm/follow-cancel.webp')
            center center / cover no-repeat transparent;
        }
        .confirm-btn {
          width: 305px;
          height: 106px;
          background: url('@/assets/images/pet-cat-farm/follow-confirm.webp')
            center center / cover no-repeat transparent;
        }
      }
    }
  }
}
</style>
