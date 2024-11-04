import { Viewer } from 'cesium'
export function defer<T>() {
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

let viewer: Viewer

const readyPromise = defer<Viewer>()
const viewerReadyPromise = readyPromise.promise

function createViewer(id: string, options: any) {
  viewer = new Viewer(id, options)

  readyPromise.resolve(viewer)

  return viewer
}

export { viewerReadyPromise, createViewer }
