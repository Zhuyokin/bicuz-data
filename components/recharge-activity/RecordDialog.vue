<template>
  <div class="dialog">
    <van-popup v-model:show="dialogVisible" :style="{ padding: '64px' }">
      <div class="content">
        <div class="close cursor-pointer" @click="setVisible(false)" />
        <div class="title">
          礼券获取记录
        </div>
        <div v-if="recordList?.length > 0" class="list">
          <div v-for="(item, index) in recordList" :key="index" class="item">
            <div class="time">
              {{ timeFormat(item?.provide_time * 1000, (format = 'YYYY-MM-DD HH:mm')) }}
            </div>
            <div class="detail">
              获得礼券数量: {{ item.num }}
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
import { rechargeActApi } from '@/api/index'

const props = defineProps({
  foodNum: {
    type: Number,
    default: 0,
  },
})
const emits = defineEmits(['initPage'])
const dialogVisible = ref(false)
const recordList = ref([])
const setVisible = (bool) => {
  dialogVisible.value = bool
  if (bool)
    getRecord()
}

const getRecord = async () => {
  const res = await rechargeActApi.getTicketNum({ type: 1 }).catch((err) => {
    console.log('[getDBFGiftRecord >]', err)
  })
  if (!res)
    return
  console.log(res)

  recordList.value = res
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
        color: #176bb7;
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
          margin-bottom: 20px;
          background: #def5ff;
          .time {
            color: #666666;
            margin-bottom: 12px;
            font-weight: bold;
          }
          .detail {
            color: #176bb7;
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
