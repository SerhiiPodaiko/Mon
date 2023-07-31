import API from '@lib/api/api'
import { MediaData } from '@lib/api/Marketplace/models'

export const fetchMediaData = (sub: string | null | undefined): Promise<MediaData> => {
  return API.get(`rights_holder/sportsman/media_data/${sub}/`)
    .then((response) => {
      return response?.data
    })
    .catch((error) => {
      return error?.data
    })
}
