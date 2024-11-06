import Typed from 'typed.js'

export function createSubtitleBar(viewer: any) {
  const container = viewer.container

  const statusbarContainer = document.createElement('div')
  statusbarContainer.className = 'mega3d-subtitle'
  statusbarContainer.style.left = '0px'
  statusbarContainer.style.right = '0px'
  statusbarContainer.style.bottom = '0px'
  container.appendChild(statusbarContainer)

  const statusbarContent = document.createElement('span')
  statusbarContent.id = 'subtitle-content'
  statusbarContent.className = 'mega3d-subtitle-content'
  statusbarContainer.appendChild(statusbarContent)
}

export function showSubtitle(content: string, typeSpeed?: number) {
  const typed = new Typed('#subtitle-content', {
    strings: [content],
    typeSpeed,
    showCursor: false,
    backSpeed: 0,
  })
}
