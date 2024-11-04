import { Cesium3DTile, Cesium3DTileColorBlendMode, Cesium3DTileContent, Cesium3DTileFeature, Cesium3DTileset, Color, defaultValue, JulianDate, Scene, Viewer } from 'cesium'

type ElementMap = {
  [key: string]: Cesium3DTileFeature[]
}

type ColorElementMap = {
  [key: string]: Color | undefined
}

type ProcessFeatureCallback = (feature: Cesium3DTileFeature) => void

export class TilesetLayer {
  private _tileset: Cesium3DTileset

  private _elementMap: ElementMap = {}

  private _colorElementMap: ColorElementMap = {}
  private _highlightElements: string[] = []

  private _highlightColor: Color = Color.clone(Color.LIME) // 高亮显示颜色
  private _highlightInterval: number
  private _highlighting: boolean
  private _lastTime: number
  private _highlightingFlag: boolean

  private _loadFeature: ProcessFeatureCallback
  private _unloadFeature: ProcessFeatureCallback

  constructor(viewer: Viewer, tileset: Cesium3DTileset) {
    this._tileset = tileset

    tileset.tileLoad.addEventListener(tile => {
      this.processTileFeatures(tile, this._loadFeature)
    })

    tileset.tileUnload.addEventListener(tile => {
      this.processTileFeatures(tile, this._unloadFeature)
    })

    this._loadFeature = (feature: Cesium3DTileFeature) => {
      const name = feature.getProperty('name')
      let features = this._elementMap[name]
      if (!features) {
        features = []
        this._elementMap[name] = features
      }
      features.push(feature)

      const color = this._colorElementMap[name]
      if (color) {
        feature.color = Color.clone(color, feature.color)
      }

      // 厂区门口多余管道
      if (name === 'WSCLC_DX003') {
        feature.show = false
      }
    }

    this._unloadFeature = (feature: Cesium3DTileFeature) => {
      const name = feature.getProperty('name')
      const features = this._elementMap[name]
      const index = features.indexOf(feature)
      if (index > -1) {
        features.splice(index, 1)
      }
    }

    this._tileset.colorBlendMode = Cesium3DTileColorBlendMode.MIX
    this._tileset.colorBlendAmount = 0.9

    this._highlightInterval = 0.5
    this._highlighting = false
    this._lastTime = 0
    this._highlightingFlag = false

    viewer.scene.postUpdate.addEventListener((scene: Scene, time: JulianDate) => {
      if (!this._highlighting) {
        return
      }

      const currentTime = performance.now() / 1000
      const deltaTime = currentTime - this._lastTime

      if (deltaTime > this._highlightInterval) {
        this._lastTime = currentTime

        // 切换高亮状态
        const highlightElements = this._highlightElements
        highlightElements.forEach(name => {
          const originColor = defaultValue(this._colorElementMap[name], Color.WHITE)
          const highlightColor = this._highlightingFlag ? originColor : this._highlightColor

          this.setElementColor(name, highlightColor)
        })
        this._highlightingFlag = !this._highlightingFlag
      }
    })
  }

  setFeatureColor(names: string[], color: Color) {
    const elementColor = Color.clone(color)
    const colorElementMap = this._colorElementMap

    names.forEach(name => {
      colorElementMap[name] = Color.clone(elementColor, colorElementMap[name])

      this.setElementColor(name, elementColor)
    })
  }

  resetFeatureColor(names: string[]) {
    const colorElementMap = this._colorElementMap

    names.forEach(name => {
      if (colorElementMap[name]) {
        colorElementMap[name] = undefined

        this.setElementColor(name, Color.WHITE)
      }
    })
  }

  highlightFeature(names: string[]) {
    if (names.length === 0) {
      return
    }

    const highlightElements = this._highlightElements

    names.forEach(name => {
      if (highlightElements.indexOf(name) === -1) {
        highlightElements.push(name)
      }

      this.setElementColor(name, this._highlightColor)
    })

    if (!this._highlighting) {
      this._highlighting = true
      this._lastTime = performance.now() / 1000
      this._highlightingFlag = true
    }
  }

  cancelHighlightFeature() {
    const highlightElements = this._highlightElements

    highlightElements.forEach(name => {
      this.setElementColor(name, Color.WHITE)
    })

    highlightElements.length = 0
    this._highlighting = false
  }

  private setElementColor(name: string, color: Color) {
    const featuresToColor = this._elementMap[name]
    if (!featuresToColor) {
      return
    }

    const length = featuresToColor.length
    for (let i = 0; i < length; ++i) {
      const feature = featuresToColor[i]
      feature.color = Color.clone(color, feature.color)
    }
  }

  private processContentFeatures(content: Cesium3DTileContent, callback: ProcessFeatureCallback) {
    const featuresLength = content.featuresLength
    for (let i = 0; i < featuresLength; ++i) {
      const feature = content.getFeature(i)
      callback(feature)
    }
  }

  private processTileFeatures(tile: Cesium3DTile, callback: ProcessFeatureCallback) {
    const content = tile.content
    const innerContents = content.innerContents
    if (innerContents) {
      const length = innerContents.length
      for (let i = 0; i < length; ++i) {
        this.processContentFeatures(innerContents[i], callback)
      }
    } else {
      this.processContentFeatures(content, callback)
    }
  }
}
