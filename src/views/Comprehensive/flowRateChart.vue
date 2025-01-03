<template>
  <BasePanel title="实时流量监测" :width="320" :height="260">
    <Echarts class="chart_box" :option="options" />
  </BasePanel>
</template>
<script setup lang="ts">
import BasePanel from '@/components/BasePanel/BasePanel.vue'
import { reactive, onMounted, onUnmounted } from 'vue'
import Echarts from '@/components/sencePanel/common/Echarts.vue'
import request from '@/utils/request'

const options = reactive({
  grid: {
    bottom: 32,
  },
  legend: {
    top: 26,
    itemWidth: 12,
    itemHeight: 6,

    itemStyle: {
      shadowColor: 'red',
      shadowBlur: 10,
    },
    textStyle: {
      color: '#ffffff',
      fontSize: 12,
      fontWeight: 'normal',
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
    },
  },
  color: ['rgba(255, 254, 120, 1)', 'rgba(38, 230, 255, 1)'],

  xAxis: {
    type: 'category',
    data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    axisLabel: {
      //坐标轴上文字样式设置
      show: true, //显示x轴上的文字
      interval: 1, //x轴坐标的文字间隔
      fontSize: 10,
      fontWeight: 'normal',
      color: '#DADADA',
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    type: 'value',
    splitLine: {
      //坐标轴背景虚线
      show: true, //显示
      lineStyle: {
        //坐标轴背景线
        type: 'dashed', //虚线
        color: 'rgba(58, 65, 73, 1)',
      },
    },
    axisLabel: {
      //坐标轴上文字样式设置
      show: true, //显示x轴上的文字
      interval: 0, //x轴坐标的文字间隔
      fontSize: 10,
      fontWeight: 'normal',
      color: '#FFFFFF',
      opacity: 0.8,
    },
    nameLocation: 'end',
    nameTextStyle: {
      color: '#FFFFFF',
      fontSize: 10,

      align: 'center',
    },
  },
  series: [
    {
      name: '进水量',
      type: 'line',
      data: [3, 4, 5, 7, 8, 9, 3, 4],
      smooth: true,
      showSymbol: false,
    },
    {
      type: 'line',
      name: '出水量',
      data: [3, 3, 7, 4, 9, 10, 2.3, 4.3],
      smooth: true,
      showSymbol: false,
    },
  ],
})
let interval: any
onMounted(() => {
  getData()
  interval = setInterval(() => {
    getData()
  }, 60 * 1000)
})
onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})

const getData = async () => {
  const res: any = await request({
    method: 'get',
    url: '/ipes-data-aggregation-server/open/v1/zhongtu/flow-real-data',
  })
  if (res.code === '200') {
    options.xAxis.data = res.data.map((item: any) => item.time)
    options.series[0].data = res.data.map((item: any) => item.waterInflow)
    options.series[1].data = res.data.map((item: any) => item.waterYield)
  }
}
</script>
<style lang="scss">
.chart_box {
  width: 320px;
  height: 212px;
}
</style>
