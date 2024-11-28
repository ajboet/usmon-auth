<template>
  <v-dialog
    persistent
    v-model="show"
    max-width="340px"
  >
    <v-card class="text-neutral-11">
      <v-card-title class="pt-3 px-5">
        Log Out Confirmation
      </v-card-title>
      <v-card-text class="pt-1 pb-6 text-center text-body-2 text-custom-narrow font-weight-medium">
        Are you sure you want to log out?
      </v-card-text>
      <v-card-actions class="pa-5 pt-0">
        <v-spacer />
        <v-btn
          rounded
          color="primary-07"
          class="px-5 text-capitalize text-custom-narrow"
          :disabled="loading"
          @click="cancel()"
        >
          Cancel
        </v-btn>
        <v-btn
          rounded
          variant="flat"
          color="primary-07"
          class="px-4 text-capitalize text-custom-narrow"
          :loading="loading"
          @click="logout()"
        >
          Log out
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { useLoginStore } from '@/stores/login'
  import { useLogoutConfirmationStore } from '@/stores/logout-confirmation'

  const confirmLogoutStore = useLogoutConfirmationStore()

  const show = computed(() => confirmLogoutStore.getShowDialog.value)

  const loading: Ref<boolean> = ref(false)

  function cancel () {
    confirmLogoutStore.toggleDialog()
  }

  function logout () {
    useLoginStore().dispatchConfirmedLogout()
  }
</script>

<style scoped lang="sass">
  .text-custom-narrow
    letter-spacing: 0.1px !important
</style>
