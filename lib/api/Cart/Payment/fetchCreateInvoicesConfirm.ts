import { getCookie } from 'cookies-next'

import API from '../../api'

type CreateBrandPaymentChargeOptions = {
  invoice_id: string
  confirmed: boolean
}

export const fetchCreateInvoicesConfirm = async (
  options: CreateBrandPaymentChargeOptions
): Promise<any> => {
  return API.post(
    `/invoices/confirm/${options.invoice_id}/?confirmed=${options.confirmed}`,
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
