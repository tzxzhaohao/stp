<template>
  <span id="typed-subtitle"></span>
  <div class="right-module">
    <WaterHanderChart />
    <FlowRateChart />
    <WaterQuality />
  </div>

  <MenuList class="left-module" @click-step="clickStep"></MenuList>
</template>
<script setup lang="ts">
import { setBasePath } from '@/utils/tools'
import WaterHanderChart from '@/views/Comprehensive/waterHanderChart.vue'
import FlowRateChart from '@/views/Comprehensive/flowRateChart.vue'
import MenuList from '@/views/Comprehensive/components/MenuList.vue'
import WaterQuality from '@/views/Comprehensive/waterQuality.vue'

/* const loadCesium3Dtileset = async (url: string) => {
  const { viewer, Cesium3DTileset, Cartographic, Cartesian3, Matrix4 } = window.Cesium
  const tileset = new Cesium3DTileset({
    url,
    maximumScreenSpaceError: 16,
    backFaceCulling: true,
  })
  viewer.scene.primitives.add(tileset)
  const layer = await tileset.readyPromise
  const cartographic = Cartographic.fromCartesian(tileset.boundingSphere.center)
  const surface = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0)
  const offset = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 17)
  const translation = Cartesian3.subtract(offset, surface, new Cartesian3())
  layer.modelMatrix = Matrix4.fromTranslation(translation)
  viewer.flyTo(tileset)
}
onMounted(() => {
  if (window.Cesium) {
    loadCesium3Dtileset('http://39.105.60.121/mapdata/DtTcc/3DMD/YYY-3d/tileset.json')
  }
}) */
import { onMounted } from 'vue'
import { FoulWaterPlant, initFoulWaterPlant } from '@/common/process-flow'
import { createSubtitleBar } from '@/common/typed-subtitle'

let foulWaterPlant: FoulWaterPlant
onMounted(async () => {
  if (!window.Cesium) return

  const viewer = window.mapViewer
  // hide cesium credit
  const credit = viewer.cesiumWidget.creditContainer as HTMLElement
  credit.style.display = 'none'

  // viewer.scene.debugShowFramesPerSecond = true
  // viewer.scene.globe.depthTestAgainstTerrain = true

  // 创建字幕栏
  createSubtitleBar(viewer)

  foulWaterPlant = await initFoulWaterPlant(viewer, {
    // parkUrl: 'http://122.191.102.250:8016/mapdata/3dtile/tileset.json', // 化工园区倾斜模型图层
    windowUrl: 'http://122.191.102.250:8016/mapdata/wsclc/window.glb', // 窗户模型
    treeUrl: 'http://122.191.102.250:8016/mapdata/wsclc/tree/tileset.json', // 树木模型
    plantUrl: 'http://122.191.102.250:8016/mapdata/wsclc/wsclc/tileset.json', // 污水处理厂模型
    sceneTreeUrl: 'http://122.191.102.250:8016/mapdata/wsclc/wsclc/scenetree.json', // 污水处理厂模型节点树
    labelDataUrl: setBasePath('/json/scene.json'), // 标注
    viewpointDataUrl: setBasePath('/json/viewpoint.json'), // 视角书签
  })
  // 定位到指定位置
  foulWaterPlant.flyToMainOverview()
})
const clickStep = (index: number) => {
  if (!window.Cesium) return
  if (index === 0) {
    foulWaterPlant.blurBackground()
    foulWaterPlant.classifyPipeByColor()
    foulWaterPlant.startMainFlowDisplay()
  } else if (index === 1) {
    foulWaterPlant.blurBackground()
    foulWaterPlant.classifyPipeByColor()
    foulWaterPlant.startDeslimingFlowDisplay()
  } else if (index === 2) {
    foulWaterPlant.blurBackground()
    foulWaterPlant.classifyPipeByColor()
    foulWaterPlant.startDefluorinationFlowDisplay()
  } else if (index === 3) {
    foulWaterPlant.cancelBlurBackground()
    foulWaterPlant.cancelClassifyPipeByColor()
    foulWaterPlant.stopFlowDisplay()
  } else if (index === 4) {
    foulWaterPlant.unloadModels()
  }
}
</script>
<style lang="scss"></style>
