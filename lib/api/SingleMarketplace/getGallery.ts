import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { Gallery } from '@lib/api/SingleMarketplace/models'

export const getGallery = (): Promise<Gallery> => {
  const idToken = getCookie('id_token')
  return API.get('rights_holder/sportsman/media_library/gallery/', {
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
