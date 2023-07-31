'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Slider from 'react-slick'

import styles from './Brand.module.scss'

import TopRightArrowSVG from '@assets/Icons/arrows/arrow-top-right.svg'
import ArrowSVG from '@assets/Icons/arrows/next-white.svg'
import BrandXSVG from '@assets/Images/home/brand/brand-x.svg'
import GalleryImage from '@assets/Images/home/brand/gallery.png'
import LikeSVG from '@assets/Images/home/brand/like.svg'
import ProgressSVG from '@assets/Images/home/brand/progress.svg'
import RideWithUsSVG from '@assets/Images/home/brand/ride-with-us.svg'
import RocketSVG from '@assets/Images/home/brand/rocket.svg'
import StarSVG from '@assets/Images/home/brand/star.svg'

const brandAnimation = {
  hidden: {
    y: 100,
    opacity: 0
  },
  visible: (custom: any) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.7 }
  })
}

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  autoplay: true,
  cssEase: 'linear',
  swipeToSlide: true,
  speed: 2000,
  autoplaySpeed: 0,
  slidesToShow: 2.5,
  slidesToScroll: 1
}

const Brand = () => {
  const [role, setRole] = useState<string>('Athleths')

  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ amount: 0.1, once: true }}
      className={styles.brand}
    >
      <motion.div variants={brandAnimation} custom={0.8} className={styles.brand__start}>
        <div className={styles.brand__startInfo}>
          <span>Ready to get started?</span>
          <ArrowSVG />
        </div>
        <div className={styles.brand__startLinksWrapper}>
          <button
            onClick={() => setRole('Brands')}
            className={`${styles.brand__startLinksWrapperLink} ${
              role === 'Brands' ? styles.brand__startLinksWrapperLinkActive : ''
            }`}
          >
            Brands
          </button>
          <button
            onClick={() => setRole('Athleths')}
            className={`${styles.brand__startLinksWrapperLink} ${
              role === 'Athleths' ? styles.brand__startLinksWrapperLinkActive : ''
            }`}
          >
            Athleths
          </button>
        </div>
      </motion.div>
      <motion.div variants={brandAnimation} custom={2} className={styles.brand__head}>
        <h2 className={styles.brand__headTitle}>Features</h2>
        <div className={styles.brand__headWrapper}>
          <p className={styles.brand__headWrapperSubtitle}>
            {role === 'Athleths' ? 'Realize your' : <span>Campaigns manager</span>}
          </p>
          {role === 'Athleths' ? (
            <p className={styles.brand__headWrapperSubtitle}>Full potential</p>
          ) : null}
        </div>
      </motion.div>
      <motion.div variants={brandAnimation} custom={3} className={styles.brand__content}>
        <div className={`${styles.brand__gallery} ${role === 'Brands' && styles.clearBlock}`}>
          {role === 'Athleths' ? (
            <div className={styles.brand__galleryWrapper}>
              <ProgressSVG className={styles.brand__galleryProgress} />
              <Image src={GalleryImage} className={styles.brand__galleryImg} alt='Gallery' />
              <div className={styles.brand__galleryPosts}>
                <span>5 Social media posts</span>
                <span>+200€</span>
              </div>
            </div>
          ) : (
            <div className={styles.brand__galleryList}>
              <div className={styles.brand__galleryListItem}>
                <div className={styles.brand__galleryListItemTextWrapper}>
                  <h3 className={styles.brand__galleryListItemTitle}>LVT program</h3>
                  <p className={styles.brand__galleryListItemSubtitle}>
                    Helsinki, Finland <span>| Jan, May 7, 2025</span>
                  </p>
                </div>
                <div className={styles.brand__galleryListItemProcent}>
                  <span className={styles.brand__galleryListItemProcentWrapper}>
                    <TopRightArrowSVG />
                    <span>23%</span>
                  </span>
                  <span>RQI</span>
                </div>
              </div>
              <div className={styles.brand__galleryListItem}>
                <div className={styles.brand__galleryListItemTextWrapper}>
                  <h3 className={styles.brand__galleryListItemTitle}>Brand veldeman</h3>
                  <p className={styles.brand__galleryListItemSubtitle}>
                    Stockholm, Sweden <span>| Jan, May 7, 2025</span>
                  </p>
                </div>
                <div className={styles.brand__galleryListItemProcent}>
                  <span className={styles.brand__galleryListItemProcentWrapper}>
                    <TopRightArrowSVG />
                    <span>34%</span>
                  </span>
                  <span>RQI</span>
                </div>
              </div>
              <div className={styles.brand__galleryListItem}>
                <div className={styles.brand__galleryListItemTextWrapper}>
                  <h3 className={styles.brand__galleryListItemTitle}>Brand veldeman</h3>
                  <p className={styles.brand__galleryListItemSubtitle}>
                    Mainhattan, New York City <span>| Jan, May 7, 2025</span>
                  </p>
                </div>
                <div className={styles.brand__galleryListItemProcent}>
                  <span className={styles.brand__galleryListItemProcentWrapper}>
                    <TopRightArrowSVG />
                    <span>18%</span>
                  </span>
                  <span>RQI</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.brand__info}>
          <ul className={styles.brand__infoList}>
            <li className={styles.brand__infoListItem}>
              <StarSVG className={styles.brand__infoListItemImg} />
              <span>
                {role === 'Athleths'
                  ? 'Cooperate with brands all over the world and earn additional income.'
                  : 'Create marketing campaigns with athletes, clubs and Federations.'}
              </span>
            </li>
            <li className={styles.brand__infoListItem}>
              <LikeSVG className={styles.brand__infoListItemImg} />
              <span>
                {role === 'Athleths'
                  ? 'Improve your media inventory with our Monetiseur Media House.'
                  : 'Manage and scale campaigns in one system.'}
              </span>
            </li>
            <li className={styles.brand__infoListItem}>
              <RocketSVG className={styles.brand__infoListItemImg} />
              <span>
                {role === 'Athleths'
                  ? 'We manage deals and help you find the right partners.'
                  : 'Track campaign results and improve them.'}
              </span>
            </li>
          </ul>
        </div>
        <div className={`${styles.brand__user} ${role === 'Brands' && styles.brand__userClear}`}>
          <h4 className={styles.brand__userName}>Karoliina Arm</h4>
          <p className={styles.brand__userInfo}>
            Professional fighter <span>| Tallinn, Estonia</span>
          </p>
        </div>

        <div
          className={`${styles.brand__company} ${role === 'Brands' && styles.brand__companyFull}`}
        >
          <Slider {...settings} className={styles.brand__companySlider}>
            <div className={styles.brand__companySliderWrapper}>
              <BrandXSVG />
              <span>BRAND X</span>
            </div>
            <div className={styles.brand__companySliderWrapper}>
              <BrandXSVG />
              <span>BRAND X</span>
            </div>
            <div className={styles.brand__companySliderWrapper}>
              <RideWithUsSVG />
              <span>THE BLUE TIRE</span>
            </div>
          </Slider>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default Brand
