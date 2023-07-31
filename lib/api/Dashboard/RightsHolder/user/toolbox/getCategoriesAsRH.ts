import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { RightHolderProducts } from '@lib/api/Dashboard/RightsHolder/user/toolbox/models'

export const getCategoriesAsRH = (): Promise<RightHolderProducts> => {
  // const sub = getCookie('sub')
  const idToken = getCookie('id_token')
  return API.post(
    'products/as_right_holder_owner/',
    {
      with_count: false
    },
    {
      headers: {
        'id-token': idToken
      }
    }
  )
    .then((response) => {
      console.log(response.data)
      return response?.data
    })
    .catch((error) => {
      return error?.data
    })
}
