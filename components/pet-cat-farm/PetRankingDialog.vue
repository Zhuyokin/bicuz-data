<template>
  <div class="pet_ranking">
    <van-popup v-model:show="rankVisible" position="bottom" round @click-overlay="close">
      <div class="content">
        <div class="close cursor-pointer" @click="close" />
        <div class="pet-rank-content">
          <!-- 搜索框 -->
          <div class="search-container">
            <van-field
              v-model="searchKey" label-align="center" input-align="center" maxlength="10" placeholder="搜索用户ID"
              type="digit"
            />
            <div class="search-btn cursor-pointer" @click="search" />
          </div>
          <!-- tab切换 -->
          <div class="tab-container">
            <div class="tab-bg" :class="[activeIndex == 0 ? 'tabActiveL' : 'tabActiveR']" />
            <div class="cursor-pointer tab" :class="[activeIndex == 0 ? 'active' : '']" @click="changeTab(0)">
              <span class="font-600">周榜</span>
            </div>
            <div class="cursor-pointer tab" :class="[activeIndex == 1 ? 'active' : '']" @click="changeTab(1)">
              <span class="font-600">总榜</span>
            </div>
          </div>
          <!-- 我的宠物 -->
          <div v-if="!isSearch" class="my-rank-box">
            <div class="pet-rank-item rank-item my-rank">
              <div
                v-if="myPetRankInfo.rank <= 3 && myPetRankInfo.rank > 0" class="rank-icon rank"
                :style="`background:url(${myPetRankInfo.rank === 1 ? firstIcon : myPetRankInfo.rank === 2 ? secondIcon : thirdIcon})  center center / cover no-repeat transparent`"
              />
              <div v-else-if="myPetRankInfo.rank != -1" class="rank-text rank">
                {{ myPetRankInfo.rank }}
              </div>
              <div v-else class="rank-icon rank">
                —
              </div>
              <div
                class="rank-avatar cursor-pointer" :style="{
                  background:
                    `url(${prependHttpIfMissing(myPetRankInfo.user_face)
                    }) center center / cover no-repeat transparent`,
                }" @click="toUserCenter(myPetRankInfo.user_id)"
              />
              <div class="rank-name-id">
                <div class="rank-name">
                  {{ myPetRankInfo.user_nickname }}
                </div>
                <div class="rank-id">
                  ID:{{ myPetRankInfo.user_number }}
                </div>
              </div>
              <div class="rank-pet-icon cursor-pointer" @click="visitFarm(myPetRankInfo.user_id)" />
              <div class="rank-num-unit">
                <div class="rank-num">
                  {{ myPetRankInfo.exp }}
                </div>
                <div class="rank-unit">
                  成长值
                </div>
              </div>
            </div>
          </div>
          <!-- 宠物排行榜列表 -->
          <div
            v-if="petRankInfo.length > 0" ref="contentRef" class="pet-rank-list"
            style="height: 400px; padding-bottom: 100px"
          >
            <div v-for="(item, index) in petRankInfo" :key="index" class="pet-rank-item rank-item">
              <div
                v-if="index <= 2 && !isSearch" class="rank-icon rank"
                :style="`background:url(${index === 0 ? firstIcon : index === 1 ? secondIcon : thirdIcon})  center center / cover no-repeat transparent`"
              />
              <div v-else-if="!isSearch" class="rank-text rank">
                {{ index + 1 }}
              </div>
              <div v-else class="rank-text rank" style="opacity: 0">
                {{ "-" }}
              </div>
              <div
                class="rank-avatar cursor-pointer" :style="{
                  background:
                    `url(${prependHttpIfMissing(item.user_face)}) center center / cover no-repeat transparent`,
                }" @click="toUserCenter(item.user_id)"
              />
              <div class="rank-name-id">
                <div class="rank-name">
                  {{ item.user_nickname }}
                </div>
                <div class="rank-id">
                  ID:{{ item.user_number }}
                </div>
              </div>
              <div
                class="rank-pet-icon cursor-pointer" :style="`transform: translateX(${isSearch ? '70px' : '0px'})`"
                @click="visitFarm(item.user_id)"
              />
              <div v-if="!isSearch" class="rank-num-unit">
                <div class="rank-num">
                  {{ item.exp }}
                </div>
                <div class="rank-unit">
                  成长值
                </div>
              </div>
            </div>
          </div>
          <!-- 空状态 -->
          <div v-else class="pet-rank-list-blank" style="">
            <div class="blank-text">
              <div v-if="!isSearch">
                当前暂无用户上榜
              </div>
              <div v-if="!isSearch">
                快去喂养宠物吧～
              </div>

              <div v-if="isSearch">
                当前用户不存在
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { petRanking, searchRank } from '@/api/modules/pet'
import { useUserStore } from '@/store'
import { isIosFun, js_sync_app } from '@/utils/index'

// 导入图片
import firstIcon from '@/assets/images/pet-cat-farm/pet-rank-1th-icon.webp'
import secondIcon from '@/assets/images/pet-cat-farm/pet-rank-2th-icon.webp'
import thirdIcon from '@/assets/images/pet-cat-farm/pet-rank-3th-icon.webp'

const props = defineProps<{
  isVisitedOther?: boolean
}>()
const emits = defineEmits(['close'])
const rankVisible = ref(false)
const petRankInfo = ref([])
const myPetRankInfo = ref({})
const userStore = useUserStore()
const searchKey = ref(null)
const activeIndex = ref(0)
const isSearch = ref(false)
const contentRef = ref(null)
const statusMap = {
  0: '休闲中',
  1: '进食中',
  2: '睡眠中',
  3: '饥饿中',
  4: '未知',
}
const router = useRouter()

const statusText = computed(() => {
  if (petRankInfo.value?.current_value === 0)
    return '未知'

  return statusMap[petRankInfo.value.status]
})

const search = () => {
  if (searchKey.value.length) {
    isSearch.value = true
    getSearchRet()
  }
  else {
    isSearch.value = false
    getPetRanking()
  }
}

const toUserCenter = (user_id) => {
  const params = {
    // params用于给安卓指令用的 - 不携带参数 - 安卓接收不到指令
    user_id,
  }
  js_sync_app('js_sync_usermain', params, 'user_id')
}

const getPetRanking = async () => {
  const res = await petRanking({ type: activeIndex.value == 0 ? 'this_week' : 'total' })
  if (!res)
    return

  petRankInfo.value = res.list.map((i) => {
    return { ...i, exp: i.exp > 10000 ? `${(Number.parseInt((i.exp / 10000) * 100) / 100).toFixed(2)}w` : i.exp }
  })
  myPetRankInfo.value = [res.my].map((i) => {
    return { ...i, exp: i.exp > 10000 ? `${(Number.parseInt((i.exp / 10000) * 100) / 100).toFixed(2)}w` : i.exp }
  })[0]
  rankVisible.value = true
}

const getSearchRet = async () => {
  const params = {
    type: 'this_week',
    user_number: searchKey.value,
  }
  const res = await searchRank(params).catch((err) => {
    console.log(err)
    petRankInfo.value = []
  })
  if (!res)
    return
  petRankInfo.value = [res]
}

const changeTab = (idx: number) => {
  activeIndex.value = idx
  searchKey.value = null
  isSearch.value = false
  getPetRanking(idx == 0 ? 'this_week' : 'total')
}

const visitFarm = async (user_id: number) => {
  // router.push({ path: '/pet-cat-farm', query: { isHead:0, user_id} })
  if (user_id == myPetRankInfo.value.user_id && !props.isVisitedOther) {
    close()
    return
  }
  await navigateTo({
    path: '/pet-cat-farm',
    query: {
      isHead: 0,
      has_mp4: 1,
      user_id,
      from_top: 'true',
    },
  }, {
    open: {
      target: '_self',
    },
  })
  // window.open(`/pet-cat-farm?isHead=0&has_mp4=1&user_id=${user_id}&from_top=true`, '_self')
}

defineExpose<{ getPetRanking: () => void }>({ getPetRanking })

const close = () => {
  rankVisible.value = false
  searchKey.value = null
  isSearch.value = false
  contentRef.value?.scrollTo({ top: 0, left: 0 })
  // emits('close', false);
}
</script>

<style lang="scss" scoped>
.pet_ranking {
  border-radius: 0;
  transform: none;
  left: 0;
  bottom: 0;
  top: unset;
  display: flex;

  :deep(.van-cell) {
    width: 73%;
    height: 70px;
    font-size: 28px;
    margin: 0 0 0 20px;
    border-radius: 35px;
  }

  :deep(.van-field__value) input {
    font-size: 28px;
    line-height: 28px;
    color: #b43a04 !important;
    font-weight: bold;
    text-align: center;
  }

  :deep(.van-popup) {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff3de;
    overflow: hidden;
    height: 1284px !important;
    background: url('@/assets/images/pet-cat-farm/pet-ranking-dialog-bg.webp')
      center center / cover no-repeat transparent;

    .content {
      width: 100%;
      padding: 225px 24px 0px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .close {
        position: absolute;
        top: 111px;
        right: 24px;
        width: 68px;
        height: 63px;
        background: url('@/assets/images/pet-cat-farm/pet-store-close.webp')
          center center / cover no-repeat transparent;
      }

      .pet-rank-content {
        width: 702px;
        height: 100%;
        height: 100vh;
        display: flex;
        overflow: hidden;
        overflow-y: scroll;
        flex-direction: column;
        align-items: center;

        .search-container {
          width: 646px;
          height: 70px;
          display: flex;
          align-items: center;
          background: #fff;
          border-radius: 35px;
          margin-bottom: 28px;
          position: relative;

          .search-btn {
            width: 110px;
            height: 66px;
            background: url('@/assets/images/pet-cat-farm/pet-ranking-search-icon.webp')
              center center / cover no-repeat transparent;
            position: absolute;
            top: 50%;
            right: 1%;
            transform: translateY(-50%);
          }
        }

        .tab-container {
          width: 438px;
          height: 77px;
          background: #ffd39d;
          margin-bottom: 27px;
          border: 5px solid #ffe0b1;
          display: flex;
          align-items: center;
          font-size: 32px;
          color: #b43a04;
          border-radius: 38px;
          position: relative;

          .tab-bg {
            position: absolute;
            border-radius: 38px;
            top: 0%;
            left: 0%;
            width: 214px;
            line-height: 68px;
            height: 68px;
            color: #fff;
            background: linear-gradient(180deg, #ff8d51 0%, #f00 100%);
            transition: all 0.3s linear;
          }

          .tab {
            z-index: 999;
            width: 214px;
            height: 68px;
            color: #b43a04;
            line-height: 68px;
            border-radius: 34px;
            transition: all 0.3s linear;
          }

          .tabActiveR {
            color: #fff;
            transform: translateX(100%);
          }

          .tabActiveL {
            color: #fff;
            transform: translateX(0%);
          }

          .active {
            color: #fff;
          }
        }

        .my-rank {
          background: #ffd874 !important;
        }

        .rank-item {
          width: 702px;
          height: 126px;
          background: rgba(255, 220, 159, 0.6);
          box-shadow: 0 -4px 3px 0 #ffc662 inset;
          border-radius: 12px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          color: #b43a04;
          font-size: 28px;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .pet-rank-list::-webkit-scrollbar {
          display: none;
        }

        .pet-rank-list,
        .my-rank-box {
          overflow: hidden;
          overflow-y: scroll;

          .pet-rank-item {
            width: 702px;
            height: 126px;
            background: rgba(255, 220, 159, 0.6);
            box-shadow: 0 -4px 3px 0 #ffc662 inset;
            border-radius: 12px;
            margin-bottom: 32px;

            .rank {
              width: 38px;
              height: 44px;
              margin-right: 20px;
            }

            .rank-avatar {
              width: 90px;
              height: 90px;
              border-radius: 47px;
              border: 3px solid #b43a04;
              margin-right: 12px;
            }

            .rank-name-id {
              width: 262px;
              margin-right: 2px;
              text-align: left;
            }

            .rank-pet-icon {
              width: 90px;
              height: 90px;
              margin-right: 5px;
              background: url('@/assets/images/pet-cat-farm/pet-rank-house-icon.webp')
                center center / cover no-repeat transparent;
            }

            .rank-num-unit {
              max-width: 76px;
              text-align: center;

              .rank-num {
                font-weight: bolder;
              }

              .rank-unit {
                white-space: nowrap;
              }
            }
          }
        }

        .pet-rank-list-blank {
          width: 100%;
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;

          .blank-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 340px;
            height: 144px;
            flex-shrink: 0;
            border-radius: 38px;
            background: #ffdc9f;
            color: #b43a04;
            font-family: 'PingFang SC';
            font-size: 32px;
            font-style: normal;
            font-weight: 500;
            line-height: 48px;
          }
        }
      }
    }
  }
}

.pet-rank-content::-webkit-scrollbar {
  display: none;
}
</style>
