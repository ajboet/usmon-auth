/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useLoginStore } from '@/stores/login'
import { useAppStore } from '@/stores/app'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

const checkValidProduct = (route: any): string => {
  let name
  const store = useAppStore()

  const products = JSON.parse(import.meta.env.VITE_APP_ALLOWED_PRODUCTS)
  const routeParams = JSON.parse(JSON.stringify(route.params))

  if (routeParams?.product) {
    const productNames = Object.keys(products)
    if (!productNames.includes(routeParams.product)) {
      store.setCurrentProduct('', '')
      router.replace({ path: '/not-found' })
    } else {
      name = routeParams.product
      store.setCurrentProduct(routeParams.product, products[routeParams.product])
    }
  }

  return name
}

const isPublicRoute = (route: string): boolean => ['/401', '/403', '/404', '/503'].includes(route)
const isHomeRoute = (route: string): boolean => route === '/[product]'

const getPageName = (route: any): string => {
  return route.meta.pageName || ''
}

// Navigation guards
router.beforeEach(to => {
  // Redirect when route does not exist
  if (!router.hasRoute(to.name)) {
    return '/not-found'
  }

  // Validate product
  const validProdName = checkValidProduct(to)

  // Add route name to page title
  document.title = getPageName(to) + ' – ' + import.meta.env.VITE_APP_NAME

  // Check if auth user
  const isAuthenticated = useLoginStore().getIsAuthenticated

  if (isAuthenticated) {
    if (isHomeRoute(to.name)) {
      return `/auth/${validProdName}`
    }
  } else {
    if (!isHomeRoute(to.name) && !isPublicRoute(to.name)) {
      return '/not-found'
    }
  }
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
