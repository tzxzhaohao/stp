<template lang="pug">
.base-panel-item.WasteGasWastewater(:class="['base-panel-item', props.isChecked ? 'base-panel-item-active' : '']")
  .base-panel-item-header
    .base-panel-item-header-title.flex
      .title-box 减污降碳{{titleTip}}

      .tab-box
        BaseButtonTabs(:list="list" v-model="currentTab" @change="handleClick")
  .base-panel-item-content(@click="handleClickWastewater(currentTab)")
    .ww-box
      FpiElRolling.box(v-model="isRolling" direction='y', :time='15')
        .list(v-for='(item, index) in factorViewList' :key='index')
          .top
            .name
              | {{ item.factorName }}
            |
            .number
              .value(:class='{ over: item.exceed }')
                | {{ item.factorValue }}
              |
              .divider
                | /
              |
              .count
                | {{ item.targetValue }}
          |
          .porgress
            .percent(:class='{ over: item.exceed }', :style="{ width: item.percent > 100 ? '100%' : `${item.percent}%` }")
</template>
<script setup lang="ts">
import { defineProps, ref, computed } from 'vue'
import { FpiElRolling } from '@ued_fpi/element-plus-expand'
import type { Item, Tab, DischargeItem } from './type'
import request from '@/utils/request'
import BaseButtonTabs from '@/components/BaseButtonTabs/BaseButtonTabs.vue'
import dayjs from 'dayjs'
import { useChangeModule } from '@/hooks/mainMapTool'

const props = defineProps({
  /** 是否选中 */
  isChecked: {
    type: Boolean,
    default: false,
  },
  /** 是否可以被选中 */
  canCheck: {
    type: Boolean,
    default: false,
  },
})

const $emit = defineEmits(['change'])

const { changeModule, currentModule } = useChangeModule()

const list = ref<Tab[]>([
  {
    name: '废气',
    id: 'atm_discharge',
  },
  {
    name: '废水',
    id: 'atm_discharge_water',
  },
])
// 当前选中的tab 废水 wastewater 废气 atm_discharge
const currentTab = ref<string>('atm_discharge')

// 切换tab
function handleClick(v: string) {
  currentTab.value = v
  if (currentModule.value === 'atm_discharge' || currentModule.value === 'atm_discharge_water') {
    handleClickWastewater(v)
  }
}

// 选择废气废水场景
function handleClickWastewater(value: string) {
  $emit('change', value)
}

const discharge = ref<DischargeItem[]>([])

const factorList = ref<Item[]>([
  // {
  //   factorCode: 'a24088-Cou',
  //   factorName: '非甲烷总烃',
  //   factorValue: 22,
  //   targetValue: 10001.0,
  //   percent: 30,
  //   exceed: false,
  // },
  // {
  //   factorCode: 'a24088-Cou2',
  //   factorName: '非甲烷总烃2',
  //   factorValue: 22,
  //   targetValue: 10001.0,
  //   percent: 20,
  //   exceed: true,
  // },
])

// 废气废水
const factorViewList = computed(() => {
  const getName = currentTab.value === 'atm_discharge_water' ? '年度废水排放量' : '年度废气排放量'
  const item = discharge.value.find((e: DischargeItem) => e.name === getName) as DischargeItem | undefined
  return item?.factorList ?? []
})

// 是否轮播， 当数据小于3条就不播
const isRolling = computed(() => {
  return factorViewList.value.length > 4
})

// 改变轮播的行为，默认是hover, 小于3条时，不轮播，要设为none
// const actionType = ref<string>('none')

async function getData() {
  try {
    const { data }: { data: any } = await request({
      method: 'get',
      url: '/ipes-data-aggregation-server/api/v1/env-protection/discharge',
    })
    discharge.value = data
  } catch (error) {
    console.log(error)
  }
}
getData()
const titleTip = ref(`（${dayjs().format('YYYY')}年）`)
</script>
<style lang="scss" scoped>
.WasteGasWastewater {
  .ww-box {
    border: 1px solid var(--dv-color-border-base);
    background-color: var(--dv-color-fill-base);
  }
  .tab-box {
    .tab + .tab {
      margin-left: 2px;
    }
  }

  .box {
    width: 100%;
    height: 156px;
    overflow: hidden;
    padding: 12px;

    .list {
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }

      .top {
        display: flex;
        justify-content: space-between;
        line-height: 16px;

        .name {
          font-size: var(--ipes-dv-text-body1);
          font-weight: normal;
          color: var(--dv-color-text-primary);
        }

        .number {
          display: flex;
          font-size: var(--ipes-dv-text-number3);
          font-weight: normal;

          .value {
            color: var(--dv-color-success);

            &.over {
              color: var(--dv-color-danger);
            }
          }

          .divider {
            margin: 0 2px;
            color: var(--dv-color-text-placeholder);
          }

          .count {
            color: var(--dv-color-index);
          }
        }
      }

      .porgress {
        position: relative;
        width: 100%;
        height: 8px;
        margin-top: 8px;
        background: var(--dv-color-fill-lighter);
        border-radius: 8px;

        .percent {
          position: absolute;
          left: 0;
          height: 8px;
          background: var(--dv-color-success);
          border-radius: 8px;

          &.over {
            background: var(--dv-color-danger);
          }
        }
      }
    }
  }
}
</style>
