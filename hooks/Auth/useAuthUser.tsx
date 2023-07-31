import { useContext } from 'react'

import { AuthContext } from '@context/Auth/AuthContext'

const useAuthUser = () => {
  const authContext = useContext(AuthContext)

  return { authContext }
}

export default useAuthUser
