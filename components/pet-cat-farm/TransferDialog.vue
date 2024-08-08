<template>
  <div id="transfer-confirm-dialog">
    <van-popup v-model:show="dialogVisible" @click-overlay="close">
      <div class="body" :class="[hasResult ? 'h598pxI' : 'h470pxI']" :style="`background:url(${hasResult ? transferBg2 : transferBg1})  center center / cover no-repeat transparent`">
        <div class="close cursor-pointer" @click="close" />
        <!-- 道具描述 -->
        <div class="desc">
          宠物转让后将由别的主人进行喂养 <br>
          你也可以前往Ta的庄园去照料
        </div>
        <!-- 搜索 -->
        <div v-if="!hasResult" class="search-box">
          <div class="search-container">
            <van-field
              v-model="searchKey"
              label-align="center"
              input-align="center"
              maxlength="10"
              placeholder="搜索用户ID"
              type="digit"
            />
            <!-- <div class="search-btn cursor-pointer" @click="search" /> -->
          </div>
        </div>

        <!-- 搜索结果 -->
        <div v-else class="search-ret-box">
          <div class="f_j_c_a_c pet">
            <div class="avatar" :style="`background:url(${prependHttpIfMissing(petInfo.pet_icon)})  center center / cover no-repeat transparent`" />
            <div class="name">
              {{ petInfo.name ? petInfo.name : petInfo.pet_name }}
            </div>
            <div class="level">
              等级：{{ petInfo.level ?? 1 }}
            </div>
          </div>
          <div class="transfer f_j_c_a_c">
            <div class="avatar" />
            <div class="icon" />
          </div>
          <div class="f_j_c_a_c user">
            <div class="avatar" :style="`background:url(${prependHttpIfMissing(toUserInfo?.user_face)})  center center / cover no-repeat transparent`" />
            <div class="name">
              {{ toUserInfo?.user_nickname }}
            </div>
            <div class="level">
              ID {{ toUserInfo?.user_number }}
            </div>
          </div>
        </div>
        <!-- 确认按钮 -->
        <div class="confirm" :style="`background:url(${hasResult ? confirmTransform : searchBtn})  center center / cover no-repeat transparent`" @click="confirm" />
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import confirmTransform from '@/assets/images/pet-cat-farm/confirm-transform.webp'
import searchBtn from '@/assets/images/pet-cat-farm/transfer-search-btn.webp'
import transferBg1 from '@/assets/images/pet-cat-farm/transfer-bg-setp1.webp'
import transferBg2 from '@/assets/images/pet-cat-farm/transfer-bg-setp2.webp'
import { petApi } from '@/api/index'

const props = defineProps<{
  petInfo: any
  type: any
}>()
const emit = defineEmits(['transferSuccess'])
const dialogVisible = ref(false)
const hasResult = ref(false)
const searchKey = ref(null)
const toUserInfo = ref(null)
const setVisible = (bool) => {
  dialogVisible.value = bool
}
const openDialog = (tool) => {
  console.log(tool)
  dialogVisible.value = true
}

const petInfo = computed(() => {
  return props.petInfo?.petInfo ? props.petInfo.petInfo : props.petInfo
})

const close = () => {
  searchKey.value = null
  hasResult.value = false
  setVisible(false)
}

const searchUser = async () => {
  const res = await petApi.searchRank({ user_number: searchKey.value }).catch((err) => {
    console.log(err)
  })
  if (!res)
    return
  toUserInfo.value = res
  hasResult.value = true
}

const getPetManorInfo = inject('getPetManorInfo')

const transfer = async () => {
  const res = await petApi.transferPet({ user_pet_id: petInfo.value.id, to_user_id: toUserInfo.value.user_id }).catch((err) => {
    console.log(err)
  })
  if (!res)
    return
  getPetManorInfo()
  showToast('转移成功')
  // emit('transferSuccess')
  close()
}

const buy = async () => {
  const res = await petApi.buyPet({ pet_id: petInfo.value.id, to_user_id: toUserInfo.value.user_id }).catch((err) => {
    console.log(err)
  })
  if (!res)
    return
  emit('transferSuccess')
  close()
}

// 搜索 、赠送
const confirm = () => {
  if (!hasResult.value) { searchUser() }
  else {
    if (props.type === 'buy') {
      buy()
    }
    else {
      // 赠送
      transfer()
    }
  }
}

watch(() => dialogVisible.value, (val) => {
  if (val)
    console.log(props.petInfo)
})

defineExpose<{ openDialog: (boolean) => void }>({ openDialog })
</script>

<style lang="scss" scoped>
#transfer-confirm-dialog {
  .h470pxI {
    height: 470px !important;
  }
  .h598pxI {
    height: 598px !important;
  }
  :deep(.van-cell) {
    // width: 73%;
    height: 70px;
    font-size: 28px;
    margin: 0 0 0 0px;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 !important;
    width: 686px !important;
    overflow: visible !important;
    height: auto;
    background: transparent;
    .body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 686px;
      height: 598px;
      padding: 38px 40px 0;
      font-size: 28px;
      color: #b43a04;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .close {
        position: absolute;
        top: -20px;
        right: 24px;
        width: 68px;
        height: 63px;
        background: url('@/assets/images/pet-cat-farm/pet-store-close.webp')
          center center / cover no-repeat transparent;
      }
      .desc {
        display: flex;
        align-items: center;
        min-width: 480px;
        height: 96px;
        font-size: 32px;
        font-weight: 500;
        color: #b43a04;
        margin: 0 32px;
        font-weight: 500;
      }
      .search-box {
        margin: 48px auto;
        .search-container {
          width: 606px;
          height: 70px;
          display: flex;
          align-items: center;
          background: #fff;
          border-radius: 35px;
          position: relative;
          .search-btn {
            width: 110px;
            height: 66px;
            background: url('@/assets/images/pet-cat-farm/transfer-search-user.webp')
              center center / cover no-repeat transparent;
            position: absolute;
            top: 50%;
            right: 1%;
            transform: translateY(-50%);
          }
        }
      }
      .search-ret-box {
        width: 474px;
        height: 228px;
        border-radius: 40px;
        background: #fff3de;
        margin: 24px auto 48px;
        padding: 22px 32px;
        display: flex;
        justify-content: space-between;
        .pet {
          color: #b43a04;
          .avatar {
            width: 90px;
            height: 90px;
            border-radius: 90px;
            background: pink;
            margin-bottom: 12px;
          }
          .name {
            font-size: 24px;
            font-weight: 500;
            margin-bottom: 5px;
          }
          .level {
            font-size: 22px;
            color: #b43a04;
          }
        }
        .transfer {
          .avatar {
            width: 110px;
            height: 110px;
            background: url('@/assets/images/pet-cat-farm/transform-icon.webp')
              center center / cover no-repeat transparent;
          }
          .icon {
            width: 44px;
            height: 44px;
            background: url('@/assets/images/pet-cat-farm/transform-to.webp')
              center center / cover no-repeat transparent;
          }
        }
        .user {
          color: #b43a04;
          .avatar {
            width: 90px;
            height: 90px;
            border-radius: 90px;
            background: pink;
            margin-bottom: 12px;
          }
          .name {
            font-size: 24px;
            font-weight: 500;
            margin-bottom: 5px;
          }
          .level {
            font-size: 22px;
          }
        }
        .f_j_c_a_c {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }
      .confirm {
        width: 414px;
        height: 106px;
      }
    }
  }
}
</style>
