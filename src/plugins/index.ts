/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import toaster from './toaster'

// Types
import type { App } from 'vue'
import { markRaw } from 'vue'

// Router as a plugin in Pinia
pinia.use(({ store }) => {
  store.router = markRaw(router)
})

export function registerPlugins (app: App) {
  app
    .use(pinia)
    .use(router)
    .use(toaster.Toast, toaster.toastOptions)
    .use(vuetify)
}
