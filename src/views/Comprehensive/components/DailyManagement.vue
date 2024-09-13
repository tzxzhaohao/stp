<!-- 日常管理 -->
<template>
  <div :class="`${clsfix}-container`">
    <div :class="`${clsfix}-top-list`">
      <div class="item" v-for="(item, index) in DATA.list" :key="index" @click="openModal(item.key)">
        <div class="item-bottom" :class="`icon${index + 1}`"></div>
        <div class="item-top">
          <div class="name">{{ item.name }}</div>
          <div class="value-total">
            <span class="value">{{ item.value }}</span>
            <span class="total">/{{ item.total }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import dayjs from 'dayjs'
import request from '@/utils/request'
import { useChangeModule } from '@/hooks/mainMapTool'
import { useGlobalStore } from '@/stores/global'

const { changeModule, currentModule } = useChangeModule()
const { changeCurrentModuleChild, currentModuleChild } = useGlobalStore()

const clsfix = 'dv-ipes-daily-management'

const DATA = reactive<any>({
  list: [
    {
      name: '现场检查',
      value: '',
      total: '',
      key: 'daily_management_jc',
    },
    {
      name: '环境报警',
      value: '',
      total: '',
      key: 'daily_management_bj',
    },
    {
      name: '问题线索',
      value: '',
      total: '',
      key: 'daily_management_xs',
    },
    {
      name: '行政许可',
      value: '',
      total: '',
      key: 'daily_management_xk',
    },
  ],
})
onMounted(() => {
  fetchData()
})

const fetchData = async () => {
  try {
    const params = {
      year: dayjs().format('YYYY'),
    }
    const { data }: { data: any } = await request({
      method: 'get',
      url: '/prj-tianjin-server/api/v1/gis/comprehensive/panel/day-management',
      params,
    })
    DATA.list = [
      {
        name: '现场检查',
        value: data.completedInspectionTask,
        total: data.totalInspectionTask,
        key: 'daily_management_jc',
      },
      {
        name: '环境报警',
        value: data.completedEnvAlarm,
        total: data.totalEnvAlarm,
        key: 'daily_management_bj',
      },
      {
        name: '问题线索',
        value: data.completedProblemEvent,
        total: data.totalProblemEvent,
        key: 'daily_management_xs',
      },
      {
        name: '行政许可',
        value: data.completedCpsAdministrativeLicense,
        total: data.totalCpsAdministrativeLicense,
        key: 'daily_management_xk',
      },
    ]
  } catch (error) {
    console.log(error)
  }
}
const $emit = defineEmits(['change'])

// 打开弹窗
const openModal = (key: string) => {
  changeCurrentModuleChild(key)
  $emit('change', 'daily_management')
}
</script>

<script lang="ts"></script>

<style lang="scss">
.dv-ipes-daily-management {
  &-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    // gap: 12px;
  }

  &-top-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    // gap: 0 12px;
    .item {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      position: relative;
      .item-bottom {
        width: 146px;
        height: 104px;
        background-repeat: no-repeat;
        background-size: cover;
        &.icon1,
        &.icon2 {
          background-image: url('~@/assets/images/daily-management-icon1.png');
        }
        &.icon3,
        &.icon4 {
          background-image: url('~@/assets/images/daily-management-icon2.png');
        }
      }
      .item-top {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        position: absolute;
        top: 14px;
        .name {
          font: var(--dv-text-headline2);
          color: var(--dv-color-text-primary);
        }
        .value-total {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          .value {
            font: var(--dv-text-number5);
            color: var(--dv-color-index);
          }
          .total {
            font: var(--dv-text-number5);
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
