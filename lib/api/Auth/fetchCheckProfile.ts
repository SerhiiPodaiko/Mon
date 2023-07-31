import { getCookie } from 'cookies-next'

import API from '../api'

export const fetchCheckProfile = async (url: string) => {
  return API.get(`${url}/sportsman/get_profile/`, {
    headers: {
      'id-token': getCookie('id_token')
    }
  })
    .then((response) => {
      console.log('CHECK_PROFILE_SUCCESS', response?.data)
      return response?.data
    })
    .catch((error) => {
      console.log('CHECK_PROFILE_ERROR', error)
      throw new Error(error)
    })
}
