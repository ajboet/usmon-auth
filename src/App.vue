<template>
  <v-app>
    <v-main :key="`main-reload-key-${reloadKey}`">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import { globalRouter } from '@/router/globalRouter'
  import { useReloadAfterTokenRefreshStore } from '@/stores/reload-after-token-refresh'

  const reloadKey: Ref<number> = ref(Math.random())

  const reload = computed(() => useReloadAfterTokenRefreshStore().getIsReload.value)

  watch(reload, val => {
    if (val) {
      reloadKey.value = Math.random()
    }
  })

  const router = useRouter()
  globalRouter.router = router
</script>
