import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { MediaChannel } from '@lib/api/Dashboard/models'

export const getMedia = (): Promise<{ media_channels_list: MediaChannel[] }> => {
  const idToken = getCookie('id_token')
  return API.get('brand/media_channel/', {
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
