import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { MediaChannel } from '@lib/api/Dashboard/models'

export const postMediaChannels = (data: MediaChannel[]): Promise<any> => {
  const idToken = getCookie('id_token')

  return API.post('rights_holder/sportsman/media_channel/', data, {
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
