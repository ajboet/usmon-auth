<template>
  <v-menu
    v-model="menu"
    transition="slide-y-transition"
  >
    <template #activator="{ props }">
      <v-app-bar-nav-icon
        v-bind="props"
        class="mt-2 mr-6"
        color="primary-07"
        :icon="!menu ? 'mdi-menu' : 'mdi-close'"
      />
    </template>

    <v-card class="mt-2" elevation="10">
      <v-list class="py-0" density="compact">
        <v-list-item
          v-for="item in items"
          :key="item.to"
          active-class="active-item text-primary-07 font-weight-medium"
          class="border-b-sm border-opacity-10 border-grey"
          :class="item.icon ? 'my-1 border-opacity-0' : ''"
          :to="item.to || ''"
          :href="item.href || ''"
          :target="item.href ? '_blank' : ''"
        >
          <span>{{ item.title }}</span>
          <template #append>
            <v-icon :color="item.iconColor">{{ item.icon }}</v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
  const componentProps = defineProps({
    usmonUrl: { type: String, required: true },
  })

  const menu: Ref<boolean> = ref(false)
  const items: Ref<Array<any>> = ref([
    {
      title: 'Go to usmon.com',
      href: componentProps.usmonUrl,
      icon: 'mdi-open-in-new',
      iconColor: 'primary-07',
    },
    // {
    //   title: 'Login',
    //   to: '/[product]',
    //   icon: 'mdi-login',
    //   iconColor: 'primary-07',
    // },
  ])
</script>

<style scoped lang="sass">
  .active-item
    span
      border-bottom: 1px solid rgb(var(--v-theme-primary-07))
</style>
