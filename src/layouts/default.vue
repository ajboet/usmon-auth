<template>
  <v-app>
    <v-layout>

      <v-main>
        <router-view />
      </v-main>

    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
  //
</script>

<style lang="sass">
  .text-custom
    font-size: 17px

  @media only screen and (max-width : 600px)
    .text-custom
      font-size: 14px
</style>
