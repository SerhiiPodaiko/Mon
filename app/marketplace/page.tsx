import { Metadata } from 'next'

import { Footer, Header } from '@components/Layout'
import MarketplaceWrapper from '@components/Marketplace/MarketplaceWrapper'

import favicon from '@public/favicon.jpeg'

const DOMAIN = (process.env.NEXT_PUBLIC_DOMAIN || '').replace(/\/$/, '')

export const metadata: Metadata = {
  title: 'Marketplace',
  // Add description
  description: '123213',
  // Add keywords
  keywords: ['123', '123123213'],
  openGraph: {
    title: 'Marketplace',
    description: '12312312321',
    url: `${DOMAIN}/marketplace`,
    siteName: 'Monetiseur',
    images: [
      {
        url: favicon.src,
        width: 249,
        height: 29
      }
    ],
    locale: 'en_US',
    type: 'website'
  }
}

const MarketplacePage = () => (
  <section>
    <Header />
    <main>
      <MarketplaceWrapper />
    </main>
    <Footer />
  </section>
)

export default MarketplacePage
