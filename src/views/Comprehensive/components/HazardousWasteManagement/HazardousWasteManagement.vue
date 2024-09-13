<template lang="pug">
.HazardousWasteManagement.flex
  .security-box(v-for='item in basicInfos'  :key='item.key'  :class='item.key')
        .box
          img(:src="getImg(item.icon)")
          .info
            .name {{ item.name }}
            .right.flex
              el-tooltip.item(:disabled='getShowData(infoData[item.key]) && (getShowData(infoData[item.key]).length < 8)', effect='dark', :content='getShowData(infoData[item.key])', placement='top-start')
                .value {{ getShowData(infoData[item.key]) }}
              .unit 吨
</template>
<script setup lang="ts">
import { ref } from 'vue'
import request from '@/utils/request'
import type { InfoItem, InfoData } from './type'
import dayjs from 'dayjs'

const basicInfos = ref<InfoItem[]>([
  { name: '危废产生', key: 'wasteGenerated', icon: 'production' },
  { name: '自行处置', key: 'selfUse', icon: 'dispose' },
  { name: '危废转移', key: 'transfer', icon: 'transfer' },
  { name: '危废贮存', key: 'stockWeight', icon: 'storage' },
])

const infoData = ref<InfoData>({
  wasteGenerated: 0,
  selfUse: 0,
  transfer: 0,
  stockWeight: 0,
})
const getImg = (key: string) => {
  return require(`@/assets/images/${key}.png`)
}
async function getData() {
  try {
    const { data }: { data: any } = await request({
      method: 'get',
      url: '/prj-tianjin-server/api/v1/gis/comprehensive/panel/pollution-emissions',
      params: {
        year: +dayjs().year(), // 年度(Integer)
      },
    })
    infoData.value = data as InfoData
  } catch (error) {
    console.log(error)
  }
}
function getShowData(value: number | null) {
  return value == null ? '0' : value
}
getData()
</script>
<style lang="scss">
.base-panel-item-active {
  .HazardousWasteManagement {
    .security-box {
      background-color: transparent !important;
      border-color: transparent !important;
    }
  }
}
</style>
<style lang="scss" scoped>
.HazardousWasteManagement {
  flex-wrap: wrap;
  border: 1px solid transparent;
  .security-box {
    display: flex;
    align-items: center;
    // width: 50%;
    height: 52px;
    padding: 8px;
    background-color: var(--dv-color-fill-base);
    border: 1px solid var(--dv-color-border-base);
    border-radius: 4px;
    flex: 1 1 40%;

    &:nth-child(2n) {
      margin-left: 8px;
    }
    &:nth-child(1),
    &:nth-child(2) {
      margin-bottom: 8px;
    }

    .box {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      height: 44px;
      padding: 0 0;

      img {
        width: 36px;
        height: 36px;
        margin-right: 12px;
      }

      .info {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        width: 82%;

        .name {
          font: var(--dv-text-headline2);
          color: var(--dv-color-text-primary);
        }

        .right {
          // max-width: 68%;
          font-weight: normal;
          justify-content: flex-start;

          .value {
            overflow: hidden; /* 文本超出隐藏 */
            font-family: var(--dv-font-family-number);
            font: var(--dv-text-number1);
            line-height: 20px;
            color: var(--dv-color-index);
            text-overflow: ellipsis; /* 文本超出显示省略号 */
            white-space: nowrap; /* 超出的空白区域不换行 */
          }

          .unit {
            margin-left: 4px;
            color: var(--dv-color-text-secondary);
          }
        }
      }
    }
  }
}
</style>
