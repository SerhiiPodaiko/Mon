import { useState } from 'react'

import { SportsmanPerformance } from '@lib/api/Dashboard/RightsHolder/user/profile/models'

const useSportsmanPerformance = () => {
  const [sportsmanPerformance, setSportsmanPerformance] = useState<SportsmanPerformance[]>([])

  return { sportsmanPerformance, setSportsmanPerformance }
}

export default useSportsmanPerformance
