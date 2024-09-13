<template>
  <BasePanel title="水质检测" :width="320" :height="260">
    <div class="chart_title">
      <li class="chart_item current_value">当前值</li>
      <li class="chart_item basic_value">标准值</li>
    </div>
  </BasePanel>
</template>
<script setup lang="ts">
import BasePanel from '@/components/BasePanel/BasePanel.vue'
</script>
<style lang="scss">
.chart_title {
  display: flex;
  align-items: center;
  justify-content: center;
  .chart_item {
    position: relative;
    font-weight: 400;
    font-size: 11px;
    color: #ffffff;
    line-height: 18px;
  }
  .current_value {
    &::before {
      content: '';
      position: absolute;
      width: 14px;
      height: 3px;
      background: #5480ff;
      border-radius: 2px;
    }
  }
  .basic_value {
    &::before {
      content: '';
      position: absolute;
      width: 14px;
      height: 3px;
      background: rgba(98, 214, 125, 1);
      border-radius: 2px;
      margin-left: 18px;
    }
  }
}
</style>
