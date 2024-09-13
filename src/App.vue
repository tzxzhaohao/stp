<template lang="pug">
ElConfigProvider(:locale="zhCn")
  router-view
  //- sencePanel
</template>
<script setup lang="ts">
import { useAppStore } from '@/stores/app'
// import sencePanel from '@/components/sencePanel/index.vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const { microAppName } = useAppStore()

console.log('microAppName', microAppName)
</script>
<style lang="scss">
@import '@/styles/common.scss';
@import '@/styles/data-visual-var-element.css';
body {
  //background: #64a71a;
}
</style>
