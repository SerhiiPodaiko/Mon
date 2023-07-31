import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { ProductPutData } from '@lib/api/Dashboard/RightsHolder/user/toolbox/models'

export const postProduct = (data: ProductPutData, catId: string | undefined): Promise<any> => {
  const idToken = getCookie('id_token')
  return API.post(
    'products/',
    { ...data, product_category_id: catId, product_show: true },
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
