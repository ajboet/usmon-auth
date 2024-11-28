import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'

export const useCustomToastContentStore = defineStore('customToastContent', () => {
  const htmlData: Ref = ref(null)

  function setHtmlData (data: any) {
    htmlData.value = data
  }

  return { htmlData, setHtmlData }
})
