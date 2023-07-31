import API from '../api'

export const fetchGetAllCategoriesSport = async () => {
  return API.get('/base/kinds_of_sport/')
    .then((response) => {
      console.log('GET_ALL_CATEGORIES_SPORT_SUCCESS', response)
      return response?.data
    })
    .catch((error) => {
      console.log('GET_ALL_CATEGORIES_SPORT_ERROR', error)
      throw new Error(error)
    })
}
