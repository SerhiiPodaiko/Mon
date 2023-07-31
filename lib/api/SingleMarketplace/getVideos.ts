import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { Videos } from '@lib/api/SingleMarketplace/models'

export const getVideos = (): Promise<Videos> => {
  const idToken = getCookie('id_token')
  return API.get('rights_holder/sportsman/media_library/video/', {
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
