import { getCookie } from 'cookies-next'

import API from '@lib/api/api'

export const createCustomer = (): Promise<string> => {
  const idToken = getCookie('id_token')
  return API.post(
    'brand/billing/create_customer/',
    {},
    {
      headers: {
        'id-token': idToken
      }
    }
  )
    .then((response) => {
      return response?.data
    })
    .catch((error) => {
      return error?.data
    })
}
