<!-- 环境监管 -->
<template>
  <div :class="`${clsfix}-container`">
    <div :class="`${clsfix}-top-list`">
      <div class="item" v-for="(item, index) in DATA.list" :key="index" @click="openModal(item.key)">
        <div class="icon" :class="`icon${index + 1}`"></div>
        <div class="item-right">
          <div class="name">{{ item.name }}</div>
          <div class="value-unit">
            <span class="value">{{ item.value }}</span>
            <span class="unit">件</span>
          </div>
        </div>
      </div>
    </div>
    <div :class="`${clsfix}-bottom`" @click="openModal('env_monitor_cf')">
      <div class="count">
        <span class="name">行政处罚</span>
        <div class="value-unit">
          <span class="value">{{ DATA.count }}</span>
          <span class="unit">例</span>
        </div>
      </div>
      <div class="money">
        <span class="name">金额</span>
        <div class="value-unit">
          <span class="value">{{ DATA.money }}</span>
          <span class="unit">万</span>
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

const clsfix = 'dv-ipes-env-monitor'

const DATA = reactive<any>({
  list: [
    {
      name: '环保督察',
      value: '',
      key: 'env_monitor_dc',
    },
    {
      name: '环境信访',
      value: '',
      key: 'env_monitor_xf',
    },
  ],
  count: '', // 行政处罚
  money: '', // 金额
})
onMounted(() => {
  fetchData()
})

const $emit = defineEmits(['change'])

const fetchData = async () => {
  try {
    const params = {
      year: dayjs().format('YYYY'),
    }
    const { data }: { data: any } = await request({
      method: 'get',
      url: '/prj-tianjin-server/api/v1/gis/comprehensive/panel/environmental-regulation',
      params,
    })
    DATA.list = [
      {
        name: '环保督察',
        value: data.duChaNum,
        key: 'env_monitor_dc',
      },
      {
        name: '环境信访',
        value: data.xinFangNum,
        key: 'env_monitor_xf',
      },
    ]
    DATA.count = data.chuFaNum
    DATA.money = data.punishAmount
  } catch (error) {
    console.log(error)
  }
}

// 打开弹窗
const openModal = (key: string) => {
  changeCurrentModuleChild(key)
  $emit('change', 'env_monitor')
}
</script>

<script lang="ts"></script>

<style lang="scss">
.dv-ipes-env-monitor {
  &-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    .name {
      font: var(--dv-text-headline2);
      color: var(--dv-color-text-primary);
    }
    .value-unit {
      display: flex;
      align-items: flex-end;
      gap: 2px;
      .unit {
        font: var(--dv-text-body1);
        color: var(--dv-color-text-secondary);
      }
    }
  }

  &-top-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 144px;
      height: 60px;
      padding: 0 6px;
      .icon {
        width: 60px;
        height: 56px;
        background-repeat: no-repeat;
        background-size: cover;
        &.icon1 {
          background-image: url('~@/assets/images/env-monitor-icon1.png');
        }
        &.icon2 {
          background-image: url('~@/assets/images/env-monitor-icon2.png');
        }
      }
      .item-right {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .value {
          font: var(--dv-text-number3);
          color: var(--dv-color-index);
        }
      }
    }
  }

  &-bottom {
    width: 100%;
    height: 56px;
    background-image: url('~@/assets/images/env-monitor-bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    .value {
      font: var(--dv-text-number5);
    }
    .count {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      .value {
        color: var(--dv-color-index);
      }
    }
    .money {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      .value {
        color: var(--dv-color-warning);
      }
    }
  }
}
</style>
