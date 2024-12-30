<template>
  <div class="container-box container">
    <div class="mb-5">
      <div class="num-font flex items-center justify-between px-3 text-2xl">
        <span>市场概况</span>
        <!-- <span class="flex items-center justify-between gap-2">
          <span class="text-xl color-#1f1f22">展示图表</span>
          <van-switch v-model="checked" size="20px" />
        </span> -->
      </div>
    </div>
    <van-grid class="mb-10" :gutter="10" :column-num="3">
      <van-grid-item>
        <div>加密货币</div>
        <div>{{ overview?.cryptos }} (个)</div>
      </van-grid-item>
      <van-grid-item>
        <div>交易所</div>
        <div>{{ overview?.exchanges }} (个)</div>
      </van-grid-item>
      <van-grid-item
        :class="[
          overview?.total_market_cap_change_percentage_24h > 0
            ? 'up-color'
            : 'down-color',
        ]"
      >
        <div>总市值</div>
        <div>
          {{ convertToTeraUnits(overview?.total_market_cap) }}($)
        </div>
        <div class="text-sm">
          <van-icon :name="covertNum(overview?.total_market_cap_change_percentage_24h) >= 0 ? 'arrow-up' : 'arrow-down'" />
          <span>{{ `${covertNum(overview?.total_market_cap_change_percentage_24h)}%` }}</span>
        </div>
      </van-grid-item>
      <van-grid-item
        :class="[
          overview?._24h_spot_volume_change_percentage_24h > 0
            ? 'up-color'
            : 'down-color',
        ]"
      >
        <div>现货日成交</div>
        <div>
          {{ convertToTeraUnits(overview?._24h_spot_volume) }}($)
        </div>
        <div class="text-sm">
          <van-icon :name="covertNum(overview?._24h_spot_volume_change_percentage_24h) > 0 ? 'arrow-up' : 'arrow-down'" />
          <span>{{ `${covertNum(overview?._24h_spot_volume_change_percentage_24h)}%` }}</span>
        </div>
      </van-grid-item>
      <van-grid-item
        :class="[
          overview?._24h_derivative_volume_change_percentage_24h > 0
            ? 'up-color'
            : 'down-color',
        ]"
      >
        <div>衍生品日成交</div>
        <div>
          {{ convertToTeraUnits(overview?._24h_derivative_volume) }}($)
        </div>
        <div class="text-sm">
          <van-icon :name="covertNum(overview?._24h_derivative_volume_change_percentage_24h) >= 0 ? 'arrow-up' : 'arrow-down'" />
          <span>{{ `${covertNum(overview?._24h_derivative_volume_change_percentage_24h)}%` }}</span>
        </div>
      </van-grid-item>
      <van-grid-item
        :class="[
          overview?.total_open_interest_change_percentage_24h > 0
            ? 'up-color'
            : 'down-color',
        ]"
      >
        <div>未平仓合约量</div>
        <div>
          {{ convertToTeraUnits(overview?.total_open_interest) }}($)
        </div>
        <div>
          <van-icon :name="covertNum(overview?.total_open_interest_change_percentage_24h) >= 0 ? 'arrow-up' : 'arrow-down'" />
          <span>{{ `${covertNum(overview?.total_open_interest_change_percentage_24h)}%` }}</span>
        </div>
      </van-grid-item>
    </van-grid>
    <!-- 市占率 -->
    <div class="mb-5">
      <div class="num-font flex items-center justify-between px-3 text-2xl">
        <span>市占率</span>
        <span class="flex items-center justify-between gap-2">
          <span class="text-xl color-#1f1f22">展示图表</span>
          <van-switch v-model="checked" size="20px" />
        </span>
      </div>
    </div>
    <van-grid class="mb-10" :gutter="10" :column-num="3">
      <van-grid-item v-for="(item, index) in marketDominances" :key="index">
        <van-image v-if="index <= 4" width="50" height="50" :src="item[2]" />
        <div
          v-else
          class="num-font h-12 w-12 flex items-center justify-center text-xl"
        >
          其他
        </div>
        <div class="num-font mt-3">
          {{
            index === 5
              ? `${item[1].toFixed(2)}%`
              : `${(item[1] * 100).toFixed(2)}%`
          }}
        </div>
      </van-grid-item>
    </van-grid>
    <div v-if="checked">
      <EChart v-if="marketDominances" :options="chartOptions" />
    </div>
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

const overview = ref()
const marketDominances = ref()
const marketImg = ref([btc, eth, usdt, bnb, usdc])
const checked = ref(false)

const chartOptions = ref({
  title: {
    text: '市占率',
    subtext: '每日更新',
    left: 'center',
  },
  tooltip: {
    trigger: 'item', // 触发类型为 item
    formatter: '{b}: {d}%', // 自定义格式，包含名称、值和百分比
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
        formatter: '{b}: {d}%', // 自定义格式
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
  // const res = {}
  // res.data = {
  //   cryptos: 18547,
  //   exchanges: 50,
  //   total_market_cap: '3313869258752',
  //   total_market_cap_change_percentage_24h: 0.009413489085095738,
  //   _24h_spot_volume: '44079142165.32416',
  //   _24h_spot_volume_change_percentage_24h: -0.26411316164321785,
  //   _24h_derivative_volume: '113437800491.0209',
  //   _24h_derivative_volume_change_percentage_24h: -0.25281977490644836,
  //   total_open_interest: '122875870323.0451',
  //   total_open_interest_change_percentage_24h: 0.006823938194245011,
  //   market_dominances: {
  //     btc: 0.5676988987712632,
  //     eth: 0.12361120548150231,
  //     usdt: 0.04188832484595517,
  //     bnb: 0.033020147005203115,
  //     usdc: 0.013165162474151665,
  //   },
  // }
  globalInfo.value = res.data
  overview.value = res.data
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
  chartOptions.value.series[0].data[5].value = Number.parseFloat(
    (
      100
      - chartOptions.value.series[0].data[0].value
      - chartOptions.value.series[0].data[1].value
      - chartOptions.value.series[0].data[2].value
      - chartOptions.value.series[0].data[3].value
      - chartOptions.value.series[0].data[4].value
    ).toFixed(2),
  )
  marketDominances.value[5][0] = '其他'
  marketDominances.value[5][1] = chartOptions.value.series[0].data[5].value
  marketDominances.value[5][2] = null
  console.log('marketDominances.value >', marketDominances.value)
}

const covertNum = (num: number) => {
  return Number.parseFloat((num * 100)?.toFixed(2))
}

const convertToTeraUnits = (numStr: string) => {
  // 将字符串转换为数字
  const num = Number.parseFloat(numStr)

  // 检查是否为有效数字
  if (isNaN(num))
    return '无效数字'

  // 转换为万亿单位
  const tera = num / 1e12 // 1e12 表示 10^12
  if (tera > 1) {
    // 格式化为两位小数的字符串
    return `${tera.toFixed(2)}T`
  }
  return `${(num / 1e10).toFixed(2)}B`
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
.container-box {
}
</style>
