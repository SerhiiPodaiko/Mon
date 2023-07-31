import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { BrandProfile } from '@lib/api/Dashboard/brand/models'

export const putBrandProfile = (data: BrandProfile) => {
  const idToken = getCookie('id_token')
  return API.put(
    'brand/update_profile/',
    {
      ...data
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
