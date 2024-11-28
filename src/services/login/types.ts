
export type Login = {
  email: string
  password: string
  remember: boolean
}

export type Tokens = {
  access_token: string
  refresh_token: string
}

export type ClientObject = {
  [key: string]: string
}

export type LoginResponse = {
  tokens: Tokens
  current_client: ClientObject
  insights_role: string
  available_clients: ClientObject
}

export type SessionsResponse = {
  sessions: ClientObject
}

export type User = {
  email: string
  auth: string
  refresh: string
  type: string
  current_client: ClientObject
  available_clients: ClientObject
}

export type Role = {
  type: string
  label: string
}
