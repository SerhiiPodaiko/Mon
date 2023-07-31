import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Custom500 = () => {
  const router = useRouter()

  useEffect(() => {
    const redirect = setTimeout(() => router.push('/'), 3000)

    return () => clearTimeout(redirect)
  })

  return (
    <div className='flex justify-center text-2xl'>
      <h1 className='text-2xl'>500 - Server-side error occurred</h1>
    </div>
  )
}

export default Custom500
