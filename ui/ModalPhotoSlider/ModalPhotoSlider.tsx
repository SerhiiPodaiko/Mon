'use client'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import styles from './ModalPhotoSlider.module.scss'

import EmptyModal from '@ui/Modals/EmptyModal/EmptyModal'

import CloseBtn from '@assets/Icons/galleryModalCloseBtn.svg'
import LeftArrowBtn from '@assets/Icons/LeftArrowBtn.svg'
import RightArrowBtn from '@assets/Icons/RightArrowBtn.svg'

type Props = {
  modalIsOpen: boolean
  onClose: () => void
  photosLinks: string[]
}

const ModalPhotoSlider = ({ photosLinks, modalIsOpen, onClose }: Props) => {
  const [slider, setSlider] = useState<any>(null)

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
        <div className={styles.modal__closeBlock}>
          <CloseBtn onClick={onClose} className={styles.modal__closeIcon} />
        </div>
        <div className={styles.slider__block}>
          <div className={styles.slider__leftNavBlock} onClick={handlePrevSlide}>
            <LeftArrowBtn className={styles.slider__leftNavIcon} />
          </div>
          <Swiper
            onSwiper={(swiper) => setSlider(swiper)}
            loop={true}
            spaceBetween={10}
            freeMode={true}
            draggable={false}
            className={styles.slider}
            slidesPerView={1}
          >
            {photosLinks &&
              photosLinks.map((photo, index) => (
                <SwiperSlide key={index} className={styles.slider__slide}>
                  <div className={styles.slider__slideImgBlock}>
                    <img className={styles.slider__slideImg} src={photo} alt={'photo'} />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          <div className={styles.slider__RightNavBlock} onClick={handleNextSlide}>
            <RightArrowBtn className={styles.slider__RightNavIcon} />
          </div>
        </div>
      </div>
    </EmptyModal>
  )
}

export default ModalPhotoSlider
