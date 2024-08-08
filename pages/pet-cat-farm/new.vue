<template>
  <div>
    <div class="container" :style="{ opacity: isLoading ? '0' : '1' }">
      <div class="cloud-container">
        <div class="cloud-left"></div>
        <div class="cloud-right"></div>
      </div>
      <div class="header-box">
        <!-- <van-icon name="arrow-left" size="8vw" class="back cursor-pointer" @click="handleClose()" /> -->
        <div class="back-btn cursor-pointer" @click="handleClose()"></div>
        <div class="header-title">萌宠庄园</div>
      </div>
      <!-- <div class="bg" style="width:100%;height:100%;background-color: pink;position: fixed;">11111</div> -->
      <!-- 宠物信息 -->
      <div class="pet-info-container" v-if="hasPet">
        <div class="pet-info-box">
          <div class="avatar cursor-pointer" @click="openExpLog">
            <!-- @/assets/images/pet-cat-farm/btn.png -->
            <img :src="prependHttpIfMissing(petManorInfo?.user_face)" alt="" />
            <!-- <img :src="defaultAvatar" alt="" /> -->
            <!-- <img src="https://sky-itcast-yujin.oss-cn-beijing.aliyuncs.com/avatar.png" alt="" /> -->
          </div>
          <div class="pet-info">
            <div class="name">
              {{
                currentPet.name.length > 0
                  ? currentPet.name.length > 5
                    ? currentPet.name.slice(0, 5) + '...'
                    : currentPet.name
                  : currentPet.pet_name.length > 5
                    ? currentPet.pet_name.slice(0, 5) + '...'
                    : currentPet.pet_name
              }}
            </div>
            <div class="exp"><span>等级</span> {{ currentPet.level }}</div>
          </div>
        </div>
        <div class="pet-exp-box cursor-pointer" @click="openExpLog">
          <div class="pet-exp-star"></div>
          <div class="pet-exp-progress" :style="{ width: `${currentPet.level < 100 ? level_progress_ratio : 100}%` }">
            <div class="pet-exp-text">
              {{ currentPet.level < 100 ? `还差${updateLeft}成长值升至下一级` : '已满级' }}
            </div>
          </div>
        </div>
      </div>
      <!-- 说明按钮 -->
      <div class="rule-btn cursor-pointer" @click="openRule"></div>
      <!-- 右侧按钮 -->
      <div class="right-btn pet-btn right-pet-shop cursor-pointer" @click="openStore" v-if="!isVisitedOther"></div>
      <div class="right-btn pet-btn right-pet-information cursor-pointer" @click="openPetInfo"></div>
      <div class="right-btn pet-btn right-pet-ranklist cursor-pointer" @click="openRanking"></div>
      <!-- 饭碗 -->
      <div class="feed-container" v-if="hasPet">
        <div
          class="timer-box"
          v-if="currentPet?.fodder >= 60 && minus() > 2000"
          :style="`transform: translateX(${minus() > 3600000 ? '-20%' : '0'})`"
        >
          <div class="timer-icon"></div>
          <div class="timer-count">
            <van-count-down :time="eatDownTime" format="DD 天 HH 时 mm 分 ss 秒">
              <template #default="eatDownTime">
                <span class="block" v-if="eatDownTime.days > 0">{{ eatDownTime.days }}</span>
                <span class="colon" v-if="eatDownTime.days > 0">天</span>
                <span class="block" v-if="eatDownTime.hours > 0">{{ eatDownTime.hours }}</span>
                <span class="colon" v-if="eatDownTime.hours > 0">时</span>
                <span class="block" v-if="eatDownTime.minutes > 0">{{ eatDownTime.minutes }}</span>
                <span class="colon" v-if="eatDownTime.minutes > 0">分</span>
                <span class="block" v-if="eatDownTime.seconds > 0">{{ eatDownTime.seconds }}</span>
                <span class="colon" v-if="eatDownTime.seconds > 0">秒</span>
              </template>
            </van-count-down>
          </div>
        </div>
        <div
          class="food-img"
          :style="`background:url(${currentPet?.fodder >= 60 && minus() > 2000 ? halfPetFood : emptyPetFood})  center center / cover no-repeat transparent`"
        ></div>
        <!-- <div class="food-progress-box">
          <div class="food-progress-text">50%</div>
          <div class="food-progress-bar"></div>
        </div> -->
      </div>
      <!-- 跟随 -->
      <div
        :class="[currentPet?.is_carry == 1 ? 'open' : 'close', 'follow-btn', 'pet-btn', 'cursor-pointer']"
        @click="setFollow"
        v-if="!isVisitedOther"
      ></div>
      <!-- 投喂 -->
      <div class="feed-btn pet-btn cursor-pointer" @click="feed">
        <div class="food-num-text" v-if="!isVisitedOther">{{ petManorInfo.user_fodder }}</div>
      </div>
      <!-- 宠物 -->
      <PetAnim ref="petAnimRef" :data="currentPet" />
    </div>
    <div id="cloudAnimate" v-if="isLoading" ref="cloudRef">
      <!-- <canvas ></canvas> -->
    </div>
    <!-- Loading状态 -->
    <!-- <Loading @endLoading="changeLoadVisible" v-if="false" /> -->
    <!-- 宠物商城 -->
    <StoreDialog ref="storeRef" @initPage="getPetManorInfo" :shopVisible="shopVisible" @close="changeVisible" />
    <!-- 宠物档案 -->
    <InfoDialog ref="infoRef" @changeName="changeName" :isVisitedOther="isVisitedOther" />
    <!-- 宠物榜单 -->
    <PetRankingDialog ref="rankRef" />
    <!-- 宠物喂养 -->
    <FeedDialog ref="feedRef" @initPage="getPetManorInfo" :foodNum="petManorInfo.user_fodder" />
    <!-- 成长值记录 -->
    <PetExpRecDialog ref="expRef" />
    <!-- 改名弹窗 -->
    <EditNameDialog ref="editNameRef" @initPage="getPetManorInfo" />
    <!-- 规则弹窗 -->
    <RuleDialog ref="ruleRef" />
  </div>
</template>

<script setup lang="ts">
import lazyLoading from './lazyLoading';
import { isIosFun, js_sync_app } from '@/utils/index';
import { setPetFollow, petManor } from '@/api/modules/pet';
import { commonApi } from '@/api/index';
import { useUserStore } from '@/store';
import { throttle, debounce, prependHttpIfMissing, getOSSUrl } from '@/utils/index';
import Loading from '@/components/pet-cat-farm/Loading.vue';
import StoreDialog from '@/components/pet-cat-farm/StoreDialog.vue';
import InfoDialog from '@/components/pet-cat-farm/PetInfoDialog.vue';
import FeedDialog from '@/components/pet-cat-farm/FeedDialog.vue';
import PetRankingDialog from '@/components/pet-cat-farm/PetRankingDialog.vue';
import PetExpRecDialog from '@/components/pet-cat-farm/PetExpRecDialog.vue';
import EditNameDialog from '@/components/pet-cat-farm/EditNameDialog.vue';
import VapPlayer from '@/components/pet-cat-farm/VapPlayer.vue';
import SvgaPlayer from '@/components/pet-cat-farm/SvgaPlayer.vue';
import RuleDialog from '@/components/pet-cat-farm/RuleDialog.vue';
import PetAnim from './components/pet-anim/index.vue';
// 导入图片
import halfPetFood from '@/assets/images/pet-cat-farm/food-half.webp';
import emptyPetFood from '@/assets/images/pet-cat-farm/food-empty.webp';
import defaultAvatar from '@/assets/images/pet-cat-farm/default.webp';
import { Parser, Player } from 'svga';

definePageMeta({
  layout: 'activity',
});
interface StoreComp {
  getPets: () => void;
}

const isLoading = ref(true);
const storeRef = ref<StoreDialog | null>(null);
const infoRef = ref<InfoDialog | null>(null);
const feedRef = ref<FeedDialog | null>(null);
const rankRef = ref<PetRankingDialog | null>(null);
const expRef = ref<PetExpRecDialog | null>(null);
const editNameRef = ref<EditNameDialog | null>(null);
const ruleRef = ref<RuleDialog | null>(null);
const vapRef = ref<VapPlayer | null>(null);
const svgaRef = ref<SvgaPlayer | null>(null);
const cloudRef = ref(null);

// 定义变量
const userStore = useUserStore();
let cloudPlayer = null;
let cloudParser = null;
const svgUrl = ref('l1');
const shopVisible = ref(false);
const resourceList = reactive({
  l1: 'https://sky-itcast-yujin.oss-cn-beijing.aliyuncs.com/l1.mp4',
  l2: 'https://sky-itcast-yujin.oss-cn-beijing.aliyuncs.com/l2.mp4',
  l3: 'https://sky-itcast-yujin.oss-cn-beijing.aliyuncs.com/l3.mp4',
  l4: 'https://sky-itcast-yujin.oss-cn-beijing.aliyuncs.com/l4.mp4',
  l5: 'https://sky-itcast-yujin.oss-cn-beijing.aliyuncs.com/l5.mp4',
});
let petManorInfo = ref({ pet_list: [] });
let dialogTextNormalIdx = ref(0); // 宠物常规状态文案轮播
let dialogTextSleepIdx = ref(0); // 睡觉
let dialogTextEattingIdx = ref(0); // 吃饭
let dialogTextHungryIdx = ref(0); // 饥饿
let dialogTextClickIdx = ref(0); // 点击
// 文案数组
let currentDialogArr = computed(() => {
  return currentPet.value[statusTextMap[currentPet.value.status]];
});
let clickTextArr = computed(() => {
  return currentPet.value.click_text;
});
// 是否有宠物
let hasPet = computed(() => {
  return petManorInfo.value.pet_list.length > 0;
});
// 庄园的唯一宠物
let currentPet = computed(() => {
  return petManorInfo.value.pet_list[0];
});
// 升级百分比
let level_progress_ratio = computed(() => {
  return (
    ((currentPet.value.current_value - currentPet.value.start_value) /
      (currentPet.value.end_value - currentPet.value.start_value)) *
    100
  );
});
// JS按钮振动API
const isSupportVibrate = computed(() => {
  return 'vibrate' in window.navigator;
});
// 服务端返回的时间
let ts = ref(0);
let statusUrlMap = {
  0: 'default_url',
  1: 'dine_url',
  2: 'sleep_url',
  3: 'hunger_url',
};
let statusJsonMap = {
  0: 'default_json',
  1: 'dine_json',
  2: 'sleep_json',
  3: 'hunger_json',
};
let statusTextMap = {
  0: 'default_text',
  1: 'dine_text',
  2: 'sleep_text',
  3: 'hunger_text',
};
// 宠物状态资源
let petResource = computed(() => {
  if (isStatusNormal.value && currentPet.value.current_value === 0) {
    return currentPet.value.init_url;
  } else {
    return currentPet.value[statusUrlMap[currentPet.value.status]];
  }
});

let isSVGA = computed(() => {
  return petResource.value.indexOf('.svga') >= 0;
});

let isVAP = computed(() => {
  return petResource.value.indexOf('.mp4') >= 0;
});

// 宠物状态资源JSON
let petResourceConfig = computed(() => {
  if (isStatusNormal.value && currentPet.value.current_value === 0) {
    return currentPet.value.init_json;
  } else {
    return currentPet.value[statusJsonMap[currentPet.value.status]];
  }
});
// 轮询时间timer
let dialogTextTimer = ref(null);
let normalTextTimer = ref(null);
let expGrowthTimer = ref(null);
let switchNormalAndSleepTimer = ref(null);
let switchTimes = ref(0);
let popDialogVisible = ref(false);
let isFirstFeed = ref(true);
// 访问庄园
let visited_user_id = ref(0);
let from_top = ref(false);
// 是否访问其他人
const isVisitedOther = computed(() => {
  return visited_user_id.value > 0 && current_user_id.value != visited_user_id.value;
});
// 是否为普通状态
let isStatusNormal = computed(() => {
  return [0].includes(currentPet.value?.status);
});
// 是否为睡觉状态
let isStatusSleep = computed(() => {
  return [2].includes(currentPet.value?.status);
});
// 是否为进食状态
let isStatusEating = computed(() => {
  return [1].includes(currentPet.value?.status);
});
// 是否为饥饿状态
let isStatusHungry = computed(() => {
  return [3].includes(currentPet.value?.status);
});
// 升级倒计时
let updateLeft = computed(() => {
  return currentPet.value?.end_value - currentPet.value?.current_value;
});
// 定时器
const clearExpGrowthTimer = () => {
  if (expGrowthTimer.value) {
    clearInterval(expGrowthTimer.value);
    expGrowthTimer.value = null;
  }
};
const clearNormalTxtTimer = () => {
  clearInterval(normalTextTimer.value);
  normalTextTimer.value = null;
};

const clearNormalAndSleepTimer = () => {
  clearTimeout(switchNormalAndSleepTimer.value);
  switchNormalAndSleepTimer.value = null;
};

const clearDialogTimer = () => {
  clearTimeout(dialogTextTimer.value);
  dialogTextTimer.value = null;
};

// 进食状态
const checkEatting = () => {
  clearExpGrowthTimer();
  if (!isStatusEating.value) {
    return;
  }
  // 经验值实时增加
  expGrowthTimer.value = setInterval(() => {
    // 升级检测
    if (petManorInfo.value.pet_list[0].fodder > 20) {
      petManorInfo.value.pet_list[0].current_value += 20;
    }
    petManorInfo.value.pet_list[0].fodder -= 20;
    ts.value += 1000;
    // 前端维护喂养升级,不请求
    if (updateLeft.value <= 0) {
      let nextInfo = petManorInfo.value.pet_list[0].next_level;
      // 升级则替换素材
      let curPet = petManorInfo.value.pet_list[0];
      petManorInfo.value.pet_list[0] = { ...curPet, ...nextInfo, next_level: nextInfo };
      petManorInfo.value.pet_list[0].current_value = nextInfo.start_value - 1;
      petManorInfo.value.pet_list[0].start_value = nextInfo.start_value - 1;
      petManorInfo.value.pet_list[0].end_value = nextInfo.end_value;
      petManorInfo.value.pet_list[0].level = nextInfo.level;
      // changeResource();
    } else if (currentPet.value.current_value > 1200 && currentPet.value.level == 1 && isFirstFeed.value) {
      //初始状态喂养多次
      console.log('is_first', currentPet.value.current_value);
      isFirstFeed.value = false;
      initResource();
    }
    if (
      // 吃完检测,时间戳
      // petManorInfo.value.pet_list[0].fodder < 0 &&
      currentPet.value.dine_end_time * 1000 + 1000 < new Date().getTime() &&
      currentPet.value.dine_end_time * 1000 + 1000 < ts.value
    ) {
      clearExpGrowthTimer();
      console.log('eatDownTime>', eatDownTime);
      console.log('expGrowthTimer>', expGrowthTimer.value);
      console.log('currentPet?.fodder >', currentPet?.value.fodder);
      ts.value = 0;
      getPetManorInfo();
    }
  }, 1000);
};

// 进食倒计时时间差
let eatDownTime = computed(() => {
  // let currentTimer = new Date().getTime();
  let currentTimer = ts.value;
  return currentPet.value?.dine_end_time * 1000 - currentTimer;
});

// 是否吃完口粮
const minus = () => {
  // let currentTimer = new Date().getTime();
  let currentTimer = ts.value;
  return currentPet.value?.dine_end_time * 1000 - currentTimer;
};

// 访客 路由参数获取
const route = useRoute();
const query = route.query;

if (query.user_id) {
  visited_user_id.value = query.user_id;
  console.log('[query.user_id >]', query.user_id, visited_user_id.value);
}

if (query.from_top) {
  from_top.value = query.from_top;
}

let current_user_id = ref(0);

const getUserInfo = async () => {
  const res = await commonApi.userMe().catch((err) => {
    console.log(err);
  });
  console.log('[userInfo >]', res);

  current_user_id.value = res.user.user_id;
};

// 加载入场云动画
const loadCloudAnimation = async () => {
  console.log("loadCloudAnimation---==============start")
  // let cloudParser = new Parser();
  // let url = '/h5/anim/cloud-animation.svga';
  // if (process.env.NODE_ENV == 'development') {
  //   url = 'https://sky-itcast-yujin.oss-cn-beijing.aliyuncs.com/cloud-animation.svga';
  // } else {
  //   url = getOSSUrl(url);
  // }
  // const svga = await cloudParser.load(url);
  // let cloudPlayer = new Player({
  //   container: cloudRef?.value,
  //   loop: 1,
  // });
  // await cloudPlayer.mount(svga);
  // cloudPlayer.start();
  // cloudPlayer.onEnd = () => {
  //   isLoading.value = false;
  // };

  // if (cloudPlayer) {
  //   cloudPlayer.clear();
  //   // @SEE https://github.com/svga/SVGAPlayer-Web/issues/93#issuecomment-844755065
  //   cloudPlayer._videoItem = null;
  //   cloudPlayer = null;
  // }
  const SVGA = await lazyLoading()();
  cloudPlayer = new SVGA.Player('#cloudAnimate');
  cloudParser = new SVGA.Parser('#cloudAnimate');
  cloudPlayer.loops = 1;
  // cloudPlayer.onFinished((res) => {
  //   console.log(res, 'playerFinished===============');
  // });
  cloudPlayer.onPercentage(loadEnd);
  nextTick(() => {
    let url = '/h5/anim/cloud-animation.svga';
    if (process.env.NODE_ENV == 'development') {
      url = 'https://sky-itcast-yujin.oss-cn-beijing.aliyuncs.com/cloud-animation.svga';
    }else {
      url = getOSSUrl(url);
    }
    cloudParser.load(url, function (videoItem) {
      // cloudParser.load('https://photo.tuantuan.live/h5/anim/cloud-animation.svga', function (videoItem) {
      cloudPlayer.setVideoItem(videoItem);
      cloudPlayer.startAnimation();
    });
  });
};


// 加载svga
const loadSvg = () => {};

const loadEnd = (ratio) => {
  if (ratio >= 0.5) {
    isLoading.value = false;
    console.log(isLoading.value,"loadCloudAnimation---==============end")
  }
};

// loading结束
const changeLoadVisible = (bool) => {
  isLoading.value = bool;
  getPetManorInfo();
};

// 资源预加载
const preLoadResource = () => {
  return;
  for (const key in resourceList) {
    const img = new Image();
    img.src = resourceList[key];
    img.onload = () => {};
  }
};
// 改变资源
const changeResource = (config?: { src: string; config: string; loop?: boolean | number }) => {
  if (isVAP) {
    nextTick(() => {
      vapRef.value?.setConfig({
        src: prependHttpIfMissing(petResource.value),
        config: prependHttpIfMissing(petResourceConfig.value),
        width: 250,
        height: 250,
        loop: true,
        type: 1,
        ...config,
      });
    });
  }
  if (isSVGA) {
    svgaRef.value?.setSvgaConfig({
      url: 'https://sky-itcast-yujin.oss-cn-beijing.aliyuncs.com/mao.svga',
      loop: 0,
      width: 120,
      height: 120,
      ...config,
    });
  }
};
// 初始化模型
const initResource = (resource?: Object) => {
  // 改变模型
  if (vapRef?.value?.vapPlayer && vapRef.value) {
    changeResource();
    return;
  }
  nextTick(() => {
    if (isVAP) {
      vapRef.value?.initVap({
        src: prependHttpIfMissing(petResource.value),
        config: prependHttpIfMissing(petResourceConfig.value),
        width: 250,
        height: 250,
        loop: true,
        type: 1,
        ...resource,
      });
    }
    if (isSVGA) {
      svgaRef.value?.initSvga({
        url: 'https://sky-itcast-yujin.oss-cn-beijing.aliyuncs.com/mao.svga',
        loop: 0,
        width: 120,
        height: 120,
      });
    }
  });
};

// 常规和睡觉资源每10分钟切换 1000 10 60
const switchSleepAndNormal = () => {
  if (!isStatusNormal.value && !isStatusSleep.value) {
    return;
  }
  switchNormalAndSleepTimer.value = setTimeout(() => {
    if (isStatusNormal.value && switchTimes.value % 2 == 0) {
      petManorInfo.value.pet_list[0].status = 2;
    } else {
      petManorInfo.value.pet_list[0].status = 0;
    }
    switchTimes.value += 1;
    dialogTextNormalIdx.value = 0;
    changeResource();
    clearNormalAndSleepTimer();
    switchSleepAndNormal();
  }, 600000);
};

const handleClose = () => {
  console.log('[history >]', window.history);
  if (isVisitedOther.value && from_top.value) {
    // return
    window.history.back();
    return;
  }
  const params = {
    // params用于给安卓指令用的 - 不携带参数 - 安卓接收不到指令
    type: 'back',
  };
  const backText = isIosFun() === true ? 'js_sync_back' : 'js_app_back';
  js_sync_app(backText, params, 'type');
};

// 前端设置成长值
// const setExpFE = (exp,endTimeSec) => {
//   var timestampSeconds = Math.floor(Date.now() / 1000);
//   console.log(timestampSeconds,endTimeSec,"exp========",endTimeSec - timestampSeconds)
//   if(timestampSeconds >= endTimeSec){
//     return exp
//   }
//   return exp + (endTimeSec - timestampSeconds) * 20
// }

// 获取宠物庄园信息
const getPetManorInfo = async () => {
  const ret = await petManor({
    user_id: visited_user_id.value > 0 ? visited_user_id.value : userStore.userInfo.id,
    isRaw: true,
  }).catch((err) => {});
  let res = ret.data;
  console.log('getPetManorInfo >', res);
  if (!res) {
    return;
  }
  petManorInfo.value = { ...res };
  // 测试代码
  let baseUrl = 'https://sky-itcast-yujin.oss-cn-beijing.aliyuncs.com/';
  if (res.pet_list.length > 0 && process.env.NODE_ENV == 'development') {
    res.pet_list[0].click_json = baseUrl + '1-click.json';
    res.pet_list[0].click_url = baseUrl + '1-click.mp4';

    res.pet_list[0].default_json = baseUrl + '1-default.json';
    res.pet_list[0].default_url = baseUrl + '1-default.mp4';

    res.pet_list[0].hunger_json = baseUrl + '1-hungry.json';
    res.pet_list[0].hunger_url = baseUrl + '1-hungry.mp4';

    res.pet_list[0].sleep_json = baseUrl + '1-sleep.json';
    res.pet_list[0].sleep_url = baseUrl + '1-sleep.mp4';

    res.pet_list[0].dine_json = baseUrl + '1-eatting.json';
    res.pet_list[0].dine_url = baseUrl + '1-eatting.mp4';
    // res.pet_list[0].dine_json = baseUrl + 'v-default-v1.json';
    // res.pet_list[0].dine_url = baseUrl + 'v-default-v1.mp4';
    // res.pet_list[0].dine_json = baseUrl + 'v-default-v5.json';
    // res.pet_list[0].dine_url = baseUrl + 'v-default-v5.mp4';
  }
  if (res.pet_list.length > 0 && res.pet_list[0].fodder > 0) {
    ts.value = ret.ts;
  }
  if (res.pet_list.length > 0) {
    if (res.pet_list[0].current_value > 0) {
      initResource();
      isFirstFeed.value = false;
      switchSleepAndNormal(); //常规/睡觉状态10min切换
      // res.pet_list[0].current_value = setExpFE(res.pet_list[0].current_value,res.pet_list[0].dine_end_time)
    } else {
      isFirstFeed.value = true;
    }
    checkEatting(); //进食状态逻辑
    console.log(isFirstFeed.value);
  } else {
    isFirstFeed.value = false;
  }
};

const changeVisible = async (visible) => {
  shopVisible.value = visible;
};

// 开启商城
const openStore = () => {
  // shopVisible.value = true;
  storeRef.value?.getPets();
};

// 开启规则弹窗
const openRule = () => {
  ruleRef?.value.setVisible(true);
};

// 宠物档案
const openPetInfo = () => {
  // if (!hasPet.value) {
  //   showToast('还没有宠物哦，快去商店看看吧～');
  //   return;
  // }
  if (currentPet.value) {
    console.log('[openPetInfo >]', petResource.value, petResourceConfig.value);
    infoRef.value?.getPetInfo(currentPet.value, petResource.value, petResourceConfig.value);
  } else {
    infoRef.value?.getPetInfo(currentPet.value);
  }
};

// 宠物排行榜
const openRanking = () => {
  rankRef.value?.getPetRanking();
};

// 宠物经验记录
const openExpLog = () => {
  if (isVisitedOther.value) {
    return;
  }
  expRef.value?.getLogList();
};

// 宠物更名
const changeName = (bool) => {
  editNameRef.value?.setVisible(currentPet.value);
};

// 宠物跟随
const setFollow = async () => {
  if (!hasPet.value) {
    showToast('还没有宠物哦，快去商店看看吧～');
    return;
  }
  const user_pet_id = currentPet.value.id;
  const is_carry = currentPet.value.is_carry;
  const res = await setPetFollow({
    user_pet_id,
    is_carry: is_carry === 0 ? 1 : 0,
  });
  if (!res) {
    return;
  }
  petManorInfo.value.pet_list[0].is_carry = is_carry === 0 ? 1 : 0;
  // 振动1秒
  // if (isSupportVibrate.value) {
  //   window.navigator.vibrate(1000);
  // }
  showToast(`${is_carry === 0 ? '开启' : '关闭'}宠物跟随`);
};

// 宠物喂养
const feed = () => {
  if (!hasPet.value) {
    showToast('还没有宠物哦，快去商店看看吧～');
    return;
  }
  feedRef.value?.setVisible(true);
  feedRef.value?.setPetInfo(currentPet.value);
};

const setIdx = (idx, dialogArr) => {
  if (idx < dialogArr.length - 1) {
    dialogTextNormalIdx.value += 1;
  } else {
    dialogTextNormalIdx.value = 0;
  }
};

const getIndex = (idx, arr) => {
  if (idx < arr.length - 1) {
    idx += 1;
  } else {
    idx = 0;
  }
  return idx;
};

// 宠物文案-10秒消失/轮播切换
const petDialogText = computed(() => {
  // 没宠物的状态
  if (!hasPet) {
    return '还没有宠物哦，快去商店看看吧～';
  } else if (currentPet.value.current_value === 0) {
    // 初始状态
    return currentPet.value['init_text'][0];
  } else {
    // let idx = dialogTextNormalIdx.value ?? 0;
    // let dialogArr = currentPet.value[statusTextMap[currentPet.value.status]];
    // // 常规状态下自动轮询气泡
    // if (normalTextTimer.value) {
    //   clearNormalTxtTimer();
    // }
    // // 常规状态下 气泡10秒切换一次
    // if (isStatusNormal.value) {
    //   console.log('isStatusNormal.value');
    //   normalTextTimer.value = setInterval(() => {
    //     setIdx(idx, dialogArr);
    //   }, 10000);
    // } else {
    //   console.log('非常规状态下');
    //   // clearNormalTxtTimer();
    //   // setIdx(idx, dialogArr);
    // }
    if (isStatusNormal.value) {
      normalTextTimer.value = setInterval(() => {
        clearNormalTxtTimer();
        setIdx(dialogTextNormalIdx.value, currentDialogArr.value);
      }, 10000);
      return currentDialogArr.value[dialogTextNormalIdx.value];
    } else {
      return null;
    }
  }
});

const petText = ref('');

const getPetText = () => {
  if (isStatusNormal.value) {
    // 点击状态/常规状态文案
    changeTextIndex();
    return clickTextArr.value[dialogTextClickIdx.value];
  } else if (isStatusEating.value) {
    changeTextIndex();
    return currentDialogArr.value[dialogTextEattingIdx.value];
  } else if (isStatusSleep.value) {
    changeTextIndex();
    return currentDialogArr.value[dialogTextSleepIdx.value];
  } else if (isStatusHungry.value) {
    changeTextIndex();
    return currentDialogArr.value[dialogTextHungryIdx.value];
  }
};

// 改变气泡文本
const changeTextIndex = () => {
  if (isStatusNormal.value) {
    // dialogTextNormalIdx.value = getIndex(dialogTextNormalIdx.value, currentDialogArr.value);
    dialogTextClickIdx.value = getIndex(dialogTextClickIdx.value, currentDialogArr.value);
  }
  if (isStatusEating.value) {
    dialogTextEattingIdx.value = getIndex(dialogTextEattingIdx.value, currentDialogArr.value);
  }
  if (isStatusSleep.value) {
    dialogTextSleepIdx.value = getIndex(dialogTextSleepIdx.value, currentDialogArr.value);
  }
  if (isStatusHungry.value) {
    dialogTextHungryIdx.value = getIndex(dialogTextHungryIdx.value, currentDialogArr.value);
  }
};

const toast = throttle(() => {
  toastPet();
}, 500);

// 触碰宠物-切换资源和展示文案(轮播、倒计时),普通状态常驻
const toastPet = () => {
  // svgaRef.value?.setSvgaConfig({
  //   url: 'https://sky-itcast-yujin.oss-cn-beijing.aliyuncs.com/l1.svga',
  //   loop: 1,
  //   width: 120,
  //   height: 120,
  //   playEnd: () => {
  //     console.log('切换结束');
  //     changeResource();
  //   },
  // });
  // return;
  console.log('toast================');
  petText.value = getPetText();
  console.log(petText.value);
  // 立即切换文本
  if (dialogTextTimer.value) {
    clearDialogTimer();

    // return;
  }
  // 文案轮播
  popDialogVisible.value = true;
  dialogTextTimer.value = setTimeout(() => {
    clearDialogTimer();
    popDialogVisible.value = false;
  }, 10000);
  // 初始化状态,资源不变
  if (currentPet.value.current_value === 0) {
    return;
  }
  // 普通状态下点击动作，切换资源
  if (isStatusNormal.value) {
    console.log(isStatusNormal.value, 'isStatusNormal.value==========');
    vapRef.value?.setConfig({
      src: prependHttpIfMissing(currentPet.value.click_url),
      config: prependHttpIfMissing(currentPet.value.click_json),
      loop: false,
      type: 1,
      vapPlayEnd: () => {
        console.log('切换结束');
        changeResource();
      },
    });
  }
};

// 清空所有计时器
const clearAllTimer = () => {
  clearNormalTxtTimer();
  clearDialogTimer();
  clearExpGrowthTimer();
  clearNormalAndSleepTimer();
};

// hook使用
// useHandleData(true, () => {
//   getPetManorInfo();
// });

// 页面初始化
onMounted(() => {
  console.log("pre---==============")
  window.scrollTo({
    left: 130,
    behavior: 'smooth',
  });
  clearAllTimer();
  getUserInfo();
  loadCloudAnimation();
  getPetManorInfo();

  // preLoadResource();
});

// 宠物进食状态逻辑,倒计时/百分比
onUnmounted(() => {
  clearAllTimer();
});
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'feedNum';
  src: url('@/assets/file/pet-cat-farm/feedNum.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
@keyframes scaleShape {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}
@keyframes dialogMove {
  0% {
    transform: translate(-50%, -10px);
  }
  100% {
    transform: translateX(-50%, 10px);
  }
}

@keyframes cloudMoveL {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(1000px);
  }
}

@keyframes cloudMoveR {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-1000px);
  }
}

@keyframes initAnimate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(8deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.cloud:nth-child(2) {
  left: 20%;
  animation-delay: 2s;
}
.cloud:nth-child(3) {
  left: 40%;
  animation-delay: 4s;
}
.cloud:nth-child(4) {
  left: 60%;
  animation-delay: 6s;
}
.cloud:nth-child(5) {
  left: 80%;
  animation-delay: 8s;
}
.container ::-webkit-scrollbar {
  display: none;
}

.container {
  position: absolute;
  color: #fff;
  height: 100vh;
  width: 1220px;
  background: url('@/assets/images/pet-cat-farm/container-box.webp') center center / cover no-repeat transparent;
  ::-webkit-scrollbar {
    display: none;
  }

  .header-box {
    height: 88px;
    width: 100vw;
    // position: relative;
    position: fixed;
    top: 86px;
    left: 0;
    .back-btn {
      position: absolute;
      // position: fixed;
      left: 34px;
      top: 50%;
      transform: translateY(-50%);
      width: 48px;
      height: 48px;
      background: url('@/assets/images/pet-cat-farm/back-icon.webp') center center / cover no-repeat transparent;
    }
    // display: flex;
    // align-items: center;
    .header-title {
      text-align: center;
      font-size: 32px;
      font-weight: 400;
      line-height: 88px;
    }
  }
  .cloud-container {
    position: absolute;
    top: 20%;
    left: 0;
    width: 100%;
    height: 250px;
    .cloud-left {
      position: absolute;
      left: 0;
      top: 0;
      width: 180px;
      height: 180px;
      background: url('@/assets/images/pet-cat-farm/cloud-left.webp') center center / cover no-repeat transparent;
      animation-name: cloudMoveL;
      animation-duration: 25s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
    .cloud-right {
      position: absolute;
      right: 0;
      bottom: 20px;
      width: 110px;
      height: 110px;
      background: url('@/assets/images/pet-cat-farm/cloud-right.webp') center center / cover no-repeat transparent;
      animation-name: cloudMoveR;
      animation-duration: 40s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
  }
  .pet-info-container {
    position: fixed;
    top: 220px;
    left: 49px;
    // 宠物名称和等级
    .pet-info-box {
      background-color: rgba(255, 255, 255, 0.8);
      width: 288px;
      height: 88px;
      backdrop-filter: blur(2px);
      stroke-width: 2px;
      border-radius: 28px;
      padding: 3px 30px 3px 100px;
      margin-bottom: 17px;
      position: relative;
      .avatar {
        width: 138px;
        height: 138px;
        background: linear-gradient(180deg, rgba(255, 207, 151, 1), rgba(250, 91, 91, 1));
        background: url('@/assets/images/pet-cat-farm/my-avatar-ring.webp') center center / cover no-repeat transparent !important;
        position: absolute;
        bottom: -8px;
        left: -38px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        img {
          display: block;
          margin-top: 18px;
          border-radius: 50%;
          width: 98px !important;
          height: 98px !important;
          z-index: -1;
        }
      }
      .pet-info {
        color: #ec440e;
        font-size: 28px;
        min-width: 140px;
        .name {
          font-family: 'PingFang SC';
          font-weight: 600;
          text-align: left;
          white-space: nowrap;
        }
        .exp {
          span {
            font-size: 24px;
          }
          font-family: 'PingFang SC';
          font-weight: 500;
          text-align: left;
        }
      }
    }
    .pet-exp-box {
      width: 290px;
      height: 30px;
      border-radius: 38px;
      background: #b0f7ffff;
      border: 1px solid #fff;
      position: relative;
      padding: 1px 3px;
      margin-left: 28px;
      transform: translateX(-20px);
      .pet-exp-star {
        position: absolute;
        top: 50%;
        left: -40px;
        transform: translateY(-50%);
        width: 52px;
        height: 52px;
        z-index: 3;
        background: url('@/assets/images/pet-cat-farm/pet-exp-star.webp') center center / cover no-repeat transparent;
      }
      .pet-exp-progress {
        height: 99%;
        border-radius: 38px;
        // background: linear-gradient(180deg, #ff8d51 0%, #f00 100%);
        background: #fed916;
        z-index: 3;
      }
      .pet-exp-text {
        color: #ec440e;
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .pet-info-box:active {
    transform: scale(0.9);
    transition: transform 0.1s linear;
  }

  .rule-btn {
    position: fixed;
    left: 0;
    top: 400px;
    width: 65px;
    height: 103px;
    background: url('@/assets/images/pet-cat-farm/rule_btn.webp') center center / cover no-repeat transparent;
  }
  .feed-container {
    position: absolute;
    bottom: 26.3%;
    right: 50%;
    transform: translateX(250%);
    min-height: 46px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .timer-box {
      height: 46px;
      flex-shrink: 0;
      border-radius: 58px;
      background: #00000080;
      position: absolute;
      top: -40%;
      left: -0%;
      display: flex;
      align-items: center;
      padding: 6px 8px;
      .timer-icon {
        width: 34px;
        height: 34px;
        background: url('@/assets/images/pet-cat-farm/timer-icon.webp') center center / cover no-repeat transparent;
        margin-right: 7px;
      }
      .timer-count {
        :deep(.van-count-down) {
          white-space: nowrap;
          width: auto;
          font-size: 23px;
          font-weight: 500;
          letter-spacing: 1px;
          color: #fff;
          display: flex;
        }
      }
    }
    .food-img {
      width: 120px;
      height: 120px;
      // background: url('@/assets/images/pet-cat-farm/food-empty.webp') center center / cover no-repeat transparent;
    }
    .food-progress-box {
      width: 160px;
      height: 30px;
      border-radius: 38px;
      background: #fff;
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 3px;
      .food-progress-text {
        font-size: 23px;
        position: absolute;
        color: #242424;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .food-progress-bar {
        height: 80%;
        width: 50%;
        border-radius: 38px;
        background: linear-gradient(180deg, #ff8d51 0%, #f00 100%), linear-gradient(180deg, #ff6060 0%, #993939 100%);
      }
    }
  }

  .right-btn {
    z-index: 1;
    position: fixed;
    width: 150px;
    height: 150px;
    background: grey;
  }
  .pet-btn:active {
    transform: scale(0.9);
    transition: transform 0.1s linear;
  }

  .right-pet-shop {
    background: url('@/assets/images/pet-cat-farm/pet-shop-btn.webp') no-repeat center;
    background-size: 100% 100%;
    // top: 154px;
    top: 204px;
    right: 14px;
  }
  .right-pet-information {
    background: url('@/assets/images/pet-cat-farm/pet-information-btn.webp') no-repeat center;
    background-size: 100% 100%;
    // top: 308px;
    top: 358px;
    right: 14px;
  }
  .right-pet-ranklist {
    background: url('@/assets/images/pet-cat-farm/pet-ranking-btn.webp') no-repeat center;
    background-size: 100% 100%;
    // top: 456px;
    top: 506px;
    right: 14px;
  }

  .follow-btn {
    z-index: 1;
    position: fixed;
    width: 166px;
    height: 166px;
    bottom: 68px;
    left: 35px;
  }
  .follow-btn.open {
    background: url('@/assets/images/pet-cat-farm/follow-btn-on.webp') center center / cover no-repeat transparent;
  }
  .follow-btn.close {
    background: url('@/assets/images/pet-cat-farm/follow-btn-off.webp') center center / cover no-repeat transparent;
  }
  .feed-btn {
    z-index: 1;
    position: fixed;
    width: 148px;
    height: 162px;
    bottom: 72px;
    right: 45px;
    background: url('@/assets/images/pet-cat-farm/feed-btn.webp') center center / cover no-repeat transparent;
    .food-num-text {
      position: absolute;
      min-width: 58px;
      height: 32px;
      border-radius: 20px;
      background-color: rgba($color: #fdb400, $alpha: 0.8);

      padding: 0 20px;
      top: -14px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 28px;
      color: #fff;
      font-weight: bolder;
      // font-family: feedNum;
      // -webkit-text-stroke: .5px #4B2814;
      // text-stroke: .5px #4B2814;
      font-family: 'PingFang SC';
      line-height: 32px;
      // background: #b64643 top left / 100% 100%;
      // -webkit-background-clip: text;
      // word-spacing: 1px;
      // letter-spacing: 1px;
    }
  }
  .no-pet-box {
    position: absolute;
    bottom: 15%;
    left: 50%;
    transform: translateX(-50%);
    width: 255px;
    height: 278px;
    .no-pet-dialog {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -70px;
    }
    .no-pet-img {
      width: 255px;
      height: 278px;
      background: url('@/assets/images/pet-cat-farm/no-pet-status.webp') center center / cover no-repeat transparent;
    }
    .dialog-pop {
      width: 365px !important;
      max-width: 365px !important;
    }
  }
  .init-pet-box {
    transform: translateX(-50%);
  }
  .initPetCanvas {
    background: url('@/assets/images/pet-cat-farm/egg-pet-status.webp') center center / cover no-repeat transparent;
    width: 255px;
    height: 278px;
    animation: initAnimate 1.5s linear infinite;
  }
  .pet-egg-shadow {
    transform: translateY(-55px);
    background: url('@/assets/images/pet-cat-farm/egg-pet-shadow.webp') center center / cover no-repeat transparent;
    width: 255px;
    height: 77px;
  }
  .dialog-pop {
    max-width: 361px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60px;
    max-height: 242px;
    padding: 5px 10px;
    position: relative;
    border-radius: 35px;
    background: #ff9900;
    position: absolute;
    border-radius: 34px;
    top: 0;
    left: 0;
    font-size: 24px;
    // animation-name: scaleShape;
    animation-name: dialogMove;
    animation-duration: 2s;
    animation-direction: alternate;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  .dialog-pop-disable::before {
    content: '';
    border: 0;
  }
  .dialog-pop::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    /* 箭头靠下边 */
    left: 50%;
    bottom: -13px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 15px solid #ff9900;
  }
  .position {
    top: -20px !important;
    // top: 70px!important;
  }
}
#cloudAnimate {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  // max-width: 800px;
  // max-width: 100%;
  height: 100vh;
  z-index: 9999;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: #00c9ee;
}

// @media (min-width: 800px) {
#cloudAnimate {
  width: 100vw !important;
  :deep(canvas) {
    width: 100% !important;
    height: 100% !important;
    transform: scaleX(1.01) !important;
  }
}
// }

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
      background: url('@/assets/images/week-star/anniversary_back.png') no-repeat center;
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
        height: 3900px;
      }
    }
  }
  // :deep(.van-popup--center){
  //   margin: 0!important
  // }
}

.pet-btn:active {
  transform: scale(0.9);
  transition: transform 0.1s linear;
}
.progress-bar {
  visibility: hidden;
}
*::-webkit-scrollbar {
  display: none;
  background: pink;
  background-color: yellow;
}

* {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE/Edge */
  user-select: none; /* 标准语法 */
}

#petCanvas {
  :deep(canvas) {
    transform: scale(0.6) !important;
  }
}
</style>
