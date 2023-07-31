import API from '../api'

export const fetchSingleProduct = async (options: any): Promise<any> => {
  return API.post('/products/products_with_right_holder/', options)
    .then((response) => {
      console.log('GET_SINGLE_PRODUCT_SUCCESS', response?.data)
      return response?.data
    })
    .catch((error) => {
      console.log('GET_SINGLE_PRODUCT_ERROR', error)
      throw new Error(error)
    })
}
