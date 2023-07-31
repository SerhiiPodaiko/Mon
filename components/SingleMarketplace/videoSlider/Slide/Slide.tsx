'use client'
import React, { Dispatch } from 'react'

import 'swiper/scss'
import styles from './Slide.module.scss'

import { MediaLibraryVideo } from '@lib/api/Marketplace/models'

import PlayBtn from '@assets/Icons/playBtn.svg'

const Slide = ({
  video,
  setIsOpen
}: {
  video: MediaLibraryVideo
  swiper: any
  setIsOpen: Dispatch<React.SetStateAction<boolean>>
}) => {
  const getVideoId = (url: string) => {
    const regex = /^https?:\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]{11})/
    const match = url.match(regex)
    return match ? match[1] : undefined // возвращаем ID или null, если совпадения не найдены
  }

  return (
    <>
      <div className={styles.slider__video}>
        <div className={styles.slider__videoPreviewBlock}>
          <img
            onError={(err) => {
              console.log(err)
            }}
            className={styles.slider__source}
            src={`https://img.youtube.com/vi/${getVideoId(video.link)}/maxresdefault.jpg`}
            alt={video.title}
          />
        </div>
      </div>
      <div className={styles.slider__textBlock}>
        <span className={styles.slider__textTitle}>{video.title}</span>
        <span className={styles.slider__textSubTitle}>{video.video_type}</span>
      </div>
      <div className={styles.slider__playBtnLink}>
        <PlayBtn className={styles.slider__playBtnImg} onClick={() => setIsOpen(true)} />
      </div>
    </>
  )
}

export default Slide
