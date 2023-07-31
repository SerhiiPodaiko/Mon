import API from '@lib/api/api'
import { VideoTypes } from '@lib/api/Dashboard/RightsHolder/user/profile/models'

export const getVideoTypes = (): Promise<VideoTypes> => {
  return API.get('base/video_types/')
    .then((response) => {
      return response?.data
    })
    .catch((error) => {
      return error?.data
    })
}
