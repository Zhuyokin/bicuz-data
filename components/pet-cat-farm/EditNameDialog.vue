<template>
  <div class="name-dialog">
    <van-popup v-model:show="nameVisible" :style="{ padding: '64px' }">
      <div class="content">
        <div class="close cursor-pointer" @click="setVisible(false)" />
        <div class="title">
          更改宠物名字
        </div>
        <div class="name-container">
          <van-field
            v-model="name"
            label-align="center"
            input-align="center"
            maxlength="5"
            placeholder="请输入昵称"
            :disabled="disabled"
          />
          <div class="edit-btn cursor-pointer" @click="setDisabled" />
        </div>
        <div class="tips">
          宠物名最短为 1个汉字/字母/数字、最长为5个汉字/字母/数字，不支持汉字/字母/数字外的其他字符
          宠物名不可使用涉黄、涉暴等敏感词汇，不可对其他主播进行诋毁、冒充，不可使用官方名词
          提交后需经人工审核方可生效，每30天最多更改一次
        </div>
        <!-- 提交按钮 -->
        <div class="submit-btn cursor-pointer" :style="{ opacity: `${disabled ? '0.8' : '1'}` }" @click="changeName" />
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { setName } from '@/api/modules/pet'
import { timeFormat } from '@/utils/index'

const props = defineProps({
  foodNum: {
    type: Number,
    default: 0,
  },
})
const emits = defineEmits(['initPage'])
const nameVisible = ref(false)
const disabled = ref(true)
const name = ref<string>('')
const petInfo = ref({})
const setVisible = (info) => {
  console.log(info)
  name.value = info.name
  nameVisible.value = !!info
  disabled.value = true
  petInfo.value = info
}
const setDisabled = () => {
  if (!disabled.value)
    return

  disabled.value = !disabled.value
}

const changeName = async () => {
  console.log(petInfo.value)
  const res = await setName({ user_pet_id: petInfo.value?.id, name: name.value })
  if (!res)
    return
  showToast('更改成功')
  nameVisible.value = false
  emits('initPage')
}

defineExpose<{ setVisible: (info) => void }>({ setVisible })
</script>

<style lang="scss" scoped>
.name-dialog {
  :deep(.van-cell) {
    width: 100%;
    margin: 0 20px;
    border-radius: 20px;
    background: #ffdc9f !important;
  }
  :deep(.van-field__value) input {
    font-size: 36px;
    color: #b43a04 !important;
    font-weight: bold;
    text-align: center;
  }
  :deep(.van-popup) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 !important;
    overflow: visible;
    width: 686px;
    height: 609px;
    background: url('@/assets/images/pet-cat-farm/edit-name-dialog.webp') center
      center / cover no-repeat transparent;
    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 686px;
      height: 609px;
      padding: 48px 44px 50px;
      color: #b43a04;
      display: flex;
      flex-direction: column;
      align-items: center;
      .close {
        position: absolute;
        top: -18px;
        right: 26px;
        width: 68px;
        height: 63px;
        background: url('@/assets/images/pet-cat-farm/pet-store-close.webp')
          center center / cover no-repeat transparent;
      }
      .title {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 16px;
        margin-bottom: 40px;
      }
      .name-container {
        width: 598px;
        height: 86px;
        margin-bottom: 46px;
        border-radius: 69px;
        background: #ffdc9f;
        display: flex;
        align-items: center;
        position: relative;
        .edit-btn {
          top: 50%;
          right: 5%;
          transform: translateY(-50%);
          position: absolute;
          width: 48px;
          height: 48px;
          background: url('@/assets/images/pet-cat-farm/name-edit-icon.webp')
            center center / cover no-repeat transparent;
        }
      }
      .tips {
        width: 598px;
        min-height: 100px;
        text-align: left;
        font-size: 22px;
        color: rgba(180, 58, 4, 0.7);
        margin-bottom: 16px;
      }
      .submit-btn {
        width: 404px;
        height: 96px;
        background: url('@/assets/images/pet-cat-farm/name-submit-btn.webp')
          center center / cover no-repeat transparent;
      }
    }
  }
}
</style>
