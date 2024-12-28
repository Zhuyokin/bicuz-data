<template>
  <div>1</div>
</template>

<script setup lang="ts">
import { cryptoApi } from '@/api'
import type { Activity } from '@/api/interface/index'

const handleBack = () => {
  js_sync_back()
}

const getData = async () => {
  const res = await cryptoApi.getBaseInfo({}).catch((err: any) => {
    console.log(err)
  })
  console.log(res)
}

const initData = () => {
  getData()
}

onMounted(() => {
  console.log('[ 页面挂载 ] >')
  initData()
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
