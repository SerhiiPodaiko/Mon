// import {SportsmanPerformance} from '@lib/api/dashboard/RightsHolder/user/profile/models';
import { getCookie } from 'cookies-next'

import API from '@lib/api/api'

export const deletePerformanceData = (data: any): Promise<any> => {
  const idToken = getCookie('id_token')
  return API.delete(`rights_holder/sportsman/performance/${data.pk}/`, {
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
