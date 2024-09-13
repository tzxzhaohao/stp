<!-- 环境服务 -->
<template>
  <div :class="`${clsfix}-container`">
    <div :class="`${clsfix}-top-list`">
      <div class="item item-bg" v-for="(item, index) in DATA.list" :key="index" @click="openModal(`env_service_${item.key}`)" :class="currentModule === `env_service_${item.key}` ? 'is-checked' : ''">
        <div class="icon" :class="`icon${index + 1}`"></div>
        <div class="item-bottom">
          <div class="name">{{ item.name }}</div>
          <div class="value-unit">
            <span class="value">{{ item.value }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
    <div :class="[`${clsfix}-bottom item-bg`, currentModule === `env_service_company` ? 'is-checked' : '']" @click="openModal(`env_service_company`)">
      <div class="icon icon4"></div>
      <div class="count">
        <span class="name">服务机构</span>
        <div class="value-unit">
          <span class="value">{{ DATA.orgCount }}</span>
          <span class="unit">家</span>
        </div>
      </div>
      <div class="count">
        <span class="name">服务项目</span>
        <div class="value-unit">
          <span class="value">{{ DATA.projectCount }}</span>
          <span class="unit">个</span>
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
const { changeModule, currentModule } = useChangeModule()

const clsfix = 'dv-ipes-env-service'

const DATA = reactive<any>({
  list: [
    {
      name: '预警提醒',
      value: '',
      unit: '条',
      key: 'notice',
    },
    {
      name: '企业档案',
      value: '',
      unit: '个',
      key: 'file',
    },
    {
      name: '法律法规库',
      value: '',
      unit: '件',
      key: 'laws',
    },
  ],
  orgCount: '', // 服务机构
  projectCount: '', // 服务项目
})
onMounted(() => {
  fetchData()
})

const fetchData = async () => {
  try {
    const { data }: { data: any } = await request({
      method: 'get',
      url: '/prj-tianjin-server/api/v1/gis/comprehensive/panel/environment-service',
    })
    DATA.list[0].value = data.alarmNum
    DATA.list[1].value = data.companyNum
    DATA.list[2].value = data.lawsNum
    DATA.orgCount = data.agencyNum
    DATA.projectCount = data.projectNum
  } catch (error) {
    console.log(error)
  }
}

const $emit = defineEmits(['change'])
// 打开弹窗
const openModal = (key: string) => {
  $emit('change', key)
}
</script>

<script lang="ts"></script>

<style lang="scss">
.dv-ipes-env-service {
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
      .value {
        font: var(--dv-text-number3);
        color: var(--dv-color-index);
      }
      .unit {
        font: var(--dv-text-body1);
        color: var(--dv-color-text-secondary);
      }
    }
    .item-bg {
      border-radius: var(--dv-border-radius);
      background: var(--dv-color-fill-base);
      border: 1px solid var(--dv-color-border-base);
      &.is-checked {
        border: 1px solid #00deff;
        box-shadow: 0px 0px 6px 0px rgba(51, 135, 255, 0.72);
        background: #000a18;
      }

      .icon {
        width: 56px;
        height: 56px;
        background-repeat: no-repeat;
        background-size: cover;
        &.icon1 {
          background-image: url('~@/assets/images/env-service-icon1.png');
        }
        &.icon2 {
          background-image: url('~@/assets/images/env-service-icon2.png');
        }
        &.icon3 {
          background-image: url('~@/assets/images/env-service-icon3.png');
        }
        &.icon4 {
          background-image: url('~@/assets/images/env-service-icon4.png');
        }
      }
    }
  }

  &-top-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 8px;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      overflow: hidden;
      height: 124px;
      box-sizing: border-box;
      gap: 6px;
      .item-bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }
    }
  }

  &-bottom {
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    .count {
      display: flex;
      align-items: flex-end;
      gap: 4px;
    }
  }
}
</style>
