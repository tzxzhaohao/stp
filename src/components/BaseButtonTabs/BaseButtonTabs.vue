<script setup lang="ts">
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'default',
  },
})

const $emit = defineEmits(['update:modelValue', 'change'])

function changeTab(value: string) {
  $emit('update:modelValue', value)
  $emit('change', value)
}
</script>
<template lang="pug">
.BaseButtonTabs
  .BaseButtonTabs-tabs(
    v-for="item in list" 
    :key="item.id" 
    :class="[{ 'active' : modelValue === item.id }, size]" 
    @click.stop="changeTab(item.id)"
  ) {{item.name}}
</template>

<style lang="scss">
.BaseButtonTabs {
  display: flex;
  flex-direction: row;
  .BaseButtonTabs-tabs {
    // width: 52px;
    padding: 0 8px;
    height: 24px;
    border-radius: 3px;
    min-width: 52px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: var(--dv-color-fill-blank);
    border: 1px solid var(--dv-color-border-base);
    cursor: pointer;
    &.active {
      background-color: var(--dv-color-primary);
      border-width: 0;
    }
    + .BaseButtonTabs-tabs {
      margin-left: 2px;
    }
    &.default {
      font: var(--dv-text-headline2);
    }
    &.small {
      font: var(--dv-text-headline3);
    }
  }
}
</style>
