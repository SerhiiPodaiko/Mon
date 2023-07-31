import { getCookie } from 'cookies-next'

import API from '../../api'

type CreateBrandPaymentChargeOptions = {
  card_id: string
  invoicesId: string[]
}

type CreateBrandPaymentChargeResult = {
  invoice_id: string
}

export const fetchCreateInvoicesCheckout = async (
  options: CreateBrandPaymentChargeOptions
): Promise<CreateBrandPaymentChargeResult> => {
  return API.post(`/invoices/checkout/?card_id=${options.card_id}`, [...options.invoicesId], {
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
