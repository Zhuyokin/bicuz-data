<template>
  <div class="dialog">
    <van-popup v-model:show="dialogVisible">
      <div class="dialog-container">
        <div v-if="recordList.length > 0" class="dialog-list">
          <div v-for="(item, index) in recordList" :key="index" class="dialog-item">
            <div class="left">
              <div class="date">
                {{ item.time }}
              </div>
              <div class="gift">
                获得礼物：{{ item.gift }}
              </div>
            </div>
            <div class="right">
              普通盲盒
            </div>
          </div>
        </div>
        <div class="blank">
          没有更多了
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialogVisible = ref(false)
const recordList = ref([
  {
    id: 1,
    time: '2024-10-29 16:34',
    gift: '泡泡机X1',
  },
  {
    id: 1,
    time: '2024-10-29 16:34',
    gift: '泡泡机X1',
  },
  {
    id: 1,
    time: '2024-10-29 16:34',
    gift: '泡泡机X1',
  },
  {
    id: 1,
    time: '2024-10-29 16:34',
    gift: '泡泡机X1',
  },
  {
    id: 1,
    time: '2024-10-29 16:34',
    gift: '泡泡机X1',
  },
  {
    id: 1,
    time: '2024-10-29 16:34',
    gift: '泡泡机X1',
  },
  {
    id: 1,
    time: '2024-10-29 16:34',
    gift: '泡泡机X1',
  },
  {
    id: 1,
    time: '2024-10-29 16:34',
    gift: '泡泡机X1',
  },
  {
    id: 1,
    time: '2024-10-29 16:34',
    gift: '泡泡机X1',
  },
  {
    id: 1,
    time: '2024-10-29 16:34',
    gift: '泡泡机X1',
  },
])
const setVisible = (bool: boolean) => {
  dialogVisible.value = bool
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
    overflow: visible !important;
    width: 578px;
    height: 640px;
    background: url('@/assets/images/thanks/record-dialog.webp') center center /
      cover no-repeat transparent;
    .dialog-container {
      width: 100%;
      padding: 0 48px 40px;
      height: 500px;
      margin-top: 98px;
      overflow-y: scroll;
      .dialog-list {
        margin-bottom: 22px;
        .dialog-item {
          display: flex;
          justify-content: space-between;
          color: #b58aa7;
          font-weight: 500;
          font-size: 24px;
          .left {
            .date {
              margin-bottom: 12.5px;
            }
            .gift {
              color: #ff4bc6;
            }
          }
        }
      }
      .blank {
        color: #b58aa7;
        font-size: 24px;
        text-align: center;
      }
    }
  }
}
</style>
