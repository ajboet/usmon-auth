<template>
  <v-container fluid class="fill-height">
    <v-card
      v-if="productName"
      class="mx-auto pt-3 "
      color="transparent"
      flat
      width="550"
    >
      <v-img
        height="100"
        src="@/assets/logo.png"
      />

      <p class="pt-1 text-center text-subtitle-2 text-primary-07 unselectable">Welcome to USMON</p>

      <v-card-title class="text-center text-primary-07 unselectable">
        <span class="text-h3 font-weight-bold text-capitalize">{{ productName }}</span>
      </v-card-title>

      <v-card-text class="px-0 px-sm-12">
        <LoginForm />
      </v-card-text>

      <v-card-text class="pt-5 text-center text-neutral-09">
        Please note, you can only have <b>one session open at a time</b>. For the best experience, we recommend using this application on <b>web devices</b>. Logging in here will automatically close any sessions on other devices.
      </v-card-text>

    </v-card>
  </v-container>
</template>

<route lang="yaml">
meta:
  layout: login
</route>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/app'

  const productName = computed(() => useAppStore().getCurrentProduct.name)

  definePage({
    meta: {
      pageName: 'Login',
    },
  })
</script>
