import { Cartesian3, Math as CesiumMath, Viewer } from 'cesium'

export type Viewpoint = {
  name: string
  destination: {
    longitude: number
    latitude: number
    height: number
  }
  orientation: {
    heading: number
    pitch: number
    roll: number
  }
}

export class ViewpointBookmark {
  readonly viewer: Viewer

  private _viewpoints: Viewpoint[] = []

  constructor(viewer: Viewer) {
    this.viewer = viewer
  }

  get count(): number {
    return this._viewpoints.length
  }

  getViewpoint(index: number): Viewpoint {
    return this._viewpoints[index]
  }

  getViewpointByName(name: string): Viewpoint | undefined {
    const viewpoints = this._viewpoints
    const length = viewpoints.length
    for (let i = 0; i < length; ++i) {
      const viewpoint = viewpoints[i]

      if (viewpoint.name === name) {
        return viewpoint
      }
    }

    return undefined
  }

  flyTo(name: string) {
    const camera = this.viewer.camera

    const viewpoints = this._viewpoints
    const length = viewpoints.length
    for (let i = 0; i < length; ++i) {
      const viewpoint = viewpoints[i]

      if (viewpoint.name === name) {
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
        camera.flyTo(options)

        break
      }
    }
  }

  contains(name: string): boolean {
    const viewpoints = this._viewpoints
    const length = viewpoints.length
    for (let i = 0; i < length; ++i) {
      if (viewpoints[i].name === name) {
        return true
      }
    }

    return false
  }

  add(name: string) {
    const camera = this.viewer.camera
    const position = camera.positionCartographic

    const viewpoint = {
      name,
      destination: {
        longitude: CesiumMath.toDegrees(position.longitude),
        latitude: CesiumMath.toDegrees(position.latitude),
        height: position.height,
      },
      orientation: {
        heading: CesiumMath.toDegrees(camera.heading),
        pitch: CesiumMath.toDegrees(camera.pitch),
        roll: CesiumMath.toDegrees(camera.roll),
      },
    }

    this._viewpoints.push(viewpoint)
  }

  update(viewpoint: Viewpoint) {
    const camera = this.viewer.camera
    const position = camera.positionCartographic

    const destination = viewpoint.destination
    ;(destination.longitude = CesiumMath.toDegrees(position.longitude)), (destination.latitude = CesiumMath.toDegrees(position.latitude)), (destination.height = position.height)

    const orientation = viewpoint.orientation
    ;(orientation.heading = CesiumMath.toDegrees(camera.heading)), (orientation.pitch = CesiumMath.toDegrees(camera.pitch)), (orientation.roll = CesiumMath.toDegrees(camera.roll))
  }

  remove(viewpoint: Viewpoint) {
    const viewpoints = this._viewpoints
    const index = viewpoints.indexOf(viewpoint)
    if (index > -1) {
      viewpoints.splice(index, 1)
    }
  }

  removeAll() {
    this._viewpoints.length = 0
  }

  fromJSON(json: any) {
    json.forEach((item: any) => {
      const destination = item.destination
      const orientation = item.orientation

      const viewpoint = {
        name: item.name,
        destination: {
          longitude: destination.longitude,
          latitude: destination.latitude,
          height: destination.height,
        },
        orientation: {
          heading: orientation.heading,
          pitch: orientation.pitch,
          roll: orientation.roll,
        },
      }

      this._viewpoints.push(viewpoint)
    })
  }

  toJSON(): any {
    return this._viewpoints
  }
}
