<template>
  <BasePanel title="报警管理" :width="960" :height="254">
    <swiper
      :slidesPerView="3"
      :spaceBetween="30"
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
      class="camera_swiper"
    >
      <swiper-slide v-for="(video, index) in videos" :key="index">
        <VideoPlayer :cameraCode="video.cameraCode" />
      </swiper-slide>
    </swiper>
  </BasePanel>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'
import { ref, nextTick } from 'vue'
import VideoPlayer from './videoPlayer.vue'
/* import './style.css' */

// import required modules
import { Pagination } from 'swiper/modules'
const modules = [Pagination]
const videos = ref([
  {
    cameraCode: 'FPI-ISC_46e425214d894ea19a2eec5721179f17',
  },
  {
    cameraCode: 'FPI-ISC_933cd2cad16e4bc8bca37666a5faed51',
  },
  {
    cameraCode: 'FPI-ISC_e2c264737dad43a6ac740bd6518cf0f8',
  },
  {
    cameraCode: 'FPI-ISC_b9e83807a19e4168810e180e8bea6f39',
  },
])
const isInView = ref([true, true, true, false, false, false, false, false])
// 设置懒加载
/* const setupLazyLoading = () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = entry.target.dataset.index
        console.log(index, 'xxxxx')
        isInView.value[index] = true // 更新该视频为已进入视口
        observer.unobserve(entry.target) // 停止观察该视频
      }
    })
  })

  // 监听所有视频元素
  nextTick(() => {
    const videosElement = document.querySelectorAll('video')
    videosElement.forEach((video, index) => {
      video.dataset.index = index
      observer.observe(video)
    })
  })
}
setupLazyLoading() */
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
