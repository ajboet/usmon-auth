<template>
  <v-app class="bubbles">
    <v-layout>
      <AppBar />

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
  .unselectable
    -webkit-user-select: none
       -moz-user-select: none
        -ms-user-select: none
            user-select: none

  .bubbles
    background: url('@/assets/bg-bubbles-top.png'), url('@/assets/bg-bubbles.png')
    background-position: top -88px left -66px, bottom -188px right -74px
    background-repeat: no-repeat
    background-attachment: fixed
    background-size: 400px

  @media only screen and (max-width : 600px)
    .bubbles
      background: url('@/assets/bg-bubbles-top.png')
      background-position: top -88px left -66px
      background-repeat: no-repeat
</style>
