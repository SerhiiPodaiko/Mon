import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { BrandData } from '@lib/api/Dashboard/brand/models'

export const putBrandData = (data: BrandData) => {
  const idToken = getCookie('id_token')
  if (data.brand.logo_file_name === null) {
    data.brand.logo_file_name = ''
  }
  if (data.brand.background_file_name === null) {
    data.brand.background_file_name = ''
  }
  return API.put(
    'brand/update_brand/',
    { ...data },
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
