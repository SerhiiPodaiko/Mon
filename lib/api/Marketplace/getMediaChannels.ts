import API from '@lib/api/api'
import { MediaChannel } from '@lib/api/Marketplace/models'

export const getMediaChannels = (
  sub: string | null
): Promise<{ media_channels_list: MediaChannel[] }> | null => {
  if (sub === '' || sub === null) {
    return null
  }
  return API.get(`rights_holder/sportsman/media_channel/${sub}/`)
    .then((response) => {
      return response?.data
    })
    .catch((error) => {
      return error?.data
    })
}
