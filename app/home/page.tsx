import { Metadata } from 'next'

import { Brand, Faq, Hero, Platform, Role, SportFamily } from '@components/Home'
import { Footer, Header } from '@components/Layout'

import favicon from '@public/favicon.jpeg'

const DOMAIN = (process.env.NEXT_PUBLIC_DOMAIN || '').replace(/\/$/, '')

export const metadata: Metadata = {
  title: 'Home',
  // Add description
  description: '123213',
  // Add keywords
  keywords: ['123', '123123213'],
  openGraph: {
    title: 'Marketplace',
    description: '12312312321',
    url: `${DOMAIN}/home`,
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

const HomePage = () => (
  <>
    <Header />
    <main>
      <Hero />
      <SportFamily />
      <Platform />
      <Brand />
      <Faq />
      <Role />
    </main>
    <Footer />
  </>
)

export default HomePage
