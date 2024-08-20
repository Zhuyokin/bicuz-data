<template>
  <div id="record-dialog">
    <van-popup v-model:show="dialogVisible" @click-overlay="close">
      <div class="body">
        <div class="tabBox">
          <div v-for="(item, index) in tabList" :key="index" class="tab1 tabItem" :class="[item.id === activeTabIdx ? 'active' : '']" @click="changeTab(item.id)">
            {{ item.tabName }}
          </div>
        </div>
        <!-- 空白页 -->
        <div v-if="recordList.length && !isLoading" class="list-box">
          <div v-for="(item, index) in recordList" :key="index" class="record-item">
            <div class="avatar" :style="`background:url(${prependHttpIfMissing(item?.face)})  center center / cover no-repeat transparent`" @click="toUserCenter(item.user_id)" />
            <div class="name-info">
              <div class="name">
                {{ item.nickname }}
              </div>
              <div class="info">
                <span v-if="activeTabIdx === 1" class="title">在娃娃机里获得了</span>
                <span v-else class="title">在兑换商城里兑换了</span>
                <span v-if="activeTabIdx === 1">
                  {{ item?.contentTxt }}
                </span>
                <span v-else>
                  {{ item?.reward }}
                </span>
              </div>
            </div>

            <div class="time">
              {{ timeFormat(item.create_time * 1000, (format = 'MM-DD HH:mm')) }}
            </div>
          </div>
        </div>
        <div v-else class="blank-box">
          &nbsp;还没有记录 <br>
          快去{{ activeTabIdx === 1 ? '抓娃娃' : '兑换' }}吧～
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { dollActApi } from '~/api'
import { prependHttpIfMissing, timeFormat } from '@/utils/index'

const dialogVisible = ref(false)
const isLoading = ref(false)
const recordList = ref([])
const activeTabIdx = ref(1)
const tabList = ref([{
  id: 1,
  tabName: '娃娃记录',
  active: true,
}, {
  id: 2,
  tabName: '兑换记录',
  active: false,
}])

const setVisible = (bool) => {
  dialogVisible.value = bool
}

const getMyRecord = async () => {
  const res = await dollActApi.getMyLog({ page: 1, pagesize: 999 }).catch(err => console.log(err))
  if (!res)
    return

  res.list.forEach((item, index) => {
    item.content.forEach((i) => {
      if (!i.giftId)
        i.title = `碎片${i.title}`
    })
  })
  res.list.forEach((i) => {
    i.contentTxt = i.content.map(i => i.title).join(',')
  })
  if (activeTabIdx.value === 1) {
    recordList.value = res.list
    isLoading.value = false
  }
}

const getExchangeRecord = async () => {
  const res = await dollActApi.myExchangeLog({ page: 1, pagesize: 999 }).catch(err => console.log(err))
  if (!res)
    return
  if (activeTabIdx.value === 2) {
    recordList.value = res.list
    isLoading.value = false
  }
  console.log('getExchangeRecord >', res)
}

const toUserCenter = (user_id) => {
  const params = {
    // params用于给安卓指令用的 - 不携带参数 - 安卓接收不到指令
    user_id,
  }
  js_sync_app('js_sync_usermain', params, 'user_id')
}

const changeTab = (id: number) => {
  if (activeTabIdx.value === id)
    return
  isLoading.value = true
  recordList.value = []
  tabList.value.forEach((i, idx) => {
    i.active = i.id === id
    if (i.active)
      activeTabIdx.value = i.id
    if (i.active && activeTabIdx.value === 1)
      getMyRecord()

    if (i.active && activeTabIdx.value === 2)
      getExchangeRecord()
  })
}

const openDialog = () => {
  dialogVisible.value = true
  getMyRecord()
}

const close = () => {
  setVisible(false)
  activeTabIdx.value = 1
}

defineExpose<{ openDialog: (boolean) => void }>({ openDialog })
</script>

<style lang="scss" scoped>
#record-dialog {
  :deep(.van-field__value) input {
    font-size: 28px;
    line-height: 28px;
    color: #c65bff !important;
    font-weight: bold;
    text-align: center;
  }

  :deep(.van-field__value) .van-field__word-limit {
    margin-top: -35px;
    color: #8f8f8f;
  }

  :deep(.van-popup) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 !important;
    width: 678px !important;
    height: 1036px !important;
    overflow: visible !important;
    height: auto;
    background: transparent;

    .body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 678px;
      height: 1036px;
      background: url('@/assets/images/doll-activity/record-dialog-bg.webp')
        center center / cover no-repeat transparent;
      font-size: 28px;
      padding-top: 135px;

      .tabBox {
        width: 288px;
        height: 80px;
        border-radius: 45px;
        background: #f7e3b6;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 8px;
        margin-bottom: 23px;

        .tabItem {
          width: 136px;
          height: 64px;
          border-radius: 31px;
          text-align: center;
          line-height: 64px;
          color: #b04f00;
          font-weight: bold;
        }

        .tabItem.active {
          background: #ffd399;
        }
      }

      .list-box {
        width: 598px;
        height: 705px;
        overflow: hidden;
        overflow-y: scroll;
        .record-item {
          width: 598px;
          height: 120px;
          border-radius: 26px;
          background: #f7e3b7;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          padding: 0 10px;
          position: relative;
          .name-info {
            color: #b04f00;
            font-size: 30px;
            font-weight: 600;
          }
          .avatar {
            width: 104px;
            height: 104px;
            border-radius: 50%;
            margin-right: 16px;
          }
          .info {
            width: 395px;
            max-height: 64px;
            font-size: 24px;
            font-weight: 500;
            color: #b04f00;
            display: -webkit-box; /* 使用弹性盒子布局模型 */
            -webkit-box-orient: vertical; /* 垂直排列子元素 */
            -webkit-line-clamp: 2; /* 限制在3行 */
            overflow: hidden; /* 隐藏溢出的内容 */
            text-overflow: ellipsis; /* 多行时显示省略符号 */
            white-space: normal; /* 使用正常的白空格处理方式，允许换行 */
          }
          .info {
            .title {
              color: #666666;
            }
          }
          .time {
            color: #b04f00;
            font-size: 24px;
            font-weight: 500;
            white-space: nowrap;
            position: absolute;
            right: 20px;
            top: 10px;
          }
        }
      }

      .blank-box {
        width: 344px;
        height: 144px;
        border-radius: 38px;
        background: #ffdc9f;
        font-size: 32px;
        line-height: 48px;
        color: #b43a04;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        margin: 250px auto 0;
      }
    }
  }
}
</style>
