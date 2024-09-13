<template>
  <ul class="menu_list">
    <li :class="['menu_item', 'menu_item_' + index]" :key="index" v-for="(item, index) in menuList">
      <span>{{ item.title }}</span>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const menuList = ref([
  {
    title: '工艺流程图一',
    color: 'rgba(2, 218, 230, 1)',
  },
  {
    title: '工艺流程图二',
    color: 'rgba(76, 190, 255, 1)',
  },
  {
    title: '工艺流程图三',
    color: 'rgba(255, 201, 51, 1)',
  },
])
</script>
<style scoped lang="scss">
.menu_item {
  width: 269px;
  height: 74px;
  line-height: 74px;
  padding-left: 92px;
  margin-bottom: 19px;
  font-family: var(--font-family-main-title);
  font-size: 25px;
  font-weight: normal;
  cursor: pointer;
}
.menu_item_0 {
  background-image: url('@/views/Comprehensive/images/btn_flow1.png');
  color: rgba(2, 218, 230, 1);
  background-size: cover;
}
.menu_item_1 {
  background-image: url('@/views/Comprehensive/images/btn_flow2.png');
  color: rgba(76, 190, 255, 1);
  background-size: cover;
}
.menu_item_2 {
  background-image: url('@/views/Comprehensive/images/btn_flow3.png');
  color: rgba(255, 201, 51, 1);
  background-size: cover;
}
</style>
