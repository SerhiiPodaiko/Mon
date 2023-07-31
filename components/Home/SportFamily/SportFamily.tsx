'use client'
import Image from 'next/image'
import Link from 'next/link'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { motion } from 'framer-motion'
import Skeleton from 'react-loading-skeleton'
import { useMediaQuery } from 'react-responsive'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

import 'swiper/css'
import styles from './SportFamily.module.scss'

import { PAGE_SLUGS } from '@constants/pages'

import { PublicProduct } from '@lib/api/Marketplace/models'

import useGetAllProducts from '@hooks/Marketplace/useGetAllProducts'

import Preloader from '@ui/Preloader/Preloader'

import ArrowSlider from '@assets/Icons/arrows/arrow-gallerySlder.svg'
import RobotSVG from '@assets/Icons/robots/robot-4.svg'
import RobotMobileSVG from '@assets/Icons/robots/robot-mobile-4.svg'
import RobotTabletSVG from '@assets/Icons/robots/robot-tablet-4.svg'

const sportFamilyAnimation = {
  hidden: {
    y: 200,
    opacity: 0
  },
  visible: (custom: any) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.7 }
  })
}

const SportFamily = () => {
  const { data, isLoading } = useGetAllProducts()
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const isTablet = useMediaQuery({ maxWidth: 992 })
  const isDesktop = useMediaQuery({ maxWidth: 1200 })

  const swiper = useSwiper()

  return (
    <motion.section
      id='homeSportsFamily'
      initial='hidden'
      whileInView='visible'
      viewport={{ amount: 0.1, once: true }}
      className={styles.sportFamily}
    >
      <motion.div className={styles.sportFamily__head}>
        <motion.h2
          variants={sportFamilyAnimation}
          custom={0.2}
          className={styles.sportFamily__headTitle}
        >
          meet our
        </motion.h2>
        <motion.p
          variants={sportFamilyAnimation}
          custom={0.8}
          className={styles.sportFamily__headSubtitle}
        >
          <span>sports </span>
          <span>family</span>
        </motion.p>
      </motion.div>
      <motion.div
        variants={sportFamilyAnimation}
        custom={1.2}
        className={styles.sportFamily__content}
      >
        {isLoading ? (
          <Preloader />
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next'
            }}
            pagination={{ clickable: true }}
            draggable={true}
            spaceBetween={30}
            slidesPerView={isMobile ? 1.2 : isDesktop ? 2.5 : 4}
            loop={false}
            direction='horizontal'
            className={styles.sportFamily__slider}
          >
            {data?.items?.map((item: PublicProduct) => (
              <SwiperSlide key={item?.right_holder?.rights_holder_sub} style={{ width: '300px' }}>
                <Link
                  href={`${PAGE_SLUGS.marketplace}/${item?.right_holder?.rights_holder_sub}`}
                  className={styles.sportFamily__sliderCart}
                >
                  <div className={styles.sportFamily__sliderCartTopBlock}>
                    {item?.right_holder?.country?.country_code ? (
                      <Image
                        src={`/countries/${item?.right_holder?.country?.country_code}.svg`}
                        alt={item?.right_holder?.country?.country_code}
                        width={26}
                        height={17}
                        loading={'eager'}
                        className={styles.sportFamily__sliderCartTopImg}
                      />
                    ) : null}
                    <span className={styles.sportFamily__sliderCartTopCountry}>
                      {item.right_holder.country_name}
                    </span>
                    <div className={styles.sportFamily__sliderCartTopLine}></div>
                    <span className={styles.sportFamily__sliderCartTopKingOfSport}>
                      {item.right_holder.kind_of_sport.name}
                    </span>
                  </div>
                  <div className={styles.sportFamily__sliderCartImgWrapper}>
                    {item.right_holder.link ? (
                      <img
                        loading='lazy'
                        src={item.right_holder.link}
                        alt={item.right_holder.first_name}
                      />
                    ) : (
                      <Skeleton className={styles.sportFamily__sliderCartSkeeleton} />
                    )}
                  </div>
                  <div className={styles.sportFamily__sliderCartWrapper}>
                    <h4 className={styles.sportFamily__sliderCartWrapperName}>
                      {item?.right_holder?.first_name}{' '}
                      {item?.right_holder?.last_name.length > 6
                        ? '\n' + item?.right_holder?.last_name
                        : item?.right_holder?.last_name}
                      `
                    </h4>
                    <span className={styles.sportFamily__sliderCartWrapperPrice}>
                      From <strong>€{item?.min_price ? item?.min_price : 1}</strong>
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
            <div className={styles.sportFamily__sliderNavigation}>
              <div className='swiper-button-prev' onClick={() => swiper.slideNext()}>
                <ArrowSlider className={styles.sportFamily__sliderNavigationArrowPrev} />
              </div>
              <div className='swiper-button-next'>
                <ArrowSlider className={styles.sportFamily__sliderNavigationArrowNext} />
              </div>
            </div>
          </Swiper>
        )}
        <motion.div
          variants={sportFamilyAnimation}
          custom={3}
          className={styles.sportFamily__linkWrapper}
        >
          <Link href={PAGE_SLUGS.marketplace} className={styles.sportFamily__link}>
            Go to Marketplace
          </Link>
        </motion.div>
      </motion.div>
      <motion.div variants={sportFamilyAnimation} custom={4} className={styles.sportFamily__robot}>
        {isMobile ? <RobotMobileSVG /> : isTablet ? <RobotTabletSVG /> : <RobotSVG />}
      </motion.div>
    </motion.section>
  )
}

export default SportFamily
