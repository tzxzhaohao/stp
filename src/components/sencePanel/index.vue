<template lang="pug">
.sencePanels(:class='isModalStyle ? "modal" : ""')
    //- component(:is='currentModule')
</template>

<script lang="ts">
import { defineComponent } from 'vue'
</script>
<script setup lang="ts">
import { computed, watch } from 'vue'
</script>
<style lang="scss">
.sencePanels {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 48px;
  &.modal {
    bottom: 50%;
    transform: translate(-50%, 50%);
  }
}
</style>
