<!-- 水环境 -->
<template>
  <div :class="`${clsfix}-container`">
    <div :class="`${clsfix}-bg-box`">
      <FpiElRolling direction="x" :time="20">
        <div class="bg"></div>
      </FpiElRolling>
    </div>
    <div :class="`${clsfix}-left`">
      <div class="name" :title="realtimeData.siteName">{{ realtimeData.siteName }}</div>
      <div class="left-mid">
        <span class="level" :style="{ color: realtimeData.levelColor }">{{ realtimeData.levelText }}</span>
        <span class="unit">类</span>
        <span class="standard" :style="{ background: realtimeData.standardColor }">{{ realtimeData.standardText }}</span>
      </div>
      <div class="time">{{ realtimeData.dataTime }}</div>
    </div>
    <div :class="`${clsfix}-list-box`">
      <div :class="`${clsfix}-list-box-title`">年度数据（2024年）</div>
      <ul :class="`${clsfix}-list`">
        <li v-for="(item, index) in realtimeData.yearList" :key="index" :class="`${clsfix}-list-item`">
          <span class="name">{{ item.name }}</span>
          <span class="value" :style="{ color: item.color }">{{ item.value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import dayjs from 'dayjs'
import request from '@/utils/request'

const clsfix = 'dv-ipes-water-quality-standard-realtime'
// 无数据颜色
const noDataColor = 'var(--dv-color-text-secondary)'
// 实时数据
const realtimeData = reactive<any>({
  siteName: '', // 站点名称
  levelColor: '#D9CC4C', // 等级颜色
  levelText: '', // 等级文本
  standardColor: '', // 标准颜色
  standardText: '', // 达标文本
  dataTime: '', // 更新时间
  yearList: [
    {
      name: '排海污水达标率',
      value: '',
      unit: '%',
      color: '#25D04F',
    },
    {
      name: '排海雨水达标率',
      value: '',
      unit: '%',
      color: '#25D04F',
    },
  ],
})
onMounted(() => {
  fetchData()
})

const fetchData = async () => {
  try {
    const { data }: { data: any } = await request({
      method: 'get',
      url: '/prj-tianjin-server/api/v1/gis/comprehensive/panel/wms',
    })
    realtimeData.yearList[0].value = data.reachStandardOfIntoSeaWw // 排海污水达标率
    realtimeData.yearList[1].value = data.reachStandardOfIntoSeaRain // 排海雨水达标率
    realtimeData.siteName = data.siteName
    realtimeData.levelColor = data.color
    realtimeData.levelText = data.level
    if (data.reachStandard !== null) {
      realtimeData.standardColor = data.reachStandard ? '#00B42A' : '#F53F3F'
      realtimeData.standardText = data.reachStandard ? '达标' : '未达标'
    }
    realtimeData.dataTime = data.time
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss">
.base-panel-item-active {
  .dv-ipes-water-quality-standard-realtime-bg-box {
    display: none;
  }
}
.dv-ipes-water-quality-standard-realtime {
  &-container {
    height: 92px;
    padding: 10px 8px;
    border-radius: var(--dv-border-radius);
    color: var(--dv-color-text-primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    gap: 8px;
  }

  &-bg-box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .bg {
      width: 296px;
      height: 92px;
      background-image: url('~@/assets/images/env-water-bg.png');
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  &-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 62px;
    position: relative;
    flex: 1;
    overflow: hidden;
    .name {
      font: var(--dv-text-headline2);
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .left-mid {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 4px;
      width: 104px;
    }
    .level {
      font: var(--dv-text-number5);
    }
    .unit {
      font: var(--dv-text-body1);
    }
    .standard {
      font: var(--dv-text-body2);
      // width: 32px;
      height: 16px;
      padding: 0 4px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .time {
      font: var(--dv-text-number2);
      color: var(--dv-color-text-secondary);
    }
  }

  &-list-box {
    width: 158px;
    height: 72px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px 12px;
    // gap: 8px;
    background: rgba(148, 187, 253, 0.15);
    backdrop-filter: blur(3px);
  }

  &-list-box-title {
    font: var(--dv-text-headline3);
  }

  &-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }

  &-list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 14px;
    .name {
      font: var(--dv-text-body2);
      color: var(--dv-color-text-primary);
    }
    .value {
      font: var(--dv-text-number1);
      color: var(--dv-color-text-primary);
    }
  }
}
</style>
