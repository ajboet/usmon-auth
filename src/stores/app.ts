// Utilities
import { defineStore } from 'pinia'
import { computed, ref, Ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  type Product = {
    name?: string
    url?: string
  }

  const lsProduct: Ref<string> = ref(localStorage.getItem('usmonProduct') || '{}')

  const currentProduct: Ref<Product> = ref(stringToProduct(lsProduct.value))

  const getCurrentProduct = computed(() => currentProduct.value)

  function setCurrentProduct (name: string, url: string) {
    currentProduct.value = { name, url }
    localStorage.setItem('usmonProduct', productToString({ name, url }))
  }

  function stringToProduct (str: string): Product {
    return JSON.parse(str)
  }

  function productToString (product: Product): string {
    return JSON.stringify(product)
  }

  return {
    getCurrentProduct,
    setCurrentProduct,
  }
})
