import { flattenTileset } from '@/common/model-flatten'
import { TilesetLayer } from '@/common/tileset-layer'
import { ViewpointBookmark } from '@/common/viewpoint-bookmark'
import { showSubtitle } from '@/common/typed-subtitle'

const {
  Cartesian3,
  Cartographic,
  Cesium3DTileset,
  Color,
  DistanceDisplayCondition,
  Entity,
  HeadingPitchRoll,
  JulianDate,
  // Math as CesiumMath,
  Math,
  Matrix4,
  Resource,
  Scene,
  Transforms,
  // Viewer,
} = window.Cesium
const CesiumMath = Math

// 地面
const groundNodes = [
  'WSCLC_DX031', // 地面
  'WSCLC_DX007', // 其它
  'WSCLC_DX016',
  'WSCLC_DX025',
  'WSCLC_DX026',
  'WSCLC_DX027',
  'WSCLC_DX028',
  'WSCLC_DX029',
  'WSCLC_DX030',
]

// 水面
const waterNodes = [
  'sm_001', // 调节事故池水面
  'sm_002', // 一级絮凝池水面
  'sm_003',
  'sm_004', // AO-AO生化池
  'sm_005', // 二沉池
  'sm_006', // 二级絮凝池水面
  'sm_007', // 污泥浓缩池水面
  'sm_008',
  'sm_009',
]

// 加药间
const chemicalBuildingTopNodes = ['WSCLC_JZ030'] // 顶
const chemicalBuildingNodes = [
  'WSCLC_JZ029', // 墙
  'WSCLC_JZ039',
  'WSCLC_JZ034',
  'WSCLC_JZ040',
  'WSCLC_DX017',
]

// 深度处理间
const deepProcessingRoomTopNodes = ['WSCLC_JZ064'] // 顶
const deepProcessingRoomNodes = [
  'WSCLC_JZ041', // 墙
]

// 除氟设备间
const defluorinationRoomTopNodes = ['WSCLC_JZ065'] // 顶
const defluorinationRoomNodes = [
  'WSCLC_JZ053', // 柱子
]

// 污泥脱水间
const dewateringRoomtOPNodes = ['WSCLC_JZ042', 'WSCLC_JZ044', 'WSCLC_JZ050', 'WSCLC_JZ011', 'WSCLC_SS075'] // 顶
const dewateringRoomNodes = [
  'WSCLC_JZ012', // 墙
  'WSCLC_JZ051', // 地面
  'WSCLC_JZ014', // 门窗
  'WSCLC_SS074',
  'WSCLC_DX013',
]

// 管道分类
const inletPipes = ['WS033', 'WS037', 'WS025', 'WS046', 'WS054', 'WS050', 'WS052', 'WS053', 'WS042', 'WS035', 'WS032', 'WS040', 'WS039', 'WS038'] // 进水管
const inletPipesExclude = ['JS001', 'JS002', 'JS003', 'JS004', 'JS005', 'JS006', 'JS007', 'JS008', 'JS018']
const wastePipes: string[] = [] // 污水管
const wastePipesExclude = ['WS033', 'WS037', 'WS025', 'WS046', 'WS054', 'WS050', 'WS052', 'WS053', 'WS042', 'WS035', 'WS032', 'WS040', 'WS039', 'WS038', 'WS011']
const medicinePipes = ['JS006'] // 加药管
const aerationPipes = ['WS011'] // 曝气管

const inletPipeColor = Color.AQUA
const wastePipeColor = Color.GOLD
const medicinePipeColor = Color.FUCHSIA
const aerationPipeColor = Color.BLUE

// ---- 主流程 ----

// 进水
const inlet = ['JS016']

//粗格栅
const coarseGrilles = ['WSCLC_SS025', 'WSCLC_SS027']

// 提升泵站
const liftPumpingStation = ['WSCLC_SS142']

// 细格栅
const fineGrille = ['WSCLC_SS037', 'WSCLC_SS038']

// 旋流沉沙器
const sandSettlingDevices = ['WSCLC_SS047', 'WSCLC_SS048']

// 调节事故池
const adjustAccidentPool = ['WSCLC_JZ060', 'WSCLC_JZ045', 'WSCLC_SS083', 'WSCLC_JZ007', 'WSCLC_JZDX007', 'WSCLC_SS140', 'WSCLC_SS094']

// 一级絮凝池
const primaryFlocculationTank = ['WSCLC_JZ061', 'WSCLC_JZ048', 'WSCLC_JZDX011', 'WSCLC_SS084', 'WSCLC_SS101', 'WSCLC_SS091', 'WSCLC_SS093', 'WSCLC_SS092', 'WSCLC_SS145', 'WSCLC_SS146', 'WSCLC_SS144']

// 加药间
// 设备?

// AO-AO生化池
const biochemicalTank = ['WSCLC_JZ059', 'WSCLC_JZ047', 'WSCLC_JZDX012', 'WSCLC_SS085', 'WSCLC_SS100', 'WSCLC_SS090', 'WSCLC_SS088', 'WSCLC_SS087', 'WSCLC_SS086', 'WSCLC_SS089']

// 二沉池
const sinkingPool = ['WSCLC_JZ062', 'WSCLC_JZ046', 'WSCLC_JZDX010', 'WSCLC_SS143']

// 二级絮凝池
const secondaryFlocculationTank = [
  'WSCLC_JZ057',
  'WSCLC_JZ003',
  'WSCLC_JZDX002',
  'WSCLC_SS033',
  'WSCLC_SS034',
  'WSCLC_JZ018',
  'WSCLC_SS030',
  'WSCLC_SS149',
  'WSCLC_SS147',
  'WSCLC_SS163',
  'WSCLC_SS164',
  'WSCLC_SS165',
]

// 纤维滤布滤池
const fibeclothFilter = ['WSCLC_JZ056']

// 紫外消毒器？
const disinfector = []

// 巴氏计量槽
const measurementTank = ['WSCLC_DX004']

// 出水
const outlet = ['JS012']

// ---- 污泥脱泥流程 ----

// 污泥泵站
const sludgePumpingStation = ['WSCLC_JZ004', 'WSCLC_DX030', 'WSCLC_JZ016', 'WSCLC_JZDX001', 'WSCLC_SS035', 'WSCLC_SS153', 'WSCLC_SS152', 'WSCLC_SS154', 'WSCLC_SS151', 'WSCLC_SS150', 'WSCLC_JZ017']

// 污泥浓缩池
const sludgeThickeningTank = ['WSCLC_JZ005', 'WSCLC_shu001', 'WSCLC_JZ001', 'WSCLC_shu002']

// 污泥调理池
const sludgeConditioningTank = ['WSCLC_JZ052', 'WSCLC_SS006', 'WSCLC_SS008', 'WSCLC_SS007', 'WSCLC_SS032']

// 污泥间

// 板框压滤机
const filterPress = ['WSCLC_SS052', 'WSCLC_SS056']

// ---- 除氟流程 ----

// 除氟设备？
// 除氟加药设备？

const defluorinationEquipment = ['WSCLC_JZ063', 'WSCLC_JZ049', 'WSCLC_SS110', 'WSCLC_SS111', 'WSCLC_SS109']

const STEP_INTERVAL = 1000 // 流程步骤时间间隔，单位：毫秒

type ViewpointSwitchNode = {
  type: 'viewpoint'
  name: string
}

type ModelDisplayNode = {
  type: 'model'
  nodes: string[]
  subtitle: string
}

type FlowNode = ViewpointSwitchNode | ModelDisplayNode

// 污水处理厂类
export class FoulWaterPlant {
  readonly viewer: Viewer

  parkTileset: Cesium3DTileset | undefined
  windowEntity: Entity | undefined
  treeTileset: Cesium3DTileset | undefined
  plantTileset: Cesium3DTileset | undefined

  plantTilesetLayer: TilesetLayer | undefined

  private removeEventHander: any

  private viewpointBookmark: ViewpointBookmark
  private mainFlowNodes: FlowNode[] // 主流程节点
  private deslimingFlowNodes: FlowNode[] // 污泥脱泥流程节点
  private defluorinationFlowNodes: FlowNode[] // 除氟流程节点

  private simulating = false

  constructor(viewer: Viewer) {
    this.viewer = viewer
    // debugger
    this.viewpointBookmark = new ViewpointBookmark(viewer)
    this.mainFlowNodes = [
      {
        type: 'viewpoint',
        name: '进水-粗格栅-提升泵',
      },
      {
        type: 'model',
        nodes: inlet,
        subtitle: '园区污水重力自流进入厂区',
      },
      {
        type: 'model',
        nodes: coarseGrilles,
        subtitle: '通过粗格栅隔渣',
      },
      {
        type: 'model',
        nodes: liftPumpingStation,
        subtitle: '经过提升泵提升',
      },
      {
        type: 'viewpoint',
        name: '细格栅-旋流沉沙器',
      },
      {
        type: 'model',
        nodes: fineGrille,
        subtitle: '进入细格栅隔渣',
      },
      {
        type: 'model',
        nodes: sandSettlingDevices,
        subtitle: '随后进入旋流沉池进行砂砾沉淀',
      },
      {
        type: 'viewpoint',
        name: '调节事故池',
      },
      {
        type: 'model',
        nodes: adjustAccidentPool,
        subtitle: '进入调节池对水质水量进行调节均质',
      },
      {
        type: 'model',
        nodes: [],
        subtitle: '事故时进入事故池',
      },
      {
        type: 'viewpoint',
        name: '一级絮凝池',
      },
      {
        type: 'model',
        nodes: primaryFlocculationTank,
        subtitle: '经过调节池提升泵提升进入一级絮凝池',
      },
      {
        type: 'viewpoint',
        name: '加药间',
      },
      {
        type: 'model',
        nodes: [],
        subtitle: '由加药设备加药至一二级絮凝池',
      },
      {
        type: 'viewpoint',
        name: 'AO-AO生化池',
      },
      {
        type: 'model',
        nodes: biochemicalTank,
        subtitle: '污水自流进入AO-AO生化池进行处理',
      },
      {
        type: 'viewpoint',
        name: '二沉池',
      },
      {
        type: 'model',
        nodes: sinkingPool,
        subtitle: '污水进入二沉池',
      },
      {
        type: 'viewpoint',
        name: '二级絮凝池',
      },
      {
        type: 'model',
        nodes: secondaryFlocculationTank,
        subtitle: '污水进入二级絮凝池进行进一步处理',
      },
      {
        type: 'viewpoint',
        name: '滤布滤池-紫外消毒-计量槽-出水',
      },
      {
        type: 'model',
        nodes: fibeclothFilter,
        subtitle: '污水经过二级生物处理后进入滤布滤池',
      },
      {
        type: 'model',
        nodes: [],
        subtitle: '污水经紫外消毒器进行消毒处理',
      },
      {
        type: 'model',
        nodes: [...measurementTank, ...outlet],
        subtitle: '污水经过计量槽后出厂区排放',
      },
    ]

    this.deslimingFlowNodes = [
      {
        type: 'viewpoint',
        name: '污泥脱泥',
      },
      {
        type: 'viewpoint',
        name: '污泥泵站',
      },
      {
        type: 'model',
        nodes: sludgePumpingStation,
        subtitle: '污水进入污泥泵站',
      },
      {
        type: 'viewpoint',
        name: '污泥浓缩池-调理池',
      },
      {
        type: 'model',
        nodes: sludgeThickeningTank,
        subtitle: '污水进入污泥浓缩池',
      },
      {
        type: 'model',
        nodes: sludgeConditioningTank,
        subtitle: '污水进入污泥调理池',
      },
      {
        type: 'viewpoint',
        name: '污泥加药间',
      },
      {
        type: 'model',
        nodes: [],
        subtitle: '由加药设备加药至污泥调理池',
      },
      {
        type: 'viewpoint',
        name: '板框压滤机房',
      },
      {
        type: 'model',
        nodes: filterPress,
        subtitle: '污泥经板框压滤机处理后外运填埋',
      },
    ]

    this.defluorinationFlowNodes = [
      {
        type: 'viewpoint',
        name: '除氟流程',
      },
      {
        type: 'viewpoint',
        name: '除氟设备',
      },
      {
        type: 'model',
        nodes: [],
        subtitle: '污水由调节池进入除氟设备进行处理',
      },
      {
        type: 'viewpoint',
        name: '除氟加药设备',
      },
      {
        type: 'model',
        nodes: [],
        subtitle: '除氟加药设备加药至调节池',
      },
      {
        type: 'model',
        nodes: [],
        subtitle: '除氟设备处理后进入后续处理单元',
      },
    ]
  }

  async loadModels(options: any) {
    // 设置为中午12点，防止模型显示过暗
    const d = new Date()
    d.setHours(12)
    d.setMinutes(0)
    d.setSeconds(0)
    this.viewer.clock.currentTime = JulianDate.fromDate(d)

    // 加载化工园区倾斜模型图层
    /*  const heightOffset = 40.0 // 倾斜模型抬升高度
    const parkTileset = loadTileset(this.viewer, {
      url: options.parkUrl,
      heightOffset,
      enableModelExperimental: true,
    }) */
    const parkTileset = window.tileset['倾斜摄影']
    // 倾斜模型压平
    flattenTileset(parkTileset, {
      southwest: Cartographic.fromDegrees(112.30423604132345, 31.417990474551704, 90.7865705479846),
      northeast: Cartographic.fromDegrees(112.30598504283829, 31.418503349561096, 85.55528917480562),
      height: 81.0, // 倾斜模型压平高度
      rotation: CesiumMath.toRadians(-19.0),
    })

    // 加载窗户模型
    const height = 34.4 // 污水处理厂模型高度
    const windowEntity = loadModel(this.viewer, options.windowUrl, height)

    // 加载树木模型
    const treeTileset = loadTileset(this.viewer, {
      url: options.treeUrl,
      heightOffset: height,
    })

    // 加载污水处理厂模型
    const plantTileset = loadTileset(this.viewer, {
      url: options.plantUrl,
      heightOffset: height,
      // backFaceCulling: false
    })

    this.plantTilesetLayer = new TilesetLayer(this.viewer, plantTileset)

    // 加载标注
    loadLabels(this.viewer, options.labelDataUrl)

    this.parkTileset = parkTileset
    this.windowEntity = windowEntity
    this.treeTileset = treeTileset
    this.plantTileset = plantTileset

    // 加载污水处理厂管道模型节点名称列表并分类
    const sceneTree = await Resource.fetchJson({ url: options.sceneTreeUrl })
    sceneTree.scenes[0].children.forEach((child: any) => {
      const name: string = child.name
      if (name.indexOf('JS') > -1 && !inletPipesExclude.includes(name)) {
        inletPipes.push(name)
      } else if (name.indexOf('WS0') > -1 && !wastePipesExclude.includes(name)) {
        wastePipes.push(name)
      } else if (name.indexOf('JY') > -1) {
        medicinePipes.push(name)
      } else if (name.indexOf('PQ') > -1) {
        aerationPipes.push(name)
      }
    })

    // 加载视角书签
    const viewpointData = await Resource.fetchJson({ url: options.viewpointDataUrl })
    this.viewpointBookmark.fromJSON(viewpointData)
  }

  // 污水处理厂全景
  flyToMainOverview() {
    this.viewpointBookmark.flyTo('厂区全景')
  }

  // 背景虚化
  blurBackground() {
    const plantTilesetLayer = this.plantTilesetLayer
    if (!plantTilesetLayer) {
      return
    }

    const scene = this.viewer.scene
    const translucency = scene.globe.translucency
    translucency.enabled = true
    translucency.frontFaceAlpha = 0.2
    translucency.backFaceAlpha = 0.2
    scene.skyBox.show = false
    scene.skyAtmosphere.show = false
    if (this.parkTileset) {
      this.parkTileset.show = false
    }
    if (this.treeTileset) {
      this.treeTileset.show = false
    }

    const translucentColor = Color.fromAlpha(Color.WHITESMOKE, 0.3)
    plantTilesetLayer.setFeatureColor(groundNodes, translucentColor)
    plantTilesetLayer.setFeatureColor(chemicalBuildingTopNodes, translucentColor)
    plantTilesetLayer.setFeatureColor(deepProcessingRoomTopNodes, translucentColor)
    plantTilesetLayer.setFeatureColor(defluorinationRoomTopNodes, translucentColor)
    plantTilesetLayer.setFeatureColor(dewateringRoomtOPNodes, translucentColor)

    plantTilesetLayer.setFeatureColor(waterNodes, Color.fromAlpha(Color.DARKGRAY, 0.3))
  }

  // 取消背景虚化
  cancelBlurBackground() {
    const plantTilesetLayer = this.plantTilesetLayer
    if (!plantTilesetLayer) {
      return
    }

    const scene = this.viewer.scene
    const translucency = scene.globe.translucency
    translucency.enabled = false
    translucency.frontFaceAlpha = 1.0
    translucency.backFaceAlpha = 1.0
    scene.skyBox.show = true
    scene.skyAtmosphere.show = true
    if (this.parkTileset) {
      this.parkTileset.show = true
    }
    if (this.treeTileset) {
      this.treeTileset.show = true
    }
    plantTilesetLayer.resetFeatureColor(groundNodes)
    plantTilesetLayer.resetFeatureColor(chemicalBuildingTopNodes)
    plantTilesetLayer.resetFeatureColor(deepProcessingRoomTopNodes)
    plantTilesetLayer.resetFeatureColor(defluorinationRoomTopNodes)
    plantTilesetLayer.resetFeatureColor(dewateringRoomtOPNodes)

    plantTilesetLayer.resetFeatureColor(waterNodes)
  }

  // 管道分类展示
  classifyPipeByColor() {
    const plantTilesetLayer = this.plantTilesetLayer
    if (!plantTilesetLayer) {
      return
    }

    plantTilesetLayer.setFeatureColor(inletPipes, inletPipeColor)
    plantTilesetLayer.setFeatureColor(wastePipes, wastePipeColor)
    plantTilesetLayer.setFeatureColor(medicinePipes, medicinePipeColor)
    plantTilesetLayer.setFeatureColor(aerationPipes, aerationPipeColor)
  }

  // 取消管道分类展示
  cancelClassifyPipeByColor() {
    const plantTilesetLayer = this.plantTilesetLayer
    if (!plantTilesetLayer) {
      return
    }

    plantTilesetLayer.resetFeatureColor(inletPipes)
    plantTilesetLayer.resetFeatureColor(wastePipes)
    plantTilesetLayer.resetFeatureColor(medicinePipes)
    plantTilesetLayer.resetFeatureColor(aerationPipes)
  }

  // 环绕飞行浏览
  startSurroundingTarget(position: Cartographic) {
    if (this.removeEventHander) {
      this.stopSurroundingTarget()
    }

    this.viewer.scene.screenSpaceCameraController.enableInputs = false
    let lastTime = performance.now() / 1000
    const speed = 0.2

    this.removeEventHander = this.viewer.scene.postUpdate.addEventListener((scene: Scene, time: JulianDate) => {
      const currentTime = performance.now() / 1000
      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      // 更新摄像机
      const axis = Cartographic.toCartesian(position)
      Cartesian3.normalize(axis, axis)

      this.viewer.camera.rotate(axis, speed * deltaTime)
    })
  }

  // 停止环绕飞行浏览
  stopSurroundingTarget() {
    this.viewer.scene.screenSpaceCameraController.enableInputs = true

    if (this.removeEventHander) {
      this.removeEventHander()
      this.removeEventHander = undefined
    }
  }

  // 开始主流程展示
  startMainFlowDisplay() {
    this.startFlowDisplay(this.mainFlowNodes)
  }

  // 开始污泥脱泥流程展示
  startDeslimingFlowDisplay() {
    this.startFlowDisplay(this.deslimingFlowNodes)
  }

  // 开始除氟流程展示
  startDefluorinationFlowDisplay() {
    this.startFlowDisplay(this.defluorinationFlowNodes)
  }

  // 停止工艺流程展示
  stopFlowDisplay() {
    if (!this.plantTilesetLayer || !this.simulating) {
      return
    }

    this.simulating = false
    canelWaitFor()
    this.viewer.camera.cancelFlight()
    this.plantTilesetLayer.cancelHighlightFeature()
    showSubtitle('')
  }

  private async startFlowDisplay(flowNodes: FlowNode[]) {
    const plantTilesetLayer = this.plantTilesetLayer
    if (!plantTilesetLayer || this.simulating) {
      return
    }

    this.simulating = true

    const typeSpeed = 50 // 打字速度, 单位毫秒

    const length = flowNodes.length
    for (let i = 0; i < length; ++i) {
      const flowNode = flowNodes[i]

      showSubtitle('')

      if (flowNode.type === 'viewpoint') {
        plantTilesetLayer.cancelHighlightFeature()

        // 视角切换
        const viewpoint = this.viewpointBookmark.getViewpointByName(flowNode.name)
        if (viewpoint) {
          const destination = viewpoint.destination
          const orientation = viewpoint.orientation

          const options: any = {
            destination: Cartesian3.fromDegrees(destination.longitude, destination.latitude, destination.height),
            orientation: {
              heading: CesiumMath.toRadians(orientation.heading),
              pitch: CesiumMath.toRadians(orientation.pitch),
              roll: CesiumMath.toRadians(orientation.roll),
            },
          }

          const result = await flyTo(this.viewer, options)
          if (result) {
            await waitFor(STEP_INTERVAL)
          }
        }
      } else if (flowNode.type === 'model') {
        // 高亮模型
        plantTilesetLayer.cancelHighlightFeature()
        plantTilesetLayer.highlightFeature(flowNode.nodes)

        // 显示字幕
        showSubtitle(flowNode.subtitle, typeSpeed)
        const duration = flowNode.subtitle.length * typeSpeed + 3000 // 展示时间, 单位毫秒

        await waitFor(STEP_INTERVAL + duration)
      }

      if (!this.simulating) {
        return
      }
    }

    this.simulating = false
    plantTilesetLayer.cancelHighlightFeature()
    showSubtitle('')
  }
}

let foulWaterPlant: FoulWaterPlant

async function initFoulWaterPlant(viewer: Viewer, options: any): Promise<FoulWaterPlant> {
  if (!foulWaterPlant) {
    foulWaterPlant = new FoulWaterPlant(viewer)
    await foulWaterPlant.loadModels(options)
  }

  return foulWaterPlant
}

function loadTileset(viewer: Viewer, options: { url: string; heightOffset: number; backFaceCulling?: boolean; enableModelExperimental?: boolean }) {
  const tileset = new Cesium3DTileset({
    url: options.url,
    backFaceCulling: options.backFaceCulling,
  })
  tileset.readyPromise
    .then(function (tileset: any) {
      viewer.scene.primitives.add(tileset)

      // adjust tileset's height
      const cartographic = Cartographic.fromCartesian(tileset.boundingSphere.center)
      const surface = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0)
      const offset = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, options.heightOffset)
      const translation = Cartesian3.subtract(offset, surface, new Cartesian3())
      tileset.modelMatrix = Matrix4.fromTranslation(translation)
    })
    .catch((e: any) => {
      console.log(e)
    })

  return tileset
}

function loadModel(viewer: Viewer, url: string, height: number) {
  const position = Cartesian3.fromDegrees(112.261983, 31.3453507487339, height)
  const heading = CesiumMath.toRadians(90)
  const pitch = CesiumMath.toRadians(0)
  const roll = CesiumMath.toRadians(0)
  const hpr = new HeadingPitchRoll(heading, pitch, roll)
  const orientation = Transforms.headingPitchRollQuaternion(position, hpr)

  return viewer.entities.add({
    id: 'wsclc-model',
    position: position,
    orientation: orientation as any,
    model: {
      uri: url,
    },
  })
}

async function loadLabels(viewer: Viewer, url: string) {
  const config = await Resource.fetchJson({ url })
  const elements = config.elements[1].elements

  elements.forEach((element: any) => {
    const coordinates = element.position
    const position = Cartographic.fromDegrees(coordinates[0], coordinates[1], coordinates[2])
    const position0 = Cartographic.clone(position)
    position0.height = 85.0

    let content = ''
    const text = element.text
    const length = text.length
    for (let i = 0; i < length; ++i) {
      const character = text.charAt(i)

      content += character + '\n'
    }
    content = content.substring(0, content.length - 1)

    viewer.entities.add({
      position: Cartographic.toCartesian(position),
      label: {
        text: content,
        horizontalOrigin: element.horizontalOrigin,
        verticalOrigin: element.verticalOrigin,
        font: `20px sans-serif`,
        // fillColor: element.fillColor,
        // outlineColor: element.outlineColor,
        // outlineWidth: element.outlineWidth,
        showBackground: true,
        // backgroundColor: element.backgroundColor
        distanceDisplayCondition: new DistanceDisplayCondition(10, 800),
      },
      polyline: {
        positions: [Cartographic.toCartesian(position0), Cartographic.toCartesian(position)],
        distanceDisplayCondition: new DistanceDisplayCondition(10, 800),
      },
    })
  })
}

function defer<T>() {
  let resolve: any
  let reject: any
  const promise = new Promise<T>(function (res, rej) {
    resolve = res
    reject = rej
  })

  return {
    resolve: resolve,
    reject: reject,
    promise: promise,
  }
}

let timePromise: any
let timerID: number

async function waitFor(milliseconds: number): Promise<boolean> {
  const timePromise = defer<boolean>()

  timerID = window.setTimeout(() => {
    timePromise.resolve(true)
  }, milliseconds)

  return timePromise.promise
}

function canelWaitFor() {
  if (!timePromise) {
    return
  }

  clearTimeout(timerID)

  timePromise.resolve(true)
}

async function flyTo(viewer: Viewer, options: any): Promise<boolean> {
  const zoomPromise = defer<boolean>()

  const orientation = options.orientation

  viewer.camera.flyTo({
    destination: options.destination,
    orientation: {
      heading: orientation.heading,
      pitch: orientation.pitch,
      roll: orientation.roll,
    },
    complete: function () {
      zoomPromise.resolve(true)
    },
    cancel: function () {
      zoomPromise.resolve(false)
    },
  })

  return zoomPromise.promise
}

export { foulWaterPlant, initFoulWaterPlant }
