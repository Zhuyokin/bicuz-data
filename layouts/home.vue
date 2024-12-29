<template>
  <div class="home py-5">
    <van-watermark
      content="bicuz.com"
      z-index="1"
    />
    <div class="mb-5">
      <div class="num-font px-3 text-2xl">
        市占率
      </div>
    </div>
    <van-grid :gutter="10" :column-num="3">
      <van-grid-item v-for="(item, index) in marketDominances" :key="index">
        <van-image
          v-if="index <= 4"
          width="50"
          height="50"
          :src="item[2]"
        />
        <div v-else class="num-font h-12 w-12 flex items-center justify-center text-xl">
          其他
        </div>
        <div class="num-font mt-3">
          {{ index === 5 ? `${(item[1]).toFixed(2)}%` : `${(item[1] * 100).toFixed(2)}%` }}
        </div>
      </van-grid-item>
    </van-grid>
    <div class="mt-10">
      <EChart v-if="marketDominances" :options="chartOptions" />
    </div>
    <!-- <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="home-o">
        市场
      </van-tabbar-item>
      <van-tabbar-item name="search" icon="search">
        资讯
      </van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o">
        标签
      </van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o">
        我的
      </van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>

<script setup lang="ts">
import { cryptoApi } from '@/api'
import EChart from '@/components/common/echart.vue'
import btc from '@/assets/images/data/market/BTC.png'
import eth from '@/assets/images/data/market/ETH.png'
import usdt from '@/assets/images/data/market/USDT.png'
import bnb from '@/assets/images/data/market/BNB.png'
import usdc from '@/assets/images/data/market/USDC.png'

const marketDominances = ref()
const marketImg = ref([btc, eth, usdt, bnb, usdc])
const active = ref('home')
const chartOptions = ref({
  title: {
    text: '市占率',
    subtext: '每日更新',
    left: 'center',
  },
  tooltip: {
    trigger: 'item', // 触发类型为 item
    formatter: '{d}%', // 自定义格式，包含名称、值和百分比
  },
  legend: {
    orient: 'vertical',
    right: 'right',
  },
  color: ['#e9983d', '#343535', '#509f7d', '#eabc4e', '#3e73c4', '#85bedb'],
  series: [
    {
      name: '市占率',
      type: 'pie',
      radius: '50%',
      label: {
        show: true, // 显示标签
        formatter: '{d}%', // 自定义格式
      },
      data: [
        { value: 0, name: 'BTC' },
        { value: 0, name: 'ETH' },
        { value: 0, name: 'USDT' },
        { value: 0, name: 'BNB' },
        { value: 0, name: 'USDC' },
        { value: 0, name: '其他' },
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
  marketDominances.value = Object.entries(res.data.market_dominances)
  marketDominances.value[0][2] = btc
  marketDominances.value[1][2] = eth
  marketDominances.value[2][2] = usdt
  marketDominances.value[3][2] = bnb
  marketDominances.value[4][2] = usdc
  marketDominances.value[5] = []
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
  marketDominances.value[5][0] = '其他'
  marketDominances.value[5][1] = chartOptions.value.series[0].data[5].value
  marketDominances.value[5][2] = null
  console.log('marketDominances.value >', marketDominances.value)
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
// @import './index.scss';
.home {
  background: #edeff8;
  width: 100vw;
  height: 100vh;
}
.num-font {
  color: #000;
  font-weight: bold;
}
</style>
