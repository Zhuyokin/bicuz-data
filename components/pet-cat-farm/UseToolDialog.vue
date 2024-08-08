<template>
  <div v-if="dialogVisible" id="tool-dialog" class="dialog">
    <van-popup v-model:show="dialogVisible" :style="{ padding: '64px' }">
      <div class="content">
        <div class="close cursor-pointer" @click="close()" />
        <div v-if="!isNameCard" class="title">
          当前数量: {{ props.selectedTool.props_num }}
        </div>
        <div v-else class="title">
          更改名字
        </div>
        <div
          v-if="!isNameCard" class="tool-img"
          :style="`background:url(${prependHttpIfMissing(props.selectedTool.icon)})  center center / cover no-repeat transparent`"
        />
        <!-- 选择宠物 -->
        <SelectPetComp v-if="dialogVisible" :pets="props.pets" @select="select" />
        <div v-if="isNameCard" class="name-container">
          <van-field
            v-model="name" label-align="center" input-align="center" maxlength="5" placeholder="请输入昵称"
            :disabled="disabled"
          />
          <div class="edit-btn cursor-pointer" @click="setDisabled" />
        </div>
        <div v-if="isNameCard" class="tips">
          宠物名最短为 1个汉字/字母/数字、最长为5个汉字/字母/数字，不支持汉字/字母/数字外的其他字符
          宠物名不可使用涉黄、涉暴等敏感词汇，不可对其他主播进行诋毁、冒充，不可使用官方名词
          提交后需经人工审核方可生效，使用改名卡则不受时间限制
        </div>
        <!-- 道具数量 -->
        <div v-if="!isNameCard && !isCatchCard" class="change-num-box">
          <div class="minus-btn cursor-pointer" @click="changeNum('minus')" />
          <van-field v-model="num" type="digit" label-align="center" maxlength="2" placeholder="输入数量" />
          <div class="add-btn cursor-pointer" @click="changeNum('add')" />
        </div>
        <!-- 确认按钮 -->
        <div class="confirm" @click="confirm" />
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SelectPetComp from './SelectPetComp.vue'
import { petApi } from '@/api/index'

const props = defineProps<{
  pets?: any
  selectedTool?: any
  foodNum?: number
}>()
const emit = defineEmits(['close'])
const dialogVisible = ref(false)
const num = ref<number>(1)
const pets = ref([])
const pet = ref({})
const name = ref(null)
const disabled = ref(true)

const close = () => {
  dialogVisible.value = false
  disabled.value = true
}
const openDialog = (tool) => {
  dialogVisible.value = true
}
const select = (select: Pet) => {
  disabled.value = true
  pet.value = select
  name.value = select.petInfo.name
}

const isNameCard = computed(() => {
  return props.selectedTool.props_id === 5
})

const isCatchCard = computed(() => {
  return props.selectedTool.props_id === 3
})

const initPetInfo = inject('initPetInfo')
const getPetManorInfo = inject('getPetManorInfo')
const replaceDevResource = inject('replaceDevResource')

const useCard = async () => {
  if (disabled.value && isNameCard.value) {
    showToast(`请输入修改后的名称`)
    return
  }
  if (!pet.value.selected) {
    showToast(`请选择宠物`)
    return
  }
  const cardId = props.selectedTool.props_id
  if (isNameCard.value) {
    const res = await petApi.useToolCard({ user_pet_id: pet.value.petInfo.id, props_num: 1, props_id: cardId, name: name.value }).catch((err) => {
      console.log('[err >]', err)
    })
    if (!res) {
      // showToast(res?.msg)
      return
    }
    showToast(`改名成功`)
    getPetManorInfo()
  }
  else {
    const ret = await petApi.useToolCard({ user_pet_id: pet.value.petInfo.id, props_num: num.value, props_id: cardId, isRaw: true }).catch((err) => {
      console.log('[err >]', err)
    })
    if (!ret)
      return
    const res = ret.data
    if (cardId === 1)
      showToast(`已使用${res.used}张加速卡`)
    if (cardId === 2) {
      // 暴击卡
      showToast(`已使用${res.used}张暴击卡`)
      // 1.在非进食状态使用暴击卡
      // 2.在进食状态使用暴击卡
      // 3.暴击导致回退成初始状态-先展示暴击动效 后回退
      let petInfoObj = {}
      if (pet.value.petInfo.status !== 1) {
        // initPetInfo({ ...res.pet_info, ts: ret.ts }, cardId === 2)
        petInfoObj = { ...res.pet_info, ts: ret.ts }
        replaceDevResource(petInfoObj)
      }
      else {
        const exp = pet.value.petInfo.current_value - res.used * 1200
        const info = {
          current_value: exp <= 0 ? 0 : exp,
          form: pet.value.petInfo.form,
          id: pet.value.petInfo.id,
          level: res.pet_info.level,
          start_value: res.pet_info.start_value,
          end_value: res.pet_info.end_value,
          next_level: res.pet_info.next_level,
          ts: ret.ts,
        }
        petInfoObj = { ...info }
        replaceDevResource(petInfoObj)
        // initPetInfo({ ...info }, cardId === 2) // 暴击卡不影响进食
      }

      pet.value.hit(petInfoObj)

      emit('close')
      close()
      return
    }
    if (cardId === 3) {
      // 无法对自己的宠物使用哦
      if (res.used === 0) {
        showToast(`${res.capture_msg}`)
        return
      }
      else {
        if (!res.capture_pet)
          pet.value.setCatchStatus('fail')
        else
          pet.value.setCatchStatus('success')
        setTimeout(() => {
          // 诱捕卡
          showToast(`${res.capture_msg}`)
        }, 3500)
      }
    }
    if (cardId === 4) {
      // 保护卡
      showToast(`已使用${res.used}张保护卡`)
      pet.value.setIsProtect(true)
    }

    initPetInfo({ ...res.pet_info, ts: ret.ts }, cardId === 2)
  }
  emit('close')
  close()
}

const confirm = () => {
  useCard()
}

const changeNum = (type: string) => {
  if ([1, '1'].includes(num.value) && ['minus'].includes(type))
    return

  if ([99, '99'].includes(num.value) && ['add'].includes(type))
    return

  if (['add'].includes(type))
    num.value = Number(num.value) + 1

  if (['minus'].includes(type))
    num.value = Number(num.value) - 1
}

const setDisabled = () => {
  if (!disabled.value)
    return

  disabled.value = !disabled.value
}
watch(() => dialogVisible.value, () => {
  if (dialogVisible.value) {
    pets.value = props.pets
    pet.value = pets.value[0]
    num.value = 1
    name.value = pet.value.petInfo.name
  }
})
defineExpose<{ openDialog: (boolean) => void }>({ openDialog })
</script>

<style lang="scss" scoped>
#tool-dialog {
  :deep(.van-cell) {
    width: 238px;
    height: 68px;
    line-height: 30px;
    font-weight: 500;
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
    width: 686px !important;
    height: 837px !important;
    background: url('@/assets/images/pet-cat-farm/use-tool-bg.png') center
      center / cover no-repeat transparent;
    overflow: visible !important;

    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 686px !important;
      height: 837px !important;
      padding: 34px 48px 50px !important;
      font-size: 28px;
      color: #b43a04;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: visible;

      .close {
        position: absolute;
        top: -15px;
        right: 26px;
        width: 68px;
        height: 63px;
        background: url('@/assets/images/pet-cat-farm/pet-store-close.webp')
          center center / cover no-repeat transparent;
      }
      .title {
        margin: 0px auto 10px;
      }

      .tool-img {
        width: 146px;
        height: 146px;
        margin-bottom: 15px;
      }

      .change-num-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 32px auto;

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

      .name-container {
        width: 598px;
        height: 86px;
        margin: 28px auto;
        border-radius: 69px;
        background: #ffdc9f;
        display: flex;
        align-items: center;
        justify-content: center;
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
      }

      .tips {
        width: 598px;
        min-height: 100px;
        text-align: left;
        font-size: 22px;
        color: rgba(180, 58, 4, 0.7);
        margin-bottom: 16px;
      }

      .confirm {
        margin: 24px auto;
        width: 404px;
        height: 96px;
        background: url('@/assets/images/pet-cat-farm/use-tool-btn.webp') center
          center / cover no-repeat transparent;
      }
    }
  }
}
</style>
