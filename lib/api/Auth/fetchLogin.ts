import { setCookie } from 'cookies-next'

import API from '../api'

import { Login, ResponseLogin } from './models'

export const fetchLogin = async (options: Login, url: string): Promise<ResponseLogin> => {
  return API.post<ResponseLogin>(`${url}/sign_in/`, options)
    .then((response) => {
      setCookie('accessToken', response?.data?.access_token)
      setCookie('refreshToken', response?.data?.refresh_token)
      setCookie('id_token', response?.data?.id_token)
      setCookie('sub', response?.data?.sub)
      console.log('LOGIN_SUCCESS', response)
      return response?.data
    })
    .catch((error) => {
      console.log('LOGIN_ERROR', error?.response?.data)
      throw new Error(error)
    })
}
