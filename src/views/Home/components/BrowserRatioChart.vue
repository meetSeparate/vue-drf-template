<script setup>
import * as echarts from 'echarts'
import {ref, onMounted} from 'vue'

const browserChart = ref()
const initChart = () => {
  const myChart = echarts.init(browserChart.value)
  let option

  option = {
    title: {
      name: 'Proportion of Browsers',
      subtext: 'Fake Data',
      top: 10,
      left: 10
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      type: 'scroll',
      bottom: 10,
    },
    visualMap: {
      top: 'middle',
      right: 10,
      color: ['red', 'yellow'],
      calculable: true
    },
    radar: {
      indicator: [
        { name: 'IE8-'},
        { name: 'IE9+'},
        { name: 'Safari'},
        { name: 'Firefox'},
        { name: 'Chrome'}
      ]
    },
    series: (function () {
      let series = [];
      for (let i = 1; i <= 28; i++) {
        series.push({
          type: 'radar',
          symbol: 'none',
          lineStyle: {
            width: 1
          },
          emphasis: {
            areaStyle: {
              color: 'rgba(0,250,0,0.3)'
            }
          },
          data: [
            {
              value: [
                (40 - i) * 10,
                (38 - i) * 4 + 60,
                i * 5 + 10,
                i * 9,
                (i * i) / 2
              ],
              name: i + 2000 + ''
            }
          ]
        });
      }
      return series;
    })()
  }

  option && myChart.setOption(option)

}

onMounted(() => initChart())
</script>

<template>
  <div ref="browserChart" style="width: 100%; height: 35vh"></div>
</template>

<style scoped lang="scss">
</style>