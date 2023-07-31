import { getCookie } from 'cookies-next'

import API from '@lib/api/api'

export const changePassword = (prevPass: string, newPass: string, type: string): Promise<void> => {
  const accessToken = getCookie('accessToken')
  return API.post(
    `${type}/password_change/`,
    {
      prev_password: prevPass,
      new_password: newPass
    },
    {
      headers: {
        'access-token': accessToken
      }
    }
  )
    .then((response) => {
      return response?.data
    })
    .catch((error) => {
      throw new Error(error)
    })
}
