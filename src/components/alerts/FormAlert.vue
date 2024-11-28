<template>
  <v-alert
    class="unselectable"
    :class="props.customClass"
    :color="props.color"
    density="compact"
    :icon="props.icon"
  >
    <template #title>
      <span class="text-subtitle-1 font-weight-bold">
        {{ props.title }}
      </span>
    </template>
    <span v-html="text" />
  </v-alert>
</template>

<script setup lang="ts">
  interface Props {
    title: string
    text: string
    color?: string
    icon?: string
    customClass?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    color: 'warning-02',
    icon: 'mdi-alert-circle-outline',
    customClass: 'mt-2 mb-7',
  })
</script>
