'use client'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { BrandSettings } from '@components/BrandDashBoard'

const Page = () => {
  return (
    <Elements stripe={loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)}>
      <BrandSettings />
    </Elements>
  )
}

export default Page
