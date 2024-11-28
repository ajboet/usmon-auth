
import { defineStore } from 'pinia'
import { computed, ref, Ref } from 'vue'
import { useToast } from 'vue-toastification'

import { Login, LoginResponse, User } from '@/services/login/types'
import { API } from '@/services'

import CustomToast from '@/components/CustomToast.vue'

import { useAppStore } from '@/stores/app'
import { useCustomToastContentStore } from '@/stores/custom-toast-content'
import { useLogoutConfirmationStore } from '@/stores/logout-confirmation'
import { useReloadAfterTokenRefreshStore } from '@/stores/reload-after-token-refresh'

export const useLoginStore = defineStore('loginStore', () => {
  const productName = computed(() => useAppStore().getCurrentProduct.name)

  const getIsAuthenticated = computed(() => tokenData.value?.auth && tokenData.value?.auth !== '')

  const rememberedEmail = computed(() => localStorage.getItem('usmonRemember'))

  const lsUser: Ref<string> = ref(localStorage.getItem('usmonUser') || '{}') // User from local storage

  const tokenData: Ref<User|any> = ref(stringToUser(lsUser.value))
  const getTokenData = computed(() => tokenData)

  // Retrieve User Role
  const getUserRole = computed(() => {
    const role = {
      type: 'client_user',
      label: 'User',
    }

    const type = tokenData.value.type.slice(1)

    if (tokenData.value.email.endsWith('@usmon.com')) {
      role.type = 'usmon_admin'
      role.label = 'USMON Admin'
    } else if (atob(type) === 'Admin') {
      role.type = 'client_admin'
      role.label = 'Admin'
    }

    return role
  })

  // Retrieve User Client
  const getUserClient = computed(() => {
    const keys = Object.keys(tokenData.value.current_client)

    const [id, name] = [
      parseInt(keys[0]),
      tokenData.value.current_client[keys[0]],
    ]

    return { id, name }
  })

  function setTokenData (resData: LoginResponse, credentials: Login) {
    tokenData.value = {
      email: credentials.email,
      auth: resData.tokens.access_token,
      refresh: resData.tokens.refresh_token,
      type: String.fromCharCode(Math.floor(Math.random() * 26) + 97) + btoa(resData.insights_role), // Encode role
      current_client: resData.current_client,
      available_clients: resData.available_clients,
    }

    localStorage.setItem('usmonUser', userToString(tokenData.value))

    // Remember user
    if (credentials.remember) {
      localStorage.setItem('usmonRemember', credentials.email)
    } else {
      localStorage.removeItem('usmonRemember')
    }
  }

  async function dispatchLogin (credentials: Login) {
    await API.login.logIn(credentials)
      .then(async res => {
        await setTokenData(res.data, credentials)
      })
  }

  function updateTokenData (newToken: LoginResponse, updateRefresh: boolean = true) {
    tokenData.value.auth = newToken.tokens.access_token
    if (newToken.tokens.refresh_token && updateRefresh) {
      tokenData.value.refresh = newToken.tokens.refresh_token
    }

    if (newToken.insights_role) {
      // Encode role
      tokenData.value.type = String.fromCharCode(Math.floor(Math.random() * 26) + 97) + btoa(newToken.insights_role)
    }

    if (newToken.current_client && newToken.available_clients) {
      tokenData.value.current_client = newToken.current_client
      tokenData.value.available_clients = newToken.available_clients
    }

    localStorage.setItem('usmonUser', userToString(tokenData.value))

    // Re-instantiate app
    useReloadAfterTokenRefreshStore().toggleIsReload()
  }

  async function dispatchRefreshToken () {
    await API.login.refreshToken(tokenData.value.refresh)
      .then(async res => {
        await updateTokenData(res.data, false)
      })
  }

  async function dispatchSwitchClient (clientId: number) {
    await API.login.switchClient(clientId)
      .then(async res => {
        await updateTokenData(res.data)
      })
  }

  function unsetTokenData (storeInstance: any) {
    tokenData.value = {}
    localStorage.removeItem('usmonUser')
    storeInstance.router.replace({ path: `/${productName.value}` })
  }

  function dispatchLogout (this: any, isForced: boolean) {
    API.login.logOut({
      access_token: tokenData.value.auth,
      refresh_token: tokenData.value.refresh,
    })
    unsetTokenData(this)
    if (isForced) {
      const { setHtmlData } = useCustomToastContentStore()
      setHtmlData({
        title: 'Your session has expired!',
        body: 'Please log in again to continue using the app.',
      })
      useToast().info(CustomToast, {
        icon: 'mdi mdi-information-outline',
        toastClassName: 'is-custom',
        timeout: 10000,
      })
    }
  }

  function dispatchConfirmedLogout (this: any) {
    API.login.logOut({
      access_token: tokenData.value.auth,
      refresh_token: tokenData.value.refresh,
    })
    unsetTokenData(this)
    useLogoutConfirmationStore().toggleDialog()
  }

  function stringToUser (str: string): User {
    return JSON.parse(str)
  }

  function userToString (user: User): string {
    return JSON.stringify(user)
  }

  return {
    dispatchLogin,
    dispatchLogout,
    dispatchConfirmedLogout,
    dispatchRefreshToken,
    dispatchSwitchClient,
    getIsAuthenticated,
    getTokenData,
    getUserRole,
    getUserClient,
    rememberedEmail,
  }
})
