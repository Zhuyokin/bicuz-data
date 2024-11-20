<template>
  <div class="dialog">
    <van-popup v-model:show="dialogVisible">
      <div class="dialog-container">
        <div v-if="recordList.length > 0" class="dialog-list">
          <div v-for="(item, index) in recordList" :key="index" class="dialog-item">
            <div class="left">
              <div class="date">
                {{ item?.create_time }}
              </div>
              <div class="gift">
                获得礼物：{{ item?.contentTxt }}
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
import { thanksApi } from '~/api'

const dialogVisible = ref(false)
const recordList = ref<any[]>([])

const getRec = async () => {
  const res = await thanksApi.getMyRecord({ page: 1, pagesize: 500 }).catch((err) => { console.log(err) })
  if (!res)
    return
  console.log('getRec >', res)
  recordList.value = res.list.map((item: any) => {
    const txt = item.content.map((i: any) => `${i.title}* ${i.number}`).join(',')
    return { ...item, contentTxt: txt }
  })
}
const setVisible = (bool: boolean) => {
  dialogVisible.value = bool
  if (bool)
    getRec()
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
          margin-bottom: 33px;
          position: relative;
          .left {
            .date {
              margin-bottom: 12.5px;
            }
            .gift {
              width: 100%;
              color: #ff4bc6;
            }
          }
          .right {
            position: absolute;
            top: 0;
            right: 0;
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
