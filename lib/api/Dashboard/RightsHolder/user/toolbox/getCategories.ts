import API from '@lib/api/api'
import { Categories, NewCategories } from '@lib/api/Dashboard/RightsHolder/user/toolbox/models'

export const getCategories = (): Promise<Categories[]> => {
  return API.get('product_categories/')
    .then((response) => {
      return response?.data
    })
    .catch((error) => {
      return error?.data
    })
}

export const getAllCategories = (): Promise<NewCategories[]> => {
  return API.get('product_categories/')
    .then((response) => {
      return response?.data
    })
    .catch((error) => {
      return error?.data
    })
}
