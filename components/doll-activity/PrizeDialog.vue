<template>
  <div id="fukui-dialog">
    <van-popup v-model:show="dialogVisible" @click-overlay="close">
      <div class="body">
        <div class="tabList">
          <div
            v-for="(item, index) in tabList" class="tabName" :class="[item.active ? 'active' : '']"
            @click="changeTab(index + 1)"
          >
            {{ item.name }}
          </div>
        </div>

        <div class="max-value" :style="`background:${activeTab.color}`">
          最高可获得{{ activeTab.maxGift?.value }}钻石礼物
        </div>

        <div
          class="max-gift"
          :style="`background:url(${activeTab.giftBg})  center center / cover no-repeat transparent`"
        >
          <div class="rate">
            {{ activeTab.maxGift?.rate }}%
          </div>

          <div class="gift-pic" :style="`background:url(${activeTab.maxGift?.pic})  center center / cover no-repeat transparent`" />

          <div class="name-val">
            <div class="name">
              {{ activeTab.maxGift?.name }}
            </div>
            <div class="val">
              {{ activeTab.maxGift?.value }}钻石
            </div>
          </div>
        </div>

        <div class="gift-group">
          <div v-for="(item, index) in activeTab.gifts" :key="index" class="gift-item">
            <div class="rate">
              {{ item.rate }}%
            </div>
            <div class="pic">
              <div class="prize-img" :style="`background:url(${item?.pic})  center center / cover no-repeat transparent`" />
            </div>
            <div class="name">
              {{ item.name }}
            </div>
            <div class="value">
              价值{{ item.value }}钻石
            </div>
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
import sp from '@/assets/images/doll-activity/prize/sp.png'
import mfb from '@/assets/images/doll-activity/prize/mfb.png'
import tmxq from '@/assets/images/doll-activity/prize/tmxq.png'
import xgxm from '@/assets/images/doll-activity/prize/xgxm.png'
import xsxg from '@/assets/images/doll-activity/prize/xsxg.png'
import xxfl from '@/assets/images/doll-activity/prize/xxfl.png'
import xxw from '@/assets/images/doll-activity/prize/xxw.png'
import yyjt from '@/assets/images/doll-activity/prize/yyjt.png'
import fll from '@/assets/images/doll-activity/prize/3dfll.png'
import jnh from '@/assets/images/doll-activity/prize/jnh.png'
import hkmj from '@/assets/images/doll-activity/prize/hkmj.png'
import gnzw from '@/assets/images/doll-activity/prize/gnzw.png'

const tabList = ref([
  {
    id: 1,
    name: 'Mi小橘',
    active: true,
    color: '#FF6CB4',
    giftBg: prize2Bg,
    maxGift: {
      rate: '0.800',
      name: '3D法拉利',
      value: 18800,
      pic: fll,
    },
    gifts: [
      {
        id: 1,
        rate: '0.400',
        name: '天马行空',
        value: 9900,
        pic: tmxq,
      },
      {
        id: 2,
        rate: '1.000',
        name: '星星屋',
        value: 5200,
        pic: xxw,
      },
      {
        id: 3,
        rate: '1.500',
        name: '音乐吉他',
        value: 2100,
        pic: yyjt,
      },
      {
        id: 4,
        rate: '7.450',
        name: '星光小马',
        value: 1000,
        pic: xgxm,
      },
      {
        id: 5,
        rate: '24.350',
        name: '魔法棒',
        value: 600,
        pic: mfb,
      },
      {
        id: 6,
        rate: '11.500',
        name: '学生雪糕',
        value: 300,
        pic: xsxg,
      },
      {
        id: 7,
        rate: '38.000',
        name: '小小风铃',
        value: 100,
        pic: xxfl,
      },
      {
        id: 8,
        rate: '1.000',
        name: '10个碎片',
        value: null,
        pic: sp,
      },
      {
        id: 9,
        rate: '14.000',
        name: '1个碎片',
        value: null,
        pic: sp,
      },
    ],
  },
  {
    id: 2,
    name: 'Mi小美',
    active: false,
    color: '#B366FF',
    giftBg: prize4Bg,
    maxGift: {
      rate: '0.400',
      name: '嘉年华',
      value: 52000,
      pic: jnh,
    },
    gifts: [
      {
        id: 1,
        rate: '0.300',
        name: '天马行空',
        value: 9900,
        pic: tmxq,
      },
      {
        id: 2,
        rate: '0.700',
        name: '星星屋',
        value: 5200,
        pic: xxw,
      },
      {
        id: 3,
        rate: '1.500',
        name: '音乐吉他',
        value: 2100,
        pic: yyjt,
      },
      {
        id: 4,
        rate: '6.100',
        name: '星光小马',
        value: 1000,
        pic: xgxm,
      },
      {
        id: 5,
        rate: '19.000',
        name: '魔法棒',
        value: 600,
        pic: mfb,
      },
      {
        id: 6,
        rate: '7.000',
        name: '学生雪糕',
        value: 300,
        pic: xsxg,
      },
      {
        id: 7,
        rate: '59.000',
        name: '小小风铃',
        value: 100,
        pic: xxfl,
      },
      {
        id: 8,
        rate: '1.000',
        name: '20个碎片',
        value: null,
        pic: sp,
      },
      {
        id: 9,
        rate: '5.000',
        name: '1个碎片',
        value: null,
        pic: sp,
      },
    ],
  },
  {
    id: 3,
    name: 'Mi小白',
    active: false,
    color: '#6693FF',
    giftBg: prize3Bg,
    maxGift: {
      rate: '0.150',
      name: '光年之外',
      value: 131400,
      pic: gnzw,
    },
    gifts: [
      {
        id: 1,
        rate: '0.500',
        name: '天马行空',
        value: 9900,
        pic: tmxq,
      },
      {
        id: 2,
        rate: '0.500',
        name: '星星屋',
        value: 5200,
        pic: xxw,
      },
      {
        id: 3,
        rate: '1.500',
        name: '音乐吉他',
        value: 2100,
        pic: yyjt,
      },
      {
        id: 4,
        rate: '11.350',
        name: '星光小马',
        value: 1000,
        pic: xgxm,
      },
      {
        id: 5,
        rate: '10.500',
        name: '魔法棒',
        value: 600,
        pic: mfb,
      },
      {
        id: 6,
        rate: '5.000',
        name: '学生雪糕',
        value: 300,
        pic: xsxg,
      },
      {
        id: 7,
        rate: '65.000',
        name: '小小风铃',
        value: 100,
        pic: xxfl,
      },
      {
        id: 8,
        rate: '0.500',
        name: '30个碎片',
        value: null,
        pic: sp,
      },
      {
        id: 9,
        rate: '5.00',
        name: '1个碎片',
        value: null,
        pic: sp,
      },
    ],
  },
  {
    id: 4,
    name: 'Mi小咪',
    active: false,
    giftBg: prize1Bg,
    color: '#FF6A68',
    maxGift: {
      rate: '0.050',
      name: '航空母舰',
      value: 334400,
      pic: hkmj,
    },
    gifts: [
      {
        id: 1,
        rate: '0.700',
        name: '天马行空',
        value: 9900,
        pic: tmxq,
      },
      {
        id: 2,
        rate: '1.000',
        name: '星星屋',
        value: 5200,
        pic: xxw,
      },
      {
        id: 3,
        rate: '1.000',
        name: '音乐吉他',
        value: 2100,
        pic: yyjt,
      },
      {
        id: 4,
        rate: '6.950',
        name: '星光小马',
        value: 1000,
        pic: xgxm,
      },
      {
        id: 5,
        rate: '12.400',
        name: '魔法棒',
        value: 600,
        pic: mfb,
      },
      {
        id: 6,
        rate: '7.400',
        name: '学生雪糕',
        value: 300,
        pic: xsxg,
      },
      {
        id: 7,
        rate: '65.000',
        name: '小小风铃',
        value: 100,
        pic: xxfl,
      },
      {
        id: 8,
        rate: '0.500',
        name: '50个碎片',
        value: null,
        pic: sp,
      },
      {
        id: 9,
        rate: '5.000',
        name: '5个碎片',
        value: null,
        pic: sp,
      },
    ],
  },
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
    item.active = idx === index + 1
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
      background: url('@/assets/images/doll-activity/prizeDialog.webp') center
        center / cover no-repeat transparent;
      font-size: 28px;
      padding-top: 135px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .tabList {
        width: 564px;
        height: 80px;
        background-color: #f7e3b6;
        border-radius: 45px;
        display: flex;
        align-items: center;
        gap: 20px;

        .tabName {
          width: 122px;
          height: 64px;
          border-radius: 31px;
          color: #b04f00;
          text-align: center;
          line-height: 64px;
        }

        .active {
          background: #ffd399;
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
        align-items: center;
        flex-direction: column;
        .rate {
          width: 93px;
          height: 36px;
          border-radius: 38px;
          background: #ffffff66;
          text-align: center;
          color: #b04f00;
          line-height: 36px;
          position: absolute;
          top: 55px;
          left: 11px;
          font-size: 22px;
        }

        .gift-pic {
          width: 107px;
          height: 107px;
          background-color: pink;
          margin: 90px auto 10px;
          border-radius: 24px;
        }

        .name-val {
          color: #242424;
          text-align: center;

          .name {
            font-size: 26px;
            font-weight: 600;
            color: #242424;
          }

          .val {
            font-size: 22px;
            font-weight: 500;
            color: #242424;
          }
        }
      }

      .gift-group {
        width: 598px;
        height: 238px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        align-content: flex-start;
        overflow: hidden;
        overflow-y: scroll;
        height: 400px;

        .gift-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #b04f00;
          margin-bottom: 20px;
          .rate {
            width: 93px;
            height: 36px;
            border-radius: 38px;
            background: #ffffff66;
            font-size: 20px;
            text-align: center;
            line-height: 36px;
            color: #b04f00;
            margin-bottom: 7px;
          }
          .pic {
            width: 143px;
            height: 112px;
            border-radius: 24px;
            background-color: #ffd399;
            margin-bottom: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
            .prize-img {
              width: 98px;
              height: 88px;
              border-radius: 20px;
              background: #00000024;
            }
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
