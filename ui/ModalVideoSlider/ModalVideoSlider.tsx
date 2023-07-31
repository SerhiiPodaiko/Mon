'use client'
import { useState } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import { Swiper, SwiperSlide } from 'swiper/react'

import styles from './ModalVideoSlider.module.scss'

import { MediaLibraryVideo } from '@lib/api/Marketplace/models'

import EmptyModal from '@ui/Modals/EmptyModal/EmptyModal'

import CloseBtn from '@assets/Icons/galleryModalCloseBtn.svg'
import LeftArrowBtn from '@assets/Icons/LeftArrowBtn.svg'
import RightArrowBtn from '@assets/Icons/RightArrowBtn.svg'

type Props = {
  modalIsOpen: boolean
  onClose: () => void
  elements: MediaLibraryVideo[]
}

const ModalVideoSlider = ({ elements, modalIsOpen, onClose }: Props) => {
  const [slider, setSlider] = useState<any>(null)

  const opts: YouTubeProps['opts'] = {
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      mute: 0,
      controls: 1,
      fs: 1,
      cc_load_policy: 0,
      iv_load_policy: 3,
      disablekb: 0
    }
  }

  const getVideoId = (url: string) => {
    const regex = /^https?:\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]{11})/
    const match = url.match(regex)
    return match ? match[1] : undefined // возвращаем ID или null, если совпадения не найдены
  }

  const handleNextSlide = () => {
    if (slider) {
      slider.slideNext()
    }
  }

  const handlePrevSlide = () => {
    if (slider) {
      slider.slidePrev()
    }
  }

  return (
    <EmptyModal onRequestClose={onClose} isOpen={modalIsOpen}>
      <div className={styles.modal}>
        <div className={styles.modal__topBlock}>
          <CloseBtn className={styles.modal__closeBtn} onClick={onClose} />
        </div>
        <Swiper
          className={styles.modal__slider}
          onSwiper={(swiper) => setSlider(swiper)}
          loop={true}
          spaceBetween={10}
          freeMode={true}
          draggable={false}
          slidesPerView={1}
        >
          {elements &&
            elements.map((element) => (
              <SwiperSlide className={styles.modal__slide} key={element.pk}>
                <div className={styles.modal__textBlock}>
                  <span className={styles.modal__title}>{element.video_type}</span>
                  <span className={styles.modal__subtitle}>{element.title}</span>
                </div>
                <div className={styles.modal__videoBlock}>
                  <YouTube
                    className={styles.modal__video}
                    videoId={getVideoId(element.link)}
                    opts={opts}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <div className={styles.modal__navBlock}>
          <LeftArrowBtn onClick={handlePrevSlide} className={styles.modal__leftArrow} />
          <RightArrowBtn onClick={handleNextSlide} className={styles.modal__rightArrow} />
        </div>
      </div>
    </EmptyModal>
  )
}

export default ModalVideoSlider
