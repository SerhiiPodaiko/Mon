import { useState } from 'react'

import { MediaChannel } from '@lib/api/Dashboard/models'

const useMediaData = () => {
  const [mediaData, setMediaData] = useState<MediaChannel[]>([])

  return { mediaData, setMediaData }
}

export default useMediaData
