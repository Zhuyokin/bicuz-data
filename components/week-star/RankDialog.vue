<template>
  <div class="rank-dialog">
    <van-dialog class="recordPop" v-model:show="show" :showConfirmButton="false" :showCancelButton="false">
      <div class="head">
        <div class="head-item" v-for="(item, index) in props.rankNavList" :key="index" @click="handleRankNav(item)">
          <img :src="item.isActive == true ? item.url_active : item.url" />
        </div>
      </div>
      <div class="content">
        <div class="randItem" v-for="(item, index) in ArrList" :key="index">
          <div class="top" :class="[index == 1 ? 'mtm' : 'mt']">
            <div class="avatar-box"></div>
            <img class="avatar" :src="item.face != '' ? prependHttpIfMissing(item.face) : userEmpty" />
          </div>
          <div class="name">{{ item.nickname }}</div>
          <div class="num">{{ item.value }}</div>
          <div class="unit">{{ item.desc }}</div>
        </div>
      </div>
      <div class="cancel" @click="handleCancel"></div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { prependHttpIfMissing } from '@/utils/index';
import userEmpty from '@/assets/images/week-star/userEmpty.png';
import { getWeekStarRank } from '@/api/modules/weekStar';
let show = ref(false);
let ArrList = ref(null);
const navIndex = ref(2);
const act_id = ref(0);
const props = defineProps({
  rankNavList: {
    type: Array,
    default: [],
  },
  last_activity_id: {
    type: Number,
    default: 0,
  },
});
const setVisible = (bool: boolean, actId) => {
  show.value = bool;
  getRankListFun(actId);
};

const handleCancel = () => {
  show.value = false;
};

// 排行榜
const getRankListFun = async (actId) => {
  let params = {
    activity_id: act_id.value > 0 ? act_id.value : actId,
    type: navIndex.value,
    limit: 3,
  };
  if (actId) {
    act_id.value = actId;
  }
  console.log(params);

  let res = await getWeekStarRank(params);
  let list = res.list;
  let rankList = [];
  if (list.length == 1) {
    list[0].value =
      list[0].value > 100000 ? (parseInt((list[0].value / 100000) * 100) / 100).toFixed(2) + 'w' : list[0].value;
    rankList[1] = list[0];
  } else if (list.length > 0) {
    let source = {},
      source2 = {};
    list.forEach((re, i) => {
      // 历史数据只显示前10条
      if (i < 10) {
        re.value = re.value > 100000 ? (parseInt((re.value / 100000) * 100) / 100).toFixed(2) + 'w' : re.value;
        if (i == 0) {
          source = re;
        }
        if (i == 1) {
          source2 = re;
        }
        rankList[i] = re;
      }
    });
    rankList[0] = source2;
    rankList[1] = source;
  }
  console.log(rankList, 'rankList======');
  list.value = rankList;
  ArrList.value = [...rankList];
};

// 榜单切换
const handleRankNav = (item) => {
  console.log(item);
  props.rankNavList.forEach((res) => {
    res.isActive = false;
    if (res.id == item.id) {
      res.isActive = true;
      navIndex.value = item.id;
      getRankListFun();
    }
  });
};

defineExpose<{ setVisible: (bool: boolean, actId: number) => void }>({ setVisible });
</script>

<style lang="scss" scoped>
.rank-dialog :deep(.van-popup) {
  overflow: visible !important;
  width: auto !important;
  // background: transparent;
}
:deep(.van-popup),
.recordPop {
  width: 686px;
  height: 826px;
  padding-top: 115px;
  // padding: 180px 66px 0;
  background: url('@/assets/images/week-star/webp/record_bg.webp') no-repeat center;
  background-size: 100% 100%;
  // overflow: initial;
  .cancel {
    position: absolute;
    bottom: -87px;
    left: 0;
    right: 0;
    width: 64px;
    height: 64px;
    margin: auto;
    background: url('@/assets/images/week-star/close.png') no-repeat center;
    background-size: 100% 100%;
  }
  .head {
    margin: auto;
    margin-top: 70px;
    width: 550px;
    display: flex;
    justify-content: space-between;
    .head-item {
      width: 252px;
      height: 100px;
      img {
        width: 252px;
        height: 100px;
      }
    }
  }

  .content {
    display: flex;
    width: 100%;
    // position: absolute;
    // top: 211px;
    // left: 0;
    // right: 0;
    padding: 75px 58px 0;
    // width: 100%;
    justify-content: space-between;
    margin: auto;
    .randItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #ff4747;
      .top {
        position: relative;
        display: flex;
        justify-content: center;
        // background-color: pink;
        // align-items: center;
        width: 161px;
        // height: 210px;
        .avatar-box {
          position: absolute;
          top: -20px;
          left: 0;
          width: 161px;
          height: 190px;
          display: flex;
          justify-content: center;
          align-items: center;

          background-size: 100% 100%;
        }

        .avatar {
          width: 150px;
          height: 150px;
          display: block;
          border-radius: 50%;
          // background: url("@/assets/images/week-star/userEmpty.png") center center / 100% 100% no-repeat;
          // background-size: 100% 100%;
        }
      }

      .mt {
        margin-top: 87px;
      }
      .mtm {
        margin-top: 3px;
      }
      .name {
        width: 150px;
        font-size: 28px;
        font-weight: bold;
        margin: 40px 0 12px;
        overflow: hidden;
        word-break: break-all;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .num,
      .unit {
        font-size: 24px;
        font-weight: bold;
      }
    }
    .randItem:nth-child(1) .avatar-box {
      background: url('@/assets/images/week-star/2th-avatar-bg.png') center center / 100% 100% no-repeat !important;
    }
    .randItem:nth-child(2) .avatar-box {
      background: url('@/assets/images/week-star/1th-avatar-bg.png') center center / 100% 100% no-repeat !important;
    }
    .randItem:nth-child(3) .avatar-box {
      top: -15px;
      background: url('@/assets/images/week-star/3th-avatar-bg.png') center center / 100% 100% no-repeat !important;
    }
  }
}
</style>
