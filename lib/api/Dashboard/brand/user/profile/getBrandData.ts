import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { BrandData } from '@lib/api/Dashboard/brand/models'

export const getBrandData = (): Promise<BrandData> => {
  const idToken = getCookie('id_token')
  return API.get('brand/get_brand/', {
    headers: {
      'id-token': idToken
    }
  })
    .then((response) => {
      return response?.data
    })
    .catch((error) => {
      return error?.data
    })
}
