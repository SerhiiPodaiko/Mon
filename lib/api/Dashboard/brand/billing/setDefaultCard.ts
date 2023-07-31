import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { Card } from '@lib/api/Dashboard/brand/billing/models'

export const setDefaultCard = (id: string): Promise<Card> => {
  const idToken = getCookie('id_token')
  return API.put(
    'brand/billing/set_default_card/',
    {
      card_id: id
    },
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
