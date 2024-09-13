<template>
  <div class="base-panel-container" :style="{ height: valueOrStr(height), width: valueOrStr(width), minHeight: '130px' }">
    <div class="base-panel-common-bg" />
    <div class="base-panel-panel-content">
      <div v-if="showHeader" class="base-panel-top-title">
        <div class="base-panel-text-box">
          <slot name="title">
            <span class="base-panel-title-text">{{ title }}</span>
            <span class="base-panel-title-text base-panel-title-tip" v-if="tipTitle">{{ tipTitle }}</span>
          </slot>
        </div>
        <div>
          <slot name="rightTitle" />
        </div>
      </div>
      <div class="base-panel-content" :class="{ 'base-panel-checked': isChecked }">
        <template v-if="canCheck">
          <div style="cursor: pointer" @click="onClick">
            <slot name="default" />
          </div>
        </template>
        <template v-else>
          <slot name="default" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * 定义props
 */
const props = defineProps({
  /**
   * 面板高度 最小高度130px, 如果小于130px, 则需要自己进行手动调整border的样式和移除minHeight
   */
  height: {
    type: Number,
    default: undefined,
  },
  /**
   * 面板宽度
   */
  width: {
    type: Number,
    default: 320,
  },
  /**
   * 标题
   */
  title: {
    type: String,
    default: '',
  },
  // 提示标题
  tipTitle: {
    type: String,
    default: '',
  },
  /**
   * 是否显示头部
   */
  showHeader: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否可以被选中
   */
  canCheck: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否被选中
   */
  isChecked: {
    type: Boolean,
    default: false,
  },
})

/**
 * 定义emit
 */
const emit = defineEmits(['click'])

const valueOrStr = (val: string | number | undefined) => {
  if (typeof val === 'undefined') {
    return undefined
  }
  return `${val}px`
}

const onClick = () => {
  emit('click')
}
</script>

<style lang="scss">
/*
通用面板组件的样式
*/
.base-panel-container {
  position: relative;
  box-sizing: border-box;
  width: 320px;
  backdrop-filter: blur(10px) brightness(70%);
  + .base-panel-container {
    margin-top: 18px;
  }
}

.base-panel-common-bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 200%;
  height: 200%;
  border-top: 80px solid transparent;
  border-right: 280px solid transparent;
  border-bottom: 60px solid transparent;
  border-left: 260px solid transparent;
  border-image-source: url(./images/panel.png);
  border-image-slice: 80 280 60 260 fill;
  transform: scale(0.5);
  transform-origin: left top;
}

.base-panel-panel-content {
  width: 100%;
  height: 100%;
}

.base-panel-top-title {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  padding-right: 12px;
  padding-left: 28px;
}

.base-panel-text-box {
  display: flex;
  align-items: center;
  font-family: var(--font-family-main-title);
  font-size: 20px;
  font-weight: normal;
  color: var(--dv-color-text-primary);
}
.base-panel-title-text {
  background: linear-gradient(180deg, #ffffff 0%, #baf6ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
.base-panel-title-tip {
  font-family: MiSans;
  font-size: 14px;
}

.base-panel-content {
  padding: 12px;
  border: 1px solid transparent;
}

.base-panel-checked {
  border: 1px solid #00deff;
  border-radius: 0;
  box-shadow: 0px 0px 6px 0px rgba(51, 135, 255, 0.72);
  background: #000a18;
  padding-bottom: 20px;
}
</style>
