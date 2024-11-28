/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify, type ThemeDefinition } from 'vuetify'

const usmonTheme: ThemeDefinition = {
  dark: false,
  colors: {
    // NEUTRAL
    'neutral-01': '#FFFFFF',
    'neutral-02': '#F2F2F2',
    'neutral-03': '#DCDCDC',
    'neutral-04': '#BEBEBE',
    'neutral-05': '#A8A8A8',
    'neutral-06': '#929292',
    'neutral-07': '#747474',
    'neutral-08': '#4F4F4F',
    'neutral-09': '#393939',
    'neutral-10': '#232323',
    'neutral-11': '#060606',
    // PRIMARY
    'primary-01': '#EDF4F9',
    'primary-02': '#DCE9F3',
    'primary-03': '#B8D2E7',
    'primary-04': '#7FA6CC',
    'primary-05': '#4E8FC3',
    'primary-06': '#326698',
    'primary-07': '#114E89',
    'primary-08': '#1E405C',
    'primary-09': '#0A2F52',
    'primary-10': '#071F37',
    'primary-11': '#021221',

    // Semantic Colors
    // INFORMATION
    'info-01': '#E5F3FF',
    'info-02': '#99CEFF',
    'info-03': '#4CA9FF',
    'info-04': '#0085FF',
    'info-05': '#0062BB',
    'info-06': '#003E77',
    // SUCCESS
    'success-01': '#E6FFED',
    'success-02': '#9EFFB9',
    'success-03': '#55FF85',
    'success-04': '#0BDB45',
    'success-05': '#047E26',
    'success-06': '#014B16',
    // WARNING
    'warning-01': '#FFEAEA',
    'warning-02': '#FFACAC',
    'warning-03': '#FF6E6E',
    'warning-04': '#E44040',
    'warning-05': '#A50D0D',
    'warning-06': '#610000',
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'usmonTheme',
    themes: {
      usmonTheme,
    },
  },
})
