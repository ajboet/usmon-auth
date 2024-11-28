<template>
  <v-app-bar
    class="position-fixed py-0"
    :class="{'bg-transparent': currentScrollTop === 0}"
    :height="appBarHeight"
    scroll-behavior="elevate"
  >
    <v-row class="fill-height">
      <!-- Left -->
      <v-col
        cols="10" sm="6" md="4"
        class="ml-md-auto pt-4 pt-md-3 pb-0 pl-7 pl-sm-12"
      >
        <v-app-bar-title>
          <a :href="currentProduct.url">
            <img
              :height="logoHeight"
              src="@/assets/USMON-logo.png"
              class="cursor-pointer"
            >
          </a>
        </v-app-bar-title>
      </v-col>

      <!-- Right -->
      <v-col
        cols="2" sm="6" md="7"
        class="mr-md-auto pa-0 text-right"
      >
        <div
          v-if="smAndUp"
          class="pt-6 pr-12 pr-md-3"
        >
          <a
            :href="usmonUrl"
            target="_blank"
            active-class="border-b-sm border-opacity-50 border-primary-07 font-weight-medium"
            class="mr-md-10 text-decoration-none text-primary-07"
          >
            Go to usmon.com
          </a>
        </div>
        <MobileMenu v-else :usmon-url="usmonUrl" />
      </v-col>

    </v-row>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { useDisplay } from 'vuetify'
  import { useAppStore } from '@/stores/app'

  const currentProduct = computed(() => useAppStore().getCurrentProduct)

  const { xs, sm, smAndUp, mdAndUp } = useDisplay()

  const logoHeight = computed(() => {
    let val: number = 32
    switch (true) {
      case xs.value:
        val = 32
        break
      case sm.value:
        val = 40
        break
      case mdAndUp.value:
        val = 50
        break
    }
    return val
  })

  const appBarHeight = computed(() => smAndUp.value ? 74 : 64)

  // Scroll event
  const currentScrollTop: Ref<number> = ref(0)

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  function handleScroll (e: Event) {
    currentScrollTop.value = (e.target as HTMLDocument)?.scrollingElement?.scrollTop || 0
  }

  const usmonUrl: Ref<string> = ref(import.meta.env.VITE_APP_USMON_URL)
</script>
