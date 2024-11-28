
import { useLoginStore } from '@/stores/login'
import { globalRouter } from '@/router/globalRouter'

export async function interceptErrors (error: any) {
  const errorResponse = error.response

  if (errorResponse) {
    switch (errorResponse.status) {
      case 401:
        // ----------------------------------------------- //
        // -------------- From Insights API -------------- //
        // ----------------------------------------------- //
        if (errorResponse.data?.error?.code && errorResponse.data.error.code === 190) {
          // Access token expired: trigger refresh request
          await useLoginStore().dispatchRefreshToken()
          return new Promise(() => { })
        }

        if (errorResponse.data?.error?.message === 'Token revoked' && errorResponse.data?.error?.code === 191) {
          // Access token revoked: redirect to 401 page
          await useLoginStore().dispatchLogout(true)
          return new Promise(() => { })
        }

        // ----------------------------------------------- //
        // ---------------- From Auth API ---------------- //
        // ----------------------------------------------- //
        if (errorResponse.data?.error?.message === 'access token already expired' && errorResponse.data?.error?.code === 4010) {
          // Access token expired: trigger refresh request
          await useLoginStore().dispatchRefreshToken()
          return new Promise(() => { })
        }
        if (errorResponse.data?.error?.message === 'the access token is invalid' && errorResponse.data?.error?.code === 4010) {
          // Access token revoked: redirect to 401 page
          await useLoginStore().dispatchLogout(true)
          return new Promise(() => { })
        }
        if (errorResponse.data?.error?.message === 'the refresh token is invalid' && errorResponse.data?.error?.code === 4011) {
          // Refresh token expired: logout
          await useLoginStore().dispatchLogout(true)
          return new Promise(() => { })
        }
        break
      case 503:
        globalRouter.router?.push('/unavailable')
        break
      default:
        console.error('Axios Error Response:', errorResponse)
        break
    }
  } else {
    console.warn('A network error occurred. This could be a CORS issue or a dropped internet connection. It is not possible for us to know.')
    console.error('Axios Error:', error)
    globalRouter.router?.push('/unavailable')
    return new Promise(() => { })
  }
}
