import { getCookie } from 'cookies-next'

import API from '@lib/api/api'
import { RetrieveLink } from '@lib/api/Dashboard/RightsHolder/user/settings/models'

export const postRetrieveLink = (): Promise<RetrieveLink> => {
  const idToken = getCookie('id_token')
  return API.post(
    'rights_holder/billing/create_billing_account/',
    {},
    {
      headers: {
        'id-token': idToken
      }
    }
  )
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      return error?.data
    })
}
