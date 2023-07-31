import API from '@lib/api/api'
import { ResponseRegister } from '@lib/api/Auth/models'

export const fetchLogOut = (idToken: string, type: string | undefined) => {
  if (type && type === 'brand') {
    return API.post<ResponseRegister>(
      'brand/log_out/',
      {},
      {
        headers: {
          'id-token': idToken
        }
      }
    )
      .then((response) => {
        return response?.data
      })
      .catch((error) => {
        console.log('REGISTER_ERROR', error?.data)
        throw new Error(error)
      })
  }

  return API.post<ResponseRegister>(
    'rights_holder/log_out/',
    {},
    {
      headers: {
        'id-token': idToken
      }
    }
  )
    .then((response) => {
      return response?.data
    })
    .catch((error) => {
      console.log('REGISTER_ERROR', error?.data)
      throw new Error(error)
    })
}
