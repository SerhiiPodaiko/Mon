import { getCookie } from 'cookies-next'

import API from '../../api'
import { GetInvoiceCart } from '../models'

export const fetchGetInvoicesDetailsCart = async (options: GetInvoiceCart): Promise<any> => {
  return API.post('/invoices/as_brand_repr/get_invoice/details/', options, {
    headers: {
      'id-token': getCookie('id_token')
    }
  })
    .then((response) => {
      console.log('DETAILS_CART_SUCCESS', response)
      return response?.data
    })
    .catch((error) => {
      console.log('DETAILS_CART_ERROR', error?.data)
      throw new Error(error?.data?.detail)
    })
}
