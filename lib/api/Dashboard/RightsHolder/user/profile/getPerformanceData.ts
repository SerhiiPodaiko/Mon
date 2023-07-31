import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { SportsmanPerformance } from '@lib/api/Dashboard/RightsHolder/user/profile/models'

export const getPerformanceData = (): Promise<SportsmanPerformance[]> => {
  const idToken = getCookie('id_token')
  return API.get('rights_holder/sportsman/performance/', {
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
