<template>
  <div class="container-box">
    <!-- 返回按钮 -->
    <div class="back-wrap cursor-pointer" @click="handleBack">
      <img :src="backIcon" alt="">
    </div>
    <!-- 说明按钮 -->
    <div class="rule-btn cursor-pointer" @click="openRule" />
    <div class="header-box">
      <div class="tab-box">
        <div
          v-for="(item, index) in tabArr" :key="index" class="tab-item cursor-pointer"
          :style="`background:url(${getTabPic(item)})  center center / cover no-repeat transparent`"
          @click="tabClick(item, index)"
        />
      </div>
    </div>
    <div class="progress-bar" :style="{ background: `url( ${activeIdx === 1 ? progressBar1 : activeIdx === 2 ? progressBar2 : progressBar3}) center center / 100% 100% no-repeat` }">
      <div v-for="i in 3" :key="i" class="dot-item">
        <div v-if="i === activeIdx" class="active-dot" />
      </div>
    </div>
    <div v-if="activeIdx === 1">
      <UploadComp ref="uploadCompRef" :active-idx="activeIdx" :cur-song-id="curSongId" @play-song="playSong" />
      <div class="song-rank-box">
        <div class="search-box">
          <div class="search-bar">
            <div class="search-icon" />
            <van-field v-model="searchKey" class="search-input" type="digit" placeholder="点击搜索用户ID" @update:model-value="getRankThrottle" />
          </div>
          <div class="love-history-btn cursor-pointer" @click="showVoteRec" />
        </div>
        <div class="rank-list">
          <div v-for="(item, index) in rankList" :key="index" class="rank-item">
            <div
              class="rank-num"
              :style="`font-family:${item.ranking <= 3 ? 'numberFont' : ''};color: ${item.ranking === 0 ? '#FFB537' : item.ranking === 1 ? '#5993FF' : item.ranking === 2 ? '#FF8A6F' : ''}`"
            >
              {{ item.ranking }}
            </div>
            <div
              class="user-avatar cursor-pointer"
              :style="{ background: `url( ${prependHttpIfMissing(item.face)}) center center / 100% 100% no-repeat` }"
              @click="toUserCenter(item.user_id)"
            />
            <div class="user-info">
              <div class="name">
                {{ item?.nickname?.length > 7 ? `${item?.nickname.slice(0, 7)}...` : item?.nickname }}
              </div>
              <div class="id">
                ID:{{ item.user_number }}
              </div>
            </div>
            <AudioComp
              :id="item?.song_id" :cur-song-id="curSongId" :audio="prependHttpIfMissing(item.song_url)"
              @play-song="playSong"
            />

            <div class="data">
              <div
                class="vote-btn cursor-pointer"
                :style="{ background: `url( ${item.vote ? voteIcon : unvoteIcon}) center center / 100% 100% no-repeat` }"
                @click="vote(item)"
              />
              <div class="vote-data" :style="{ color: `${item.vote ? '#FD6E53' : '#006bdc'}` }">
                {{ item.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="activeIdx === 2">
      <UploadComp ref="uploadCompRef" :my-rank-info="myInfo" :active-idx="activeIdx" :cur-song-id="curSongId" @play-song="playSong" @get-rank="getPKRank" />
      <div class="pk-rank-box">
        <div class="pk-box">
          <div v-for="(item, index) in rankList2" :key="index" class="pk-rank-item">
            <div class="left">
              <div
                class="avatar cursor-pointer"
                :style="{ background: `url( ${prependHttpIfMissing(item[0]?.face)}) center center / 100% 100% no-repeat` }"
                @click.stop="toUserCenter(item[0]?.user_id)"
              >
                <div v-if="item[0].song_url" class="audio-box">
                  <AudioComp
                    :id="item[0]?.song_url" :cur-song-id="curSongId"
                    :audio="prependHttpIfMissing(item[0].song_url)" :is-period2="true" @play-song="playSong"
                  />
                </div>
                <div v-else class="audio-box" style="background: #3FA5F6">
                  暂未上传
                </div>
              </div>
              <div class="name">
                {{ item[0]?.nickname.length > 6 ? `${item[0]?.nickname.slice(0, 6)}...` : item[0]?.nickname }}
              </div>
              <div class="id">
                ID:{{ item[0]?.user_number }}
              </div>
              <div class="pk-vote-btn" />
            </div>
            <div class="pk-bar">
              <div class="bar-l" :class="[item[0]?.value > item[1]?.value ? 'width50' : item[0]?.value < item[1]?.value ? 'width50' : '']">
                <div>{{ item[0]?.value > 10000 ? `${(Number.parseInt((item[0]?.value / 10000) * 100) / 100).toFixed(2)}w` : item[0]?.value }}</div>
                <div v-if="item[0]?.value > item[1]?.value" class="bar-l-icon" />
              </div>
              <div class="bar-icon" />
              <div class="bar-r" :class="[item[0]?.value > item[1]?.value ? 'width50' : item[0]?.value < item[1]?.value ? 'width50' : '']">
                <div>{{ item[1]?.value > 10000 ? `${(Number.parseInt((item[1]?.value / 10000) * 100) / 100).toFixed(2)}w` : item[1]?.value }}</div>
                <div v-if="item[0]?.value < item[1]?.value" class="bar-r-icon" />
              </div>
            </div>
            <div class="right">
              <div
                class="avatar cursor-pointer"
                :style="{ background: `url( ${prependHttpIfMissing(item[1]?.face)}) center center / 100% 100% no-repeat` }"
                @click="toUserCenter(item[1]?.user_id)"
              >
                <div v-if="item[1].song_url" :id="item[1]?.song_url" class="audio-box">
                  <AudioComp
                    :cur-song-id="curSongId"
                    :audio="prependHttpIfMissing(item[1].song_url)" :is-period2="true" @play-song="playSong"
                  />
                </div>
                <div v-else class="audio-box" style="background: #3FA5F6">
                  暂未上传
                </div>
              </div>
              <div class="name">
                {{ item[1]?.nickname.length > 6 ? `${item[1]?.nickname.slice(0, 6)}...` : item[1]?.nickname }}
              </div>
              <div class="id">
                ID:{{ item[1]?.user_number }}
              </div>
              <div class="pk-vote-btn" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="activeIdx === 3">
      <div class="top-box">
        <div class="roomAvatar cursor-pointer" @click="toRoom(roomInfo.room_id)">
          <div class="roomPic" :style="`background:url(${prependHttpIfMissing(roomInfo.room_cover)})  center center / cover no-repeat transparent`" />
          <div class="joinRoom" />
        </div>
        <div class="txt">
          ‘我是歌王’总决赛将于今晚<span class="impoInfo">19:00</span>在房间‘<span
            class="impoInfo"
          >{{ roomNum }}</span>’举行，请以下晋级成功选手准时进入决赛房间进行参赛
        </div>
      </div>
      <div class="final-pk-box">
        <div v-if="rankList[0]" class="top1-box final-top-item cursor-pointer" @click="toUserCenter(rankList[0].user_id)">
          <div class="first-avatar-ring" />

          <div class="info">
            <div class="name">
              {{ rankList[0]?.nickname?.length > 7 ? `${rankList[0]?.nickname.slice(0, 7)}...` : rankList[0]?.nickname }}
            </div>
            <div class="id f-id">
              ID: {{ rankList[0]?.user_number }}
            </div>
          </div>

          <div
            class="avatar"
            :style="{ background: `url( ${prependHttpIfMissing(rankList[0]?.face)}) center center / 100% 100% no-repeat` }"
          />
        </div>
        <div class="second-third-item">
          <div v-if="rankList[1]" class="top2-box cursor-pointer" @click="toUserCenter(rankList[1]?.user_id)">
            <div class="avatar-ring" />
            <div
              class="avatar"
              :style="{ background: `url( ${prependHttpIfMissing(rankList[1]?.face)}) center center / 100% 100% no-repeat` }"
            />
            <div class="info">
              <div class="st-name">
                {{ rankList[1]?.nickname?.length > 7 ? `${rankList[1]?.nickname.slice(0, 7)}...` : rankList[1]?.nickname }}
              </div>
              <div class="id f-id">
                ID:{{ rankList[1]?.user_number }}
              </div>
            </div>
          </div>

          <div v-if="rankList[2]" class="top3-box cursor-pointer" @click="toUserCenter(rankList[2]?.user_id)">
            <div class="avatar-ring" />
            <div
              class="avatar"
              :style="{ background: `url( ${prependHttpIfMissing(rankList[2]?.face)}) center center / 100% 100% no-repeat` }"
            />
            <div class="info">
              <div class="st-name">
                {{ rankList[2]?.nickname?.length > 7 ? `${rankList[2]?.nickname.slice(0, 7)}...` : rankList[2]?.nickname }}
              </div>
              <div class="id f-id">
                ID:{{ rankList[2]?.user_number }}
              </div>
            </div>
          </div>
        </div>

        <div class="rank-list">
          <div v-for="(item, index) in rankList.slice(3)" :key="index" class="rank-item">
            <div
              class="rank-num"
            >
              {{ item.ranking }}
            </div>
            <div
              class="user-avatar cursor-pointer"
              :style="{ background: `url( ${prependHttpIfMissing(item.face)}) center center / 100% 100% no-repeat` }"
              @click="toUserCenter(item.user_id)"
            />
            <div class="user-info">
              <div class="name">
                {{ item?.nickname?.length > 7 ? `${item?.nickname.slice(0, 7)}...` : item?.nickname }}
              </div>
              <div class="id">
                ID:{{ item.user_number }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="myInfo && activeIdx <= 2" class="my-item-box">
      <div class="left">
        <div class="my-rank">
          {{ myInfo.ranking ? myInfo.ranking : "-" }}
        </div>
        <div
          class="my-avatar cursor-pointer"
          :style="{ background: `url( ${prependHttpIfMissing(myInfo.face)}) center center / 100% 100% no-repeat` }"
          @click="toUserCenter(myInfo.user_id)"
        />
        <div class="my-name">
          {{ myInfo.nickname }}
        </div>
      </div>
      <div class="my-data">
        <div class="my-num">
          {{ myInfo.value }}
        </div>
        <div class="my-desc">
          {{ myInfo.desc }}
        </div>
      </div>
    </div>
    <!-- 付费捧场弹窗 -->
    <VoteDialog ref="voteRef" :user-id="user_id" :max-vote="pay_like_num" @init="listInit" />
    <!-- 点赞记录弹窗 -->
    <VoteRecord ref="voteRecordRef" :config-id="activeTab?.id" />
    <!-- 规则弹窗 -->
    <RuleDialog ref="ruleRef" />
  </div>
</template>

<script setup lang="ts">
import backIcon from '@/assets/images/common/back-icon.webp'
import tab1Active from '@/assets/images/singer-activity/tab1-active.webp'
import tab1InActive from '@/assets/images/singer-activity/tab1-inactive.webp'
import tab2Active from '@/assets/images/singer-activity/tab2-active.webp'
import tab2InActive from '@/assets/images/singer-activity/tab2-inactive.webp'
import tab3Active from '@/assets/images/singer-activity/tab3-active.webp'
import tab3InActive from '@/assets/images/singer-activity/tab3-inactive.webp'
import progressBar1 from '@/assets/images/singer-activity/progress-bar-1.webp'
import progressBar2 from '@/assets/images/singer-activity/progress-bar-2.webp'
import progressBar3 from '@/assets/images/singer-activity/progress-bar-3.webp'
import playIcon from '@/assets/images/singer-activity/playIcon.webp'
import pauseIcon from '@/assets/images/singer-activity/pauseIcon.webp'
import voteIcon from '@/assets/images/singer-activity/vote.webp'
import unvoteIcon from '@/assets/images/singer-activity/unvote.webp'

import VoteDialog from '@/components/singer-activity/VoteDialog.vue'
import VoteRecord from '@/components/singer-activity/VoteRecord.vue'
import UploadComp from '@/components/singer-activity/UploadComp.vue'
import AudioComp from '@/components/singer-activity/AudioComp.vue'
import RuleDialog from '@/components/singer-activity/RuleDialog.vue'
import { singActApi } from '@/api/index'
import { prependHttpIfMissing } from '@/utils/index'
import { useUserStore } from '@/store'

const activeIdx = ref(1)
const searchKey = ref(null)
const userStore = useUserStore()
const user_id = userStore.userInfo.id
const rankList = ref([])
const rankList2 = ref([])

const myInfo = ref({})
const pay_like_num = ref(0)
const free_like_num = ref(0)
const curSongId = ref(0)

const tabArr = ref([{ idx: 1, active: true }, { idx: 2, active: false }, { idx: 3, active: false }])
const voteRef = ref<HTMLElement | null>(null)
const uploadCompRef = ref<HTMLElement | null>(null)
const voteRecordRef = ref<HTMLElement | null>(null)
const ruleRef = ref<HTMLElement | null>(null)
const roomNum = ref(0)
const ts = ref(0)
const roomInfo = ref({})

const getRoomNumAndTs = () => {
  // roomNum.value = 121983
  // ts.value = 1722409202
  // return
  if (['production', 'grey'].includes(process.env.NODE_ENV)) {
    roomNum.value = 112924
    ts.value = Math.floor(Date.now() / 1000)
  }
  else {
    roomNum.value = 121983
    ts.value = 1722409202
  }
}

const vote = async (item: any) => {
  if (pay_like_num.value <= 0) {
    showToast('今日点赞次数已用完，请明天再试!')
    return
  }
  if (free_like_num.value > 0) {
    await singActApi.freeVote({ song_id: item.song_id, isRaw: true }).catch(err => console.log(err))
    item.vote = true
    setTimeout(() => {
      item.vote = false
      getRank()
    }, 500)
  }
  else {
    voteRef?.value?.setVisible(true, item.song_id)
  }
}

// 开启规则弹窗
const openRule = () => {
  ruleRef?.value.setVisible(true)
}
const showVoteRec = () => {
  voteRecordRef?.value?.setVisible(true)
}

const activeTab = computed(() => {
  return tabArr.value.filter(i => i.active)[0]
})

const playSong = (id: number) => {
  console.log('playSong >', id)

  curSongId.value = id
}

const getTabPic = (item) => {
  if (item.idx === 1)
    return item.active ? tab1Active : tab1InActive

  if (item.idx === 2)
    return item.active ? tab2Active : tab2InActive

  if (item.idx === 3)
    return item.active ? tab3Active : tab3InActive
}

const toUserCenter = (user_id: number) => {
  curSongId.value = 0
  const params = {
    user_id,
  }
  js_sync_app('js_sync_usermain', params, 'user_id')
}

const toRoom = (room_id: number) => {
  curSongId.value = 0
  const params = {
    room_id,
  }
  js_sync_app('js_sync_room', params, 'room_id')
}

const handleBack = () => {
  js_sync_back()
}

const getRoomInfo = async () => {
  const res = await singActApi.getFinalRoomInfo({ room_number: roomNum.value }).catch((err) => {
    console.log(err)
  })
  if (!res)
    return
  console.log('getRoomInfo >', res)
  roomInfo.value = res
  roomNum.value = res.room_number
}

const getRank = async (user_id?: number) => {
  if (activeIdx.value === 1)
    user_id = searchKey.value
  if (!activeTab.value?.id)
    return
  const res = await singActApi.getRanking({ config_id: activeTab.value?.id, page: 1, pagesize: 200, user_number: user_id }).catch((err) => {
    console.log(err)
  })
  rankList.value = res.list
  myInfo.value = Array.isArray(res.my) ? null : res.my
  pay_like_num.value = res.paid_like_num
  free_like_num.value = res.free_like_num
  curSongId.value = 0
  if (!user_id)
    uploadCompRef?.value?.getMySong(activeTab.value.id)
}

const getRankThrottle = throttle(() => {
  getRank(searchKey.value)
}, 100)

const getPKRank = async (user_id?: number) => {
  const res = await singActApi.getPkRank({ config_id: activeTab.value?.id, page: 1, pagesize: 70, user_number: user_id }).catch((err) => {
    console.log(err)
  })
  rankList2.value = res.list
  myInfo.value = Array.isArray(res.my) ? null : res.my
  curSongId.value = 0
  uploadCompRef?.value?.getMySong(activeTab.value.id)
}

const tabClick = (item, idx: number) => {
  if (activeIdx.value === item.idx)
    return
  if (['production', 'grey'].includes(process.env.NODE_ENV)) {
    if (Number(ts.value) < Number(item.activity_start_time)) {
      showToast(`该阶段暂未开始`)
      return
    }
    if (Number(ts.value) > Number(item.activity_end_time)) {
      showToast(`该阶段暂已结束`)
      return
    }
  }
  activeIdx.value = idx + 1
  tabArr.value.forEach((item, index) => {
    item.active = idx === index
  })
  if (idx === 1)
    getPKRank()
  else
    getRank()
  getRoomInfo()
}

const getActInfo = async () => {
  const res = await singActApi.getActInfo({}).catch((err) => {
    console.log(err)
  })
  // 赛程时间判断
  tabArr.value = tabArr.value.map((item, idx) => {
    return { ...item, ...res.list[idx] }
  })
  console.log(' tabArr.value >', tabArr.value)
  tabArr.value.forEach((i, idx) => {
    if (Number(ts.value) > Number(i.activity_start_time) && Number(ts.value) < Number(i.activity_end_time)) {
      i.active = true
      activeIdx.value = idx + 1
    }
    else { i.active = false }
  })
  console.log('tabArr.value >', tabArr.value)
  if (activeIdx.value === 2)
    getPKRank()
  else
    getRank()
  uploadCompRef?.value?.getMySong(activeTab.value.id)
}

// useHandleData(true, () => {
// })

const listInit = (songId: number) => {
  console.log(songId)
  rankList.value.forEach((i) => {
    if (i.song_id === songId)
      i.vote = true
  })
  setTimeout(() => {
    getRank()
  }, 500)
}

const init = () => {
  getActInfo()
}

onMounted(() => {
  getRoomNumAndTs()
  init()
  getRoomInfo()
})
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'numberFont';
  src: url('@/assets/file/common/numberFont.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.container-box {
  min-height: 2340px;
  padding-bottom: 200px;
  width: 750px;
  background: url('@/assets/images/singer-activity/container-box.webp') center
    center / cover no-repeat transparent;
  position: relative;

  .rule-btn {
    width: 63px;
    height: 103px;
    position: absolute;
    top: 207px;
    right: 0px;
    background: url('@/assets/images/singer-activity/rule-btn.webp') center
      center / cover no-repeat transparent;
  }

  .back-wrap {
    width: 64px;
    height: 64px;
    position: fixed;
    top: 83px;
    left: 37px;
    z-index: 9;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .header-box {
    height: 835px;
    width: 750px;
    padding-top: 700px;
    background: url('@/assets/images/singer-activity/header-box.webp') center
      center / cover no-repeat transparent;

    .tab-box {
      height: 98px;
      display: flex;
      gap: 11px;
      width: 710px;
      margin: 0 auto;

      .tab-item {
        width: 230px;
        height: 98px;
      }
    }
  }

  .progress-bar {
    width: 750px;
    height: 81px;
    background: url('@/assets/images/singer-activity/progress-bar.webp') center
      center / cover no-repeat transparent;
    padding: 0 122px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .dot-item {
      width: 16px;
      height: 16px;
      background-color: #ffffffb3;
      border-radius: 50%;
      position: relative;

      .active-dot {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        top: -5px;
        left: -5px;
        position: absolute;
        background: url('@/assets/images/singer-activity/active-bar.webp')
          center center / cover no-repeat transparent;
      }
    }
  }

  .song-rank-box {
    width: 726px;
    height: 1386px;
    overflow: scroll;
    background: url('@/assets/images/singer-activity/rank-bg.webp') center
      center / cover no-repeat transparent;
    margin: 0 auto;
    padding: 132px 50px 0;

    .search-box {
      display: flex;
      align-items: center;
      gap: 10px;

      .search-bar {
        width: 510px;
        height: 80px;
        background: url('@/assets/images/singer-activity/search-bar.webp')
          center center / cover no-repeat transparent;
        display: flex;
        align-items: center;
        padding-left: 31px;

        .search-icon {
          width: 28px;
          height: 31px;
          background: url('@/assets/images/singer-activity/search-icon.webp')
            center center / cover no-repeat transparent;
          padding-left: 31px;
        }

        .search-input {
          background-color: transparent;
          color: #006bdc !important;
        }

        ::v-deep(.van-field) {
          .van-field__control {
            background-color: transparent !important;
            color: #006bdc !important;
          }

          .van-field__control::placeholder {
            background-color: transparent;
            color: #006bdc !important;
          }
        }
      }

      .love-history-btn {
        width: 106px;
        height: 115px;
        background: url('@/assets/images/singer-activity/love-history-btn.webp')
          center center / cover no-repeat transparent;
      }
    }

    .rank-list {
      overflow: hidden;
      overflow-y: scroll;
      height: 1104px;

      .rank-item {
        width: 632px;
        height: 188px;
        background: url('@/assets/images/singer-activity/rank-item-bg.webp')
          center center / cover no-repeat transparent;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        padding: 15px 40px 0;

        .rank-num {
          width: 54px;
          height: 54px;
          background: url('@/assets/images/singer-activity/top-rank-icon.webp')
            center center / cover no-repeat transparent;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 28px;
          color: #006bdc;
          font-weight: 600;
        }

        .user-avatar {
          width: 98px;
          height: 98px;
          border-radius: 50%;
          margin: 0 10px;
        }

        .user-info {
          color: #242424;
          height: 98px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 120px;
          margin-right: 45px;

          .name {
            font-size: 24px;
            line-height: 32px;
            font-weight: 600;
            white-space: nowrap;
          }

          .id {
            font-size: 20px;
            line-height: 30px;
          }
        }

        .data {
          margin-left: 10px;

          .vote-btn {
            width: 52px;
            height: 44px;
          }

          .vote-data {
            color: #006bdc;
            font-size: 22px;
            text-align: center;
          }
        }
      }
    }
  }

  .pk-rank-box {
    width: 718px;
    height: 1468px;
    background: url('@/assets/images/singer-activity/pk-rank-box.webp') center
      center / cover no-repeat transparent;
    padding: 108px 45px 0;
    margin: 0 auto;

    .pk-box {
      overflow: hidden;
      overflow-y: scroll;
      height: 1300px;
    }

    .pk-rank-item {
      width: 632px;
      height: 334px;
      margin-bottom: 25px;
      background: url('@/assets/images/singer-activity/pk-rank-item.webp')
        center center / cover no-repeat transparent;
      color: #242424;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 10px;
      padding: 5px 0px 40px;

      .left,
      .right {
        display: flex;
        flex-direction: column;
        align-items: center;

        .avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          position: relative;

          .audio-box {
            width: 84px;
            height: 36px;
            display: flex;
            justify-content: center;
            align-items: center;
            // background-color: #3fa5f6;
            color: #fff;
            font-size: 17px;
            font-weight: 500;
            border-radius: 18px;
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
          }

          margin-bottom: 25px;
        }

        .name {
          font-size: 24px;
          font-weight: 600;
          line-height: 30px;
        }

        .id {
          font-size: 20px;
          line-height: 25px;
        }

        .pk-vote-btn {
          width: 136px;
          height: 48px;
          background: url('@/assets/images/singer-activity/rank-l-btn.webp')
            center center / cover no-repeat transparent;
        }
      }

      .right .pk-vote-btn {
        background: url('@/assets/images/singer-activity/rank-r-btn.webp')
          center center / cover no-repeat transparent;
      }

      .pk-bar {
        width: 244px;
        height: 43px;
        display: flex;
        align-items: flex-end;
        transform: translateY(-10px);
        .width60 {
          width: 60% !important;
        }
        .width40 {
          width: 40% !important;
        }
        .bar-l {
          padding-left: 8px;
          width: 50%;
          height: 28px;
          line-height: 28px;
          background-color: #2bb2ff;

          .bar-l-icon {
            position: absolute;
            width: 44px;
            height: 43px;
            background: url('@/assets/images/singer-activity/pk-bar-l-icon.webp')
              center center / cover no-repeat transparent;
            bottom: 0;
            right: -10px;
            z-index: 99;
          }
        }

        .bar-r {
          height: 28px;
          line-height: 28px;
          padding-right: 8px;
          background-color: #ef6bc2;
          justify-content: flex-end;
          width: 50%;

          .bar-r-icon {
            position: absolute;
            width: 44px;
            height: 43px;
            background: url('@/assets/images/singer-activity/pk-bar-r-icon.webp')
              center center / cover no-repeat transparent;
            bottom: 0;
            left: -10px;
            z-index: 99;
          }
        }

        .bar-l,
        .bar-r {
          position: relative;
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 20px;
        }
        .bar-l {
          border-radius: 20px 0 0 20px;
        }
        .bar-r {
          border-radius: 0 20px 20px 0;
        }
      }
    }
  }

  .top-box {
    width: 726px;
    height: 346px;
    background: url('@/assets/images/singer-activity/final-pk-top-bg.webp')
      center center / cover no-repeat transparent;
    margin: 0 auto;
    position: relative;
    padding-top: 105px;
    padding-left: 364px;

    .roomAvatar {
      width: 276px;
      height: 283px;
      background: url('@/assets/images/singer-activity/room-avatar.webp') center
        center / cover no-repeat transparent;
      position: absolute;
      top: -24px;
      left: 61px;
      .roomPic {
        width: 236px;
        height: 236px;
        position: absolute;
        top: 35px;
        left: 15px;
        border-radius: 30px;
      }

      .joinRoom {
        width: 226px;
        height: 84px;
        position: absolute;
        background: url('@/assets/images/singer-activity/join-room.webp') center
          center / cover no-repeat transparent;
        left: 20px;
        bottom: -33px;
      }
    }

    .txt {
      width: 311px;
      height: 136px;
      color: #006bdc;
      font-size: 24px;

      .impoInfo {
        color: #f27819;
      }
    }
  }

  .final-pk-box {
    width: 718px;
    height: 1576px;
    background: url('@/assets/images/singer-activity/final-pk-bg.webp') center
      center / cover no-repeat transparent;
    padding-top: 172px;
    margin: 0 auto;

    .top1-box {
      width: 656px;
      height: 408px;
      background: url('@/assets/images/singer-activity/first-icon.webp') center
        center / cover no-repeat transparent;
      margin: 0 auto 56px;
      position: relative;

      .first-avatar-ring {
        position: absolute;
        top: 0;
        left: 0;
        width: 656px;
        height: 408px;
        background: url('@/assets/images/singer-activity/first-ring.webp')
          center center / cover no-repeat transparent;
        z-index: 100;
      }

      .avatar {
        width: 248px;
        height: 248px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -48%);
        border-radius: 50%;
        z-index: 99;
      }
    }

    .second-third-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto 130px;
      width: 656px;
      position: relative;

      .top2-box,
      .top3-box {
        width: 288px;
        height: 248px;
        background: url('@/assets/images/singer-activity/second-third-icon.webp')
          center center / cover no-repeat transparent;
        position: relative;

        .avatar-ring {
          width: 288px;
          height: 248px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 100;
        }

        .avatar {
          width: 182px;
          height: 182px;
          background-color: yellow;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -45%);
          position: absolute;
          z-index: 99;
          border-radius: 50%;
        }
      }

      .top3-box {
        .avatar {
          transform: translate(-50%, -39%);
        }
      }

      .top2-box {
        .avatar-ring {
          background: url('@/assets/images/singer-activity/second-ring.webp')
            center center / cover no-repeat transparent;
        }
      }

      .top3-box {
        .avatar-ring {
          background: url('@/assets/images/singer-activity/third-ring.webp')
            center center / cover no-repeat transparent;
        }
      }
    }

    .final-top-item,
    .top2-box,
    .top3-box {
      .info {
        position: absolute;
        bottom: -100px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 36px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        font-weight: bold;
        width: 180px;
        z-index: 99;

        .st-name {
          font-size: 28px;
          white-space: nowrap;
        }

        .f-id {
          font-weight: normal;
          font-size: 24px;
        }
      }
    }

    .rank-list {
      overflow: hidden;
      overflow-y: scroll;
      height: 500px;
      width: 656px;
      margin: 0 auto;

      .rank-item {
        width: 632px;
        height: 188px;
        background: url('@/assets/images/singer-activity/rank-item-bg.webp')
          center center / cover no-repeat transparent;
        margin: 0 auto 10px;
        display: flex;
        align-items: center;
        padding: 15px 40px 0;

        .rank-num {
          width: 54px;
          height: 54px;
          background: url('@/assets/images/singer-activity/top-rank-icon.webp')
            center center / cover no-repeat transparent;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 28px;
          color: #006bdc;
          font-weight: 600;
        }

        .user-avatar {
          width: 98px;
          height: 98px;
          border-radius: 50%;
          margin: 0 10px;
        }

        .user-info {
          color: #242424;
          height: 98px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 120px;
          margin-right: 45px;

          .name {
            font-size: 24px;
            line-height: 32px;
            font-weight: 600;
            white-space: nowrap;
          }

          .id {
            font-size: 20px;
            line-height: 30px;
          }
        }
      }
    }
  }

  .my-item-box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 750px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    background: url('@/assets/images/singer-activity/my-item-box.webp') center
      center / cover no-repeat transparent;

    .left {
      display: flex;
      align-items: center;

      .my-rank {
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background: url('@/assets/images/singer-activity/my-rank-icon.webp')
          center center / cover no-repeat transparent;
        color: #f27819;
        font-weight: 600;
        font-size: 28px;
      }

      .my-avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 0 20px;
      }

      .my-name {
        color: #242424;
        font-weight: 600;
        font-size: 28px;
        width: 150px;
      }
    }

    .my-data {
      color: #f27819;
      font-size: 24px;
      width: 288px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .my-num {
      }

      .my-desc {
        white-space: nowrap;
      }
    }
  }
}

::v-deep(.rulePop) {
  position: fixed;
  top: 50%;
  width: 100vw;
  height: 100vh;
  overflow: initial;

  .van-dialog__content {
    width: 100vw;
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
      width: 100vw;
      height: 100vh;
      margin: auto;
      overflow-y: scroll;

      img {
        display: block;
        width: 100vw;
        // height: 4520px;
      }
    }
  }

  // :deep(.van-popup--center){
  //   margin: 0!important
  // }
}
</style>
