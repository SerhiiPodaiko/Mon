import { getCookie } from 'cookies-next'

import API from '../../api'

type CreateBrandPaymentChargeOptions = {
  card_source: {
    type: string
    card: {
      number: string
      exp_month: number
      exp_year: number
      cvc: string
    }
    owner: {
      name: string
    }
  }
}

export const fetchCreateBrandCard = async (
  options: CreateBrandPaymentChargeOptions
): Promise<any> => {
  return API.put(
    `/brand/billing/create_card/?card_source=${options.card_source}`,
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
