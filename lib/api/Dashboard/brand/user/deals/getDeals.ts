import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { Invoices } from '@lib/api/Dashboard/brand/user/deals/models'

export const getDeals = (): Promise<Invoices> => {
  const idToken = getCookie('id_token')
  const params = ['PAYMENT_COMPLETED', 'CANCELLED', 'PARTIAL_PAYMENT', 'PAYMENT_PENDING'].map(
    (status) => `statuses=${status}`
  )
  return API.post(
    `/invoices/as_brand_repr/get_invoice/?${params.join('&')}`,
    {},
    {
      headers: {
        'id-token': idToken
      }
    }
  )
    .then((response) => {
      return response?.data
    })
    .catch((error) => {
      return error?.data
    })
}
