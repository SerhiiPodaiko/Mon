import { getCookie } from 'cookies-next'

import { GetInvoiceCart } from '@lib/api/Cart/models'

import API from '../../api'

export const fetchGetAllInvoicesCart = async (options?: GetInvoiceCart): Promise<any> => {
  return API.post('/invoices/as_brand_repr/get_invoice/', options ? options : {}, {
    headers: {
      'id-token': getCookie('id_token')
    }
  })
    .then((response) => {
      console.log('GET_CART_SUCCESS', response)
      return response?.data
    })
    .catch((error) => {
      console.log('GET_CART_ERROR', error)
      throw new Error(error)
    })
}
