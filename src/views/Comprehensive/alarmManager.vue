<template>
  <BasePanel title="报警管理" :width="320" :height="254">
    <table class="alarm_table">
      <thead>
        <tr>
          <th style="width: 28%" scope="col">报警时间</th>
          <th scope="col">设备</th>
          <th scope="col">级别</th>
          <th scope="col">处理状态</th>
        </tr>
      </thead>
      <tbody class="table_body_alarm">
        <tr v-for="(item, index) in tableData" :key="index">
          <td style="width: 28%">{{ item.date }}</td>
          <td>{{ item.equirementName }}</td>
          <td>
            <span :class="`level level_${item.level}`">{{ levelMap.get(item.level) }}</span>
          </td>
          <td>
            <span :class="{ status_success: item.status === 1, status_error: item.status === 0 }">{{ item.status === 1 ? '已处理' : '未处理' }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </BasePanel>
</template>
<script setup lang="ts">
import BasePanel from '@/components/BasePanel/BasePanel.vue'

const tableData = [
  {
    date: '2024.12.06',
    equirementName: '事故池',
    level: 1,
    status: 0,
  },
  {
    date: '2024.12.06',
    equirementName: '事故池',
    level: 2,
    status: 1,
  },
  {
    date: '2024.12.06',
    equirementName: '事故池',
    level: 3,
    status: 0,
  },
  {
    date: '2024.12.06',
    equirementName: '事故池',
    level: 1,
    status: 1,
  },
  {
    date: '2024.12.06',
    equirementName: '事故池',
    level: 3,
    status: 1,
  },
  {
    date: '2024.12.06',
    equirementName: '事故池',
    level: 2,
    status: 0,
  },
  {
    date: '2024.12.06',
    equirementName: '事故池',
    level: 1,
    status: 1,
  },
]
const levelMap = new Map()
levelMap.set(1, '轻度')
levelMap.set(2, '中度')
levelMap.set(3, '重度')
</script>
<style lang="scss" scoped>
.alarm_table {
  margin: 12px;
  border-collapse: collapse;
  /*  border: 2px solid rgba(27, 63, 85, 1); */
  font-family: sans-serif;
  font-size: 12px;
  letter-spacing: 1px;
  display: flex;
  flex-direction: column;
  max-height: 180px; /* 设置你想要的最大高度 */
  width: 298px;
  tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  .table_body_alarm {
    border-collapse: collapse;
    flex: 1 1 auto;
    overflow-y: auto;
    display: block;
    background-color: rgba(27, 63, 85, 0.3);
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: transparent;
      border-radius: 6px;
    }
    &:hover::-webkit-scrollbar-thumb {
      background: #079eb9;
    }
  }
  thead {
    border-collapse: collapse;
    flex: 0 0 auto;
    font-family: Microsoft YaHei;
    font-weight: 400;
    font-size: 11px;
    color: #95f1ff;
    width: calc(100% - 6px);
    background-color: rgba(27, 63, 85, 0.1);
  }

  th,
  td {
    border-collapse: collapse;
    border: 1px solid #284969;
    padding: 10px 6px;
  }

  td:last-of-type {
    text-align: center;
  }
  .status_success {
    font-family: Microsoft YaHei;
    font-weight: 400;
    font-size: 11px;
    color: #f2774a;

    font-style: italic;
  }
  .status_error {
    font-family: Microsoft YaHei;
    font-weight: 400;
    font-size: 11px;
    color: #37d893;

    font-style: italic;
  }
  .level {
    padding-left: 18px;
  }
  .level_1 {
    position: relative;
    &::after {
      position: absolute;
      left: 6px;
      top: 4px;
      content: '';
      width: 7px;
      height: 7px;
      background: #ecc73e;
      border-radius: 50%;
    }
  }
  .level_2 {
    position: relative;
    &::after {
      position: absolute;
      left: 6px;
      top: 4px;
      content: '';
      width: 7px;
      height: 7px;
      background: #ff771d;
      border-radius: 50%;
    }
  }
  .level_3 {
    position: relative;
    &::after {
      position: absolute;
      left: 6px;
      top: 4px;
      content: '';
      width: 7px;
      height: 7px;
      background: #ff4f4f;
      border-radius: 50%;
    }
  }
}
</style>
