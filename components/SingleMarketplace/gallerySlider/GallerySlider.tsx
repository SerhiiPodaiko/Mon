import styles from './GallerySlider.module.scss'

import Slider from '@components/SingleMarketplace/gallerySlider/slider/Slider'

const GallerySlider = ({ id }: { id?: string }) => {
  return (
    <section className={styles.gallerySlider}>
      <Slider id={id} />
    </section>
  )
}

export default GallerySlider
