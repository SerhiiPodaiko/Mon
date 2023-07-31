import { useRouter } from 'next/navigation'
import { getCookie, removeCookies } from 'cookies-next'
import { useMutation } from 'react-query'

import { PAGE_SLUGS } from '@constants/pages'

import { fetchLogOut } from '@lib/api/Auth'

const useLogOut = (pathname: string | null) => {
  const cookiesKeys = ['id_token', 'refreshToken', 'accessToken', 'Role', 'sub']
  const localStorageKeys = ['Role', 'User']

  const router = useRouter()
  const idToken = getCookie('id_token') as string
  const { mutate: mutateLogOut } = useMutation({
    mutationFn: () => fetchLogOut(idToken, pathname?.split('/')[2])
  })

  const logOut = async () => {
    mutateLogOut()
    cookiesKeys.forEach((key) => removeCookies(key))
    localStorageKeys.forEach((key) => localStorage.removeItem(key))
    router.push(PAGE_SLUGS.home)
  }

  return {
    logOut
  }
}

export default useLogOut
