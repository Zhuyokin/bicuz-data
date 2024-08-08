<template>
  <div v-if="expVisible" class="feed-dialog">
    <van-popup v-model:show="expVisible" :style="{ padding: '64px' }">
      <div class="content">
        <div class="close cursor-pointer" @click="close" />
        <!-- 选择宠物 -->
        <SelectPetComp v-if="expVisible" :pets="props.pets" @select="select" />
        <div class="title">
          成长值（口粮）明细
        </div>
        <div class="tips">
          仅支持查看最近7天的记录
        </div>

        <div ref="contentRef" class="exp-list">
          <div v-for="(item, index) in petExpList" v-if="petExpList.length > 0" :key="index" class="exp-item">
            <span>{{ timeFormat(item.create_time * 1000, (format = 'YYYY-MM-DD')) }}</span>
            <div v-if="item.event < 2" class="right-box" @click="visit" v-html="item.html" />
            <div v-else class="right-box" @click="visit" v-html="item.html" />
          </div>
          <div v-else>
            暂无成长值记录
          </div>
        </div>
        <div class="curPetExp">
          当前宠物成长值：{{ pet?.petInfo.current_value }}
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import SelectPetComp from './SelectPetComp.vue'
import { petExpLog } from '@/api/modules/pet'
import { timeFormat } from '@/utils/index'

const props = defineProps<{
  pets: {
    type: Array<Pet>
    default: []
  }
}>()

const expVisible = ref(false)
const petExpList = ref([])
const num = ref<number>(1)
const contentRef = ref(null)
const pet = ref({})
const setVisible = (bool) => {
  expVisible.value = bool
}

const select = (select: Pet) => {
  console.log(select)
  pet.value = select
  getLogList()
}

const getLogList = async () => {
  setVisible(true)
  const res = await petExpLog({ user_pet_id: pet.value?.petInfo?.id }).catch((err) => {
    console.log('[ err ] >', err)
  })
  console.log('[ res ] >', res)
  if (!res)
    return

  petExpList.value = res.list.map((i) => {
    const nickName = i.nickname.length > 9 ? `${i.nickname.slice(0, 9)}...` : i.nickname
    if (i.event === 2) { // 暴击
      i.html = `<span>${i.pet_name}被<span class="nickName" data-id=${i?.user_id}>${i.nickname}</span>暴击${i.extend}次，损失了${i.exp}成长值 </span>`
    }
    else if (i.event === 0) { // 喂养
      i.html = `<span><span class="nickName" data-id=${i?.user_id}>${i.nickname}</span>给${i.pet_name}喂养${i.exp}成长值</span>`
    }
    else if (i.event === 1) { // 衰减
      i.html = `<span>${i.pet_name}衰减${i.exp}成长值</span>`
    }

    else { i.nickname = nickName }

    return { ...i, exp: i.exp > 10000 ? `${(Number.parseInt((i.exp / 10000) * 100) / 100).toFixed(2)}w` : i.exp }
  })
}

const visit = async (event) => {
  const id = event.target.dataset.id
  if (id > 0 && id) {
    // window.open(`/pet-cat-farm?isHead=0&has_mp4=1&user_id=${id}&from_top=true`, '_self')
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

const close = () => {
  setVisible(false)
  contentRef.value?.scrollTo({ top: 0, left: 0 })
}

watch(() => expVisible.value, () => {
  if (expVisible.value) {
    // pets.value = props.pets
    pet.value = props.pets[0]
    getLogList()
  }
})

defineExpose<{ setVisible: (boolean) => void, getLogList: (info) => void }>({ setVisible, getLogList })
</script>

<style lang="scss" scoped>
.feed-dialog {
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
    height: 984px;
    background: url('@/assets/images/pet-cat-farm/pet-exp-bg-v2.webp') center
      center / cover no-repeat transparent;
    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 686px;
      height: 984px;
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
      .title {
        font-size: 32px;
        font-weight: bold;
        margin-top: 20px;
        margin-bottom: 16px;
      }
      .tips {
        font-size: 24px;
        color: rgba(180, 58, 4, 0.7);
        margin-bottom: 16px;
      }
      .exp-list::-webkit-scrollbar {
        display: none;
      }
      .exp-list {
        width: 100%;
        min-height: 300px;
        font-size: 24px;
        color: #b43a04;
        overflow: hidden;
        overflow-y: scroll;
        padding-top: 10px;
        .exp-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 60px;
          border-bottom: 3px solid rgba(180, 54, 4, 0.12);
          margin-bottom: 24px;
          .right-box {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 440px;
            min-height: 36px;
            // unicode-bidi: bidi-override;
            text-align: right;
            .nickName {
              color: #ff4e00;
            }
          }
        }
      }
      .curPetExp {
        margin: 10px auto;
        color: #ec440e;
        font-family: 'PingFang SC';
        font-size: 28px;
        font-style: normal;
        font-weight: 500;
        line-height: 36px;
      }
    }
  }
}
</style>
