import { useState } from 'react'

import { BrandData } from '@lib/api/Dashboard/brand/models'

const useBrandData = () => {
  const [brandData, setBrandData] = useState<BrandData>({
    brand: {
      background_link: '',
      contact_first_name: '',
      contact_last_name: '',
      description: '',
      email: '',
      logo_link: '',
      official_name: '',
      phone_code: '',
      phone_number: '',
      sector: '',
      sub: '',
      website: ''
    },
    countries: []
  })

  return { brandData, setBrandData }
}

export default useBrandData
