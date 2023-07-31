import { useState } from 'react'

import { Sportsman } from '@lib/api/Dashboard/RightsHolder/user/profile/models'

const useSportsmanData = () => {
  const [userData, setUserData] = useState<Sportsman>({
    background_file_name: '',
    background_link: '',
    gender: '',
    languages: [],
    phone_code: '',
    address: '',
    country_name: '',
    file_name: '',
    kind_of_sport: { name: '', sport_type: '', pk: '' },
    link: '',
    nationality: '',
    first_name: '',
    last_name: '',
    qualification: '',
    date_of_birth: '',
    email: '',
    phone_number: ''
  })

  return { userData, setUserData }
}

export default useSportsmanData
