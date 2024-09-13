<template lang="pug">
.base-panel-item(:class="['base-panel-item', props.isChecked ? 'base-panel-item-active' : '']")
  .base-panel-item-header
    .base-panel-item-header-title
      | {{title}}
      span.titleTip(v-if="titleTip") {{titleTip}}
  .base-panel-item-content(v-if="props.canCheck")
    slot
  template(v-else)
    slot
</template>
<script setup lang="ts">
import { defineProps, ref, computed } from 'vue'
const props = defineProps({
  /** 标题 */
  title: {
    type: String,
    default: '',
  },
  /**
   * 副标题
   */
  titleTip: {
    type: String,
    default: '',
  },
  /** 是否选中 */
  isChecked: {
    type: Boolean,
    default: false,
  },
  /** 是否可以被选中 */
  canCheck: {
    type: Boolean,
    default: false,
  },
})
</script>
<style lang="scss">
.base-panel-item {
  display: flex;
  flex-direction: column;
  .base-panel-item-header-title {
    font: var(--dv-text-headline1);
    color: var(--dv-color-text-primary);
    margin-bottom: 8px;
  }
  .titleTip {
    font: var(--dv-text-number1);
    color: var(--dv-color-text-secondary);
  }
  .base-panel-item-content {
    cursor: pointer;
    & > div {
      border: 1px solid transparent;
    }
  }
  &.base-panel-item-active {
    .base-panel-item-content > div {
      border: 1px solid #00deff;
      border-radius: 0;
      box-shadow: 0px 0px 6px 0px rgba(51, 135, 255, 0.72);
      background: #000a18;
    }
  }
}
</style>
