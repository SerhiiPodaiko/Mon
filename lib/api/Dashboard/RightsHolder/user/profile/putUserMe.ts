import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { Sportsman } from '@lib/api/Dashboard/RightsHolder/user/profile/models'

export const putUserMe = (data: Sportsman) => {
  const idToken = getCookie('id_token')
  return API.put(
    'rights_holder/sportsman/update_profile/',
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
