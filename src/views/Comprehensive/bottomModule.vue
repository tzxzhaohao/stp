<template>
  <BasePanel title="实时监控" :width="960" :height="254">
    <swiper
      :slidesPerView="3"
      :spaceBetween="30"
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
      class="camera_swiper"
    >
      <swiper-slide v-for="item in 9" :key="item">
        <div class="camera_module">
          <div class="camera_module_title">摄像头名称{{ item }}</div>
        </div>
      </swiper-slide>
    </swiper>
  </BasePanel>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

/* import './style.css' */

// import required modules
import { Pagination } from 'swiper/modules'
const modules = []
</script>
<style lang="scss" scoped>
.camera_swiper {
  margin: 12px 32px 32px 32px;
}
.camera_module {
  height: 169px;
  border: 1px solid #05e8f2;
  background-image: url('./images/camera.png');
  background-size: cover;
  position: relative;
}
.camera_module_title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-size: 14px;
  font-family: Microsoft YaHei;
  padding-left: 16px;
  background: rgb(11, 27, 41, 0.5);
}
</style>
