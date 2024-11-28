<template>
  <v-container fluid class="px-0 text-h4 fill-height">
    <v-row no-gutters>
      <v-col cols="12" class="text-center">
        <img
          src="@/assets/USMON-logo.png"
        >
      </v-col>
      <v-col cols="12" class="pt-4 text-center">
        <v-progress-circular
          indeterminate
          :size="47"
          :width="4"
          color="primary-07"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/app'
  import { useLoginStore } from '@/stores/login'

  const currentProduct = computed(() => useAppStore().getCurrentProduct)

  const user = computed(() => useLoginStore().getTokenData.value)

  location.replace(`${currentProduct.value.url}/sso_${JSON.stringify(user.value)}`)

  definePage({
    meta: {
      pageName: 'App',
    },
  })
</script>
