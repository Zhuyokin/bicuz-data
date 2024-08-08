<template>
  <!-- 选择宠物 :class="[pets?.length >= 2 ? '' : 'j-center']" -->
  <div class="select-pet">
    <div
      v-for="(item, index) in pets" :key="index" class="pet-item" :class="[item.selected ? 'selected' : '']"
      @click="select(index)"
    >
      <div class="avatar" :style="`background:url(${prependHttpIfMissing(item.petInfo.pet_icon)})  center center / cover no-repeat transparent`" />
      <div class="name">
        {{
          item.petInfo.name.length > 0
            ? item.petInfo.name.length > 5
              ? `${item.petInfo.name.slice(0, 5)}...`
              : item.petInfo.name
            : item.petInfo.pet_name.length > 5
              ? `${item.petInfo.pet_name.slice(0, 5)}...`
              : item.petInfo.pet_name
        }}
      </div>
      <div class="exp">
        等级: {{ item.petInfo.level }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import type Pet from '~/pages/pet-cat-farm/pet'

const props = defineProps({
  pets: {
    type: Array<Pet>,
    default: [],
  },
  type: {
    default: '',
  },
})
const emit = defineEmits(['select'])
const pets = ref(props.pets)

// 选择宠物
const select = (index: number) => {
  pets.value.forEach((i, idx) => {
    i.selected = idx === index ? !i.selected : false
    if (idx === index)
      emit('select', i)
  })
}

// 设置投喂的默认选中
const setSelect = (pets) => {
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
  if (idx >= 0)
    pets[idx].selected = true

  else pets[maxIdx].selected = true
}

watchEffect(() => {
  pets.value = props.pets
  console.log('selectPetComp ================>', pets.value)
  if (props.type === 'follow')
    console.log('watchEffect==follow==')
    // setSelect(pets.value)

  // else pets.value[0].selected = true
})
onUnmounted(() => {
  pets.value.forEach(i => i.selected = false)
  pets.value[0].selected = true
})
</script>

<style lang="scss" scoped>
.select-pet {
  min-width: 176px;
  max-width: 586px;
  gap: 30px;
  display: flex;
  // justify-content: space-between;
  color: #b43a04;

  .pet-item {
    width: 176px;
    height: 251px;
    border-radius: 40px;
    background: #fff3de;
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
    }
  }

  .selected {
    border: 8px solid #df5819;
  }
}
.j-center {
  justify-content: center;
}
</style>
