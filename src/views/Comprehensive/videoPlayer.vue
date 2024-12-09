<template>
  <video ref="videoRef" class="video_container" crossorigin="anonymous" controls muted autoplay></video>
</template>
<script setup lang="ts">
import request from '@/utils/request'
import { watch, ref } from 'vue'
const props = defineProps<{
  cameraCode: string
}>()
let player: window.mpegts.Player
watch(
  () => props.cameraCode,
  async (code: string) => {
    // 通过接口获取视频播放的url
    const formData = {
      cameraUniqueCode: code,
      protocol: 'httpflv',
      streamType: '0',
      transmode: 1,
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }
    /*  const data: any = await request({
      method: 'post',
      url: '/bmp-video-control-server/api/v1/cameraInfo/getPreviewUrl',
      data: formData,
    })
    console.log(data) */
    fetch('/apis' + '/bmp-video-control-server/api/v1/cameraInfo/getPreviewUrl', options)
      .then(data => data.json())
      .then(res => {
        if (res.code === 'success') {
          playVideo(res.data)
        }
      })
  },
  {
    immediate: true,
  },
)
const videoRef = ref()
const playVideo = async (url: string) => {
  console.log(url)
  if (player) player.destroy()
  if (videoRef?.value && window.mpegts.getFeatureList().mseLivePlayback) {
    player = window.mpegts.createPlayer(
      {
        type: 'mse', // could also be mpegts, m2ts, flv
        isLive: true,
        url,
      },
      {
        enableStashBuffer: false,
        liveBufferLatencyChasing: true,
      },
    )

    player.attachMediaElement(videoRef.value)
    player.load()

    player
      .play()
      .then(() => {
        console.timeEnd('视频加载时间')
      })
      .catch(e => {
        // 视频加载失败 递归调用10次 10次之后不在调用
      })
  }
}
</script>
<style scoped lang="scss">
.video_container {
  width: 100%;
  height: 100%;
}
</style>
