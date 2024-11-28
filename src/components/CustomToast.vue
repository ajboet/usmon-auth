<template>
  <div class="cursor-default unselectable">
    <h4 class="toast-title">
      {{ htmlData.title }}
    </h4>
    <span class="toast-text" v-html="htmlData.body" />
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useCustomToastContentStore } from '@/stores/custom-toast-content'

  const store = useCustomToastContentStore()
  const { htmlData } = storeToRefs(store)
</script>

<style scoped lang="sass">
  .toast-title
    margin-top: -2.5px
  .toast-text
    font-size: 14px
</style>
