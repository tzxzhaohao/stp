import Typed from 'typed.js'

const isMicApp = window.__MICRO_APP_ENVIRONMENT__

export function createSubtitleBar(viewer: any) {
  const container = viewer.container

  const statusbarContainer = isMicApp ? window.microApp.pureCreateElement('div') : document.createElement('div')
  statusbarContainer.className = 'mega3d-subtitle'
  statusbarContainer.style.left = '0px'
  statusbarContainer.style.right = '0px'
  statusbarContainer.style.bottom = '0px'
  container.appendChild(statusbarContainer)

  const statusbarContent = isMicApp ? window.microApp.pureCreateElement('span') : document.createElement('span')
  statusbarContent.id = 'subtitle-content'
  statusbarContent.className = 'mega3d-subtitle-content'
  statusbarContainer.appendChild(statusbarContent)
}

export function showSubtitle(content: string, typeSpeed?: number) {
  const el = isMicApp ? window.rawWindow.document.body.querySelector('#subtitle-content') : document.querySelector('#subtitle-content')
  const typed = new Typed(el, {
    strings: [content],
    typeSpeed,
    showCursor: false,
    backSpeed: 0,
  })
}
