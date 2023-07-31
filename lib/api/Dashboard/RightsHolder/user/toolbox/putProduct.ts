import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { ProductPutData } from '@lib/api/Dashboard/RightsHolder/user/toolbox/models'

export const putProduct = (data: ProductPutData): Promise<any> => {
  const idToken = getCookie('id_token')
  return API.put(
    'products/',
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
