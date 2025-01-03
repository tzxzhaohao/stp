<template>
  <BasePanel title="能耗走势" :width="320" :height="226">
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
    top: 30,
  },

  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
    },
  },
  color: ['rgba(4, 207, 240, 1)'],

  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      //坐标轴上文字样式设置
      show: true, //显示x轴上的文字
      interval: 2, //x轴坐标的文字间隔
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
    name: '(kWh)',

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

      align: 'right',
    },
  },
  series: [
    {
      type: 'line',
      data: [],
      smooth: true,
      showSymbol: false,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(4, 207, 240, 0.02)',
          },
          {
            offset: 1,
            color: 'rgba(4, 207, 240, 0.2)',
          },
        ]),
      },
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
    url: '/ipes-data-aggregation-server/open/v1/zhongtu/energy-trend',
  })
  if (res.code === '200') {
    options.xAxis.data = res.data.map((item: any) => item.time)
    options.series[0].data = res.data.map((item: any) => item.elecConsumption)
  }
}
</script>
<style lang="scss">
.chart_box {
  width: 320px;
  height: 196px;
}
</style>
