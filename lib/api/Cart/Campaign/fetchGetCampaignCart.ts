import { getCookie } from 'cookies-next'

import { GetInvoiceCart } from '@lib/api/Cart/models'

import API from '../../api'

export const fetchGetCampaignCart = async (options: GetInvoiceCart) => {
  return API.post('/campaigns/as_brand_repr/', options, {
    headers: {
      'id-token': getCookie('id_token')
    }
  })
    .then((response) => {
      console.log('GET_CAMPAIGN_SUCCESS', response)
      return response?.data
    })
    .catch((error) => {
      console.log('GET_CAMPAIGN_ERROR', error)
      throw new Error(error)
    })
}
