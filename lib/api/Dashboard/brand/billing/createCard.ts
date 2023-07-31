import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { Card } from '@lib/api/Dashboard/brand/billing/models'

export const createCard = (id: string): Promise<Card> => {
  const idToken = getCookie('id_token')
  return API.put(
    `brand/billing/create_card/?card_source=${id}`,
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
