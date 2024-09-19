<template>
  <div :class="['progress_bar', status]">
    <div class="bar" :style="{ width: props.percentage + '%' }"></div>
  </div>
</template>
<script setup lang="ts">
interface MyProps {
  percentage: number
  status?: string
}
const props = defineProps({
  percentage: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: 'primary',
  },
})
</script>
<style scoped lang="scss">
.progress_bar {
  position: relative;
  width: 100%;
  height: 4px;
  background: rgba(98, 214, 125, 0.3);
  border-radius: 2px;
}
.bar {
  position: absolute;
  left: 0;
  top: 0;
  height: 4px;
  background: rgba(98, 214, 125, 1);
  border-radius: 2px;
  width: 0;
  transition: width 0.3s;
  &::after {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    position: absolute;
    right: 0px;
    top: -1px;
    background: #fff;
  }
}
.primary {
  background: rgba(98, 214, 125, 0.3);
  .bar {
    background: rgba(98, 214, 125, 1);
  }
}
.success {
  background: rgba(84, 128, 255, 0.3);
  .bar {
    background: rgba(84, 128, 255, 1);
  }
}
</style>
