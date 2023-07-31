import { useState } from 'react'

import { BrandProfile } from '@lib/api/Dashboard/brand/models'

const useBrandProfile = () => {
  const [brandProfileData, setBrandProfileData] = useState<BrandProfile>({
    brand_sub: '',
    date_of_birth: '',
    email: '',
    first_name: '',
    last_name: '',
    link: '',
    phone_code: '',
    location: '',
    nationality: '',
    phone_number: '',
    role: ''
  })

  return { brandProfileData, setBrandProfileData }
}

export default useBrandProfile
