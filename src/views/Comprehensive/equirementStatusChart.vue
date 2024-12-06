<template>
  <BasePanel title="设备运行状态" :width="320" :height="184">
    <div class="equirement_status">
      <StatusCharts v-for="(item, index) in equirementStatusList" :key="index" :equirement-status="equirementStatusList[index]" />
    </div>
  </BasePanel>
</template>
<script setup lang="ts">
import BasePanel from '@/components/BasePanel/BasePanel.vue'
import StatusCharts from './statusCharts.vue'
import { reactive } from 'vue'
const equirementStatusList = [
  {
    name: '在线设备',
    index: 0,
    total: 30,
    value: 20,
  },
  {
    name: '离线设备',
    index: 1,
    total: 30,
    value: 5,
  },
  {
    name: '故障设备',
    index: 2,
    total: 30,
    value: 5,
  },
]
</script>
<style lang="scss">
.equirement_status {
  height: 144px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 28px;
}
</style>
