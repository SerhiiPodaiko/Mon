'use client'

import { useEffect, useMemo } from 'react'

import NotFoundWrapper from '@components/404/NotFoundWrapper'

const NotFoundPage = () => {
  const bodyElement = useMemo(
    () => (typeof document !== 'undefined' ? document.querySelector('body') : null),
    []
  ) as HTMLBodyElement | null

  useEffect(() => {
    // const redirect = setTimeout(() => router.push('/'), 3000)
    bodyElement?.setAttribute('style', 'margin: 0; padding: 0')

    return () => {
      bodyElement?.classList.remove('reset')
      // clearTimeout(redirect)
    }
  }, [])

  return <NotFoundWrapper />
}

export default NotFoundPage
