<template>
  <BasePanel title="能耗走势" :width="320" :height="226">
    <Echarts class="chart_box" :option="options" />
  </BasePanel>
</template>
<script setup lang="ts">
import BasePanel from '@/components/BasePanel/BasePanel.vue'
import { reactive } from 'vue'
import Echarts from '@/components/sencePanel/common/Echarts.vue'

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
    data: [
      '0:00',
      '1:00',
      '2:00',
      '3:00',
      '4:00',
      '5:00',
      '6:00',
      '7:00',
      '8:00',
      '9:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
    ],
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
      data: [3, 4, 5, 7, 8, 9, 3, 4, 3, 4, 8, 2, 8, 3, 8, 1, 4, 5, 7, 8, 9, 3, 4, 3, 4],
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
</script>
<style lang="scss">
.chart_box {
  width: 320px;
  height: 196px;
}
</style>
