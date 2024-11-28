
import api from '../api'
import { APIResponse } from '../types'
import { Login, LoginResponse, SessionsResponse, Tokens } from './types'

/**
 * POST | Authenticates a user by logging them in with their email and password.
 *
 * @param {Login} input - An object containing the user's login credentials (email & password).
 * @returns A promise that resolves to the response from the API, which includes the authentication token.
 */
function logIn (input: Login) {
  return api.post<APIResponse<LoginResponse>>('/login', {}, {
    auth: {
      username: input.email,
      password: input.password,
    },
  })
}

/**
 * POST | Refreshes the user's expired authentication token.
 *
 * @param {string} token - The refresh token.
 * @returns A promise that resolves to the response from the API, which includes a new authentication token.
 */
function refreshToken (token: string) {
  return api.post<APIResponse<LoginResponse>>('/refresh-token', { refresh_token: token })
}

/**
 * GET | List of User's login activity history.
 *
 * @returns A promise that resolves to the response from the API, which includes the list of session activity.
 */
function getSessionsActivity () {
  return api.get<APIResponse<SessionsResponse>>('/sessions')
}

/**
 * POST | Re-Authenticates a user by logging them in to another Client.
 *
 * @param {number} clientId - The ID of the client to be switched to.
 * @returns A promise that resolves to the response from the API, which includes a new authentication token.
 */
function switchClient (clientId: number) {
  return api.post<APIResponse<LoginResponse>>('/switch-client', { client_id: clientId })
}

/**
 * POST | Logs out User.
 *
 * @param {Tokens} tokens - The access and refresh tokens.
 * @returns A promise that resolves to the response from the API, which includes "tokens blocked" confirmation string.
 */
function logOut (tokens: Tokens) {
  return api.post<APIResponse<any>>('/logout', tokens)
}

export default {
  logIn,
  refreshToken,
  getSessionsActivity,
  switchClient,
  logOut,
}
