import { getCookie } from 'cookies-next'

import API from '../api'

import { Register, RegisterProfile, ResponseRegister } from './models'

export const fetchRegister = async (options: Register): Promise<ResponseRegister> => {
  return API.post<ResponseRegister>('/rights_holder/sign_up/', options)
    .then((response) => {
      console.log('REGISTER_SUCCESS', response?.data)
      return response?.data
    })
    .catch((error) => {
      console.log('REGISTER_ERROR', error?.data)
      throw new Error(error)
    })
}

export const fetchRegisterProfile = (options: RegisterProfile) => {
  const idToken = getCookie('id_token')

  return API.post<ResponseRegister>('/rights_holder/sportsman/registration/', options, {
    headers: { 'id-token': idToken }
  })
    .then((response) => {
      console.log('REGISTER_PROFILE_SUCCESS', response?.data)
      return response?.data
    })
    .catch((error) => {
      console.log('REGISTER_PROFILE_ERROR', error?.data)
      throw new Error(error)
    })
}
