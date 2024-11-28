<template>
  <v-container fluid class="px-0 text-h4 fill-height">
    <v-row no-gutters>
      <v-col cols="12" class="pt-6 text-center">
        <img
          src="@/assets/errors/403.png"
          class="w-75 w-sm-50 w-md-33"
        >
      </v-col>
      <v-col cols="12" class="py-6 px-6 px-sm-0 text-center">
        <p class="text-h3 text-sm-h2 text-primary-05 font-weight-bold">Forbidden</p>
        <p class="text-custom text-neutral-11 mt-8">
          Sorry. The page you are trying to see has restricted access.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  definePage({
    alias: ['/forbidden'],
    meta: {
      pageName: 'Forbidden',
    },
  })
</script>
