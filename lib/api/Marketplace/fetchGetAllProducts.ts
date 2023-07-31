import { PublicRH } from '@lib/api/Marketplace/models'

import API from '../api'

export const fetchGetAllProducts = async (options: {
  order_by: string[]
  with_count: boolean
}): Promise<PublicRH> => {
  return API.post('/products/right_holder_public/', options)
    .then((response) => {
      console.log('GET_ALL_PRODUCTS_SUCCESS', response?.data)
      return response?.data
    })
    .catch((error) => {
      console.log('GET_ALL_PRODUCTS_ERROR', error)
      throw new Error(error)
    })
}
