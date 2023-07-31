import { getCookie } from 'cookies-next'

import { UpdateCampaignCart } from '@lib/api/Cart/models'

import API from '../../api'

export const fetchUpdateCampaignCart = async (options?: UpdateCampaignCart) => {
  return API.post('/campaigns/as_brand_repr/add_or_update_campaign/', options, {
    headers: {
      'id-token': getCookie('id_token')
    }
  })
    .then((response) => {
      console.log('UPDATE_CAMPAIGN_SUCCESS', response)
      return response?.data
    })
    .catch((error) => {
      console.log('UPDATE_CAMPAIGN_ERROR', error)
      throw new Error(error)
    })
}
