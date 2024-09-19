const viewer = window.Cesium.viewer
const Cesium3DTileset = window.Cesium.Cesium3DTileset
export const loadCesium3Dtileset = (url: string) => {
  const tileset = new Cesium3DTileset({
    url,
    maximumScreenSpaceError: 16,
    backFaceCulling: true,
  })
  viewer.scene.primitives.add(tileset)
}
