'use client'
import * as React from 'react'
import { useRouter } from 'next/navigation'

import Preloader from '@ui/Preloader/Preloader'

// WaitForRouter
export type WaitForRouterProps = {
  children: React.ReactNode
  loader?: JSX.Element
}

export function WaitForRouter({
  children,
  loader = <Preloader />
}: WaitForRouterProps): JSX.Element | null {
  const router = useRouter()
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    setReady(true)
  }, [])

  if (!ready) {
    return null
  }

  // `ready` check is necessary for empty query cases where
  // !router.isReady on BE and
  // router.isReady immediately on FE
  if (ready && router) return <>{children}</>

  return loader
}
