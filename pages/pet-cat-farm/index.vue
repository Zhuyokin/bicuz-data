<template>
  <div id="pet-farm" :class="[isPcProxy ? '' : 'forbidden-select']" ontouchstart="" onmouseover="">
    <div ref="containerRef" class="container" :style="{ opacity: isLoading ? '0' : '1' }">
      <div class="cloud-container">
        <div class="cloud-left" />
        <div class="cloud-right" />
      </div>
      <div class="header-box">
        <!-- <van-icon name="arrow-left" size="8vw" class="back cursor-pointer" @click="handleClose()" /> -->
        <div class="back-btn cursor-pointer" @click="handleClose()" />
        <div class="header-title">
          萌宠庄园
        </div>
        <div v-if="!isVisitedOther" class="message-btn scale-btn" @click="openMessage">
          <!-- <div v-if="hasMsg" class="dot" /> -->
        </div>
      </div>
      <!-- 宠物信息 -->
      <PetInfoCard :pet="pet1" :face="petManorInfo?.user_face" :is-visited-other="isVisitedOther" @open-exp-log="openExpLog" />
      <!-- 说明按钮 -->
      <div class="rule-btn cursor-pointer" @click="openRule" />
      <!-- 右侧按钮 -->
      <div class="right-btn-group">
        <div class="right-btn right-pet-shop pet-btn cursor-pointer" @click="openStore" />
        <div class="right-btn pet-btn right-pet-information cursor-pointer" @click="openInfo" />
        <div class="right-btn pet-btn right-pet-ranklist cursor-pointer" @click="openRanking" />
        <div class="right-btn pet-btn tools-bag cursor-pointer" @click="openToolsBag" />
      </div>
      <!-- 跟随 -->
      <div
        v-if="!isVisitedOther" class="pet-btn follow-btn cursor-pointer" :class="[hasPetFollow ? 'open' : 'close']"
        @click="openFollow"
      />
      <!-- 投喂 -->
      <div class="pet-btn feed-btn cursor-pointer" @click="feed">
        <div v-if="!isVisitedOther" class="food-num-text">
          {{ petManorInfo.user_fodder }}
        </div>
      </div>
      <!-- 兼容3只宠物 -->
      <!-- id.pet1 > id.pet2 > id.pet3 -->
      <!-- 中间第一 -->
      <PetBox id="pet1" ref="petBoxRef1" :pet="pet1" :pet-id="1" :is-visited-other="isVisitedOther" />
      <!-- 左侧第二 -->
      <PetBox id="pet2" ref="petBoxRef2" :pet="pet2" :pet-id="2" :is-visited-other="isVisitedOther" />
      <!-- 右侧第三 -->
      <PetBox id="pet3" ref="petBoxRef3" :pet="pet3" :pet-id="3" :is-visited-other="isVisitedOther" />
    </div>

    <div v-if="isLoading" id="cloudAnimate" ref="cloudRef" style="z-index: 9999999">
      <anim-player :conf="cloudSvgaConfig" @ready="onReady" />
    </div>
    <!-- Loading状态 -->
    <!-- <Loading @endLoading="changeLoadVisible" v-if="false" /> -->
    <!-- 宠物商城 -->
    <StoreDialog
      ref="storeRef" :shop-visible="shopVisible" :is-visited-other="isVisitedOther"
      @init-page="getPetManorInfo" @close="changeVisible"
    />
    <!-- 宠物档案 -->
    <InfoDialog
      ref="infoRef" :pets="[pet1, pet2, pet3].filter(i => i)" :is-visited-other="isVisitedOther"
      @change-name="changeName"
    />
    <!-- 宠物榜单 -->
    <PetRankingDialog ref="rankRef" :is-visited-other="isVisitedOther" />
    <!-- 宠物喂养 -->
    <FeedDialog
      ref="feedRef" :food-num="petManorInfo.user_fodder" :pets="[pet1, pet2, pet3].filter(i => i)"
      @init-page="initPetInfo"
    />
    <!-- 宠物跟随 -->
    <FollowDialog ref="followRef" :food-num="petManorInfo.user_fodder" :pets="[pet1, pet2, pet3].filter(i => i)" />
    <!-- 成长值记录 -->
    <PetExpRecDialog ref="expRef" :pets="[pet1, pet2, pet3].filter(i => i)" />
    <!-- 消息记录 -->
    <MessageDialog ref="messageRef" />
    <!-- 改名弹窗 -->
    <EditNameDialog ref="editNameRef" @init-page="getPetManorInfo" />
    <!-- 规则弹窗 -->
    <RuleDialog ref="ruleRef" />
    <!-- 背包弹窗 -->
    <ToolsBagDialog ref="toolsBagRef" :pets="[pet1, pet2, pet3].filter(i => i)" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import lazyLoading from './lazyLoading'
import Pet from './pet.ts'

import { debounce, getOSSUrl, isIosFun, isPc, js_sync_app, prependHttpIfMissing } from '@/utils/index'
import { petManor, setPetFollow } from '@/api/modules/pet'
import { commonApi, petApi } from '@/api/index'
import { useUserStore } from '@/store'

import StoreDialog from '@/components/pet-cat-farm/StoreDialog.vue'
import InfoDialog from '@/components/pet-cat-farm/PetInfoDialog.vue'
import FeedDialog from '@/components/pet-cat-farm/FeedDialog.vue'
import PetRankingDialog from '@/components/pet-cat-farm/PetRankingDialog.vue'
import PetExpRecDialog from '@/components/pet-cat-farm/PetExpRecDialog.vue'
import MessageDialog from '@/components/pet-cat-farm/MessageDialog.vue'
import EditNameDialog from '@/components/pet-cat-farm/EditNameDialog.vue'
import PetInfoCard from '@/components/pet-cat-farm/PetInfoCard.vue'
import PetBox from '@/components/pet-cat-farm/PetBox.vue'
import ToolsBagDialog from '@/components/pet-cat-farm/ToolsBagDialog.vue'
import RuleDialog from '@/components/pet-cat-farm/RuleDialog.vue'
import FollowDialog from '@/components/pet-cat-farm/FollowDialog.vue'
import cloudSvgaUrl from '@/assets/images/pet-cat-farm/svga/cloud-animation.svga?url'
import animPlayer from '@/components/anim-player/index.vue'

definePageMeta({
  layout: 'activity',
})
const pet1 = ref<any>(null)
const pet2 = ref<any>(null)
const pet3 = ref<any>(null)
const isLoading = ref(true)
const storeRef = ref<StoreDialog | null>(null)
const infoRef = ref<InfoDialog | null>(null)
const feedRef = ref<FeedDialog | null>(null)
const followRef = ref<FollowDialog | null>(null)
const rankRef = ref<PetRankingDialog | null>(null)
const expRef = ref<PetExpRecDialog | null>(null)
const editNameRef = ref<EditNameDialog | null>(null)
const ruleRef = ref<RuleDialog | null>(null)
const toolsBagRef = ref<ToolsBagDialog | null>(null)
const petBoxRef1 = ref<PetBox | null>(null)
const petBoxRef2 = ref<PetBox | null>(null)
const petBoxRef3 = ref<PetBox | null>(null)
const messageRef = ref<MessageDialog | null>(null)
const containerRef = ref(null)
const cloudRef = ref(null)
const isPcProxy = ref(false)
const hasMsg = ref(false)

// 定义变量
const userStore = useUserStore()
// const svgUrl = ref('l1')
const shopVisible = ref(false)
const petManorInfo = ref({ pet_list: [] })
const dialogTextNormalIdx = ref(0) // 宠物常规状态文案轮播
// 是否有宠物
const hasPet = computed(() => {
  return petManorInfo.value.pet_list.length > 0
})
// 庄园的唯一宠物
const currentPet = computed(() => {
  // return petManorInfo.value.pet_list[0]
  return pet1.value?.petInfo
})
const hasPetFollow = computed(() => {
  return [pet1.value, pet2.value, pet3.value].filter(i => i?.petInfo.is_carry === 1)?.length
})
// 服务端返回的时间
const ts = ref(0)
const statusUrlMap = {
  0: 'default_url',
  1: 'dine_url',
  2: 'sleep_url',
  3: 'hunger_url',
}
const statusJsonMap = {
  0: 'default_json',
  1: 'dine_json',
  2: 'sleep_json',
  3: 'hunger_json',
}
// 是否为普通状态
const isStatusNormal = computed(() => {
  return [0].includes(currentPet.value?.status)
})
// 宠物状态资源
const petResource = computed(() => {
  if (isStatusNormal.value && currentPet.value.current_value === 0)
    return currentPet.value.init_url
  else
    return currentPet.value[statusUrlMap[currentPet.value.status]]
})

// 宠物状态资源JSON
const petResourceConfig = computed(() => {
  if (isStatusNormal.value && currentPet.value.current_value === 0)
    return currentPet.value.init_json
  else
    return currentPet.value[statusJsonMap[currentPet.value.status]]
})
// 轮询时间timer
const dialogTextTimer = ref(null)
const normalTextTimer = ref(null)
const expGrowthTimer = ref(null)
const switchNormalAndSleepTimer = ref(null)
const switchTimes = ref(0)
// 访问庄园
const visited_user_id = ref(0)
const from_top = ref(false)
const current_user_id = ref(0)
// 是否访问其他人
const isVisitedOther = computed(() => {
  return visited_user_id.value > 0 && String(current_user_id.value) !== String(visited_user_id.value)
})

// 定时器
const clearExpGrowthTimer = () => {
  if (expGrowthTimer.value) {
    clearInterval(expGrowthTimer.value)
    expGrowthTimer.value = null
  }
}
const clearNormalTxtTimer = () => {
  clearInterval(normalTextTimer.value)
  normalTextTimer.value = null
}

const clearNormalAndSleepTimer = () => {
  clearTimeout(switchNormalAndSleepTimer.value)
  switchNormalAndSleepTimer.value = null
}

const clearDialogTimer = () => {
  clearTimeout(dialogTextTimer.value)
  dialogTextTimer.value = null
}

// 访客 路由参数获取
const route = useRoute()
const query = route.query

if (query.user_id) {
  console.log('route.query', route.query)
  visited_user_id.value = query.user_id
  console.log('[query.user_id >]', query.user_id, visited_user_id.value)
}

if (query.from_top) {
  console.log(query.from_top)
  from_top.value = query.from_top
}

const getUserInfo = async () => {
  const res = await commonApi.userMe().catch((err) => {
    console.log(err)
  })

  current_user_id.value = res.user.user_id
}

const cloudSvgaConfig = ref({
  url: cloudSvgaUrl,
  loop: false,
  useType: 2,
  onPlaying: (params) => {
    const { currentFrame } = params
    if (currentFrame >= 20) {
      isLoading.value = false
      window?.scrollTo({
        left: 120,
      })
      cloudSvgaConfig.value = Object.assign(cloudSvgaConfig.value, {
        url: null,
      })
    }
  },
  // onEnded: () => {
  //   isLoading.value = false
  //   window?.scrollTo({
  //     left: 140,
  //   })
  //   cloudSvgaConfig.value = Object.assign(cloudSvgaConfig.value, {
  //     url: null,
  //   })
  // },
})

const onReady = (player) => {
  player.player.start()
}

// 资源预加载
// const preLoadResource = () => {
//   return
//   for (const key in resourceList) {
//     const img = new Image()
//     img.src = resourceList[key]
//     img.onload = () => {}
//   }
// }

const handleClose = async () => {
  if (isVisitedOther.value && from_top.value) {
    // return
    // window.history.back()

    await navigateTo({
      path: '/pet-cat-farm',
      query: {
        isHead: 0,
        has_mp4: 1,
        // user_id,
        from_top: 'true',
      },
    }, {
      open: {
        target: '_self',
      },
    })
    return
  }
  const params = {
    // params用于给安卓指令用的 - 不携带参数 - 安卓接收不到指令
    type: 'back',
  }
  const backText = isIosFun() === true ? 'js_sync_back' : 'js_app_back'
  js_sync_app(backText, params, 'type')
}

// 本地环境替换测试素材
const replaceDevResource = (petItem) => {
  // 测试代码
  const baseUrl = 'https://sky-itcast-yujin.oss-cn-beijing.aliyuncs.com/'
  // petItem.click_json = `${baseUrl}hit.json`
  // petItem.click_url = `${baseUrl}hit.mp4`
  // petItem.status = 3
  petItem.click_json = `${baseUrl}${petItem.form + 0}-click-v2.json`
  petItem.click_url = `${baseUrl}${petItem.form + 0}-click-v2.mp4`

  petItem.default_json = `${baseUrl}${petItem.form + 0}-default-v2.json`
  petItem.default_url = `${baseUrl}${petItem.form + 0}-default-v2.mp4`

  petItem.hunger_json = `${baseUrl}${petItem.form + 0}-hungry-v2.json`
  petItem.hunger_url = `${baseUrl}${petItem.form + 0}-hungry-v2.mp4`

  petItem.sleep_json = `${baseUrl}${petItem.form + 0}-sleep-v2.json`
  petItem.sleep_url = `${baseUrl}${petItem.form + 0}-sleep-v2.mp4`

  petItem.dine_json = `${baseUrl}${petItem.form + 0}-eatting-v2.json`
  petItem.dine_url = `${baseUrl}${petItem.form + 0}-eatting-v2.mp4`

  petItem.strike_json = `${baseUrl}${petItem.form + 0}-hit-v2.json`
  petItem.strike_url = `${baseUrl}${petItem.form + 0}-hit-v2.mp4`
  // petItem.status = 4

  if (petItem.next_level)
    replaceDevResource(petItem.next_level)
}

const resolvePet = (pet_list: Array<any>) => {
  let arr = []
  // 萌宠跟随的情况主宠物为跟随的;否则主宠物为等级最高的宠物
  arr = pet_list.sort((a, b) => b.level - a.level)
    .sort((a, b) => b.current_value - a.current_value)
    .sort((a, b) => b.is_carry - a.is_carry)
  return arr
}

// 获取宠物庄园信息
const getPetManorInfo = async () => {
  const ret = await petManor({
    user_id: visited_user_id.value > 0 ? visited_user_id.value : userStore.userInfo.id,
    isRaw: true,
  }).catch(() => { })
  const res = ret.data
  if (!res)
    return
  petManorInfo.value = { ...res }
  // 测试代码
  if (res.pet_list.length > 0 && process.env.NODE_ENV === 'development') {
    res.pet_list.forEach((item) => {
      replaceDevResource(item)
    })
  }
  if (res.pet_list.length > 0) {
    const config = {
      width: 250,
      height: 250,
    }
    const arr = resolvePet(res.pet_list)
    console.log(arr)
    if (arr[0]) {
      pet1.value = new Pet(arr[0], config, 1, ret.ts)
      pet1.value.selected = true
    }

    else { pet1.value = null }

    if (arr[1])
      pet2.value = new Pet(arr[1], config, 2, ret.ts)

    else
      pet2.value = null

    if (arr[2])
      pet3.value = new Pet(arr[2], config, 3, ret.ts)

    else
      pet3.value = null
  }
  else {
    pet1.value = null
    pet2.value = null
    pet3.value = null
  }
  console.log('[pet1,pet2,pet3] >', pet1.value, pet2.value, pet3.value)

  if (res.pet_list.length > 0 && res.pet_list[0].fodder >= 0)
    ts.value = ret.ts
}

const changeVisible = async (visible) => {
  shopVisible.value = visible
}

// 开启商城
const openStore = () => {
  // shopVisible.value = true;
  storeRef.value?.getPets()
}

// 开启规则弹窗
const openRule = () => {
  ruleRef?.value.setVisible(true)
}

// 宠物档案
const openPetInfo = () => {
  if (!hasPet.value) {
    showToast('还没有宠物哦，快去商店看看吧～')
    return
  }
  if (currentPet.value)
    infoRef.value?.getPetInfo(currentPet.value, petResource.value, petResourceConfig.value)

  else
    infoRef.value?.getPetInfo(currentPet.value)
}

const openInfo = debounce(() => {
  openPetInfo()
}, 500)

// 宠物排行榜
const openRanking = () => {
  rankRef.value?.getPetRanking()
}

// 道具背包
const openToolsBag = () => {
  toolsBagRef.value?.getTools()
}

// 宠物经验记录
const openExpLog = () => {
  if (isVisitedOther.value)
    return

  expRef.value?.setVisible(true)
}

// 宠物经验记录
const openMessage = () => {
  if (isVisitedOther.value)
    return

  messageRef.value?.getLogList()
}

// // 使用道具
// const openUseTool = (tool) => {
//   useToolRef.value?.openDialog(tool)
// }

// 宠物更名
const changeName = (petInfo) => {
  editNameRef.value?.setVisible(petInfo)
}

// 宠物跟随
const openFollow = () => {
  if (!hasPet.value) {
    showToast('还没有宠物哦，快去商店看看吧～')
    return
  }
  followRef.value?.setVisible(true)
  followRef.value?.setPetInfo(currentPet.value)
}

// 宠物喂养
const feed = () => {
  if (!hasPet.value) {
    showToast('还没有宠物哦，快去商店看看吧～')
    return
  }
  feedRef.value?.setVisible(true)
  feedRef.value?.setPetInfo(currentPet.value)
}

const changePetInfo = (curPetInfo: Pet, newPetInfo: Pet, isUsedHitCard?: boolean) => {
  curPetInfo.petInfo = { ...curPetInfo.petInfo, ...newPetInfo }
  if (newPetInfo.status >= 0)
    curPetInfo.status = newPetInfo.status

  // 非暴击卡且非第一次投喂 && newPetInfo.current_value >= 1200
  if (!isUsedHitCard && newPetInfo.current_value >= 1200)
    curPetInfo?.changePetResource()

  curPetInfo.ts = newPetInfo.ts
  if (newPetInfo.status === 1) {
    curPetInfo.clearExpGrowTimer() // 清除定时器
    curPetInfo.eatting()
  }

  else if (curPetInfo.petInfo.fodder <= 0)
  // 暴击后还在进食，继续加经验值
  { curPetInfo.clearExpGrowTimer() }
}

const initPetInfo = (res, isUsedHitCard?: boolean) => {
  // petBoxRef.value?.changeResource()
  if (process.env.NODE_ENV === 'development')
    replaceDevResource(res)
  petManorInfo.value = { ...petManorInfo.value, ...res }
  if (res.id === pet1.value?.petInfo.id && pet1.value)
    changePetInfo(pet1.value, res, isUsedHitCard)
  else if (res.id === pet2.value?.petInfo.id && pet2.value)
    changePetInfo(pet2.value, res, isUsedHitCard)
  else if (res.id === pet3.value?.petInfo.id && pet3.value)
    changePetInfo(pet3.value, res, isUsedHitCard)

  // pet1.value.petInfo = { ...res }
  // pet1.value.status = res.status
  // pet1.value?.changePetResource()
  // pet1.value.ts = res.ts
  // if (res.status === 1) {
  //   pet1.value.eatting()
  // }
  // else {
  //   pet1.value.clearExpGrowTimer()
  //   pet1.value.updateLeft = res.end_value - res.current_value
  // }
}

provide('initPetInfo', initPetInfo)
provide('getPetManorInfo', getPetManorInfo)
provide('replaceDevResource', replaceDevResource)

const transferPet = (idx) => {
  console.log(idx)
  if (idx === 0)
    pet1.value = null

  if (idx === 1)
    pet2.value = null

  if (idx === 2)
    pet3.value = null
}

const getLogList = async () => {
  const res = await petApi.getPetEventLogs({ page: 1, pagesize: 999 }).catch((err) => {
    console.log('[ err ] >', err)
  })
  console.log('[ res ] >', res)
  if (!res)
    return
  hasMsg.value = res.list.length > 0
}

// 清空所有计时器
const clearAllTimer = () => {
  clearNormalTxtTimer()
  clearDialogTimer()
  clearExpGrowthTimer()
  clearNormalAndSleepTimer()
}

// hook使用
// useHandleData(true, () => {
//   getPetManorInfo()
// })

const initPage = () => {
  // getLogList() 未接入IM推送
  getUserInfo()
  getPetManorInfo()
  isPcProxy.value = isPc()
}

// 页面初始化
onMounted(() => {
  initPage()
  // preLoadResource();
})

// 宠物进食状态逻辑,倒计时/百分比
onUnmounted(() => {
  clearAllTimer()
  pet1.value = null
  pet2.value = null
  pet3.value = null
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
