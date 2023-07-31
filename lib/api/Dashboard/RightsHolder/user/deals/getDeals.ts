import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { Invoices } from '@lib/api/Dashboard/RightsHolder/user/deals/models'

export const getDeals = (): Promise<Invoices> => {
  const idToken = getCookie('id_token')
  const params = [
    // 'PAYMENT_PENDING',
    'PAYMENT_FAILED',
    'PAYMENT_COMPLETED',
    // 'DEAL_COMPLETED',
    'CANCELLED'
  ].map((status) => `statuses=${status}`)

  return API.post(
    `/invoices/as_right_holder/get_invoice/?${params.join('&')}`,
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
