<template>
  <div class="dialog">
    <van-popup v-model:show="dialogVisible" :style="{ padding: '64px' }">
      <div class="content">
        <div class="close cursor-pointer" @click="setVisible(false)"></div>
        <div class="zongBox">
          <div class="zongItem cursor-pointer" v-for="(item, index) in zongConfig" :key="index" @click="selectZong(index)">
            <div class="zongPicBox" :class="[item.active ? 'active' : '']">
              <div
                class="zongPic"
                :style="`background:url(${item.pic})  center center / cover no-repeat transparent`"
              ></div>
            </div>
            <div class="zongName">{{ item.name }}</div>
            <div class="zongNum">*{{ item.num }}</div>
          </div>
        </div>
        <div class="changeNumBox">
          <div class="minusBtn cursor-pointer" @click="changeNum('minus')"></div>
          <div class="numberInput">
            <van-field
              v-model="zongNum"
              label-align="center"
              input-align="center"
              maxlength="3"
              min="1"
              placeholder="输入数量"
              :disabled="disabled"
              type="digit"
            />
          </div>
          <div class="addBtn cursor-pointer" @click="changeNum('add')"></div>
        </div>
        <div class="tips">{{ tipsText }}</div>
        <div class="confirm cursor-pointer" @click="buy"></div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { setName } from '@/api/modules/pet';
import { timeFormat } from '@/utils/index';
import { dragonBoatFestivalApi } from '@/api/index';
import beautyZong from '@/assets/images/dragon-boat-festival/beautyZong.webp';
import luckyZong from '@/assets/images/dragon-boat-festival/luckyZong.webp';
import richZong from '@/assets/images/dragon-boat-festival/richZong.webp';
import eatZong from '@/assets/images/dragon-boat-festival/eatZong.webp';

const emits = defineEmits(['initPage']);
let dialogVisible = ref(false);
let disabled = ref(false);
const petInfo = ref({});
let zongNum = ref(1);
let unitNum = ref(1);
let tipsText = computed(() => {
  let str = '';
  zongConfig.value
    .filter((i) => i.active)
    .map((i) => {
      return i.name;
    })
    .forEach((i, idx, arr) => {
      str += `${i}${Number(zongNum.value) * Number(unitNum.value)}个${idx === arr.length - 1 ? '' : '、'}`;
    });
  return '本次兑换将消耗' + str;
});
let zongConfig = ref([
  {
    pic: eatZong,
    name: '干饭粽',
    key: 'gfz',
    active: false,
  },
  {
    pic: beautyZong,
    name: '美貌粽',
    key: 'mmz',
    active: true,
  },
  {
    pic: luckyZong,
    name: '好运粽',
    key: 'hyz',
    active: false,
  },
  {
    pic: richZong,
    name: '暴富粽',
    key: 'bfz',
    active: false,
  },
]);
let maxSelectNum = ref(0);
let selectedNum = computed(() => {
  return zongConfig.value.filter((i) => i.active).length;
});
let lastSelectIdx = ref(0);

const setVisible = (bool: boolean, num: number) => {
  dialogVisible.value = bool;
  if (bool) {
    getData();
    maxSelectNum.value = num;
    zongConfig.value = zongConfig.value.map((item, index) => {
      return { ...item, active: index + 1 <= num ? true : false };
    });
    // zongNum.value = num - 1;
    unitNum.value = num - 1;
  } else {
    // 关闭弹窗
    maxSelectNum.value = 0;
    zongConfig.value = zongConfig.value.map((item, index) => {
      return { ...item, active: false };
    });
    lastSelectIdx.value = 0;
    zongNum.value = 1;
    unitNum.value = 1;
  }
};

const changeNum = (type) => {
  if (['add'].includes(type)) {
    if (zongNum.value >= 999) return;
    zongNum.value = Number(zongNum.value) + 1;
  }
  if (['minus'].includes(type)) {
    if (zongNum.value == 1) return;
    zongNum.value = Number(zongNum.value) - 1;
  }
};

const getData = async () => {
  const res = await dragonBoatFestivalApi.getDBFGiftRecord({ type: 0 }).catch((err) => {
    console.log('[getDBFGiftRecord >]', err);
  });
  if (!res) return;
  let zongData = res.props;
  zongConfig.value = zongConfig.value.map((item) => {
    return { ...item, ...zongData[item.key] };
  });
};

const selectZong = (idx: number) => {
  // 取消选中最近选中的粽子
  // if (maxSelectNum.value <= selectedNum.value) {
  //   if (!zongConfig.value[idx].active) {
  //     zongConfig.value[lastSelectIdx.value].active = false;
  //     lastSelectIdx.value = idx;
  //     zongConfig.value[idx].active = true;
  //   } else {
  //     zongConfig.value[idx].active = false;
  //   }
  // } else {
  //   if (!zongConfig.value[idx].active) {
  //     lastSelectIdx.value = idx;
  //     zongConfig.value[idx].active = true;
  //   } else {
  //     zongConfig.value[idx].active = false;
  //   }
  // }

  if (!zongConfig.value[idx].active) {
    if (maxSelectNum.value <= selectedNum.value) {
      zongConfig.value[lastSelectIdx.value].active = false;
    }
    lastSelectIdx.value = idx;
    zongConfig.value[idx].active = true;
  } else {
    zongConfig.value[idx].active = false;
  }
};

const buy = async () => {
  let prop_ids = zongConfig.value
    .map((i) => {
      if (i.active) return i.id;
    })
    .filter((i) => i);
  if (prop_ids.length <= 0) {
    showToast('请选择用于兑换的粽子');
    return;
  }
  // if (Number(zongNum.value) % Number(unitNum.value) !== 0) {
  //   showToast(`粽子数量须为${unitNum.value}的倍数`);
  //   return;
  // }
  const res = await dragonBoatFestivalApi
    .getDBFLotteryGift({
      type: maxSelectNum.value,
      num: zongNum.value,
      prop_ids: prop_ids.join(','),
    })
    .catch((err) => {});
  if (!res) return;
  showToast('兑换成功');
  setVisible(false, 0);
  emits('initPage');
};

defineExpose<{ setVisible: (bool: boolean, num: number) => void }>({ setVisible });
</script>

<style lang="scss" scoped>
.dialog {
  :deep(.van-cell) {
    width: 100%;
    // margin: 0 20px;
    background: #ffeed0 !important;
    border-radius: 20px;
    padding: 10px;
  }
  :deep(.van-field__value) input {
    font-size: 48px;
    color: #b64643 !important;
    font-weight: bold;
    text-align: center;
  }
  :deep(.van-popup) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 !important;
    overflow: visible;
    width: 686px;
    min-height: 793px;
    background: linear-gradient(180deg, #ffed94 0%, #ffed94 100%), #fff;
    background: url('@/assets/images/dragon-boat-festival/Zong-exchange-bg.webp') center center / cover no-repeat
      transparent;
    border-radius: 40px;
    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 686px;
      min-height: 793px;
      padding: 171px 0 0px;
      color: #b43a04;
      display: flex;
      flex-direction: column;
      align-items: center;
      .close {
        position: absolute;
        top: 106px;
        right: 16px;
        width: 35px;
        height: 35px;
        background: url('@/assets/images/dragon-boat-festival/exchange-close.webp') center center / cover no-repeat
          transparent;
      }
      .zongBox {
        width: 638px;
        height: 266px;
        border-radius: 26px;
        background: #ffffff85;
        padding: 25px;
        margin-bottom: 23px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #ff1f12;
        font-weight: bolder;
        .zongItem {
          display: flex;
          flex-direction: column;
          align-items: center;
          .zongPicBox {
            .zongPic {
              width: 132px;
              height: 132px;
              margin-bottom: 12px;
            }
          }
          .zongPicBox.active {
            background: #fff;
            opacity: 0.7;
            border-radius: 27px;
          }
          .zongName {
            margin-bottom: 6px;
          }
        }
      }
      .changeNumBox {
        display: flex;
        align-items: center;
        width: 414px;
        margin-bottom: 24px;
        .minusBtn {
          width: 68px;
          height: 68px;
          background: url('@/assets/images/dragon-boat-festival/minus-icon.webp') center center / cover no-repeat
            transparent;
          margin-right: 20px;
        }
        .numberInput {
          width: 238px;
        }
        .addBtn {
          width: 68px;
          height: 68px;
          background: url('@/assets/images/dragon-boat-festival/add-icon.webp') center center / cover no-repeat
            transparent;
          margin-left: 20px;
        }
      }
      .tips {
        color: #fff;
        font-size: 24px;
        width: 407px;
        font-weight: bold;
        margin-bottom: 10px;
        text-align: center;
      }
      .confirm {
        width: 414px;
        height: 106px;
        background: url('@/assets/images/dragon-boat-festival/confirm-btn.webp') center center / cover no-repeat
          transparent;
      }
    }
  }
}
</style>
