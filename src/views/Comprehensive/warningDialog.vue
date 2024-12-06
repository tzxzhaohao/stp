<template>
  <div :class="['warning_dialog', !show && 'warning_dialog_short']">
    <div :class="show ? 'show_button' : 'hide_button'" @click="showOrHide"></div>
    <header class="waring_header">
      <img class="alarm_img" src="./images/icon_alarm.png" alt="" />
      <span class="title_text">感知监测报警</span>
      <img v-if="show" class="close_img" @click="closeDialog" src="./images/icon_close_alarm.png" alt="" />
    </header>
    <div class="warning_content" v-if="show">
      <div class="warningMessage"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['closeDialog', 'showOrHide'])
const closeDialog = () => {
  emit('closeDialog')
}
const showOrHide = () => {
  emit('showOrHide')
}
</script>
<style scoped lang="scss">
.warning_dialog {
  position: absolute;
  pointer-events: all;
  right: 352px;
  bottom: 0;
  background-image: url('./images/pic_box_alarm.png');
  background-size: cover;
  width: 288px;
  height: 208px;
  transition: all 0.3s;

  .show_button {
    position: absolute;
    left: 118px;
    top: -16px;
    height: 16px;
    width: 51.2px;
    background-image: url('./images/pic_alarm_Pack-up.png');
    background-size: cover;
  }
  .hide_button {
    position: absolute;
    left: 118px;
    top: -16px;
    height: 16px;
    width: 51.2px;
    background-image: url('./images/pic_alarm_unfold.png');
    background-size: cover;
  }
  .waring_header {
    font-family: Adobe Heiti Std;
    font-weight: normal;
    padding: 0 12px;
    font-size: 16px;
    color: #ff4141;
    position: relative;
    .alarm_img {
      position: absolute;
      left: 12px;
      top: 14px;
      width: 24px;
      height: 24px;
    }
    .title_text {
      position: absolute;
      left: 46px;
      top: 18px;
    }
    .close_img {
      position: absolute;
      right: 24px;
      top: 20px;
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  }
  .warningMessage {
    display: flex;
    align-items: center;
    .bg_img {
      flex-basis: 80px;
      margin-top: 16px;
      margin-left: 20px;
      width: 80px;
      height: 54px;
      border: 1px solid #db0000;
    }
    .bg_text {
      display: flex;
      flex-direction: column;
      align-items: left;
      font-family: Adobe Heiti Std;
      margin-left: 15px;
      font-weight: normal;
      font-size: 12px;
      color: rgba(255, 188, 188, 1);
      .bg_name {
        font-family: Adobe Heiti Std;
        font-weight: normal;
        font-size: 14px;
        color: #ff7a7a;
        width: 280px;
        line-height: 18px;
      }
    }
  }
  /*  .warning_content {
    height: 220px;
    overflow: auto;
  } */
}
.warning_dialog_short {
  background-image: none;
  height: 42px;
  .waring_header {
    width: 288px;
    height: 36.8px;
    background-image: url('./images/pic_box_alarm_min.png');
    background-size: cover;
    .alarm_img {
      top: 6px;
      left: 16px;
      width: 24px;
      height: 24px;
    }
    .title_text {
      top: 12px;
      left: 42px;
    }
  }
}
</style>
