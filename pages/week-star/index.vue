<template>
  <div class="week-star-container">
    <div class="weekStar-main-page">
      <div class="weekStar-head">
        <div class="weekStar-back" @click="handleBack()" />
      </div>
      <div class="weekStar-right-box">
        <div class="weekStar-old-rank" @click="openLastRank" />
        <div class="weekStar-rule-award" @click="openRule" />
      </div>
      <div class="weekStar-head-gift">
        <div class="weekStar-head-gift-list">
          <div v-for="item in headGiftList" :key="item.id" class="weekStar-head-gift-item">
            <div class="weekStar-head-gift-img">
              <img :src="item.gift_photo ? prependHttpIfMissing(item.gift_photo) : userEmpty">
            </div>
            <div class="weekStar-head-gift-name">
              {{ item.gift_name }}
            </div>
            <div class="weekStar-head-gift-price">
              {{ item.gift_diamond }}米粒
            </div>
          </div>
        </div>
      </div>
      <div class="weekStar-rank">
        <div class="weekStar-rank-head">
          <div
            v-for="(item, index) in rankNavList"
            :key="index"
            class="weekStar-rank-head-item"
            :class="item.isActive == true ? 'active' : ''"
            @click="handleRankNav(item)"
          >
            <img :src="item.isActive == true ? item.url_active : item.url">
          </div>
        </div>
        <div
          class="weekStar-rank-list-box"
          :style="`background:url(${week_rank_bg}) center center / 100% 100% no-repeat`"
        >
          <div class="weekStar-count-down">
            倒计时: <van-count-down :time="downTime" format="DD 天 HH 时 mm 分 ss 秒" />
          </div>
          <div class="weekStar-rank-list">
            <!-- <rankListComp ref="rankListComp" :list="list" :navIndex="navIndex" /> -->
            <div class="weekStar-rank-list-content">
              <div
                v-for="(item, i) in rankList"
                :key="item.id"
                class="weekStar-rank-list-item"
                :style="`background:url(${navIndex === 1 ? attract_item_bg : protect_item_bg}) center center / 100% 100% no-repeat`"
              >
                <div class="weekStar-rank-item-sort">
                  <img v-if="i < 3" class="rank-icon" :src="getIcon(i)">
                  <span v-else>{{ i + 1 }}</span>
                </div>
                <div
                  class="weekStar-rank-item-img"
                  :style="`background:url(${ring}) center center / 100% 100% no-repeat`"
                >
                  <img :src="item.face == '' ? userEmpty : prependHttpIfMissing(item.face)">
                </div>
                <div class="weekStar-rank-item-name">
                  {{ item.nickname !== '' ? item.nickname : '等你上榜' }}
                </div>
                <div class="weekStar-rank-item-num-box">
                  <div class="weekStar-rank-item-num">
                    {{ item.value }}
                  </div>
                  <div class="weekStar-rank-item-txt" :class="navIndex == 2 ? 'heroic' : ''">
                    {{ navIndex == 1 ? '守护值' : '魅力值' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="userSelf.user_id > 0" class="weekStar-footer" :class="navIndex == 2 ? 'heroic' : ''">
          <div class="weekStar-footer-sort">
            {{ userSelf.ranking > 0 ? userSelf.ranking : '未上榜' }}
          </div>
          <div class="weekStar-footer-img">
            <img :src="userSelf.face !== '' ? prependHttpIfMissing(userSelf.face) : userEmpty" @error="errorImgFn">
          </div>
          <div class="weekStar-footer-name">
            <div>{{ userSelf.nickname !== '' ? userSelf.nickname : '等你上榜' }}</div>
            <div class="left">
              {{ userSelf.desc }}
            </div>
          </div>
          <div class="weekStar-footer-num-box">
            <div class="weekStar-footer-num">
              {{ userSelf.value }}
            </div>
            <div class="weekStar-footer-text">
              {{ navIndex == 1 ? '守护值' : '魅力值' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <RuleDialog ref="ruleRef" />
    <RankDialog ref="rankRef" :rank-nav-list="rankNavList" :last_activity_id="last_activity_id.value" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'
import attractImg from '@/assets/images/week-star/heroic_btn.png'
import attractImgActive from '@/assets/images/week-star/heroic_active_btn.png'
import week_rank_bg from '@/assets/images/week-star/webp/week_rank1_bg_v1.webp'
import attract_item_bg from '@/assets/images/week-star/rank_item1_bg.png'
import protect_item_bg from '@/assets/images/week-star/rank_item2_bg.png'
import first from '@/assets/images/week-star/1th-icon.png'
import second from '@/assets/images/week-star/2th-icon.png'
import third from '@/assets/images/week-star/3th-icon.png'
import ring from '@/assets/images/week-star/ring-icon.png'
import protectImg from '@/assets/images/week-star/star_btn.png'
import protectImgActive from '@/assets/images/week-star/star_active_btn.png'
import userEmpty from '@/assets/images/week-star/userEmpty.png'
import { isIosFun, js_sync_app, prependHttpIfMissing } from '@/utils/index'
import { getWeekStarActList, getWeekStarInfo, getWeekStarRank } from '@/api/modules/weekStar'
import RuleDialog from '@/components/week-star/ruleDialog.vue'
import RankDialog from '@/components/week-star/RankDialog.vue'

const headGiftList = ref([
  {
    id: 1,
    gift_photo: '',
    gift_name: '礼物名称',
    gift_diamond: 0,
  },
  {
    id: 2,
    gift_photo: '',
    gift_name: '礼物名称',
    gift_diamond: 0,
  },
  {
    id: 3,
    gift_photo: '',
    gift_name: '礼物名称',
    gift_diamond: 0,
  },
])
const rankNavList = ref([
  {
    id: 2,
    url: attractImg,
    url_active: attractImgActive,
    isActive: true,
  },
  {
    id: 1,
    url: protectImg,
    url_active: protectImgActive,
    isActive: false,
  },
])
const userSelf = ref({
  ranking: 0,
  user_id: 0,
  nickname: '',
  face: '',
  value: 0,
  desc: '',
})
const navIndex = ref(2) // 2-魅力值 1=守护值
const downTime = ref(0)
const rankList = ref([])
const last_activity_id = ref(0)
const activity_id = ref('')
const ruleRef = ref<RuleDialog | null>(null)
const rankRef = ref<RankDialog | null>(null)

const getIcon = (idx: number) => {
  if (idx === 0)
    return first

  if (idx === 1)
    return second

  if (idx === 2)
    return third
}

const openRule = () => {
  ruleRef?.value.setVisible(true)
}

const openLastRank = () => {
  rankRef?.value.setVisible(true, last_activity_id.value)
}

const initPage = async () => {
  const res = await getWeekStarInfo()
  console.log(res)
  // 周星礼物
  headGiftList.value = res.gift_list
  //         // 当前活动开始结束时间
  //         this.activityTimer = timeFormat(res.data.start_time, 'MM.DD HH:mm:ss', true) + " — "+ timeFormat(res.data.end_time, 'MM.DD HH:mm:ss', true);
  //         // 倒计时时间差
  const currentTimer = new Date().getTime()
  downTime.value = res.end_time * 1000 - currentTimer
  console.log(res.last_id, 'res.last_id')

  last_activity_id.value = res.last_id
}

const getAllActs = async () => {
  const res = await getWeekStarActList()
  if (!res)
    return
  activity_id.value = String(res.list[0].id)
  return activity_id.value
}

const getRank = async (naxIdx, actId?: string) => {
  const res = await getWeekStarRank({ activity_id: actId ?? activity_id.value, type: naxIdx ?? navIndex.value })
  if (!res)
    return
  userSelf.value = res.my
  rankList.value = res.list
}

const handleRankNav = (item) => {
  rankNavList.value.forEach((i) => {
    i.isActive = false
    if (i.id == item.id) {
      i.isActive = true
      navIndex.value = item.id
      getRank(navIndex.value)
    }
  })
}

const handleBack = () => {
  const params = {
    // params用于给安卓指令用的 - 不携带参数 - 安卓接收不到指令
    type: 'back',
  }
  const backText = isIosFun() === true ? 'js_sync_back' : 'js_app_back'
  js_sync_app(backText, params, 'type')
}

// useHandleData(true, async () => {
//   initPage();
//   const actId = await getAllActs();
//   getRank(navIndex.value,actId);
// });

onMounted(async () => {
  initPage()
  const actId = await getAllActs()
  getRank(navIndex.value, actId)
})
</script>

<style lang="scss" scoped>
.weekStar-main-page::-webkit-scrollbar,
.weekStar-rank-list::-webkit-scrollbar {
  display: none;
}
.week-star-container {
  .weekStar-main-page {
    width: 100vw;
    min-height: 100vh;
    overflow-y: scroll;
    box-sizing: border-box;
    padding-bottom: env(safe-area-inset-bottom);
    background: url('@/assets/images/week-star/webp/background.webp') no-repeat
      center;
    background-size: 100% 100%;
    .weekStar-head {
      position: relative;
      width: 750px;
      height: 718px;
      background: url('@/assets/images/week-star/webp/head_bg.webp') no-repeat
        center;
      background-size: 100% 100%;
      .weekStar-back {
        position: fixed;
        top: 89px;
        left: 29px;
        width: 50px;
        height: 50px;
        z-index: 6;
        background: url('@/assets/images/week-star/back.png') no-repeat center;
        background-size: 100% 100%;
      }
      .weekStar-activity-timer {
        position: absolute;
        top: 440px;
        left: 0;
        right: 0;
        width: 420px;
        margin: auto;
        font-size: 26px;
        text-align: center;
        color: #ffffff;
      }
    }
    .weekStar-right-box {
      position: fixed;
      top: 432px;
      left: initial;
      right: 0;
      width: 118px;
      height: 316px;
      z-index: 1;
      .weekStar-rule-award {
        width: 118px;
        height: 118px;
        background: url('@/assets/images/week-star/rule_btn.png') no-repeat
          center;
        background-size: 100% 100%;
        margin-top: 24px;
      }
      .weekStar-old-rank {
        width: 118px;
        height: 118px;
        background: url('@/assets/images/week-star/last_btn.png') no-repeat
          center;
        background-size: 100% 100%;
      }
    }
    .weekStar-head-gift {
      position: sticky;
      width: 686px;
      height: 516px;
      margin: auto;
      margin-top: -134px;
      padding-top: 160px;
      box-sizing: border-box;
      background: url('@/assets/images/week-star/webp/week_gift_bg.webp')
        no-repeat center;
      background-size: 100% 100%;
      .weekStar-head-gift-list {
        width: 541px;
        height: 230px;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .weekStar-head-gift-item {
        width: 172px;
        height: 197px;
        .weekStar-head-gift-img {
          display: flex;
          align-items: center;
          width: 172px;
          height: 197px;
          border-radius: 10px;
          // border: solid 1px #BC9CFF;
          // background: linear-gradient(0deg, #752eccff, #dacceeff);
          background: url('@/assets/images/week-star/gift-border.png') no-repeat
            center;
          background-size: 100% 100%;
          img {
            width: 120px;
            max-height: 120px;
            margin: auto;
          }
        }
        .weekStar-head-gift-name {
          font-size: 24px;
          text-align: center;
          margin-top: 10px;
          color: #ff4747;
          font-weight: 600;
        }
        .weekStar-head-gift-price {
          font-size: 24px;
          color: #ff4747;
          text-align: center;
          margin-top: 10px;
          font-weight: 600;
        }
      }
    }
    .weekStar-rank {
      height: 1151px;
      width: 690px;
      margin: auto;
      position: relative;
      margin-top: 52px;
      .weekStar-rank-head {
        // width: 643px;
        height: 100px;
        margin: auto 67px;
        display: flex;
        align-items: end;
        justify-content: space-between;
        .weekStar-rank-head-item {
          width: 252px;
          height: 100px;
          img {
            width: 252px;
            height: 100px;
          }
        }
      }
      .weekStar-rank-list-box {
        position: relative;
        height: 1148px;
        width: 690px;
        margin-top: 12px;
        .weekStar-count-down {
          position: absolute;
          top: 184px;
          left: 0;
          right: 0;
          margin: auto;
          font-size: 24px;
          color: #666666;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          .van-count-down {
            font-size: 28px;
            color: #666666;
            margin-left: 10px;
          }
        }
        .weekStar-rank-list {
          position: relative;
          top: 250px;
          width: 620px;
          height: 836px;
          margin: auto;
          overflow: hidden;
          overflow-y: scroll;
          .weekStar-rank-list-content::-webkit-scrollbar {
            display: none;
          }
          .weekStar-rank-list-content {
            position: absolute;
            width: 620px;
            height: 900px;
            left: 0;
            right: 0;
            top: 0px;
            margin: auto;
            overflow: hidden;
            overflow-y: scroll;
            padding-bottom: 200px;
            padding-top: 10px;
            // background-color: #FF4747;
            .weekStar-rank-list-item {
              height: 120px;
              width: 620px;
              margin-bottom: 22px;
              display: flex;
              align-items: center;
              .weekStar-rank-item-sort {
                .rank-icon {
                  width: 80px;
                  height: 80px;
                }
                width: 80px;
                height: 80px;
                line-height: 80px;
                text-align: center;
                font-size: 28px;
                color: #ff4747;
                margin-left: 29px;
                font-weight: 600;
              }
              .weekStar-rank-item-img {
                width: 83px;
                height: 83px;
                margin: auto 16px auto 41px;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                  width: 80px;
                  height: 80px;
                  border-radius: 40px;
                }
              }
              .weekStar-rank-item-name {
                font-size: 32px;
                color: #ff4747;
                font-weight: 700;
              }
              .weekStar-rank-item-num-box {
                position: absolute;
                right: 25px;
                .weekStar-rank-item-num {
                  font-size: 24px;
                  color: #ff4747;
                  text-align: right;
                  font-weight: 600;
                }
                .weekStar-rank-item-txt {
                  font-size: 24px;
                  color: #ff4747;
                  font-weight: 600;
                  text-align: right;
                }
                .weekStar-rank-item-txt.heroic {
                  color: #ff4747;
                }
              }
            }
            .weekStar-rank-list-item:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
      .weekStar-footer {
        position: fixed;
        bottom: 0;
        left: 0%;
        margin: 0 auto;
        width: 750px;
        height: 160px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background: #ffe37e;
        border: 2px solid #fff;
        display: flex;
        align-items: center;
        .weekStar-footer-sort {
          color: #ff4747;
          font-size: 32px;
          margin-left: 42px;
          margin-right: 42px;
          font-weight: 600;
        }
        .weekStar-footer-img {
          width: 100px;
          height: 100px;
          margin-right: 20px;
          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
          }
        }
        .weekStar-footer-name {
          font-size: 32px;
          font-weight: 600;
          color: #ff4747;
          width: 200px;
          // overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          .left {
            font-size: 22px;
            margin-top: 12px;
            font-weight: normal;
          }
        }
        .weekStar-footer-num-box {
          position: absolute;
          right: 39px;
          text-align: right;
          font-size: 24px;
          color: #ff4747;
          .weekStar-footer-num {
            font-weight: bold;
          }
          .weekStar-footer-text {
            font-size: 22px;
            margin-top: 15px;
            font-weight: bold;
          }
        }
      }
    }
    .weekStar-footer.heroic {
      background: #ffe37e;
      .weekStar-footer-sort {
        color: #ff4747;
      }
    }
  }
}
::v-deep(.rulePop) {
  position: fixed;
  top: 50%;
  width: 750px;
  height: 100vh;
  overflow: initial;
  .van-dialog__content {
    width: 750px;
    height: 100vh;
    .cancel {
      position: fixed;
      width: 60px;
      height: 60px;
      top: 74px;
      left: 28px;
      z-index: 6;
      background: url('@/assets/images/week-star/anniversary_back.png')
        no-repeat center;
      background-size: 100% 100%;
    }

    .content {
      width: 750px;
      height: 100vh;
      margin: auto;
      overflow-y: scroll;
      img {
        width: 100%;
        height: 6691px;
      }
    }
  }
  // :deep(.van-popup--center){
  //   margin: 0!important
  // }
}
</style>
