import { ReactNode } from 'react'
import { Metadata } from 'next'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-loading-skeleton/dist/skeleton.css'
import '@styles/globals.css'

import Analytics from '@components/Analytics'
import RootClientWrapper from '@components/Layout/RootClientWrapper'

import faviconJpeg from '@public/favicon.jpeg'

const currentDomain =
  process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_URL : process.env.NEXT_DEV_URL

const DOMAIN = (currentDomain || '').replace(/\/$/, '')

export const metadata: Metadata = {
  title: {
    template: '%s | Monetiseur',
    default: 'Monetiseur'
  },
  // Add description
  description: '123213',
  // Add keywords
  keywords: ['123', '123123213'],
  icons: [
    {
      rel: 'icon',
      type: 'image/jpeg',
      sizes: '32x32',
      url: '/favicon.jpeg'
    }
  ],
  openGraph: {
    title: 'Monetiseur',
    description: '12312312321',
    url: DOMAIN,
    siteName: 'Monetiseur',
    images: [
      {
        url: faviconJpeg.src
      }
    ],
    locale: 'en_US',
    type: 'website'
  }
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        <Analytics />
        <RootClientWrapper>{children}</RootClientWrapper>
      </body>
    </html>
  )
}

export default RootLayout
