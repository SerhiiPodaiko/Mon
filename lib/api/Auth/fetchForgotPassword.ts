import API from '../api'

import { ForgotPassword, ResponseForgotPassword } from './models'

export const fetchForgotPassword = async (
  email: ForgotPassword,
  url: string
): Promise<ResponseForgotPassword> => {
  return API.post<ResponseForgotPassword>(`/${url}/password_forgot/`, email)
    .then((response) => {
      console.log('FORGOT_PASSWORD_SUCCESS', response?.data)
      return response?.data
    })
    .catch((error) => {
      console.log('FORGOT_PASSWORD_ERROR', error)
      throw new Error(error)
    })
}
