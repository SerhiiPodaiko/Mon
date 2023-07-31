import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { MediaLibraryVideo } from '@lib/api/Dashboard/RightsHolder/user/profile/models'

export const postVideo = (data: MediaLibraryVideo): Promise<MediaLibraryVideo> => {
  const idToken = getCookie('id_token')
  return API.post('rights_holder/sportsman/media_library/video/', data, {
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
