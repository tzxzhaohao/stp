<template>
  <div class="equirement_box">
    <div :class="`chart_box_equirement_bg_${equirementStatus.index}`"></div>
    <Echarts class="chart_box_equirement" :option="options" />
    <div class="status_name">{{ equirementStatus.name }}</div>
  </div>
</template>
<script setup lang="ts">
import Echarts from '@/components/sencePanel/common/Echarts.vue'
import { reactive } from 'vue'
interface EquirementStatus {
  name: string
  total: number
  value: number
  index: number
}
const props = defineProps<{ equirementStatus: EquirementStatus }>()
const colorList = [
  {
    borderColor: 'rgba(41, 143, 231, 1)',
    color1: 'rgba(41, 143, 231, 0.1)',
    color2: 'rgba(41, 143, 231, 0.3)',
    color3: 'rgba(41, 143, 231, 0.5)',
    color4: 'rgba(41, 143, 231, 0.2)',
    color5: 'rgba(41, 143, 231, 0.4)',
    color6: 'rgba(41, 143, 231, 0.6)',
  },
  {
    borderColor: 'rgba(218, 197, 37, 0.7)',
    color1: 'rgba(218, 197, 37, 0.1)',
    color2: 'rgba(218, 197, 37, 0.3)',
    color3: 'rgba(218, 197, 37, 0.5)',
    color4: 'rgba(218, 197, 37, 0.2)',
    color5: 'rgba(218, 197, 37, 0.4)',
    color6: 'rgba(218, 197, 37, 0.6)',
  },
  {
    borderColor: 'rgba(199, 72, 78, 1)',
    color1: 'rgba(199, 72, 78, 0.1)',
    color2: 'rgba(199, 72, 78, 0.3)',
    color3: 'rgba(199, 72, 78, 0.5)',
    color4: 'rgba(199, 72, 78, 0.2)',
    color5: 'rgba(199, 72, 78, 0.4)',
    color6: 'rgba(199, 72, 78, 0.6)',
  },
]

const options = reactive({
  /*   backgroundColor: "#010e19", */

  series: [
    {
      type: 'liquidFill',
      radius: '97%', // 半径大小
      center: ['50%', '50%'], // 布局位置
      data: [
        {
          value: props.equirementStatus.value / props.equirementStatus.total,
          direction: 'left',
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: colorList[props.equirementStatus.index].color1,
                  },
                  {
                    offset: 0.5,
                    color: colorList[props.equirementStatus.index].color2,
                  },
                  {
                    offset: 0,
                    color: colorList[props.equirementStatus.index].color3,
                  },
                ],
                globalCoord: false,
              },
            },
          },
        },
        {
          value: props.equirementStatus.value / props.equirementStatus.total,
          direction: 'left',
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: colorList[props.equirementStatus.index].color4,
                  },
                  {
                    offset: 0.5,
                    color: colorList[props.equirementStatus.index].color5,
                  },
                  {
                    offset: 0,
                    color: colorList[props.equirementStatus.index].color6,
                  },
                ],
                globalCoord: false,
              },
            },
          },
        },
      ], // 水球波纹值

      outline: {
        // 轮廓设置
        show: true,
        borderDistance: 1, // 轮廓间距
        itemStyle: {
          borderColor: colorList[props.equirementStatus.index].borderColor, // 轮廓颜色
          borderWidth: 1, // 轮廓大小
          shadowBlur: 'none', // 轮廓阴影
        },
      },

      label: {
        position: ['50%', '50%'],
        formatter: function () {
          return `${props.equirementStatus.value}\n台`
        },
        fontSize: 16,
        color: '#FFFFFF',
      },

      backgroundStyle: {
        color: 'transparent',
      },
    },
  ],
})
</script>
<style lang="scss">
.equirement_box {
  position: relative;
}
.chart_box_equirement {
  width: 60px;
  height: 60px;
}
.chart_box_equirement_bg_0 {
  position: absolute;
  left: -5px;
  top: -5px;
  background-image: url('@/assets/images/pic_circle1_online.png');
  background-size: cover;
  width: 70px;
  height: 70px;
}
.chart_box_equirement_bg_1 {
  position: absolute;
  left: -5px;
  top: -5px;
  background-image: url('@/assets/images/pic_circle2_offline.png');
  background-size: cover;
  width: 70px;
  height: 70px;
}
.chart_box_equirement_bg_2 {
  position: absolute;
  left: -5px;
  top: -5px;
  background-image: url('@/assets/images/pic_circle3_breakdown.png');
  background-size: cover;
  width: 70px;
  height: 70px;
}
.status_name {
  position: absolute;
  bottom: -28px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #fff;
}
</style>
