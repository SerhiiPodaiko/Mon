import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { createCustomer } from '@lib/api/Dashboard/brand/billing/createCustomer'
import { Card } from '@lib/api/Dashboard/brand/billing/models'

export const getCards = (): Promise<Card[]> => {
  const idToken = getCookie('id_token')
  return API.get('brand/billing/get_cards/', {
    headers: {
      'id-token': idToken
    }
  })
    .then((response) => {
      return response?.data
    })
    .catch((error) => {
      if (error.response.data.detail === 'There is no such user in Stripe') {
        createCustomer().then(() => getCards())
      }
      return error.response.data.detail
    })
}
