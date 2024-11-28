import { defineStore } from 'pinia'
import { computed, ref, Ref } from 'vue'

export const useLogoutConfirmationStore = defineStore('confirmLogout', () => {
  const showDialog: Ref<boolean> = ref(false)

  const getShowDialog = computed(() => showDialog)

  function toggleDialog () {
    showDialog.value = !showDialog.value
  }

  return {
    getShowDialog,
    toggleDialog,
  }
})
