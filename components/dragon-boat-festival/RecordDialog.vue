<template>
  <div class="dialog">
    <van-popup v-model:show="dialogVisible" :style="{ padding: '64px' }">
      <div class="content">
        <div class="close cursor-pointer" @click="setVisible(false)" />
        <div class="title">
          粽子获取记录
        </div>
        <div v-if="recordList.length > 0" class="list">
          <div v-for="(item, index) in recordList" :key="index" class="item">
            <div class="time">
              {{ timeFormat(item[0].create_time * 1000, (format = 'YYYY-MM-DD HH:mm')) }}
            </div>
            <div class="detail">
              获得<span v-for="(i, idx) in item" :style="{ marginLeft: idx == 0 ? '0' : '6px' }">{{ i.prop_name }}·{{ i.num }}</span>
            </div>
          </div>
        </div>
        <div v-else class="none">
          暂无获取记录
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { setName } from '@/api/modules/pet'
import { timeFormat } from '@/utils/index'
import { dragonBoatFestivalApi } from '@/api/index'

const props = defineProps({
  foodNum: {
    type: Number,
    default: 0,
  },
})
const emits = defineEmits(['initPage'])
const dialogVisible = ref(false)
const disabled = ref(true)
const petInfo = ref({})
const recordList = ref([])
const setVisible = (bool) => {
  dialogVisible.value = bool
  if (bool)
    getRecord()
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
  dialogVisible.value = false
  emits('initPage')
}

const getRecord = async () => {
  const res = await dragonBoatFestivalApi.getDBFGiftRecord({ type: 1 }).catch((err) => {
    console.log('[getDBFGiftRecord >]', err)
  })
  if (!res)
    return
  recordList.value = res.list
}

defineExpose<{ setVisible: (bool: boolean) => void }>({ setVisible })
</script>

<style lang="scss" scoped>
.dialog {
  :deep(.van-cell) {
    width: 100%;
    margin: 0 20px;
    border-radius: 20px;
    background: #ffffff !important;
  }
  .none {
    color: #666666;
    font-size: 24px;
    height: 376px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
  :deep(.van-popup) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 !important;
    overflow: visible;
    width: 686px;
    height: 525px;
    background: #fff;
    border-radius: 40px;
    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 686px;
      height: 525px;
      padding: 37px 24px 0px;
      color: #b43a04;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        color: #ff1c10;
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 32px;
      }
      .list {
        height: 376px;
        width: 100%;
        font-size: 24px;
        overflow-y: scroll;
        .item {
          width: 638px;
          height: 112px;
          border-radius: 20px;
          padding: 16px 24px;
          background: #ffffff85;
          margin-bottom: 20px;
          background: #fffbe7;
          .time {
            color: #666666;
            margin-bottom: 12px;
            font-weight: bold;
          }
          .detail {
            color: #ff5c00;
            font-weight: bold;
          }
        }
      }
      .close {
        position: absolute;
        top: 12px;
        right: 16px;
        width: 35px;
        height: 35px;
        background: url('@/assets/images/dragon-boat-festival/record-close.webp')
          center center / cover no-repeat transparent;
      }
    }
  }
}
</style>
