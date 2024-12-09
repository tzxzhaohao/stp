<template>
  <div v-if="!isMicro" id="cesium-container"></div>
  <span id="typed-subtitle"></span>
  <div class="left-module" v-if="!isProcessing">
    <WaterHanderChart />
    <FlowRateChart />
    <WaterQuality />
  </div>
  <div class="right-module" v-if="!isProcessing">
    <WaterLevelChart />
    <EquirementStatusChart />
    <EnergeyChart />
    <AlarmManager />
  </div>
  <div class="bottom-module" v-if="!isProcessing">
    <VideoGallery />
  </div>
  <WarningDialog v-if="!isProcessing" :show="showWarningDialog" @close-dialog="showWarningDialog = false" @show-or-hide="showWarningDialog = !showWarningDialog" />

  <MenuList :is-processing="isProcessing" :class="!isProcessing ? 'menu-module' : 'menu-module_process'" @click-step="clickStep" @start-process="isProcessing = true"></MenuList>
</template>
<script setup lang="ts">
import { setBasePath } from '@/utils/tools'
import WaterHanderChart from '@/views/Comprehensive/waterHanderChart.vue'
import WaterLevelChart from '@/views/Comprehensive/waterLevelChart.vue'
import FlowRateChart from '@/views/Comprehensive/flowRateChart.vue'
import EquirementStatusChart from '@/views/Comprehensive/equirementStatusChart.vue'
import MenuList from '@/views/Comprehensive/components/MenuList.vue'
import WaterQuality from '@/views/Comprehensive/waterQuality.vue'
import EnergeyChart from '@/views/Comprehensive/energeyChart.vue'
import AlarmManager from '@/views/Comprehensive/alarmManager.vue'
import BottomModule from '@/views/Comprehensive/bottomModule.vue'
import WarningDialog from '@/views/Comprehensive/warningDialog.vue'
import VideoGallery from '@/views/Comprehensive/videoGallery.vue'
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
import { onMounted, ref } from 'vue'
import { FoulWaterPlant, initFoulWaterPlant } from '@/common/process-flow'
import { createSubtitleBar } from '@/common/typed-subtitle'
import { createViewer } from '@/common/use-viewer-app'
const { UrlTemplateImageryProvider, CesiumTerrainProvider, Ion } = window.Cesium
const showWarningDialog = ref(true)
const isProcessing = ref(false)
const isMicro = window.__MICRO_APP_ENVIRONMENT__
let foulWaterPlant: FoulWaterPlant
onMounted(async () => {
  if (!window.Cesium) return

  const viewer = isMicro
    ? window.mapViewer
    : createViewer('cesium-container', {
        imageryProvider: new UrlTemplateImageryProvider({
          url: 'http://39.105.60.121/mapdata/maptile/wgs3857img/{z}/{x}/{y}.jpg',
          maximumLevel: 18,
        }),
        terrainProvider: new CesiumTerrainProvider({
          url: 'https://huji.fpi-inc.site:32443/HUBEI-dem/',
        }),
        useBrowserRecommendedResolution: false,
        animation: false,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        fullscreenButton: false,
        navigationHelpButton: false,
      })
  /* const viewer = window.mapViewer */
  // hide cesium credit
  const credit = viewer.cesiumWidget.creditContainer as HTMLElement
  credit.style.display = 'none'

  // viewer.scene.debugShowFramesPerSecond = true
  // viewer.scene.globe.depthTestAgainstTerrain = true

  // 创建字幕栏
  createSubtitleBar(viewer)
  foulWaterPlant = await initFoulWaterPlant(viewer, {
    parkUrl: 'http://122.191.102.250:8016/mapdata/3dtile/tileset.json', // 化工园区倾斜模型图层
    windowUrl: 'http://122.191.102.250:8016/mapdata/wsclc/window.glb', // 窗户模型
    treeUrl: 'http://122.191.102.250:8016/mapdata/wsclc/tree/tileset.json', // 树木模型
    plantUrl: 'http://122.191.102.250:8016/mapdata/wsclc/wsclc/tileset.json', // 污水处理厂模型
    sceneTreeUrl: 'http://122.191.102.250:8016/mapdata/wsclc/wsclc/scenetree.json', // 污水处理厂模型节点树
    labelDataUrl: './scene.json', // 标注
    viewpointDataUrl: './viewpoint.json', // 视角书签
    /*     labelDataUrl:  setBasePath('/json/scene.json'), // 标注
    viewpointDataUrl: setBasePath('/json/viewpoint.json'), // 视角书签 */
  })
  // 定位到指定位置
  foulWaterPlant.flyToMainOverview()
})
const clickStep = (index: number) => {
  if (!window.Cesium) return
  if (index === 0) {
    isProcessing.value = true
    foulWaterPlant.blurBackground()
    foulWaterPlant.classifyPipeByColor()
    foulWaterPlant.startMainFlowDisplay()
  } else if (index === 1) {
    isProcessing.value = true
    foulWaterPlant.blurBackground()
    foulWaterPlant.classifyPipeByColor()
    foulWaterPlant.startDeslimingFlowDisplay()
  } else if (index === 2) {
    isProcessing.value = true
    foulWaterPlant.blurBackground()
    foulWaterPlant.classifyPipeByColor()
    foulWaterPlant.startDefluorinationFlowDisplay()
  } else if (index === 3) {
    isProcessing.value = false
    foulWaterPlant.cancelBlurBackground()
    foulWaterPlant.cancelClassifyPipeByColor()
    foulWaterPlant.stopFlowDisplay()
  } else if (index === 4) {
    isProcessing.value = false
    foulWaterPlant.cancelBlurBackground()
    foulWaterPlant.cancelClassifyPipeByColor()
    foulWaterPlant.stopFlowDisplay()
    foulWaterPlant.unloadModels()
  }
}
</script>
<style lang="scss">
#cesium-container {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
}
.bottom-module {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  width: 960px;
  height: 254px;
}
.menu-module {
  position: absolute;
  left: 368px;
  top: 60px;
  transition: all 0.3s;
}
.menu-module_process {
  position: absolute;
  left: 16px;
  top: 60px;
}
</style>
