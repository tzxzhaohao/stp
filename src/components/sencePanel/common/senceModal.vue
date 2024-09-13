<template lang="pug">
.senceModal(:style= "{'width': width+'px','height': height+'px'}")
    img.title-line(src="./image/title-line.png" alt="")
    .title-box
        img.title-block(src="./image/title-block.png" alt="")
        .title(v-if="title") {{ title }}
        el-icon.close(size="16" color="#00B2CC" @click="onClose")
            Close
    .header-box
        .header-box-left
            slot(name="headerLeft")
        .header-box-right
            slot(name="headerRight")
                .link-btn(v-if="link" @click="jump")
                    span.name 跳转系统
                    el-icon
                        DArrowRight
    .sence-modal-content
        slot(name="default")
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, toRefs } from 'vue'
import { Close, DArrowRight } from '@element-plus/icons-vue'
import { useChangeModule } from '@/hooks/mainMapTool'
import { useGlobalStore } from '@/stores/global'

const { changeModule, currentModule } = useChangeModule()
const { changeCurrentModuleChild, currentModuleChild } = useGlobalStore()

/**
 * 定义props
 */
const props = defineProps({
  /**
   * 面板宽度
   */
  width: {
    type: Number,
    default: 1128,
  },
  /**
   * 面板高度
   */
  height: {
    type: Number,
    default: 596,
  },
  /**
   * 标题
   */
  title: {
    type: String,
    default: '',
  },
  /*
   * 跳转系统链接
   */
  link: {
    type: String,
    default: '',
  },
})

// 跳转
const jump = () => {
  window.open(props.link)
}

const emit = defineEmits(['close'])
// 关闭弹窗
const onClose = () => {
  changeCurrentModuleChild('')
  changeModule('')
  emit('close')
}

const { width, height, title, link } = toRefs(props)
</script>
<style lang="scss" scoped>
::v-deep .BaseButtonTabs {
  .BaseButtonTabs-tabs {
    height: 28px;
  }
  .BaseButtonTabs-tabs + .BaseButtonTabs-tabs {
    margin-left: 0;
  }
}
.senceModal {
  display: flex;
  flex-direction: column;
  background: var(--dv-color-fill-blank);
  box-sizing: border-box;
  border-width: 0px 1px 0px 1px;
  border-style: solid;
  border-color: rgba(0, 149, 255, 0.6);
  backdrop-filter: blur(20px);

  .title-line {
    position: absolute;
    top: -10px;
    left: -7px;
  }
  .title-block {
    position: absolute;
    left: 8px;
  }
  .title-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    padding: 0 8px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0, 149, 255, 0.6);
    // background-image: url('./image/title-line.png');
    // background-repeat: no-repeat;
    // background-position: -6px -10px;
    .title {
      font: var(--dv-text-headline1);
      background: linear-gradient(180deg, #ffffff 0%, #baf6ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);
      padding-left: 16px;
    }
    .close {
      cursor: pointer;
    }
  }
  .header-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // height: 28px;
    padding: 16px 16px 0;
    .header-box-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .header-box-right {
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 9;
      .link-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 92px;
        height: 28px;
        border-radius: 2px;
        background: var(--dv-color-fill-light);
        box-sizing: border-box;
        border: 1px solid var(--dv-color-border-light);
        font: var(--dv-text-body2);
        color: var(--dv-color-text-primary);
        cursor: pointer;
      }
    }
  }
  .sence-modal-content {
    flex: 1;
    overflow: hidden;
    padding: 16px;
  }
}
</style>
