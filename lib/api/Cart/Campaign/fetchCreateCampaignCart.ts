import { getCookie } from 'cookies-next'

import { CreateCampaignCart } from '@lib/api/Cart/models'

import API from '../../api'

export const fetchCreateCampaignCart = async (options: CreateCampaignCart) => {
  return API.post('/campaigns/as_brand_repr/add_or_update_campaign/', options, {
    headers: {
      'id-token': getCookie('id_token')
    }
  })
    .then((response) => {
      console.log('CRATE_CAMPAIGN_SUCCESS', response)
      return response?.data
    })
    .catch((error) => {
      console.log('CRATE_CAMPAIGN_ERROR', error)
      throw new Error(error)
    })
}
