// import {SportsmanPerformance} from '@lib/api/dashboard/RightsHolder/user/profile/models';
import { getCookie } from 'cookies-next'

import API from '@lib/api/api'

export const putPerformanceData = (data: any): Promise<any> => {
  const idToken = getCookie('id_token')
  const putData = {
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
  return API.put(`rights_holder/sportsman/performance/${data.pk}/`, putData, {
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
