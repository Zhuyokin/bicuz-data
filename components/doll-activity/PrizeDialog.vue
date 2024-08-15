<template>
  <div id="fukui-dialog">
    <van-popup v-model:show="dialogVisible" @click-overlay="close">
      <div class="body">
        <div class="tabList">
          <div class="tabName" @click="changeTab(index + 1)" :class="[item.active ? 'active' : '']"
            v-for="(item, index) in tabList">{{ item.name }}
          </div>
        </div>

        <div class="max-value" :style="`background:${activeTab.color}`">
          最高可获得{{ activeTab.maxGift?.value }}钻石礼物
        </div>

        <div class="max-gift"
          :style="`background:url(${activeTab.giftBg})  center center / cover no-repeat transparent`">
          <div class="rate">{{ activeTab.maxGift?.rate }}%</div>

          <div class="name-val">
            <div class="name">{{ activeTab.maxGift?.name }}</div>
            <div class="val">{{ activeTab.maxGift?.value }}钻石</div>
          </div>
        </div>

        <div class="gift-group">
          <div class="gift-item" v-for="(item, index) in activeTab.gifts" :key="index">
            <div class="rate">{{ item.rate }}%</div>
            <div class="pic"></div>
            <div class="name">{{ item.name }}</div>
            <div class="value">价值{{ item.value }}钻石</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import prize1Bg from '@/assets/images/doll-activity/prize1Bg.webp'
import prize2Bg from '@/assets/images/doll-activity/prize2Bg.webp'
import prize3Bg from '@/assets/images/doll-activity/prize3Bg.webp'
import prize4Bg from '@/assets/images/doll-activity/prize4Bg.webp'
const tabList = ref([
  {
    id: 1,
    name: "Mi小咪",
    active: true,
    giftBg: prize1Bg,
    color: "#FF6A68",
    maxGift: {
      rate: 0.88,
      name: "月光女孩",
      value: 18800,
      pic: null,
    },
    gifts: [
      {
        id: 1,
        rate: 0.88,
        name: "礼物1",
        value: 600,
        pic: null,
      },
      {
        id: 2,
        rate: 0.88,
        name: "礼物2",
        value: 602,
        pic: null,
      },
      {
        id: 3,
        rate: 0.88,
        name: "礼物3",
        value: 603,
        pic: null,
      },
      {
        id: 4,
        rate: 0.88,
        name: "礼物4",
        value: 604,
        pic: null,
      }
    ]
  },
  {
    id: 2,
    name: "Mi小橘",
    active: false,
    color: "#FF6CB4",
    giftBg: prize2Bg,
    maxGift: {
      rate: 0.88,
      name: "月光女孩",
      value: 18801,
      pic: null,
    },
    gifts: [
      {
        id: 1,
        rate: 0.88,
        name: "礼物2",
        value: 600,
        pic: null,
      },
      {
        id: 2,
        rate: 0.88,
        name: "礼物2",
        value: 602,
        pic: null,
      },
      {
        id: 3,
        rate: 0.88,
        name: "礼物3",
        value: 603,
        pic: null,
      },
      {
        id: 4,
        rate: 0.88,
        name: "礼物4",
        value: 604,
        pic: null,
      }
    ]
  },
  {
    id: 3,
    name: "Mi小白",
    active: false,
    color: "#6693FF",
    giftBg: prize3Bg,
    maxGift: {
      rate: 0.88,
      name: "月光女孩",
      value: 18802,
      pic: null,
    },
    gifts: [
      {
        id: 1,
        rate: 0.88,
        name: "礼物1",
        value: 600,
        pic: null,
      },
      {
        id: 2,
        rate: 0.88,
        name: "礼物2",
        value: 602,
        pic: null,
      },
      {
        id: 3,
        rate: 0.88,
        name: "礼物3",
        value: 603,
        pic: null,
      },
      {
        id: 4,
        rate: 0.88,
        name: "礼物4",
        value: 604,
        pic: null,
      }
    ]
  },
  {
    id: 4,
    name: "Mi小美",
    active: false,
    color: "#B366FF",
    giftBg: prize4Bg,
    maxGift: {
      rate: 0.88,
      name: "月光女孩",
      value: 18803,
      pic: null,
    },
    gifts: [
      {
        id: 1,
        rate: 0.88,
        name: "礼物1",
        value: 600,
        pic: null,
      },
      {
        id: 2,
        rate: 0.88,
        name: "礼物2",
        value: 602,
        pic: null,
      },
      {
        id: 3,
        rate: 0.88,
        name: "礼物3",
        value: 603,
        pic: null,
      },
      {
        id: 4,
        rate: 0.88,
        name: "礼物4",
        value: 604,
        pic: null,
      }
    ]
  }
])

const activeTab = computed(() => {
  return tabList.value.filter(i => i.active)[0]
})

const dialogVisible = ref(false)
const setVisible = (bool) => {
  dialogVisible.value = bool
}
const openDialog = (tool) => {
  console.log(tool)
  dialogVisible.value = true
}

const changeTab = (idx) => {
  tabList.value.forEach((item, index) => {
    item.active = idx === index + 1 ? true : false
  })
}

const close = () => {
  setVisible(false)
}

defineExpose<{ openDialog: (boolean) => void }>({ openDialog })
</script>

<style lang="scss" scoped>
#fukui-dialog {
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
    height: 1063px !important;
    overflow: visible !important;
    height: auto;
    background: transparent;

    .body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 678px;
      height: 1063px;
      background: url('@/assets/images/doll-activity/prizeDialog.webp') center center / cover no-repeat transparent;
      font-size: 28px;
      padding-top: 135px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .tabList {
        width: 564px;
        height: 80px;
        background-color: #F7E3B6;
        border-radius: 45px;
        display: flex;
        align-items: center;
        gap: 20px;

        .tabName {
          width: 122px;
          height: 64px;
          border-radius: 31px;
          color: #B04F00;
          text-align: center;
          line-height: 64px;
        }

        .active {
          background: #FFD399;
        }
      }

      .max-value {
        width: 304px;
        height: 36px;
        border-radius: 38px;
        color: #fff;
        font-size: 24px;
        line-height: 36px;
        text-align: center;
        margin: 19px auto 22px;
      }

      .max-gift {
        width: 280px;
        height: 288px;
        position: relative;
        margin-bottom: 33px;
        display: flex;
        justify-content: center;
        align-items: flex-end;

        .rate {
          width: 93px;
          height: 36px;
          border-radius: 38px;
          background: #ffffff66;
          text-align: center;
          color: #B04F00;
          line-height: 36px;
          position: absolute;
          top: 55px;
          left: 11px;
        }

        .name-val {
          color: #242424;
          text-align: center;

          .name {
            font-size: 26px;
            font-weight: 500;
          }

          .val {
            font-size: 22px;
            font-weight: 500;
          }
        }
      }

      .gift-group {
        width: 598px;
        height: 238px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .gift-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #B04F00;
          .rate {
            width: 93px;
            height: 36px;
            border-radius: 38px;
            background: #ffffff66;
            font-size: 20px;
            text-align: center;
            line-height: 36px;
            color: #B04F00;
            margin-bottom: 7px;
          }
          .pic {
            width: 143px;
            height: 112px;
            border-radius: 24px;
            background-color: #FFD399;
            margin-bottom: 18px;
          }
          .name {
            font-size: 22px;
            font-weight: 500;
          }
          .value {
            font-size: 20px;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
