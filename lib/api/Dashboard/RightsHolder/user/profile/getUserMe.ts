import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { Sportsman } from '@lib/api/Dashboard/RightsHolder/user/profile/models'

export const getUserMe = (): Promise<Sportsman> => {
  const idToken = getCookie('id_token')
  return API.get('rights_holder/sportsman/get_profile/', {
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
