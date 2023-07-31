import API from '@lib/api/api'
import { Countries } from '@lib/api/Countries/models'

export const getCountries = (): Promise<Countries> => {
  return API.get('base/countries/')
    .then((response) => {
      console.log('GET_ALL_COUNTRIES_SUCCESS', response)
      return response?.data
    })
    .catch((error) => {
      console.log('GET_ALL_COUNTRIES_ERROR', error)
      return error?.data
    })
}
