<template>
  <div v-if="props.pet" class="pet-info-container" :class="[props.isVisitedOther ? '' : 'scale-btn ']" @click="openExpLog">
    <div class="pet-info-box">
      <div class="avatar cursor-pointer">
        <!-- @/assets/images/pet-cat-farm/btn.png -->
        <img :src="prependHttpIfMissing(props?.face)" alt="">
        <!-- <img :src="defaultAvatar" alt="" /> -->
        <!-- <img src="https://sky-itcast-yujin.oss-cn-beijing.aliyuncs.com/avatar.png" alt="" /> -->
      </div>
      <div class="pet-info">
        <div class="name">
          {{
            props.pet.petInfo.name.length > 0
              ? props.pet.petInfo.name.length > 5
                ? `${props.pet.petInfo.name.slice(0, 5)}...`
                : props.pet.petInfo.name
              : props.pet.petInfo.pet_name.length > 5
                ? `${props.pet.petInfo.pet_name.slice(0, 5)}...`
                : props.pet.petInfo.pet_name
          }}
        </div>
        <div class="exp">
          <span>等级</span> {{ level }}
          <div v-if="!props.isVisitedOther" class="right-arrow" />
        </div>
      </div>
    </div>
    <div class="pet-exp-box cursor-pointer">
      <div class="pet-exp-star" />
      <div class="pet-exp-progress" :style="{ width: `${level < 100 ? expRatio : 100}%` }">
        <div class="pet-exp-text">
          {{ level < 100 ? `差${upLeftExp}成长值升至下一级` : '已满级' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  pet: any
  face?: string
  isVisitedOther?: boolean
}>()
const emits = defineEmits(['openExpLog'])

// const expRatio = computed(() => {
//   return (
//     ((props.pet.petInfo.current_value - props.pet.petInfo.start_value)
//     / (props.pet.petInfo.end_value - props.pet.petInfo.start_value))
//     * 100
//   ).toFixed(2)
// })

// const upLeftExp = computed(() => {
//   return props.pet.petInfo.end_value - props.pet.petInfo.current_value
// })

const upLeftExp = ref(0)
const expRatio = ref('0')
const level = ref(1)

const openExpLog = () => {
  emits('openExpLog')
}
watchEffect(() => {
  const pet = props.pet
  console.log('watchEffect=================pet', pet)
})

watch(() => props.pet, (val) => {
  if (!val)
    return
  upLeftExp.value = val.petInfo.end_value - val.petInfo.current_value
  expRatio.value = (
    ((val.petInfo.current_value - val.petInfo.start_value)
    / (val.petInfo.end_value - val.petInfo.start_value))
    * 100
  ).toFixed(2)
  level.value = val.petInfo.level
}, { deep: true, immediate: true })
</script>

<style lang="scss" scoped>
  .pet-info-container {
  position: fixed;
  z-index: 2000;
  top: 220px;
  left: 49px;
  // 宠物名称和等级
  .pet-info-box {
    background-color: rgba(255, 255, 255, 0.8);
    width: 288px;
    height: 88px;
    backdrop-filter: blur(2px);
    stroke-width: 2px;
    border-radius: 28px;
    padding: 3px 30px 3px 100px;
    margin-bottom: 17px;
    position: relative;
    .avatar {
      width: 138px;
      height: 138px;
      background: linear-gradient(
        180deg,
        rgba(255, 207, 151, 1),
        rgba(250, 91, 91, 1)
      );
      background: url('@/assets/images/pet-cat-farm/my-avatar-ring.webp') center
        center / cover no-repeat transparent !important;
      position: absolute;
      bottom: -8px;
      left: -38px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      img {
        display: block;
        margin-top: 18px;
        border-radius: 50%;
        width: 98px !important;
        height: 98px !important;
        z-index: -1;
      }
    }
    .pet-info {
      color: #ec440e;
      font-size: 28px;
      min-width: 140px;
      .name {
        font-family: 'PingFang SC';
        font-weight: 600;
        text-align: left;
        white-space: nowrap;
      }
      .exp {
        span {
          font-size: 24px;
        }
        font-family: 'PingFang SC';
        font-weight: 500;
        text-align: left;
        display: flex;
        align-items: center;
        .right-arrow {
          margin-left: 10px;
          width: 16px;
          height: 16px;
          transform: rotate(45deg);
          border-right: 4px solid #ec440e;
          border-top: 4px solid #ec440e;
        }
      }
    }
  }
  .pet-exp-box {
    width: 290px;
    height: 30px;
    border-radius: 38px;
    background: #b0f7ffff;
    border: 1px solid #fff;
    position: relative;
    padding: 1px 3px;
    margin-left: 28px;
    transform: translateX(-20px);
    .pet-exp-star {
      position: absolute;
      top: 50%;
      left: -40px;
      transform: translateY(-50%);
      width: 52px;
      height: 52px;
      z-index: 3;
      background: url('@/assets/images/pet-cat-farm/pet-exp-star.webp') center
        center / cover no-repeat transparent;
    }
    .pet-exp-progress {
      height: 99%;
      border-radius: 38px;
      // background: linear-gradient(180deg, #ff8d51 0%, #f00 100%);
      background: #fed916;
      z-index: 3;
    }
    .pet-exp-text {
      color: #ec440e;
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
