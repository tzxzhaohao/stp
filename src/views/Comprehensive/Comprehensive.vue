<template lang="pug">
.leftPlane.left-module
  base-panel(
    title="环境质量"
    :width='320'
    :height='360'
  )
    base-panel-item(title="大气环境" :canCheck="true" :isChecked="currentModule === 'env_air'" @click="enterScene('env_air')")
     div 我是面板



.rightPlane.right-module
  base-panel(
    :title="`环境监管`"
    :width='320'
    :height='200'
    :canCheck="true"
    :isChecked="currentModule === 'env_monitor'"
  )
    div 2222

</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/global'
import { useChangeModule, useMicroAppData, useRecordScene } from '@/hooks/mainMapTool'
import IScrollbar from '@/components/IScrollbar.vue'
import type { EnvMap } from './type'
import dayjs from 'dayjs'
</script>
<style lang="scss"></style>
