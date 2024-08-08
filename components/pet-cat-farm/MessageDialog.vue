<template>
  <div class="feed-dialog">
    <van-popup v-model:show="expVisible" :style="{ padding: '64px' }">
      <div class="content">
        <div class="close cursor-pointer" @click="close" />
        <div v-if="petExpList.length > 0" ref="contentRef" class="exp-list">
          <div v-for="(item, index) in petExpList" :key="index" class="exp-item">
            <span class="left-box">{{ timeFormat(item.create_time * 1000, (format = 'YYYY-MM-DD')) }}</span>
            <span class="right-box" @click="visit" v-html="item.extend" />
          </div>
        </div>
        <div v-else ref="contentRef" class="exp-list">
          暂无消息
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { petApi } from '@/api/index'
import { timeFormat } from '@/utils/index'

const props = defineProps({
  foodNum: {
    type: Number,
    default: 0,
  },
})
const expVisible = ref(false)
const petExpList = ref([])
const num = ref<number>(1)
const setVisible = (bool) => {
  expVisible.value = bool
}
const contentRef = ref(null)
const visit = async (event) => {
  const id = event.target.dataset.id
  if (id > 0 && id)
  // window.open(`/pet-cat-farm?isHead=0&has_mp4=1&user_id=${id}&from_top=true`, '_self')
  {
    await navigateTo({
      path: '/pet-cat-farm',
      query: {
        isHead: 0,
        has_mp4: 1,
        user_id: id,
        from_top: 'true',
      },
    }, {
      open: {
        target: '_self',
      },
    })
  }
}

const getLogList = async () => {
  setVisible(true)
  const res = await petApi.getPetEventLogs({ page: 1, pagesize: 999 }).catch((err) => {
    console.log('[ err ] >', err)
  })
  console.log('[ res ] >', res)
  if (!res)
    return

  petExpList.value = res.list.map((i) => {
    const nickName = i.nickname.length > 9 ? `${i.nickname.slice(0, 9)}...` : i.nickname
    i.extend = i.extend.replace('to_user_name', `<span class="nickName" data-id=${i?.user_id}>${nickName}</span>`).replace('【pet_name】', i.name)
    return { ...i, exp: i.exp > 10000 ? `${(Number.parseInt((i.exp / 10000) * 100) / 100).toFixed(2)}w` : i.exp }
  })
}

const close = () => {
  setVisible(false)
  contentRef.value?.scrollTo({ top: 0, left: 0 })
}

defineExpose<{ setVisible: (boolean) => void, getLogList: (info) => void }>({ setVisible, getLogList })
</script>

<style lang="scss" scoped>
.feed-dialog {
  font-weight: 600;
  :deep(.van-cell) {
    width: 238px;
    height: 68px;
    line-height: 30px;
    font-weight: 500;
    margin: 0 20px;
    border-radius: 20px;
    background: #ffdc9f !important;
  }
  :deep(.van-popup) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 !important;
    width: 686px;
    height: 785px;
    background: url('@/assets/images/pet-cat-farm/message-dialog-bg.webp')
      center center / cover no-repeat transparent;
    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 686px;
      height: 785px;
      padding: 151px 48px 50px;
      color: #b43a04;
      display: flex;
      flex-direction: column;
      align-items: center;
      .close {
        position: absolute;
        top: 85px;
        right: 26px;
        width: 68px;
        height: 63px;
        background: url('@/assets/images/pet-cat-farm/pet-store-close.webp')
          center center / cover no-repeat transparent;
      }
      .exp-list::-webkit-scrollbar {
        display: none;
      }
      .exp-list {
        width: 100%;
        min-height: 300px;
        font-size: 24px;
        padding-top: 15px;
        color: #b43a04;
        overflow: hidden;
        overflow-y: scroll;
        .exp-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 60px;
          border-bottom: 3px solid rgba(180, 54, 4, 0.12);
          margin-bottom: 24px;
          .left-box {
            white-space: nowrap;
          }
          .right-box {
            width: 440px;
            min-height: 36px;
            unicode-bidi: bidi-override;
            text-align: right;
            .nickName {
              color: #ff4e00;
            }
          }
        }
      }
    }
  }
}
</style>
