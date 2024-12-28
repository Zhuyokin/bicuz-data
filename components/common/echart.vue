<template>
  <div ref="chart" :style="{ width: '100%', height: '400px' }" />
</template>

<script lang="ts" setup>
import { defineProps, onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
})

const chart = ref(null)
let chartInstance: any = null

const initChart = () => {
  chartInstance = echarts.init(chart.value)
  chartInstance.setOption(props.options)
}

const resizeChart = () => {
  if (chartInstance)
    chartInstance.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  if (chartInstance)
    chartInstance.dispose()
})
</script>

<style lang="scss" scoped>
/* 你可以在这里添加样式 */
</style>
