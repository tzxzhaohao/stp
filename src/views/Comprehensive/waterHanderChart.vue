<template>
  <BasePanel title="环境质量" :width="320" :height="264">
    <ul class="menu_panel">
      <li class="water_bg">
        <span class="number">{{ handerData.in }}<em class="unit">m³</em></span>
        <span class="text">当日进水量</span>
      </li>
      <li class="water_bg">
        <span class="number">{{ handerData.in }}<em class="unit">m³</em></span>
        <span class="text">当日出水量</span>
      </li>
    </ul>
    <div class="total_message">
      <div class="total_rate">
        <span class="number">{{ handerData.rate }}<em class="unit">%</em></span> <span class="text">处理率</span>
      </div>
      <div class="total_text">
        <span class="text">累计处理水量</span>
        <span class="number">{{ handerData.rate }}<em class="unit">m³</em></span>
      </div>
    </div>
  </BasePanel>
</template>
<script setup lang="ts">
import BasePanel from '@/components/BasePanel/BasePanel.vue'
import { reactive } from 'vue'
const handerData = reactive({
  in: 120,
  out: 85,
  total: 136.24,
  rate: 90,
})
</script>
<style lang="scss">
.menu_panel {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 24px;

  .water_bg {
    width: 115px;
    height: 68px;
    background-image: url('@/views/Comprehensive/images/pic_water-treatment.png');
    background-size: cover;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .number {
    color: rgba(0, 222, 255, 1);
    font-family: var(--font-family-number);
    display: inline-block;
    height: 24px;
    line-height: 24px;
    font-size: 24px;
  }
  .unit {
    color: rgba(0, 222, 255, 1);
    font-family: var(--font-family-text);
    font-style: normal;
    padding-left: 2px;
    font-weight: 400;
    font-size: 18px;
  }
}
.total_message {
  margin-top: 20px;
  margin-left: 12px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-items: flex-start;
  .total_rate {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid #00ffff;
    background-image: url('@/views/Comprehensive/images/pic_rate.png');
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: var(--font-family-number);
    font-size: 20px;
    color: #00deff;
    .number,
    .unit {
      background: linear-gradient(0deg, #ffcc00 0%, #28f2e6 0%, #00ffff 0%, #baffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .unit {
      font-family: var(--font-family-text);
      font-style: normal;
      font-size: 12px;
    }
  }
  .total_text {
    flex: 1;
    height: 53px;
    background-image: url('@/views/Comprehensive/images/bg_water-yield.png');
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 20px;
    .number {
      font-family: var(--font-family-number);
      font-size: 20px;
      color: rgba(0, 222, 255, 1);
      margin-left: 26px;
    }
    .unit {
      color: rgba(0, 222, 255, 1);
      font-family: var(--font-family-text);
      font-style: normal;
      font-size: 12px;
      padding-left: 2px;
    }
  }
}
.text {
  font-family: var(--font-family-text);
  display: inline-block;
  margin-top: 4px;
  font-size: 14px;
  color: #ffffff;
}
</style>
