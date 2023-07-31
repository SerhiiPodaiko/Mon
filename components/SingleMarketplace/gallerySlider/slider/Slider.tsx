'use client'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/scss'
import styles from './Slider.module.scss'

import { fetchMediaData } from '@lib/api/Marketplace/getMediaData'

import ModalPhotoSlider from '@ui/ModalPhotoSlider/ModalPhotoSlider'

import Arrow from '@assets/Icons/arrows/arrow-gallerySlder.svg'

const Slider = ({ id }: { id?: string }) => {
  const { isLoading, data, remove } = useQuery('gallery', () => fetchMediaData(id || ''), {
    staleTime: Infinity
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    return () => remove()
  }, [])
  const [slider, setSlider] = useState<any>(null)
  const handlePrevClick = () => {
    if (slider) {
      slider.slidePrev()
    }
  }

  const handleNextClick = () => {
    if (slider) {
      slider.slideNext()
    }
  }

  if (isLoading || !data || data.media_library_gallery.files.length <= 0) {
    return null
  }

  return (
    <>
      <ModalPhotoSlider
        modalIsOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        photosLinks={data.media_library_gallery.files.map(
          // @ts-ignore
          (photo) => data.media_library_gallery.gallery_files_links[photo]
        )}
      />
      <h2 className={styles.slider__title}>Personal Experience</h2>
      <Swiper
        spaceBetween={30}
        onSwiper={(swiper) => setSlider(swiper)}
        className={styles.slider}
        draggable={true}
        slidesPerView={3}
        loop={true}
        direction={'horizontal'}
        breakpoints={{
          1200: {
            width: 1200,
            slidesPerView: 3
          },
          767: {
            width: 767,
            slidesPerView: 2
          },
          320: {
            width: 320,
            slidesPerView: 1
          }
        }}
      >
        {data.media_library_gallery.files.map((file, index) => (
          <SwiperSlide className={styles.slider__slideBlock} key={index}>
            <div className={styles.slider__slide} onClick={() => setIsOpen(!isOpen)}>
              <img
                className={styles.slider__slideImg}
                // @ts-ignore
                src={data.media_library_gallery.gallery_files_links[file]}
                alt='Image'
              />
            </div>
          </SwiperSlide>
        ))}
        <div className={styles.slider__navigationBlock}>
          <Arrow onClick={handlePrevClick} className={`${styles.slider__navigationArrowLeft}`} />
          <div className={styles.slider__navigationDotsBlock}>
            {/* TODO dots indicator under the gallery slider */}
          </div>
          <Arrow onClick={handleNextClick} className={`${styles.slider__navigationArrowRight}`} />
        </div>
      </Swiper>
    </>
  )
}

export default Slider
