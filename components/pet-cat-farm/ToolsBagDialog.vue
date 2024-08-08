<template>
  <div class="tool-dialog">
    <van-popup v-model:show="dialogVisible" position="bottom" round @click-overlay="close">
      <div class="content" @click.prevent.self="closeGuideOutter">
        <div class="close cursor-pointer" @click="close" />
        <div v-if="toolList.length > 0" class="tools">
          <div ref="contentRef" class="toolList" @click.prevent.self="closeGuideOutter">
            <div v-for="(item, index) in toolList" :key="index" class="tool-item" :class="[item.active ? 'selected' : '']" @click="selectTool(index)">
              <div class="name">
                {{ item.card_name }}
              </div>
              <div class="tool-guide" @click.stop="changeGuide(index)">
                <div v-if="item.guideVisible" class="guide-pop">
                  <div>{{ `${item.usage_remark},${item.attr_remark}` }}</div>
                </div>
              </div>
              <div class="img" :style="`background:url(${prependHttpIfMissing(item.icon)})  center center / cover no-repeat transparent`" />
              <!-- <div class="desc">
                {{ item.attr_remark }}
              </div> -->
              <div class="price">
                {{ item.props_num }}张
              </div>
            </div>
          </div>

          <div class="buy-btn" @click="confirm" />
        </div>
        <div v-else class="no-tool">
          背包暂无道具哦<br>
          快去商店看看吧～
        </div>
      </div>
    </van-popup>

    <!-- 道具使用弹窗 -->
    <UseToolDialog ref="useToolRef" :selected-tool="selectedTool" :pets="props.pets" @confirm="confirmUseTool" @close="initDialog" />
  </div>
</template>

<script setup lang="ts">
import { Toast } from 'vant'
import { petApi } from '@/api/index'
import { prependHttpIfMissing } from '@/utils/index'
import UseToolDialog from '~/components/pet-cat-farm/UseToolDialog.vue'
// import speedCard from '@/assets/images/pet-cat-farm/speed-card-pic.webp'
import type Pet from '~/pages/pet-cat-farm/pet'

const props = defineProps<{
  pets?: any
}>()
const emits = defineEmits(['confirm'])
const dialogVisible = ref(false)
const isSelectTool = ref(false)
const selectedTool = ref(null)
const toolList = ref([])
const useToolRef = ref<UseToolDialog | null>(null)
const contentRef = ref(null)
const closeGuideOutter = () => {
  toolList.value.forEach((i) => {
    i.guideVisible = false
  })
}
const selectTool = (idx: number) => {
  isSelectTool.value = false
  closeGuideOutter()
  toolList.value.forEach((item, index) => {
    item.active = idx === index ? !item.active : false
    if (idx === index && item.active) {
      selectedTool.value = item
      isSelectTool.value = true
    }
  })
}
const changeGuide = (idx: number) => {
  closeGuideOutter()
  toolList.value[idx].guideVisible = !toolList.value[idx].guideVisible
}

const close = () => {
  dialogVisible.value = false
  isSelectTool.value = false
  closeGuideOutter()
  contentRef.value?.scrollTo({ top: -20, left: 0 })
}

const initDialog = () => {
  getTools()
  close()
}

// 获取用户道具卡
const getUserCard = async () => {
  const res = await petApi.getUserSpeedCard().catch(err => console.log(err))
  if (!res)
    return
  toolList.value = res.list
}

const getTools = () => {
  getUserCard()
  dialogVisible.value = true
}

// 使用道具
const openUseTool = (tool) => {
  useToolRef.value?.openDialog(tool)
}

const confirmUseTool = (tool) => {
  openUseTool(tool)
}

const confirm = () => {
  if (!isSelectTool.value) {
    showToast(`请选择道具`)
    return
  }

  useToolRef.value?.openDialog()
  // close()
  // emits('confirm', selectedTool)
}

defineExpose<{ getTools: () => void }>({ getTools })
</script>

<style lang="scss" scoped>
.tool-dialog {
  :deep(.van-popup) {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff3de;
    // background: transparent;
    overflow-y: scroll;
    background: url('@/assets/images/pet-cat-farm/tool-bag-bg.webp') center
      center / cover no-repeat transparent;
    .content {
      .close {
        position: absolute;
        top: 117px;
        right: 24px;
        width: 68px;
        height: 63px;
        background: url('@/assets/images/pet-cat-farm/pet-store-close.webp')
          center center / cover no-repeat transparent;
      }
      height: 1091px !important;
      // overflow-y: scroll;
      overflow: hidden;
      width: 100%;
      // padding: 247px 0 0px;
      padding: 227px 0 0px;
      position: relative;
      .tools {
        width: 572px;
        height: 770px;
        margin: 0 auto;
        .toolList {
          width: 572px;
          height: 672px;
          overflow-y: scroll;
          display: flex;
          flex-wrap: wrap;
        }
        .tool-item {
          padding: 10px 0 10px;
          width: 264px;
          height: 300px;
          border-radius: 40px;
          background: #ffdc9f;
          margin: 0 44px 32px 0;
          color: #b43a04;
          font-size: 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          .name {
            font-weight: 600;
            margin-top: 4px;
          }
          .tool-guide {
            position: absolute;
            right: 24px;
            top: 16px;
            width: 32px;
            height: 32px;
            background: url('@/assets/images/pet-cat-farm/speed-card-guide-icon.webp')
              center center / cover no-repeat transparent;
          }
          .guide-pop {
            width: 310px;
            min-height: 70px;
            line-height: 28px !important;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            border-radius: 20px;
            background: #00000080;
            position: absolute;
            top: 45px;
            z-index: 9999;
            line-height: 24px;
            font-size: 24px;
            color: #fff;
            padding: 5px;
            div {
              text-align: center;
              direction: ltr;
            }
          }
          .guide-pop::before {
            z-index: 9999;
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 15px solid #00000080;
          }
          .img {
            margin: 5px 0 32px;
            width: 146px;
            height: 146px;
          }
          .desc {
            display: flex;
            align-items: center;
            width: 137px;
            height: 60px;
            font-size: 22px;
          }
          .price {
            font-weight: 600;
          }
        }
        .tool-item:nth-child(2n + 2) {
          margin-right: 0;
        }
        .tool-item:nth-child(2n + 1) {
          .guide-pop {
            right: -85px;
          }
          .guide-pop::before {
            right: 90px;
            top: -14px;
          }
        }
        .tool-item:nth-child(2n + 2) {
          .guide-pop {
            right: -15px;
          }
          .guide-pop::before {
            right: 20px;
            top: -14px;
          }
        }
        .selected {
          background: url('@/assets/images/pet-cat-farm/pet-item-bg-active.webp')
            center center / cover no-repeat transparent;
        }
      }
    }
    .buy-btn {
      margin: 10px auto;
      width: 414px;
      height: 106px;
      background: url('@/assets/images/pet-cat-farm/use-tool-btn.webp') center
        center / cover no-repeat transparent;
    }
    .no-tool {
      width: 350px;
      height: 144px;
      border-radius: 38px;
      background: #ffdc9f;
      font-size: 32px;
      color: #b43a04;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 42px;
      margin: 260px auto 0;
    }
  }
}
</style>
