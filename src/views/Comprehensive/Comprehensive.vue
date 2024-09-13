<template>
  <div class="right-module">
    <WaterHanderChart />
    <FlowRateChart />
    <WaterQuality />
  </div>

  <MenuList class="left-module"></MenuList>
</template>
<script setup lang="ts">
import WaterHanderChart from '@/views/Comprehensive/waterHanderChart.vue'
import FlowRateChart from '@/views/Comprehensive/flowRateChart.vue'
import MenuList from '@/views/Comprehensive/components/MenuList.vue'
import WaterQuality from '@/views/Comprehensive/waterQuality.vue'
/* import BasePanel from '@/components/BasePanel/BasePanel.vue'
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/global'
import { useChangeModule, useMicroAppData, useRecordScene } from '@/hooks/mainMapTool'
import IScrollbar from '@/components/IScrollbar.vue'
import type { EnvMap } from './type'
import dayjs from 'dayjs' */
</script>
<style lang="scss"></style>
