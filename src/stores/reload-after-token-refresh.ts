
import { defineStore } from 'pinia'
import { computed, ref, Ref } from 'vue'

export const useReloadAfterTokenRefreshStore = defineStore('reloadStore', () => {
  const isReload: Ref<boolean> = ref(false)
  const getIsReload = computed(() => isReload)

  function toggleIsReload () {
    isReload.value = !isReload.value
  }

  watch(isReload, val => {
    if (val) {
      // Reset to false a bit after is set to true
      setTimeout(() => {
        toggleIsReload()
      }, 700)
    }
  })

  return {
    getIsReload,
    toggleIsReload,
  }
})
