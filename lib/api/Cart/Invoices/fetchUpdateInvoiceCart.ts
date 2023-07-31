import { getCookie } from 'cookies-next'

import API from '../../api'
import { UpdateInvoiceCart } from '../models'

export const fetchUpdateInvoiceCart = async (options: UpdateInvoiceCart): Promise<any> => {
  return API.post('/invoices/as_brand_repr/add_or_update_invoice_product/', options, {
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
