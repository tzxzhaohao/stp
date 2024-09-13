<style lang="scss" scoped>
.root-scrollbar {
  position: relative;
  height: 100%;
  min-width: 100%;
  overflow: hidden;
}
</style>
<template lang="pug">
.root-scrollbar(ref='scrollbar')
    .root-scrollbar-content(ref="scrollbarContent")
        slot
</template>
<script>
import BScroll from 'better-scroll'
import _throttle from 'lodash/throttle'

export default {
  name: 'i-scrollbar',
  components: {},
  data() {
    return {}
  },
  created() {
    this.ps = undefined
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.scrollbar) {
        this.ps = new BScroll(this.$refs.scrollbar, {
          scrollY: true,
          scrollX: false,
          click: true,
          mouseWheel: true,
          bounce: false,
          observeDOM: true, // 开启 observe-dom 插件
          stopPropagation: true,
          scrollbar: {
            interactive: true,
            scrollbarTrackClickable: true,
          },
        })
      } else {
        setTimeout(() => {
          this.ps = new BScroll(this.$refs.scrollbar, {
            scrollY: true,
            scrollX: false,
            click: true,
            fade: false,
            mouseWheel: true,
            bounce: false,
            observeDOM: true, // 开启 observe-dom 插件
            scrollbar: {
              interactive: true,
              scrollbarTrackClickable: true,
            },
          })
        }, 100)
      }
    })
  },
  methods: {
    // 滚动到顶部
    gotoTop() {
      this.ps?.scrollBy(0, 0, 0)
    },
    // 更新滚动条
    update() {
      console.log('this.ps?.refresh')
      this.ps?.refresh()
    },
    // 纵轴滚动
    scrollY(distance) {
      this.ps?.scrollBy(0, distance, 0) // distance: 滚动的距离
    },
  },
}
</script>
