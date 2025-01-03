<template>
  <BasePanel title="水质检测" :width="320" :height="404">
    <div class="chart_title">
      <li class="chart_item current_value">当前值</li>
      <li class="chart_item basic_value">标准值</li>
    </div>
    <div class="chart_list">
      <li class="chart_li" v-for="(item, index) in chartList" :key="index">
        <span class="text">{{ item.type }}</span>
        <span class="number">
          {{ item.actualValue }}<em class="unit">{{ item.unit }}</em>
        </span>
        <div class="progress_chart">
          <ProgressBar :percentage="item.actualPercents * 100" status="success"></ProgressBar>
          <ProgressBar style="margin-top: 10px" :percentage="item.standPercents * 100"></ProgressBar>
        </div>
      </li>
    </div>
  </BasePanel>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import BasePanel from '@/components/BasePanel/BasePanel.vue'
import ProgressBar from '@/views/Comprehensive/components/Progress.vue'
import request from '@/utils/request'

/* setInterval(() => {
  percentage.value += Math.random() * 5
}, 1000) */
const chartList = ref([])
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
    url: '/ipes-data-aggregation-server/open/v1/zhongtu/output-real-data',
  })
  if (res.code === '200') {
    res.data.forEach((item: any) => {
      const total = item.standardValue + item.actualValue
      item.standPercents = item.standardValue / total
      item.actualPercents = item.actualValue / total
    })
    chartList.value = res.data
  }
}
</script>
<style lang="scss">
.chart_title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  .chart_item {
    cursor: pointer;
    position: relative;
    font-weight: 400;
    font-size: 12px;
    color: #ffffff;
  }
  .current_value {
    &::before {
      content: '';
      position: absolute;
      left: -16px;
      top: 6px;
      width: 14px;
      height: 3px;
      background: #5480ff;
      border-radius: 2px;
    }
  }
  .basic_value {
    margin-left: 36px;
    &::before {
      content: '';
      position: absolute;
      width: 14px;
      height: 3px;
      left: -16px;
      top: 6px;
      background: rgba(98, 214, 125, 1);
      border-radius: 2px;
    }
  }
}
.chart_list {
  .chart_li {
    width: 296px;
    height: 46px;
    margin-left: 12px;
    margin-top: 14px;
    background-image: url('@/views/Comprehensive/images/bg_water-quality1.png');
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .text {
      flex-basis: 64px;
      font-weight: 400;
      font-size: 14px;
      color: #ffffff;
      text-align: center;
    }
    .number {
      text-align: right;
      flex-basis: 80px;
      color: rgba(0, 222, 255, 1);
      font-size: 20px;
      font-family: var(--font-family-number);
    }
    .unit {
      font-size: 12px;
      color: rgba(0, 222, 255, 1);
      font-family: var(--font-family-text);
      font-style: normal;
      margin-left: 2px;
    }
    .progress_chart {
      flex: 1;
      display: flex;
      margin-left: 24px;
      margin-right: 24px;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
