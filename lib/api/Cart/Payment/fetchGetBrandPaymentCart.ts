import { getCookie } from 'cookies-next'

import API from '../../api'

type GetBrandPaymentCartResult = {
  brand: string
  exp_month: number
  exp_year: number
  id: string
  last4: string
}

export const fetchGetBrandPaymentCart = async (): Promise<GetBrandPaymentCartResult> => {
  return API.get('/brand/billing/get_card/', {
    headers: {
      'id-token': getCookie('id_token')
    }
  })
    .then((response) => {
      console.log('UPDATE_CART_SUCCESS', response)
      return response?.data
    })
    .catch((error) => {
      console.log('UPDATE_CART_ERROR', error?.data)
      throw new Error(error?.data?.detail)
    })
}
