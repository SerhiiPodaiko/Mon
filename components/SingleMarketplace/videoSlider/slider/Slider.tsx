'use client'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/scss'
import styles from './Slider.module.scss'

import Slide from '@components/SingleMarketplace/videoSlider/Slide/Slide'

import { fetchMediaData } from '@lib/api/Marketplace/getMediaData'

import ModalVideoSlider from '@ui/ModalVideoSlider/ModalVideoSlider'

const Slider = ({ id }: { id?: string }) => {
  const { isLoading, data, remove } = useQuery('gallery', () => fetchMediaData(id || ''), {
    staleTime: Infinity
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    return () => remove()
  }, [])

  const [swiper, setSwiper] = useState<any>(null)

  const handleSlideChange = () => {
    if (swiper) {
      swiper.slides.forEach((slideEl: any) => {
        const videoEls = slideEl.querySelectorAll('video')
        videoEls.forEach((videoEl: any) => {
          videoEl.currentTime = 0
          videoEl.play()
        })
      })
    }
  }

  if (isLoading || !data || data.media_library_videos.length <= 0) {
    return null
  }

  return (
    <>
      <ModalVideoSlider
        modalIsOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        elements={data.media_library_videos}
      />
      <Swiper
        className={styles.slider}
        draggable={true}
        slidesPerView={1}
        loop={true}
        direction={'horizontal'}
        onSwiper={(swiper) => setSwiper(swiper)}
        onSlideChange={handleSlideChange}
        pagination={{
          el: styles.slider__paginationsBlock,
          clickable: true
        }}
      >
        {data.media_library_videos.map((video, index) => (
          <SwiperSlide className={styles.slider__slide} key={index}>
            <Slide video={video} swiper={swiper} setIsOpen={setIsOpen} />
          </SwiperSlide>
        ))}

        <div className={styles.slider__paginationsBlock}></div>
      </Swiper>
    </>
  )
}

export default Slider
