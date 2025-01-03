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
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import request from '@/utils/request'
const equirementStatusList = ref([
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
])

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
    url: '/ipes-data-aggregation-server/open/v1/zhongtu/device-real-status',
  })
  if (res.code === '200') {
    equirementStatusList.value[0].value = res.data.online
    equirementStatusList.value[0].total = res.data.total
    equirementStatusList.value[1].value = res.data.offline
    equirementStatusList.value[1].total = res.data.total
    equirementStatusList.value[2].value = res.data.broken
    equirementStatusList.value[2].total = res.data.total
  }
}
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
