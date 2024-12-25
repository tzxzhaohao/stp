<template>
  <Teleport to="body">
    <div class="view_body">
      <div class="view_content">
        <div class="view_content_bg"></div>
        <div class="view_header">
          <div class="header_title">工艺运行模拟</div>
          <div class="header_close" @click="closeDialog"></div>
        </div>
        <div class="view_message">
          <div class="view_param">
            <div class="parameter_header">
              <img class="icon" src="@/assets/images/icon_parameter.png" alt="" srcset="" />
              <span>工艺运行参数设置</span>
            </div>
            <div class="parmeter_content">
              <div class="label">当日进水量（m³）：</div>
              <div>
                <input type="text" class="number_input" v-model="inputNumber" placeholder="请输入" />
                <div class="btn_group">
                  <div class="btn btn_start">开始模拟</div>
                  <div class="btn btn_reset" @click="reset">重置</div>
                </div>
              </div>
            </div>
          </div>
          <div class="view_param">
            <div class="parameter_header">
              <img class="icon" src="@/assets/images/icon_result.png" alt="" srcset="" />
              <span>运行模拟结果</span>
            </div>
            <div class="parmeter_content">
              <div class="label">当日出水量（m³）：</div>
              <div class="result_text">100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const emits = defineEmits(['closeDialog', 'confirmDialog'])
const closeDialog = () => {
  emits('closeDialog')
}
const confirmDialog = () => {
  emits('confirmDialog')
}
const inputNumber = ref()
const reset = () => {
  inputNumber.value = ''
}
</script>
<style scoped lang="scss">
.view_body {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.6);
  .view_content {
    position: absolute;
    width: 500px;
    height: 484px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .view_content_bg {
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
    border-image-source: url('@/assets/images/bg.png');
    border-image-slice: 80 280 60 260 fill;
    transform: scale(0.5);
    transform-origin: left top;
  }
  .view_header {
    height: 40px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    font-size: 16px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header_title {
    background: linear-gradient(-180deg, #ffffff 0%, #baf6ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding: 0 3px;
    margin-left: 22px;
    margin-top: 10px;
  }
  .header_close {
    width: 30px;
    height: 30px;
    margin-right: 5px;
    margin-top: 5px;
    background-size: cover;
    cursor: pointer;
  }
  .header_close:hover {
    transform: scale(1.2);
  }
  .view_param {
    font-family: Microsoft YaHei;
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
    .parameter_header {
      margin-top: 40px;
      margin-left: 32px;
    }
    .icon {
      height: 12px;
      width: 12px;
      margin-right: 6px;
    }
    .parmeter_content {
      width: 429px;
      height: 144px;
      background: #0c2b4b;
      margin-left: 32px;
      margin-top: 8px;
      border-radius: 5px;
      display: flex;

      .label {
        margin-left: 25px;
        margin-top: 34px;
      }
      .number_input {
        margin-top: 24px;
        background-color: #071d33;
        border: 1px solid #12314f;
        border-radius: 2px;
        padding-left: 6px;
        font-size: 12px;
        width: 240px;
        height: 38px;
        color: #fff;
        &:focus-visible {
          outline: none;
        }
      }
      .result_text {
        font-family: Bahnschrift;
        font-weight: normal;
        font-size: 20px;
        color: #00deff;
        margin-top: 30px;
      }
      .btn_group {
        display: flex;
        cursor: pointer;
        margin-top: 24px;
        .btn {
          height: 36px;
          width: 108px;
          line-height: 36px;
          text-align: center;
          font-weight: 400;
          font-size: 14px;
          color: #c5d5db;
        }
        .btn_start {
          background-image: url('@/assets/images/btn_start.png');
          background-size: cover;
          margin-right: 24px;
          &:hover {
            color: #fff;
          }
        }
        .btn_reset {
          background-image: url('@/assets/images/btn_reset.png');
          background-size: cover;
          &:hover {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
