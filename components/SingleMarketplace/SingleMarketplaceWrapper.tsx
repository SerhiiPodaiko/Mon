import { Footer, Header } from '@components/Layout'
import GallerySlider from '@components/SingleMarketplace/gallerySlider/GallerySlider'
import Results from '@components/SingleMarketplace/Results/Results'
import VideoSlider from '@components/SingleMarketplace/videoSlider/VideoSlider'

import SingleMarketplaceProvider from '@context/SingleMarketplace/SingleMarketplaceContext'

import About from './About/About'
import Cta from './Cta/Cta'
import Hero from './Hero/Hero'
import MediaInventory from './MediaInventory/MediaInventory'
import SocialMedia from './SocialMedia/SocialMedia'
import Work from './Work/Work'

const SingleMarketplaceWrapper = ({ id }: { id?: string }) => (
  <section>
    <Header dark={true} />
    <main>
      <SingleMarketplaceProvider>
        <Hero />
      </SingleMarketplaceProvider>
      <About />
      <GallerySlider id={id} />
      <VideoSlider id={id} />
      <Cta />
      <Results />
      <SingleMarketplaceProvider>
        <MediaInventory />
        <SocialMedia />
      </SingleMarketplaceProvider>
      <Work />
    </main>
    <Footer />
  </section>
)

export default SingleMarketplaceWrapper
