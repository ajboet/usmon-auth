import Toast, { PluginOptions } from 'vue-toastification'
import '@/styles/toast.css'

const toastOptions: PluginOptions = {
  closeButton: false,
  draggable: false,
  hideProgressBar: true,
  maxToasts: 7,
  newestOnTop: true,
  timeout: 4000,
  transition: 'Vue-Toastification__fade',
}

export default {
  Toast,
  toastOptions,
}
