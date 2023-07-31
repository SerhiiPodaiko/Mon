import { getCookie } from 'cookies-next'

import API from '@lib/api/api'

export const confirmDeal = (invoiceId: string, confirmed: boolean): Promise<any> => {
  const idToken = getCookie('id_token')
  return API.post(
    `/invoices/confirm/${invoiceId}/?confirmed=${confirmed}`,
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
