<template>
  <FormAlert
    v-if="(errors.email && errors.password) || isCooldown || accountIsLocked"
    :text="alertText"
    :title="alertTitle"
  />

  <v-form
    class="px-4 px-sm-12"
    :class="(errors.email && errors.password) || isCooldown || accountIsLocked ? '' : 'pt-7'"
    @submit.prevent="submit"
  >
    <v-text-field
      v-model="email"
      color="primary-07"
      :disabled="isCooldown || accountIsLocked || loading"
      :error-messages="errors.email"
      label="Corporate email"
      :prepend-inner-icon="errors.email ? 'mdi-alert-circle-outline' : ''"
      variant="outlined"
      @input="setFieldError('email', '')"
    />

    <v-text-field
      v-model="password"
      :append-inner-icon="showPwd ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
      class="mt-4"
      color="primary-07"
      :disabled="isCooldown || accountIsLocked || loading"
      :error-messages="errors.password"
      label="Password"
      :prepend-inner-icon="errors.password ? 'mdi-alert-circle-outline' : ''"
      :type="showPwd ? 'text' : 'password'"
      variant="outlined"
      @click:append-inner="showPwd = !showPwd"
      @input="setFieldError('password', '')"
    />

    <v-checkbox
      v-model="remember"
      class="mt-n2 mb-4 ml-n2"
      color="primary-07"
      :disabled="isCooldown || accountIsLocked || loading"
      :error-messages="errors.remember"
      hide-details
      label="Remeber me"
    />

    <v-btn
      block
      class="mx-auto py-5 text-capitalize"
      color="primary-07"
      :disabled="isCooldown || accountIsLocked"
      :loading="loading"
      rounded
      text="Log In"
      type="submit"
      variant="flat"
    />

  </v-form>
</template>

<script setup lang="ts">
  import * as yup from 'yup'
  import { useRouter } from 'vue-router'
  import { useForm } from 'vee-validate'
  import { useLoginStore } from '@/stores/login'
  import { useAppStore } from '@/stores/app'
  import { useToast } from 'vue-toastification'
  import CustomToast from '@/components/CustomToast.vue'
  import { useCustomToastContentStore } from '@/stores/custom-toast-content'

  const productName = computed(() => useAppStore().getCurrentProduct.name)

  // Instantiate login store
  const loginStore = useLoginStore()

  // Instantiate router
  const router = useRouter()

  // Instantiate toaster
  const toast = useToast()

  // Show password
  const showPwd: Ref<boolean> = ref(false)

  // Loading state indicator
  const loading: Ref<boolean> = ref(false)

  // Set validations rules
  const { defineField, errors, handleSubmit, setFieldError } = useForm({
    initialValues: {
      email: loginStore.rememberedEmail || '',
      password: '',
      remember: !!loginStore.rememberedEmail,
    },
    validationSchema: yup.object({
      email: yup.string().label('The email').email().required(),
      password: yup.string().label('The password').required(),
    }),
  })

  // Define form fields
  const [email] = defineField('email', { validateOnModelUpdate: false })
  const [password] = defineField('password', { validateOnModelUpdate: false })
  const [remember] = defineField('remember')

  // Handle login errors
  function errorHandler (errorResponse: any): void {
    if (!errorResponse) {
      toast.error('An error has occurred. Please try again')
      return
    }

    switch (errorResponse.status) {
      case 400:
      case 401:
        alertTitle.value = 'Login Error'
        alertText.value = 'Your account or password is incorrect, or may not exist. Please contact our Company.'
        setFieldError('email', ' ')
        setFieldError('password', ' ')
        break
      case 403:
        alertTitle.value = 'User Blocked'
        alertText.value = 'Your user has been blocked, please contact the administrator.'
        accountIsLocked.value = true
        break
      case 429:
        alertTitle.value = 'Login Cooldown'
        alertText.value = 'You have tried to log in 5 times without success. Please wait 30 seconds before attempting this action again.'
        isCooldown.value = true
        break
      default:
        console.log('Login failed', errorResponse.data)
        toast.error('An error has occurred. Please try again')
        break
    }
  }

  // Sumbit form
  const submit = handleSubmit(async values => {
    toast.clear()
    loading.value = true
    await loginStore.dispatchLogin(values)
      .then(() => {
        // Redirect to dashboard
        if (loginStore.getIsAuthenticated) {
          router.replace({ path: `/auth/${productName.value}` })
          window.scrollTo(0, 0)

          // Instantiate custom toast content store
          const { setHtmlData } = useCustomToastContentStore()
          setHtmlData({
            title: 'One session at a time',
            body: 'Your other sessions have been closed.',
          })
          toast.info(CustomToast, {
            icon: 'mdi mdi-information-outline',
            toastClassName: 'is-custom',
          })
        }
      })
      .catch(err => {
        errorHandler(err.response)
      })
      .finally(() => {
        loading.value = false
      })
  })

  // Login cooldown (failed login attempts exceeded: 5)
  const isCooldown: Ref<boolean> = ref(false)
  watch(isCooldown, val => {
    if (val) {
      // Cooldown lasts 30 seconds, so we wait 31s to give the API enough time
      setTimeout(() => {
        isCooldown.value = false
      }, 31000)
    }
  })

  // Locked account (failed login attempts exceeded: 10)
  const accountIsLocked: Ref<boolean> = ref(false)

  // Form alert content
  const alertTitle: Ref<string> = ref('')
  const alertText: Ref<string> = ref('')
</script>

<style scoped lang="sass">
  //
</style>
