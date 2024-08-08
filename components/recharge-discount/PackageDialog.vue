<template>
  <div class="dialog">
    <div class="dialog-content">
      <div class="close-btn cursor-pointer" @click="close" />

      <div class="shop-btn cursor-pointer" @click="buyPackage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { rechargeDiscountApi } from '@/api/index'
import { js_sync_app, prependHttpIfMissing } from '@/utils/index'
import { useUserStore } from '@/store'

const props = defineProps<{ userId?: number }>()
const emits = defineEmits(['init'])
const close = () => {
  emits('init')
}

// 去充值
const toCharge = () => {
  js_sync_app('js_sync_pay', props.userId)
}
const buyPackage = async () => {
  const userStore = useUserStore()
  const token = userStore.getToken
  const res = await rechargeDiscountApi.valueBuy({ token }).catch((err) => {
    // 余额不足
    if (JSON.parse(err).code === 3999) {
      setTimeout(() => {
        toCharge()
      }, 500)
    }
  })
  if (!res)
    return
  setTimeout(() => {
    showToast('购买成功')
    emits('init')
  }, 500)
}
</script>

<style lang="scss" scoped>
@keyframes scale {
  0%,
  100% {
    transform: scale(1) translateX(-50%);
  }

  50% {
    transform: scale(0.95) translateX(-50%);
  }
}
.dialog {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2002;
  background: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .dialog-content {
    position: relative;
    width: 588px;
    height: 661px;
    background: url('@/assets/images/recharge-discount/package-dialog.webp')
      center center / cover no-repeat transparent;
    .close-btn {
      width: 68px;
      height: 68px;
      background: url('@/assets/images/recharge-discount/close-btn.webp') center
        center / cover no-repeat transparent;
      position: absolute;
      right: -50px;
      top: -68px;
    }
    .shop-btn {
      position: absolute;
      width: 372px;
      height: 86px;
      background: url('@/assets/images/recharge-discount/shop-btn-dialog.webp')
        center center / cover no-repeat transparent;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%);
      animation: scale 1.1s linear infinite;
    }
  }
}
</style>
