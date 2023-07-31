import { getCookie } from 'cookies-next'

import API from '../../api'

type CreateBrandPaymentChargeOptions = {
  amount: number
  card_id: string
}

export const fetchCreateBrandPaymentCharge = async (
  options: CreateBrandPaymentChargeOptions
): Promise<any> => {
  return API.post(
    `/brand/billing/create_customer/?amount=${options.amount}&card_id=${options.card_id}`,
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
