import { getCookie } from 'cookies-next'

import { DeleteInvoiceCart } from '@lib/api/Cart/models'

import API from '../../api'

export const fetchDeleteAllInvoicesCart = async (options: DeleteInvoiceCart[]): Promise<any> => {
  return API.post('/invoices/as_brand_repr/delete_invoices/', options, {
    headers: {
      'id-token': getCookie('id_token')
    }
  })
    .then((response) => {
      console.log('DELETE_ALL_CART_SUCCESS', response)
      return response?.data
    })
    .catch((error) => {
      console.log('DELETE_ALL_CART_ERROR', error)
      throw new Error(error)
    })
}
