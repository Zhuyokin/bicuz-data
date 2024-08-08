import { nextTick, reactive, ref } from 'vue'
import { prependHttpIfMissing } from '@/utils/index'
import { useUserStore } from '@/store'

class Pet {
  // 1.状态: 常规(休闲)、吃饭、睡觉、饥饿、点击动作

  // 2.文案
  // 文案的index
  initTxtIdx = 0 // 初始化文案
  defaultTxtIdx = 0 // 常规(休闲)文案
  dineTxtIdx = 0 // 吃饭文案
  hungryTxtIdx = 0 // 饥饿(衰减)文案
  clickTxtIdx = 0 // 点击文案
  sleepTxtIdx = 0 // 睡觉文案
  petIdx = 0 // 宠物序号1,2,3 1-主宠物 2-左侧宠物 3-右侧宠物
  dialogVisible = false // 文案的显示和隐藏
  clickTxt = null
  txt = null
  vapRef = null
  ts = 0
  catchStatus = '' // catchStatus = ['success','fail','']
  vapConfig = {}
  selected = false
  isProtect = false
  isPlaying = false
  // fodder = ref(0)
  /**
   * 规则:
   * a.无宠物
   * 1.常驻文案
   *
   * b.有宠物 exp = 0
   * 1.常驻文案
   *
   * c.有宠物 exp > 0
   * 1.常规(休闲)状态文案常驻显示且10秒轮播,点击切换文案
   * 2.其他状态点击立即切换文案,10秒轮播
   */

  /**
   * 3.喂养
   */
  statusUrlMap = {
    0: 'default_url',
    1: 'dine_url',
    2: 'sleep_url',
    3: 'hunger_url',
  }

  statusJsonMap = {
    0: 'default_json',
    1: 'dine_json',
    2: 'sleep_json',
    3: 'hunger_json',
  }

  statusTextMap = {
    0: 'default_text',
    1: 'dine_text',
    2: 'sleep_text',
    3: 'hunger_text',
  }

  /**
   * 4.进食
   */

  // 轮询定时器
  normalTxtTimer: Timeout | null = null
  clickTxtTimer: Timeout | null = null
  dialogTxtTimer: Timeout | null = null
  expGrowTimer: Timeout | null = null
  foodMinusTimer: Timeout | null = null
  caughtTimer: Timeout | null = null
  status
  petInfo = reactive({})
  dialogTxtVisible = false

  // 3.宽高
  constructor(petInfo: any, vapConfig: object, petIdx: number, ts: number) {
    this.petInfo = petInfo
    this.status = petInfo.status
    this.ts = ts
    this.vapConfig = vapConfig
    this.petIdx = petIdx
    this.initPet()
  }

  get isStatusInit() { // 是否为初始化状态,exp=0
    return [0].includes(this.petInfo.current_value)
  }

  get isStatusNormal() { // 是否为普通状态
    return [0].includes(this.status)
  }

  get isStatusSleep() { // 是否为睡觉状态
    return [2].includes(this.status)
  }

  get isStatusEating() { // 是否为进食状态
    return [1].includes(this.status)
  }

  get isStatusHungry() { // 是否为饥饿状态
    return [3].includes(this.status)
  }

  get updateLeftExp() { // 升级需要经验值
    return this.petInfo.end_value - this.petInfo.current_value
  }

  // 文案数组
  get currentDialogArr() {
    if (this.petInfo.current_value === 0)
      return this.petInfo.init_text

    return this.petInfo[this.statusTextMap[this.status]]
  }

  get clickTextArr() {
    return this.petInfo.click_text
  }

  get petResource() { // 升级需要经验值
    return prependHttpIfMissing(this.petInfo[this.statusUrlMap[this.petInfo.status]])
  }

  get petResourceConfig() { // 升级需要经验值
    return prependHttpIfMissing(this.petInfo[this.statusJsonMap[this.petInfo.status]])
  }

  // 卡片状态
  get isPetProtected() { // 升级需要经验值
    return this.petInfo.guard > 0
  }

  // 初始化宠物资源
  initPet() {
    this.clearAllTimer() // 初始化所有定时器
    this.vapConfig = {
      ...this.vapConfig,
      url: prependHttpIfMissing(this.petResource),
      json: prependHttpIfMissing(this.petResourceConfig),
    }

    if (this.isStatusNormal)
      this.dialogTxtVisible = true
    if (this.isStatusEating)
      this.startNormalTxtTimer()
    if (this.isStatusEating)
      this.eatting()
  }

  setVapRef(vapRef) {
    this.vapRef = vapRef
  }

  initPetResource() {
    if (this.vapRef) {
      this.vapRef?.initVap({
        src: prependHttpIfMissing(this.petResource),
        config: prependHttpIfMissing(this.petResourceConfig),
        width: 250,
        height: 250,
        loop: true,
        type: 3,
      })
    }
  }

  // 更改模型
  changePetResource(config?: any) {
    this.vapConfig = Object.assign(this.vapConfig, {
      url: prependHttpIfMissing(this.petResource),
      json: prependHttpIfMissing(this.petResourceConfig),
      width: 250,
      height: 250,
      loop: true,
      ...config,
    })
    this.isPlaying = false
  }

  setDefaultTxTIdx(idx, arr) {
    if (idx < arr.length - 1)
      this.defaultTxtIdx += 1
    else
      this.defaultTxtIdx = 0
  }

  // 轮播时拿到idx
  calArrNextIdx(index: number, arr: any[]) {
    const length = arr.length
    let idx = index
    if (idx < length - 1)
      idx += 1
    else
      idx = 0
    return idx
  }

  setClickStatusTxt() {
    // this.clickTxt = this.clickTextArr[this.clickTxtIdx]
    this.clickTxtIdx = this.calArrNextIdx(this.clickTxtIdx, this.clickTextArr)
  }

  // 其他状态10S消失,休闲状态10S轮询
  resloveStatusTxt(type?: string) {
    let txt = ''
    if (this.isStatusInit) { // 初始状态
      txt = this.currentDialogArr[this.initTxtIdx]
      this.initTxtIdx = this.calArrNextIdx(this.initTxtIdx, this.currentDialogArr)
    }
    if (this.isStatusNormal) {
      txt = this.currentDialogArr[this.defaultTxtIdx]
      this.defaultTxtIdx = this.calArrNextIdx(this.defaultTxtIdx, this.currentDialogArr)
    }
    if (this.isStatusEating)
      txt = this.currentDialogArr[this.dineTxtIdx]
    this.dineTxtIdx = this.calArrNextIdx(this.dineTxtIdx, this.currentDialogArr)

    if (this.isStatusSleep)
      txt = this.currentDialogArr[this.sleepTxtIdx]
    this.sleepTxtIdx = this.calArrNextIdx(this.sleepTxtIdx, this.currentDialogArr)

    if (this.isStatusHungry) {
      txt = this.currentDialogArr[this.hungryTxtIdx]
      this.hungryTxtIdx = this.calArrNextIdx(this.hungryTxtIdx, this.currentDialogArr)
    }

    if (type === 'get')
      return txt
  }

  // 文案
  getPetDialogText() {
    if (!this.petInfo) {
      return '还没有宠物哦，快去商店看看吧～'
    }
    else if (this.petInfo.current_value === 0) {
      return this.petInfo.init_text[0]
    }
    else {
      let idx = 0
      if (this.isStatusInit)
        idx = this.initTxtIdx
      if (this.isStatusNormal)
        idx = this.defaultTxtIdx
      if (this.isStatusSleep)
        idx = this.sleepTxtIdx
      if (this.isStatusEating)
        idx = this.dineTxtIdx
      if (this.isStatusHungry)
        idx = this.hungryTxtIdx
      return this.currentDialogArr[idx]
    }
  }

  changeExp() {
    this.petInfo.current_value += 20
    this.petInfo.fodder -= 20
    this.ts += 1000
  }

  // 萌宠进食
  eatting() {
    this.changePetResource()
    this.clearExpGrowTimer()
    this.expGrowTimer = setInterval(() => {
      this.changeExp()
      // 前端维护喂养升级,不请求
      const curPet = this.petInfo
      if (this.petInfo.end_value - this.petInfo.current_value <= 0) {
        const nextInfo = this.petInfo.next_level
        // 升级则替换素材
        this.petInfo = { ...curPet, ...nextInfo, next_level: nextInfo }
        this.petInfo.current_value = nextInfo.start_value - 1
        this.petInfo.start_value = nextInfo.start_value - 1
        this.petInfo.end_value = nextInfo.end_value
        this.petInfo.level = nextInfo.level
      }
      else if (this.petInfo.current_value >= 1200 && this.petInfo.current_value < 1220 && this.petInfo.level === 1) {
        // 初始状态喂养切换形态不重新进入页面
        this.changePetResource()
      }
      if (this.petInfo.fodder <= 0 || this.petInfo.dine_end_time * 1000 + 1000 < this.ts) {
        console.log('eattingEnd========================')
        if (this.petInfo.current_value < 1200 && this.petInfo.level === 1)
          this.petInfo.current_value = 1200

        // this.onEatEnd()
        this.petInfo.status = 2
        this.changePetResource()
        this.clearExpGrowTimer()
      }

      // if (
      //   // 吃完检测,时间戳
      //   // petManorInfo.value.pet_list[0].fodder < 0 &&
      //   currentPet.value.dine_end_time * 1000 + 1000 < new Date().getTime()
      //   && currentPet.value.dine_end_time * 1000 + 1000 < ts.value && false
      // ) {
      //   clearExpGrowthTimer()

      //   ts.value = 0
      //   // getPetManorInfo()
      // }
    }, 1000)
  }

  onEatEnd() {
    this.emit('onEatEnd')
  }

  // 喂养宠物
  feed() {

  }

  startNormalTxtTimer() {
    this.clearNormalTxtTimer()
    this.normalTxtTimer = setInterval(() => {
      // this.setDefaultTxTIdx(this.defaultTxtIdx, this.currentDialogArr)
      const length = this.currentDialogArr.length
      const idx = this.defaultTxtIdx
      if (idx < length - 1)
        this.defaultTxtIdx = idx + 1
      else
        this.defaultTxtIdx = 0
    }, 10000)
  }

  clearNormalTxtTimer() {
    clearInterval(this.normalTxtTimer)
    this.normalTxtTimer = null
  }

  clearDialogTimer() {
    clearTimeout(this.dialogTxtTimer)
    this.dialogTxtTimer = null
  }

  clearExpGrowTimer() {
    clearInterval(this.expGrowTimer)
    this.expGrowTimer = null
  }

  clearFoodMinusTimer() {
    clearInterval(this.foodMinusTimer)
    this.foodMinusTimer = null
  }

  clearClickTxtTimer() {
    clearInterval(this.clickTxtTimer)
    this.clickTxtTimer = null
  }

  clearCaughtTimer() {
    clearInterval(this.caughtTimer)
    this.caughtTimer = null
  }

  clearAllTimer() {
    this.clearNormalTxtTimer()
    this.clearDialogTimer()
    this.clearExpGrowTimer()
    this.clearFoodMinusTimer()
    this.clearClickTxtTimer()
    this.clearCaughtTimer()
  }

  // 宠物被点击
  toasted() {
    /**
     * 1.文案切换
     * 2.轮播倒计时
     * 3.常规状态切换模型
     */

    this.dialogTxtVisible = true
    if (this.isStatusNormal && !this.isStatusInit) {
      this.clickTxtIdx = this.calArrNextIdx(this.clickTxtIdx, this.clickTextArr)
      if (this.clickTxtTimer)
        this.clearClickTxtTimer()

      this.clickTxt = this.clickTextArr[this.clickTxtIdx]
      this.clearNormalTxtTimer()
      this.clickTxtTimer = setTimeout(() => {
        this.clickTxt = null
        this.startNormalTxtTimer()
      }, 10000)
    }
    else {
      this.dialogTxtVisible = true
      if (this.dialogTxtTimer) {
        this.clearDialogTimer()
        this.resloveStatusTxt()
      }
      this.dialogTxtTimer = setTimeout(() => {
        this.clearDialogTimer()
        this.resloveStatusTxt()
        this.dialogTxtVisible = false
      }, 10000)
    }
    if (this.isStatusNormal && !this.isStatusInit) {
      if (this.isPlaying)
        return
      this.isPlaying = true
      this.vapConfig = Object.assign(this.vapConfig, {
        url: prependHttpIfMissing(this.petInfo.click_url),
        json: prependHttpIfMissing(this.petInfo.click_json),
        width: 250,
        height: 250,
        loop: false,
        useType: 2,
        onEnded: () => {
          this.changePetResource()
        },
      })
      console.log('this.vapConfig=============1', this.vapConfig)
      // console.log(this.vapConfig)
      // // 更改模型
      // this.changePetResource({
      //   src: this.petInfo.click_url,
      //   config: this.petInfo.click_json,
      //   loop: false,
      //   type: 3,
      //   vapPlayEnd: () => {
      //     console.log('切换结束')
      //     this.changePetResource()
      //   },
      // })
    }
  }

  setCatchStatus(status: string) {
    this.catchStatus = status
  }

  setIsProtect(bool: boolean) {
    this.isProtect = bool
  }

  // 宠物被诱捕
  caught() {
    this.caughtTimer = setTimeout(() => {
      this.clearCaughtTimer()
      this.vapConfig = Object.assign(this.vapConfig, {
        url: null,
        json: null,
      })
    }, 3000)
  }

  // 暴击卡
  hit(newPetInfo) {
    const form = this.petInfo.form
    this.vapConfig = Object.assign(this.vapConfig, {
      url: prependHttpIfMissing(this.petInfo.strike_url),
      json: prependHttpIfMissing(this.petInfo.strike_json),
      loop: false,
      width: form <= 1 ? 285 : 250,
      height: form <= 1 ? 285 : 250,
      useType: 2,
      onEnded: () => {
        this.petInfo = { ...this.petInfo, ...newPetInfo }
        this.changePetResource({ width: 250, height: 250 })
      },
    })
  }
}

export default Pet
