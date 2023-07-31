export type Login = {
  email: string
  password: string
  user_role: string
}

export type ResponseLogin = {
  id_token: string
  access_token: string
  refresh_token: string
  expires_in: string
  user_role: string
  sub: string
}

export type Register = {
  email: string
  password: string
  user_role: string
}

export type ResponseRegister = {
  message: string
}

export type RegisterProfile = {
  first_name: string
  last_name: string
  date_of_birth?: string
  address?: string
  phone_number?: string
  nationality?: string
  qualification?: string
  kind_of_sport_pk: string
  country_name: string
  file_name: string
}

export type RefreshToken = {
  access_token: string
  refresh_token: string
}

export type ResponseRefreshToken = {
  id_token: string
  access_token: string
  expires_in: string
}

export type ForgotPassword = {
  email: string
}

export type ResponseForgotPassword = {
  message: string
}

export type ChangePassword = {
  prev_password: string
  new_password: string
}

export type ResponseChangePassword = {
  message: string
}
