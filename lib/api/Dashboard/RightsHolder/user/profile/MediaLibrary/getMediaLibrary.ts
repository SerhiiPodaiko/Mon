import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { MediaLibrary } from '@lib/api/Dashboard/RightsHolder/user/profile/models'

export const getMediaLibrary = (): Promise<MediaLibrary> => {
  const idToken = getCookie('id_token')
  return API.get('rights_holder/sportsman/media_library/', {
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
