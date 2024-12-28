<template>
  <div>
    <div>
      <EChart v-if="marketDominances" :options="chartOptions" />
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="home-o">
        标签
      </van-tabbar-item>
      <van-tabbar-item name="search" icon="search">
        标签
      </van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o">
        标签
      </van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o">
        标签
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { cryptoApi } from '@/api'
import EChart from '@/components/common/echart.vue'

const marketDominances = ref()
const active = ref('home')
const chartOptions = ref({
  title: {
    text: 'BTC市占比',
    subtext: '每日更新',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: '市占比',
      type: 'pie',
      radius: '50%',
      label: {
        formatter: '{b}: {d}%',
      },
      data: [
        { value: 0, name: 'BTC' },
        { value: 0, name: 'ETH' },
        { value: 0, name: 'USDT' },
        { value: 0, name: 'BNB' },
        { value: 0, name: 'USDC' },
        { value: 0, name: 'Other' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
})
const globalInfo = ref()

const getData = async () => {
  const res = await cryptoApi
    .getBaseInfo({})
    .catch((err: any) => console.log(err))
  console.log(res)
  globalInfo.value = res.data
  marketDominances.value = res.data.market_dominances
  chartOptions.value.series[0].data[0].value = Number.parseFloat(
    (res.data.market_dominances.btc * 100).toFixed(2),
  )
  chartOptions.value.series[0].data[1].value = Number.parseFloat(
    (res.data.market_dominances.eth * 100).toFixed(2),
  )
  chartOptions.value.series[0].data[2].value = Number.parseFloat(
    (res.data.market_dominances.usdt * 100).toFixed(2),
  )
  chartOptions.value.series[0].data[3].value = Number.parseFloat(
    (res.data.market_dominances.bnb * 100).toFixed(2),
  )
  chartOptions.value.series[0].data[4].value = Number.parseFloat(
    (res.data.market_dominances.usdc * 100).toFixed(2),
  )
  chartOptions.value.series[0].data[5].value
    = Number.parseFloat((100
    - chartOptions.value.series[0].data[0].value
    - chartOptions.value.series[0].data[1].value
    - chartOptions.value.series[0].data[2].value
    - chartOptions.value.series[0].data[3].value
    - chartOptions.value.series[0].data[4].value).toFixed(2))
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
