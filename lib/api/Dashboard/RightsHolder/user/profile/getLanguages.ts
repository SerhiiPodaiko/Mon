import API from '@lib/api/api'
import { Language } from '@lib/api/Dashboard/RightsHolder/user/profile/models'

export const getLanguages = (): Promise<Language[]> => {
  return API.get('base/languages/')
    .then((response) => {
      return response?.data
    })
    .catch((error) => {
      return error?.data
    })
}
