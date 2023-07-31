'use client'
import { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { useQuery } from 'react-query'
import Slider from 'react-slick'

import styles from './Results.module.scss'

import { fetchMediaData } from '@lib/api/Marketplace/getMediaData'

import useGetAllProducts from '@hooks/Marketplace/useGetAllProducts'

import ModalPhotoSlider from '@ui/ModalPhotoSlider/ModalPhotoSlider'

import SliderCenterFederateImage from '@assets/Images/federation/results/slider-1.png'
import PlaceSVG from '@assets/Images/single-marketplace/results/place.svg'

const settings = {
  centerMode: true,
  dots: false,
  arrows: false,
  centerPadding: '90px',
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipe: true,
  waitForAnimate: false
}

const Results = () => {
  const [isOpen, setIsOpen] = useState(false)
  const sliderRef = useRef<any>(null)
  const urlPath = usePathname()
  const { singleSportsmenInfo, isSuccess } = useGetAllProducts()
  const isLoginIn = getCookie('Role')
  const { data } = useQuery(
    'mediaData',
    () => fetchMediaData(singleSportsmenInfo?.right_holder?.rights_holder_sub),
    {
      enabled: isSuccess
    }
  )
  const slide =
    data?.performances?.length &&
    data.performances[0].gallery_files_links !== null &&
    Object.values(data.performances[0].gallery_files_links)

  const isPublic = urlPath?.includes('federate')

  const openModal = () => {
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsOpen(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <>
      {data?.performances?.length ? (
        <section className={`${styles.results} ${isLoginIn ? styles.resultsPadding : ''}`}>
          <div className={styles.results__head}>
            <h2 className={styles.results__headTitle}>results</h2>
            <div className={styles.results__headWrapper}>
              <p className={styles.results__headWrapperSubtitle}>My</p>
            </div>
          </div>
          <Slider ref={sliderRef} {...settings} className={styles.results__slider}>
            <div className={styles.results__sliderItem}>
              <div className={styles.results__sliderWrapper}>
                <div className={styles.results__sliderItemPlace}>
                  <PlaceSVG />
                  <span>{data?.performances[0]?.position}st Place</span>
                </div>
                <h2 className={styles.results__sliderItemTitle}>
                  {data?.media_library_videos[0]?.title}
                </h2>
                <div className={styles.results__sliderItemDate}>
                  <span>{data?.performances[0]?.location && data?.performances[0]?.location}</span>{' '}
                  | {data?.performances[0]?.start_date} - {data?.performances[0]?.end_date}
                </div>
                <button className={styles.results__sliderItemBtn} onClick={openModal}>
                  See Full Gallery
                </button>
              </div>
              {slide ? (
                <img
                  src={isPublic ? SliderCenterFederateImage : slide[0]}
                  className={styles.results__sliderItemImg}
                  alt='Results'
                />
              ) : null}
            </div>
          </Slider>
          <ModalPhotoSlider
            modalIsOpen={isOpen}
            onClose={closeModal}
            photosLinks={data.performances[0].gallery.map(
              // @ts-ignore
              (photo) => data.performances[0].gallery_files_links[photo]
            )}
          />
        </section>
      ) : null}
    </>
  )
}

export default Results
