<template>
  <div class="right-module">
    <WaterHanderChart />
    <FlowRateChart />
    <WaterQuality />
  </div>

  <MenuList class="left-module"></MenuList>
</template>
<script setup lang="ts">
import WaterHanderChart from '@/views/Comprehensive/waterHanderChart.vue'
import FlowRateChart from '@/views/Comprehensive/flowRateChart.vue'
import MenuList from '@/views/Comprehensive/components/MenuList.vue'
import WaterQuality from '@/views/Comprehensive/waterQuality.vue'
import { onMounted } from 'vue'
const loadCesium3Dtileset = async (url: string) => {
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
})
</script>
<style lang="scss"></style>
