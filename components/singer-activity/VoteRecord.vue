<template>
  <div class="dialog">
    <van-popup v-model:show="dialogVisible" :style="{ padding: '64px' }">
      <div class="content">
        <div class="tabList">
          <div v-for="(item, index) in tabList" :key="index" class="tabItem cursor-pointer" :class="[item.active ? 'active' : '']" @click="tabClick(item, index)">
            {{ item.tabName }}
          </div>
        </div>
        <div class="record-list">
          <div class="rec-title">
            <div class="time">
              时间
            </div>
            <div class="user">
              用户
            </div>
            <div v-if="actTabIdx === 2" class="num">
              数量
            </div>
            <div class="cost">
              花费
            </div>
          </div>
          <div v-if="recordList.length" class="rec-main">
            <div v-for="(item, index) in recordList" :key="index" class="rec-item">
              <div class="time">
                {{ timeFormat(item.create_time * 1000, (format = 'MM-DD HH:mm')) }}
              </div>
              <div class="user">
                <div class="name">
                  {{ item.nickname }}
                </div>
                <div class="id">
                  ID:{{ item.user_number }}
                </div>
              </div>
              <div v-if="actTabIdx === 2" class="num">
                {{ item.like_number }}个
              </div>
              <div class="cost">
                {{ item.amount }}米粒
              </div>
            </div>
          </div>
          <div v-else class="rec-main no-exist">
            暂无相关记录
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { timeFormat } from '@/utils/index'

import { singActApi } from '@/api/index'

const props = defineProps<{ configId?: number }>()
const emits = defineEmits(['initPage'])
const dialogVisible = ref(false)
const recordList = ref([])
const actTabIdx = ref(1)

const tabList = ref([
  {
    id: 1,
    tabName: '送出捧场',
    active: true,
  },
  {
    id: 2,
    tabName: '收到捧场',
    active: false,
  },
])

const getRecord = async () => {
  const res = await singActApi.getVoteLog({ type: actTabIdx.value === 1 ? 2 : 1, page: 1, pagesize: 999, config_id: props.configId }).catch((err) => {
    console.log('[getLikeLog >]', err)
  })
  console.log('getRecord >', res)

  if (!res)
    return
  recordList.value = res.list
}

const tabClick = (itm, idx) => {
  if (actTabIdx.value === idx + 1)
    return
  actTabIdx.value = idx + 1
  tabList.value.forEach((item, index) => {
    item.active = idx === index
  })
  getRecord()
}

const setVisible = (bool) => {
  dialogVisible.value = bool
  if (bool)
    getRecord()
}

defineExpose<{ setVisible: (bool: boolean) => void }>({ setVisible })
</script>

<style lang="scss" scoped>
.dialog {
  :deep(.van-popup) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 !important;
    overflow: visible;
    width: 678px;
    height: 736px;
    background: url('@/assets/images/singer-activity/vote-list-bg.webp') center
      center / cover no-repeat transparent;
    border-radius: 40px;

    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 678px;
      height: 736px;
      padding: 124px 24px 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      .tabList {
        width: 564px;
        height: 80px;
        border-radius: 45px;
        padding: 0 8px;
        background: #2a7de9;
        display: flex;
        align-items: center;
        margin-bottom: 24px;
        .tabItem {
          color: rgba(168, 239, 249, 0.5);
          width: 274px;
          height: 64px;
          border-radius: 31px;
          text-align: center;
          line-height: 64px;
          font-size: 32px;
          font-weight: 600;
        }
        .tabItem.active {
          color: #006bdc;
          background-color: #a8eff9;
        }
      }
      .record-list {
        width: 564px;
        height: 450px;
        overflow: hidden;
        overflow-y: scroll;
        font-size: 24px;
        .rec-title {
          color: #a8eff9;
        }
        .rec-title,
        .rec-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 24px;
          .name {
            white-space: nowrap;
          }
        }
        .rec-item {
          color: rgba(255, 255, 255, 0.8);
        }
        .no-exist {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          margin-top: 150px;
        }
        .time {
          width: 143px;
          white-space: nowrap;
          height: 32px;
        }
        .user {
          width: 120px;
          min-height: 32px;
          color: #fff;
          font-weight: 600;
        }
        .num {
          width: 51px;
          height: 32px;
        }
        .cost {
          width: 78px;
          height: 32px;
          transform: translateX(-15px);
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
