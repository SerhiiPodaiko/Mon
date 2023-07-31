import styles from './VideoSlider.module.scss'

import Slider from '@components/SingleMarketplace/videoSlider/slider/Slider'

const VideoSlider = ({ id }: { id?: string }) => {
  return (
    <section className={styles.videoSlider}>
      <Slider id={id} />
    </section>
  )
}

export default VideoSlider
