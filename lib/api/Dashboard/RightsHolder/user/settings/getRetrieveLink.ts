import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { RetrieveLink } from '@lib/api/Dashboard/RightsHolder/user/settings/models'
import { postRetrieveLink } from '@lib/api/Dashboard/RightsHolder/user/settings/postRetrieveLink'

export const getRetrieveLink = (): Promise<RetrieveLink> => {
  const idToken = getCookie('id_token')
  return API.get('rights_holder/billing/retrieve_link/', {
    headers: {
      'id-token': idToken
    }
  })
    .then((response) => {
      return response?.data
    })
    .catch((error) => {
      if (error.response.data.detail === 'Customer has no account') {
        postRetrieveLink()
      }
      throw new Error(error.response.data)
    })
}
