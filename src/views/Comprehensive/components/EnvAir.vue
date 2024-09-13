<!-- 大气环境 -->
<template>
  <div :class="`${clsfix}-container`">
    <div :class="`${clsfix}-bg-box`">
      <FpiElRolling direction="x" :time="30">
        <div class="bg"></div>
      </FpiElRolling>
    </div>
    <div :class="`${clsfix}-top`">
      <div :class="`${clsfix}-top-left`">
        <div class="aqiValue" :style="{ color: realtimeData.aqiColor }">
          {{ realtimeData.aqiVal }}
        </div>
        <div class="aqiInfo">
          <span>AQI</span>
          <span :style="{ color: realtimeData.aqiColor }">{{ realtimeData.aqiLevelText }}</span>
        </div>
      </div>
      <div :class="`${clsfix}-top-right`">
        <span class="data-time">{{ realtimeData.dataTime }}</span>
        <span class="text">首要污染物：{{ realtimeData.firstPollution }}</span>
      </div>
    </div>
    <div :class="`${clsfix}-list-box`">
      <div :class="`${clsfix}-list-box-title`">年度数据（2024年）</div>
      <ul :class="`${clsfix}-list`">
        <li v-for="(item, index) in realtimeData.yearList" :key="index" :class="`${clsfix}-list-item`">
          <span class="name">{{ item.name }}</span>
          <div class="value-box">
            <span class="value" :style="{ color: item.color }">{{ item.realVal }}{{ item.unit }}</span>
            <span class="split">/</span>
            <span class="value">{{ item.targetVal }}{{ item.unit }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { factorToColor, factorToLevelText } from 'fpi-tg-factor-tools'
import dayjs from 'dayjs'
import request from '@/utils/request'

const clsfix = 'dv-ipes-air-quality-realtime'
// 无数据颜色
const noDataColor = 'var(--dv-color-text-secondary)'
// 实时空气质量数据 默认无数据
const realtimeData = reactive<any>({
  aqiVal: '', // 空气质量指数（AQI）的值
  aqiColor: noDataColor, // 与AQI值对应的等级颜色
  aqiLevelText: '--', // 空气质量等级的文本描述
  firstPollution: '--', // 首要污染物名称
  dataTime: '', // 空气质量数据采集时间
  yearList: [
    {
      name: '优良率',
      realVal: '',
      targetVal: '',
      unit: '%',
      color: noDataColor,
    },
    {
      name: 'PM2.5',
      realVal: '',
      targetVal: '',
      unit: '',
      color: noDataColor,
    },
    {
      name: '重污染天数',
      realVal: '',
      targetVal: '',
      unit: '',
      color: noDataColor,
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
      url: '/ipes-data-aggregation-server/api/v1/env-protection/aqms-manage',
    })
    realtimeData.aqiVal = data.aqiValue || '--'
    realtimeData.aqiColor = data.aqiColor || noDataColor
    realtimeData.aqiLevelText = data.aqiLevel || '--'
    realtimeData.firstPollution = data.mainPolluter || '--'
    realtimeData.dataTime = data.tianjinTime
    const yearList = [
      {
        realVal: data.yearRatio,
        targetVal: data.goal,
      },
      {
        realVal: data.pm25,
        targetVal: data.pm25Goal,
      },
      {
        realVal: data.heavyPollutionDays,
        targetVal: data.heavyPollutionDaysGoal,
      },
    ]
    realtimeData.yearList.forEach((item: any, index: number) => {
      Object.assign(item, yearList[index])
      if (String(item.realVal) === 'null' || String(item.realVal) === '--') {
        item.color = noDataColor
        return
      }
      if (item.name !== '优良率') {
        item.color = Number(item.realVal) > Number(item.targetVal) ? '#F53F3F' : '#25D04F'
      } else {
        item.color = Number(item.realVal) < Number(item.targetVal) ? '#F53F3F' : '#25D04F'
      }
    })
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss">
.base-panel-item-active {
  .dv-ipes-air-quality-realtime-bg-box {
    display: none;
  }
}
.dv-ipes-air-quality-realtime {
  &-container {
    height: 138px;
    padding: 8px;
    border-radius: var(--dv-border-radius);
    color: var(--dv-color-text-primary);
    position: relative;
    overflow: hidden;
  }

  &-bg-box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .bg {
      width: 460px;
      height: 138px;
      background-image: url('~@/assets/images/env-air-bg.png');
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  &-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    padding: 8px 8px 8px 16px;
    position: relative;
  }

  &-top-left {
    display: flex;
    justify-content: flex-start;

    .aqiValue {
      box-sizing: border-box;
      margin-right: 8px;
      font: var(--dv-text-number8);
    }

    .aqiInfo {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      width: 64px;

      span:first-child {
        font: var(--dv-text-number1);
        color: var(--dv-color-text-primary);
      }

      span:last-child {
        font: var(--dv-text-headline2);
      }
    }
  }

  &-top-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    height: 100%;

    .data-time {
      font: var(--dv-text-number2);
      color: var(--dv-color-text-secondary);
    }

    .text {
      font: var(--dv-text-body2);
      color: var(--dv-color-text-secondary);
    }
  }

  &-list-box {
    width: 100%;
    height: 66px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0px 4px 0px;
    background: rgba(148, 187, 253, 0.15);
    backdrop-filter: blur(2px);
  }

  &-list-box-title {
    font: var(--dv-text-headline3);
  }

  &-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &-list-item {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    height: 38px;
    .value-box {
      display: flex;
    }

    .name {
      font: var(--dv-text-body2);
      color: var(--dv-color-text-primary);
    }

    .split {
      font: var(--dv-text-number1);
      margin: 0 2px;
      color: rgba(255, 255, 255, 0.5);
    }

    .value {
      font: var(--dv-text-number1);
      color: var(--dv-color-text-primary);
    }
  }
}
</style>
