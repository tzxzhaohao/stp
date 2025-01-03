<template>
  <BasePanel title="滤池水位" :width="320" :height="250">
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

  xAxis: {
    type: 'category',
    data: ['调节池', '事故池水位', '生化池', '生化池水位'],
    axisLabel: {
      //坐标轴上文字样式设置
      show: true, //显示x轴上的文字
      interval: 0, //x轴坐标的文字间隔
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
      name: '低水位',
      type: 'bar',
      data: [3, 4, 5, 7],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(13, 195, 216, 1)' },
          { offset: 0.5, color: 'rgba(13, 195, 216, 0.5)' },
          { offset: 1, color: 'rgba(13, 195, 216, 0.1)' },
        ]),
      },
    },
    {
      name: '高水位',
      type: 'bar',
      data: [5, 7, 8, 9],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(217, 96, 96, 1)' },
          { offset: 0.5, color: 'rgba(217, 96, 96, 0.5)' },
          { offset: 1, color: 'rgba(217, 96, 96, 0.1)' },
        ]),
      },
    },
    {
      name: '正常水位',
      type: 'bar',
      data: [5, 7, 8, 9],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(8, 202, 119, 1)' },
          { offset: 0.5, color: 'rgba(8, 202, 119, 0.5)' },
          { offset: 1, color: 'rgba(8, 202, 119, 0.1)' },
        ]),
      },
    },
    {
      type: 'line',
      name: '平均水位',
      color: '#0062FF',
      data: [3, 3, 7, 4],
      symbol: 'pin',
      symbolSize: 10,
      itemStyle: {
        normal: {
          // 拐点上显示数值
          label: {
            show: true,
          },
          lineStyle: {
            // 使用rgba设置折线透明度为0，可以视觉上隐藏折线
            color: 'rgba(0,0,0,0)',
          },
        },
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
    url: 'ipes-data-aggregation-server/open/v1/zhongtu/water-line',
  })
  if (res.code === '200') {
    options.xAxis.data = res.data.map((it: any) => it.name)
    options.series[0].data = res.data.map((it: any) => it.lowLevel)
    options.series[1].data = res.data.map((it: any) => it.highLevel)
    options.series[2].data = res.data.map((it: any) => it.normalLevel)
    options.series[2].data = res.data.map((it: any) => it.averageLevel)
  }
}
</script>
<style lang="scss">
.chart_box {
  width: 320px;
  height: 212px;
}
</style>
