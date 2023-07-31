import { getCookie } from 'cookies-next'

import API from '../../api'

export const fetchCreateBrandPaymentAccount = async (): Promise<any> => {
  return API.post(
    '/brand/billing/create_customer/',
    {},
    {
      headers: {
        'id-token': getCookie('id_token')
      }
    }
  )
    .then((response) => {
      console.log('UPDATE_CART_SUCCESS', response)
      return response?.data
    })
    .catch((error) => {
      console.log('UPDATE_CART_ERROR', error?.data)
      throw new Error(error?.data?.detail)
    })
}
