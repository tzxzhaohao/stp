<template>
  <BasePanel title="水质检测" :width="320" :height="404">
    <div class="chart_title">
      <li class="chart_item current_value">当前值</li>
      <li class="chart_item basic_value">标准值</li>
    </div>
    <div class="chart_list">
      <li class="chart_li" v-for="(item, index) in chartList" :key="index">
        <span class="text">{{ item.text }}</span>
        <span class="number">
          {{ item.currentValue }}<em class="unit">{{ item.unit }}</em>
        </span>
        <div class="progress_chart">
          <ProgressBar :percentage="60" status="success"></ProgressBar>
          <ProgressBar style="margin-top: 10px" :percentage="70"></ProgressBar>
        </div>
      </li>
    </div>
  </BasePanel>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import BasePanel from '@/components/BasePanel/BasePanel.vue'
import ProgressBar from '@/views/Comprehensive/components/Progress.vue'
const percentage = ref(3)
/* setInterval(() => {
  percentage.value += Math.random() * 5
}, 1000) */
const chartList = ref([
  {
    text: 'PH值',
    unit: '%',
    currentValue: 7.7,
    basicValue: 8.88,
  },
  {
    text: 'COD',
    unit: 'mg/L',
    currentValue: 18.52,
    basicValue: 8.88,
  },
  {
    text: '总磷',
    unit: 'mg/L',
    currentValue: 0.05,
    basicValue: 8.88,
  },
  {
    text: '总氮',
    unit: 'mg/L',
    currentValue: 0.05,
    basicValue: 8.88,
  },
  {
    text: '氨氮',
    unit: 'mg/L',
    currentValue: 0.05,
    basicValue: 8.88,
  },
])
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
