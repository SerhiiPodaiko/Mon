import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { MediaLibraryVideo } from '@lib/api/Dashboard/RightsHolder/user/profile/models'

export const deleteVideo = (pk: string): Promise<MediaLibraryVideo> => {
  const idToken = getCookie('id_token')
  return API.delete(`rights_holder/sportsman/media_library/video/${pk}/`, {
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
