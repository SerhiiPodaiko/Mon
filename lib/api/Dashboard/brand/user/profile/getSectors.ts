import API from '@lib/api/api'
import { BrandSectors } from '@lib/api/Dashboard/brand/models'

export const getSectors = (): Promise<BrandSectors> => {
  return API.get('base/brand_sector/')
    .then((response) => {
      return response?.data
    })
    .catch((error) => {
      return error?.data
    })
}
