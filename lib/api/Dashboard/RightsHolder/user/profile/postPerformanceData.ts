import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { SportsmanPerformance } from '@lib/api/Dashboard/RightsHolder/user/profile/models'

export const postPerformanceData = (data: SportsmanPerformance): Promise<any> => {
  const idToken = getCookie('id_token')
  const postData = {
    name: data.name,
    start_date: data.start_date,
    end_date: data.end_date,
    position: data.position,
    location: data.location,
    kind_of_sport_pk: data.kind_of_sport.pk,
    status: data.status,
    description: data.description,
    gallery: data.gallery
  }
  return API.post('rights_holder/sportsman/performance/', postData, {
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
