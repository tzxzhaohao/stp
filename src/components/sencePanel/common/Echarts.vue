<!-- echarts -->
<template lang="pug">
.chart
    .echarts-box(ref="echart")
</template>
<script>
export default {
  name: 'Echarts',
  props: {
    // echart配置相关
    option: {
      default: () => ({}),
      type: Object,
    },
  },
  watch: {
    option: {
      handler() {
        this.draw()
      },
      deep: true,
    },
  },

  data() {
    this.myChart = null
    return {}
  },
  methods: {
    draw() {
      if (!this.option || JSON.stringify(this.option) === '{}') return
      if (!this.myChart) {
        this.myChart = window.echarts.init(this.$refs.echart)
      }
      // 绘制图表
      this.myChart.setOption(this.option, true)
      this.myChart.on('click', value => {
        this.$emit('clickC', value)
      })
      this.myChart.on('mousemove', value => {
        this.$emit('mousemoveC', value)
      })
    },
    // 减少触发次数
    throttle(func, delay) {
      let timer = null
      let startTime = Date.now()
      return function () {
        const curTime = Date.now()
        const remaining = delay - (curTime - startTime)
        const that = this
        const args = arguments
        clearTimeout(timer)
        if (remaining <= 0) {
          func.apply(that, args)
          startTime = Date.now()
        } else {
          timer = setTimeout(func, remaining)
        }
      }
    },
    resizeEcharts() {
      if (this.myChart) {
        this.myChart.resize()
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.throttle(this.resizeEcharts, 1000))
    })
    this.draw()
  },
}
</script>
<style lang="scss" scoped>
.chart {
  position: relative;
  z-index: 99;
}
.echarts-box {
  height: 100%;
}
.chartBG {
  position: absolute;
  top: 0;
  left: -2px;
  width: 100%;
  height: 100%;
  background: url('./image/chartBG.png') left center no-repeat;
}
</style>
